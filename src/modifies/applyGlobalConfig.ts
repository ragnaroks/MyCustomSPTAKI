import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ILostOnDeathConfig} from '@spt/models/spt/config/ILostOnDeathConfig';
import {IRagfairConfig} from '@spt/models/spt/config/IRagfairConfig';
import {IHideoutConfig} from '@spt/models/spt/config/IHideoutConfig';
import {ILocation} from '@spt/models/eft/common/ILocation';
import {IBotConfig} from '@spt/models/spt/config/IBotConfig';
import {ItemTpl} from '@spt/models/enums/ItemTpl';

const mapArray: Array<string> = ['sandbox','sandbox_high','bigmap','factory4_day','factory4_night','interchange','laboratory','lighthouse','rezervbase','shoreline','tarkovstreets','woods'];

const multiProductionArray: Array<string> = [
  '5dd1126571e3fd3f634b1c8b','5dd11303b78bb413d5133f79','5de021b30f6d581e965bcde7','5de951483c52683d810b4a10','5ede0053879619077751cff1',
  '61c226d91b8c294cd411c881','6002e26ac6b84d04cc62045e','63a2abbb31772a61500d5336','63a3359eaf870e651d58e61a','62a115db5c6bbf22c15ac19d',
  '5df138986c38ba26da0b3a77','5ffcac4e1285295b7441ee01','615c3d800d3afc358a55405e','655b505c32b0b1645e6f54c5','655b47d1769de97e1d62d115',
  '677d4db74ac9193862043ee9','655b56eb32b0b1645e6f54c8','603cf3094bb658618458e010','5de950a845b5d67bad6e9ef7','600a9b10adfcb94fee6d3e06',
  '5ffcad24f3fdc212a91d5536','5dd3c5487058311d4b267186','5dd3c9c8449c0c31795b0f0b','5d558968f934db006d2d5b32','655b58a49db22d43ab42b709',
  '62a11354b552772a0c4ba09e','600a9a34189b226f40059743','5dd3c5a67da3785e63275437','655b457c9db22d43ab42b706','603cf23a420e7f487e175d7f',
  '5d5c1f25d582a5479d4ec458','64b6aefe25251516d768542d','5de95f1c9517b140195ab717','5d78d81757c9b8484a2bcb99','6002ed409f2c60461a2d0f5a',
  '61dc03711bdcfa2f253c9b7c','5e66408286f7747b2c2d7786','5dea63e21ecdbf7668030f24','655b4de41f2b6843ec751fd5','5ffcacbf24fa2e741e767234',
  '5de95c91225b0a76ca0ea0b7','619e45ea98398d3b104e8419','5dde60e0e2c8f57eb6465327','677d4fdb42cdfce74006f961','655b4bbe4343a16d2e047668',
  '655b50e7c023e22044165de5','5e37f15386f774299f112a2e','655b54e7065b076eb02c4b47','5de919ec1b25d85cf30ca39a','63a2327c151bfb591645c104',
  '655b5af31273611d2462ab76','63a232f8ab6bb51044344bff','655b4669b71eeb7c4168c625','5d78f27d115f693ad750d2c6','63bd4c3964d7e356983c4cf5',
  '5f245f875b664e084523a4ce','600a9bd0189b226f40059751','61c77d465a98404dee40a77c','5dceb6964a98801ba2075d27','655b4489065b076eb02c4b45',
  '60048c82a7903e00382d9593','63baedefe6ebc10fe0201083','655b33429db22d43ab42b704','655b4a73975a7f3c734661a5','5eeca7724a8a9b668f0d89cd',
  '629e19eddb6e1a02066676f1','655b598db71eeb7c4168c626','600a9fb7ba91d953182d6a1c','6558d7894626375d6735670c','655b4f57769de97e1d62d116',
  '5dcfe2582f9b3d566c7af977','5ede07163c345121732a10e9','600aa0d1090cb6338027028c','655b6b641273611d2462ab78','5d93b91286f77467310ca15d',
  '5ffcaa60f3fdc212a91d552b','5eecaa6327ccd70521107ff5','62a11415c30cfa1d366aeb83','600aa140090cb63380270290','5e1330dca0f0f8773c069c99',
  '5eda04a30699b81bb9142aa2','5d8b8ddd322e8650762f6e3a','5eda0247658fac5b8c3862a8','6012ea1a01328b2dec3c1a9d','5df8fe0deddb880fd56f2d7d',
  '600ab813d19f85018a7489c4','5df8ffcbaab5f257bd7ff3a8','5ffcab66fd851f4b000d61ef','5d8f5e1af3a8f83c8600afb2','5ffcafd468c55773943fc71e',
  '5dceeaf100b3815535149f5a','6002e68bca41c53bee18813b','655b6c381fe356507267b2f6','5d93ba4486f77454bd61d2a9','5d5c1f5ed582a543983ee82e',
  '5d8a1a7d7a3dfe597c2e459e','600ab99ce4022c380a726090','619eb0eb56579138ec08fed8','5ed9fd73f6626f08ef0efec6','5d5c21aed582a50066024610',
  '5e13301cc7049d4d9738e1a7','6012ee7e44a0465ee67a58de','5e6cfc53a3e6886b9e6c39a8','64b6b5c1c3abf20a9660daad','5eeca8e327ccd70521107fdc',
  '5ede01e062155304b6512067','6671d4fef3bee343f5000703','6002eec9cc73cd34ac64188a','66509e8c9398c9c9e10a31bb','5ede0502879619077751d00a',
  '5d8f614c9ea122564c316462','5ede0135f7db6021ee400dfe','5d78d8a03fe9fc21602e16be','615c3d27966c85458e4c49cf','600abc08e4022c380a7260a8',
];

