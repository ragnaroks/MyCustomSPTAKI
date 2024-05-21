import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';

export default function modifyBaseClassQuickSight(logger:ILogger,itemHelper:ItemHelper,tables: IDatabaseTables): void {
  const idArray1 = itemHelper.getItemTplsOfBaseType(BaseClasses.COMPACT_COLLIMATOR);//紧凑
  const idArray2 = itemHelper.getItemTplsOfBaseType(BaseClasses.COLLIMATOR);//准直
  for(const id of [...idArray1,...idArray2]) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    template._props.CanSellOnRagfair = true;
    template._props.Width = 1;
    template._props.Height = 1;
    template._props.ExtraSizeForceAdd = false;
    template._props.ExtraSizeUp = 0;
    template._props.ExtraSizeDown = 0;
    template._props.ExtraSizeLeft = 0;
    template._props.ExtraSizeRight = 0;
    template._props.Ergonomics = 3;
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.COMPACT_COLLIMATOR 已调整');
  logger.success('[MyCustomSPTAKI]: BaseClasses.COLLIMATOR 已调整');
}
