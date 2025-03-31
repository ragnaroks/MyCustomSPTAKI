import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';

export default function applyGlobalConfig(logger:ILogger,tables:IDatabaseTables) : void {
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
  
  tables.globals.config.TripwiresSettings.InertSeconds = 600;

  tables.globals.config.RagFair.isOnlyFoundInRaidAllowed = true;

  logger.success('[MyCustomSPTAKI]: 全局配置 已调整');
}
