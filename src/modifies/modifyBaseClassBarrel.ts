import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';

export default function modifyBaseClassBarrel(logger:ILogger,itemHelper:ItemHelper,tables: IDatabaseTables): void {
  const idArray = itemHelper.getItemTplsOfBaseType(BaseClasses.BARREL);
  for(const id of idArray) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    //template._props.CanSellOnRagfair = true;
    template._props.Width = 1;
    template._props.Height = 1;
    template._props.ExtraSizeDown = 0;
    template._props.ExtraSizeUp = 0;
    template._props.ExtraSizeRight = 0;
    template._props.ExtraSizeLeft = template._props.ExtraSizeLeft > 2 ? 1 : 0;
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.BARREL 已调整');
}
