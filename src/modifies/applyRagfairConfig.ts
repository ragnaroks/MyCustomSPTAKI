import {IRagfairConfig} from '@spt/models/spt/config/IRagfairConfig';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';

export default function applyRagfairConfig(logger:ILogger,ragfairConfig:IRagfairConfig,tables:IDatabaseTables,allowList:Array<string>) : void {
  ragfairConfig.dynamic.purchasesAreFoundInRaid = false;

  if(allowList && allowList.length){
    for (const id of allowList) {
      const template = tables.templates.items[id] || null;
      if(!template){continue;}
      template._props.CanSellOnRagfair = true;
    }
  }

  logger.success('[MyCustomSPTAKI]: ragfairConfig 已调整');
}