export default function applyGlobalConfig(logger: ILogger,hideoutConfig: IHideoutConfig,lostOnDeathConfig: ILostOnDeathConfig,ragfairConfig: IRagfairConfig,botConfig: IBotConfig,tables: IDatabaseTables,allowList: Array<string>,escapeTimeLimit: number): void {
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
      followerGluharAssault: 1
    };
  }
  for(const key of Object.keys(botConfig.playerScavBrainType)) {
    botConfig.playerScavBrainType[key] = {
      followerGluharAssault: 1,
      bossKilla: 1,
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

  // 配方
  tables.hideout.settings.generatorFuelFlowRate *= 2.5;
  for(const recipe of tables.hideout.production.recipes) {
    recipe.needFuelForAllProductionTime = false;
    if(multiProductionArray.includes(recipe._id)) {
      recipe.count *= 4;
      for(const requirement of recipe.requirements) {
        switch(requirement.type) {
          case 'Item':
            requirement.count *= 4;
            break;
          case 'Area':
          case 'Tool':
          case 'QuestComplete':
          case 'Resource':
            break;
          default: break;
        }
      }
      continue;
    }
    if(recipe.endProduct === ItemTpl.DRINK_CANISTER_WITH_PURIFIED_WATER) {
      /* no effects
      recipe.continuous = true;
      recipe.productionLimitCount = 10;
      recipe.count = 10;
      recipe.requirements = [
        {areaType: recipe.areaType,requiredLevel: 3,type: 'Area'},
        // ⬇ can not remove this ⬇
        {resource: 1,templateId: ItemTpl.BARTER_WATER_FILTER,type: 'Resource'}
      ];
      */
      recipe.productionTime = 3600;
      continue;
    }
    if(recipe.endProduct === ItemTpl.BARTER_PHYSICAL_BITCOIN) {
      recipe.continuous = true;
      recipe.productionLimitCount = 96;
      recipe.productionTime = 3600;
      continue;
    }
    // rest of all
    recipe.productionTime /= 4;
  }

  logger.success('[MyCustomSPTAKI]: 全局配置 已调整');
}
