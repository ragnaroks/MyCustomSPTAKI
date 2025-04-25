import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ILostOnDeathConfig} from '@spt/models/spt/config/ILostOnDeathConfig';
import {IRagfairConfig} from '@spt/models/spt/config/IRagfairConfig';
import {IHideoutConfig} from '@spt/models/spt/config/IHideoutConfig';
import {ILocation} from '@spt/models/eft/common/ILocation';

const mapArray: Array<string> = ['sandbox','sandbox_high','bigmap','factory4_day','factory4_night','interchange','laboratory','lighthouse','rezervbase','shoreline','tarkovstreets','woods'];

export default function applyGlobalConfig(logger: ILogger,hideoutConfig: IHideoutConfig,lostOnDeathConfig: ILostOnDeathConfig,ragfairConfig: IRagfairConfig,tables: IDatabaseTables,allowList: Array<string>,escapeTimeLimit: number): void {
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
  //tables.globals.config.MaxBotsAliveOnMap = 9;
  //tables.globals.config.MaxBotsAliveOnMapPvE = 9;
  tables.globals.config.TripwiresSettings.InertSeconds = 600;
  tables.globals.config.RagFair.isOnlyFoundInRaidAllowed = true;

  // 藏身处
  hideoutConfig.overrideBuildTimeSeconds = 30;
  hideoutConfig.overrideCraftTimeSeconds = 60;

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
      spawn.BossChance = 100;
      spawn.IgnoreMaxBots = true;
      spawn.ForceSpawn = true;
      spawn.BossDifficult = 'impossible';
    }
  }

  logger.success('[MyCustomSPTAKI]: 全局配置 已调整');
}
