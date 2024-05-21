import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';

export default function applyExfilConfig(logger:ILogger,tables:IDatabaseTables) : void {
  tables.locations.sandbox.base.EscapeTimeLimit = 180;
  for(const exit of tables.locations.sandbox.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }
  tables.locations.sandbox_high.base.EscapeTimeLimit = 180;
  for(const exit of tables.locations.sandbox_high.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }
  tables.locations.bigmap.base.EscapeTimeLimit = 180;
  for(const exit of tables.locations.bigmap.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }
  tables.locations.factory4_day.base.EscapeTimeLimit = 180;
  for(const exit of tables.locations.factory4_day.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }
  tables.locations.factory4_night.base.EscapeTimeLimit = 180;
  for(const exit of tables.locations.factory4_night.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }
  tables.locations.interchange.base.EscapeTimeLimit = 180;
  for(const exit of tables.locations.interchange.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }
  tables.locations.laboratory.base.EscapeTimeLimit = 180;
  for(const exit of tables.locations.laboratory.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }
  tables.locations.lighthouse.base.EscapeTimeLimit = 180;
  for(const exit of tables.locations.lighthouse.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }
  tables.locations.rezervbase.base.EscapeTimeLimit = 180;
  for(const exit of tables.locations.rezervbase.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }
  tables.locations.shoreline.base.EscapeTimeLimit = 180;
  for(const exit of tables.locations.shoreline.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }
  tables.locations.tarkovstreets.base.EscapeTimeLimit = 180;
  for(const exit of tables.locations.tarkovstreets.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }
  tables.locations.woods.base.EscapeTimeLimit = 180;
  for(const exit of tables.locations.woods.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }
  logger.success('[MyCustomSPTAKI]: 全部地图战局时间已调整为 180 分钟');
}
