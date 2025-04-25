import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ILocation} from '@spt/models/eft/common/ILocation';
import {IBotConfig} from '@spt/models/spt/config/IBotConfig';

const maps:Array<string> = ['sandbox','sandbox_high','bigmap','factory4_day','factory4_night','interchange','laboratory','lighthouse','rezervbase','shoreline','tarkovstreets','woods'] as const;

export default function applyLocationConfig(logger:ILogger,tables:IDatabaseTables,escapeTimeLimit: number,botConfig: IBotConfig) : void {
  for (const map of maps) {
    const location:ILocation = tables.locations[map] || null;
    if(!location){continue;}
    //botConfig.maxBotCap[map] = 99;
    if(escapeTimeLimit>1){
      location.base.EscapeTimeLimit = escapeTimeLimit;
      location.base.EscapeTimeLimitCoop = escapeTimeLimit;
      location.base.EscapeTimeLimitPVE = escapeTimeLimit;
      location.base.exit_access_time = escapeTimeLimit + 1;
    }
    for (const exit of location.base.exits) {
      exit.PassageRequirement = 'None';
      exit.ExfiltrationType = 'Individual';
      exit.ExfiltrationTime = 15;
      exit.ExfiltrationTimePVE = 15;
    }
    for (const exit of location.allExtracts) {
      exit.PassageRequirement = 'None';
      exit.ExfiltrationType = 'Individual';
      exit.ExfiltrationTime = 15;
      exit.ExfiltrationTimePVE = 15;
    }
    for (const spawn of location.base.BossLocationSpawn) {
      spawn.BossChance = 100;
      spawn.IgnoreMaxBots = true;
      spawn.ForceSpawn = true;
      spawn.BossDifficult = 'impossible';
    }
    location.base.BotMax = 99;
    location.base.BotMaxPvE = 99;
  }
  
  // tables.locations.factory4_day.base['NewSpawn'] = true;
  // tables.locations.factory4_day.base['OfflineNewSpawn'] = true;
  // tables.locations.factory4_day.base['OldSpawn'] = false;
  // tables.locations.factory4_day.base['OfflineOldSpawn'] = false;
  // tables.locations.factory4_day.base.BotMax = 100;
  // tables.locations.factory4_day.base.BotMaxPvE = 100;
  // botConfig.maxBotCap['factory4_day'] = 7;

  // tables.locations.factory4_day.base.BotLocationModifier.DistToActivate = 40;
  // tables.locations.factory4_day.base.BotLocationModifier.DistToActivatePvE = 40;
  // tables.locations.factory4_day.base.BotLocationModifier.DistToSleep = 50;
  // tables.locations.factory4_day.base.BotLocationModifier.DistToSleepPvE = 50;
  // tables.locations.factory4_day.base.BotLocationModifier.LockSpawnCheckRadius = 50;
  // tables.locations.factory4_day.base.BotLocationModifier.LockSpawnCheckRadiusPvE = 50;

  logger.success('[MyCustomSPTAKI]: location 已调整');
}
