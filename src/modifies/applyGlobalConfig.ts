import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ILostOnDeathConfig} from '@spt/models/spt/config/ILostOnDeathConfig';
import {IRagfairConfig} from '@spt/models/spt/config/IRagfairConfig';
import {IHideoutConfig} from '@spt/models/spt/config/IHideoutConfig';
import {ILocation} from '@spt/models/eft/common/ILocation';
import {IBotConfig} from '@spt/models/spt/config/IBotConfig';
import {ISeasonalEventConfig} from '@spt/models/spt/config/ISeasonalEventConfig';
import {ItemTpl} from '@spt/models/enums/ItemTpl';

const mapArray: Array<string> = ['sandbox','sandbox_high','bigmap','factory4_day','factory4_night','interchange','laboratory','lighthouse','rezervbase','shoreline','tarkovstreets','woods'];

export default function applyGlobalConfig(logger: ILogger,hideoutConfig: IHideoutConfig,lostOnDeathConfig: ILostOnDeathConfig,ragfairConfig: IRagfairConfig,botConfig: IBotConfig,seasonalEventConfig:ISeasonalEventConfig,tables: IDatabaseTables,allowList: Array<string>,escapeTimeLimit: number): void {
  tables.globals.config.BaseCheckTime = 0.0;
  tables.globals.config.BaseLoadTime = 0.0;
  tables.globals.config.BaseUnloadTime = 0.0;
  tables.globals.config.RestrictionsInRaid = [];
  tables.globals.config.SkillMinEffectiveness = 1;
  tables.globals.config.SkillFreshEffectiveness = 3;
  tables.globals.config.SkillFatiguePerPoint = 0;
  tables.globals.config.SavagePlayCooldown = 60;
  tables.globals.config.SavagePlayCooldownNdaFree = 60;
  tables.globals.config.AimPunchMagnitude = 0;
  tables.globals.config.MaxBotsAliveOnMap = 9;
  tables.globals.config.MaxBotsAliveOnMapPvE = tables.globals.config.MaxBotsAliveOnMap;
  tables.globals.config.TripwiresSettings.InertSeconds = 600;
  tables.globals.config.RagFair.isOnlyFoundInRaidAllowed = true;

  // bot
  for(const key of Object.keys(botConfig.maxBotCap)) {
    botConfig.maxBotCap[key] = tables.globals.config.MaxBotsAliveOnMap;
  }
  for(const key of Object.keys(botConfig.assaultBrainType)) {
    botConfig.assaultBrainType[key] = {
      pmcBot: 1
    };
  }
  for(const key of Object.keys(botConfig.playerScavBrainType)) {
    botConfig.playerScavBrainType[key] = {
      pmcBot: 1
    };
  }
  for(const botType in tables.bots.types) {
    if(botType.includes('test')) {continue;}
    const character = tables.bots.types[botType];
    character.difficulty.easy.Mind['CAN_STAND_BY'] = true;
    character.difficulty.normal.Mind['CAN_STAND_BY'] = true;
    character.difficulty.hard.Mind['CAN_STAND_BY'] = true;
    character.difficulty.impossible.Mind['CAN_STAND_BY'] = true;
  }

  // 藏身处
  //hideoutConfig.overrideBuildTimeSeconds = 30;
  //hideoutConfig.overrideCraftTimeSeconds = 60;
  hideoutConfig.cultistCircle.craftTimeOverride = 30;

  // 保险
  for(const traderKey of Object.keys(tables.traders)) {
    const trader = tables.traders[traderKey] || null;
    if(!trader || !trader.base.insurance.availability) {continue;}
    trader.base.insurance.max_return_hour = 0;
    trader.base.insurance.min_return_hour = 0;
    trader.base.insurance.max_storage_time = 30 * 24;
  }

  // 跳蚤市场
  ragfairConfig.dynamic.purchasesAreFoundInRaid = false;
  if(allowList && allowList.length) {
    for(const id of allowList) {
      const template = tables.templates.items[id] || null;
      if(!template) {continue;}
      template._props.CanSellOnRagfair = true;
    }
  }

  // 死亡掉落
  lostOnDeathConfig.questItems = false;
  lostOnDeathConfig.specialSlotItems = false;
  lostOnDeathConfig.equipment.PocketItems = false;
  lostOnDeathConfig.equipment.ArmBand = false;
  lostOnDeathConfig.equipment.Holster = false;
  lostOnDeathConfig.equipment.Scabbard = false;

  // 地图
  for(const map of mapArray) {
    const location: ILocation = tables.locations[map] || null;
    if(!location) {continue;}
    //botConfig.maxBotCap[map] = 99;
    if(escapeTimeLimit > 10) {
      location.base.EscapeTimeLimit = escapeTimeLimit;
      location.base.EscapeTimeLimitCoop = escapeTimeLimit;
      location.base.EscapeTimeLimitPVE = escapeTimeLimit;
      location.base.exit_access_time = escapeTimeLimit + 1;
    }
    for(const exit of location.base.exits) {
      exit.PassageRequirement = 'None';
      exit.ExfiltrationType = 'Individual';
      exit.ExfiltrationTime = 15;
      exit.ExfiltrationTimePVE = 15;
    }
    for(const exit of location.allExtracts) {
      exit.PassageRequirement = 'None';
      exit.ExfiltrationType = 'Individual';
      exit.ExfiltrationTime = 15;
      exit.ExfiltrationTimePVE = 15;
    }
    for(const spawn of location.base.BossLocationSpawn) {
      if(spawn.BossName === 'gifter') {continue;}
      spawn.BossChance = 100;
      spawn.IgnoreMaxBots = true;
      spawn.ForceSpawn = true;
      spawn.BossDifficult = 'impossible';
    }
    if(map !== 'factory4_night' && map !== 'factory4_day') {
      location.base.NewSpawn = true;
      location.base.NewSpawnForPlayers = true;
      location.base.OfflineNewSpawn = true;
    }
  }

  // 任务
  for(const id of Object.keys(tables.templates.quests)) {
    const quest = tables.templates.quests[id] || null;
    if(!quest) {continue;}
    for(const condition of quest.conditions.AvailableForStart) {
      condition.availableAfter = 0;
    }
    for(const condition1 of quest.conditions.AvailableForFinish) {
      switch(condition1.conditionType) {
        case 'Quest':
          break;
        case 'LeaveItemAtLocation':
          condition1.plantTime = 5;
          break;
        case 'CounterCreator':
          const condition2s = condition1.counter.conditions.filter(x => x.conditionType !== 'InZone');
          for(const condition2 of condition2s) {
            switch(condition2.conditionType) {
              case 'VisitPlace':
              case 'ExitStatus':
              case 'Location':
              case 'ExitName':
              case 'LaunchFlare':
              case 'UnderArtilleryFire':
              case 'Equipment':
                break;
              case 'Kills':
                condition2.bodyPart = [];
                condition2.daytime = {from: 0,to: 0};
                condition2.distance = {compareMethod: '>=',value: 0};
                condition2.enemyEquipmentExclusive = [];
                condition2.enemyEquipmentInclusive = [];
                condition2.enemyHealthEffects = [];
                condition2.weapon = [];
                condition2.weaponCaliber = [];
                condition2.weaponModsExclusive = [];
                condition2.weaponModsInclusive = [];
                break;
              default: break;
            }
          }
          condition1.counter.conditions = condition2s;
          break;
        default: break;
      }
    }
  }

  // 藏身处配方
  for (const recipe of tables.hideout.production.recipes) {
    if(recipe._id==='5dd3c9c8449c0c31795b0f0b'){
      recipe.count *= 5;
      for (const requirement of recipe.requirements) {
        if(requirement.type!=='Item'){continue;}
        requirement.count *= 5;
      }
      continue;
    }
    if(recipe.areaType===5){
      recipe.count *= 3;
      for (const requirement of recipe.requirements) {
        if(requirement.type!=='Item'){continue;}
        requirement.count *= 3;
      }
      continue;
    }
  }

  // seasonalevent
  for (const event of seasonalEventConfig.events) {
    switch(event.name){
      case 'halloween':
        for (const map of mapArray) {
          event.settings.zombieSettings.mapInfectionAmount[map] = 100;
        }
        event.settings.disableBosses = [];
        break;
      default:break;
    }
  }
  for (const map of mapArray) {
    const spawns = seasonalEventConfig.eventBossSpawns['halloweenzombies']?.[map] || null;
    if(!spawns){continue;}
    for (const spawn of spawns) {
      spawn.BossChance += 100;
      spawn.BossDifficult = 'hard';
      spawn.BossEscortDifficult = 'hard';
      spawn.IgnoreMaxBots = true;
      spawn.BossEscortAmount = '2';
    }
  }
  

  logger.success('[MyCustomSPTAKI]: 全局配置 已调整');
}
