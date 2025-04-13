import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';

export default function applyExfilConfig(logger: ILogger,tables: IDatabaseTables,escapeTimeLimit: number): void {
  if(escapeTimeLimit >= 1) {
    tables.locations.sandbox.base.EscapeTimeLimit = escapeTimeLimit;
    tables.locations.sandbox_high.base.EscapeTimeLimit = escapeTimeLimit;
    tables.locations.bigmap.base.EscapeTimeLimit = escapeTimeLimit;
    tables.locations.factory4_day.base.EscapeTimeLimit = escapeTimeLimit;
    tables.locations.factory4_night.base.EscapeTimeLimit = escapeTimeLimit;
    tables.locations.interchange.base.EscapeTimeLimit = escapeTimeLimit;
    tables.locations.laboratory.base.EscapeTimeLimit = escapeTimeLimit;
    tables.locations.lighthouse.base.EscapeTimeLimit = escapeTimeLimit;
    tables.locations.rezervbase.base.EscapeTimeLimit = escapeTimeLimit;
    tables.locations.shoreline.base.EscapeTimeLimit = escapeTimeLimit;
    tables.locations.tarkovstreets.base.EscapeTimeLimit = escapeTimeLimit;
    tables.locations.woods.base.EscapeTimeLimit = escapeTimeLimit;
  }

  for(const exit of tables.locations.sandbox.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }

  for(const exit of tables.locations.sandbox_high.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }

  for(const exit of tables.locations.bigmap.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }

  for(const exit of tables.locations.factory4_day.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }

  for(const exit of tables.locations.factory4_night.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }

  for(const exit of tables.locations.interchange.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }

  for(const exit of tables.locations.laboratory.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }

  for(const exit of tables.locations.lighthouse.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }

  for(const exit of tables.locations.rezervbase.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }

  for(const exit of tables.locations.shoreline.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }

  for(const exit of tables.locations.tarkovstreets.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }

  for(const exit of tables.locations.woods.base.exits) {
    exit.PassageRequirement = 'None';
    exit.ExfiltrationType = 'Individual';
    exit.ExfiltrationTime = 15;
    exit.ExfiltrationTimePVE = 15;
  }

  logger.success('[MyCustomSPTAKI]: 全部撤离点已取消要求，战局时间已修改为 ' + escapeTimeLimit + ' 分钟');
}
