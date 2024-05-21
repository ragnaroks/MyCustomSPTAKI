import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';

export default function modifyBaseClassSimpleContainer(logger:ILogger,itemHelper:ItemHelper,tables:IDatabaseTables) : void {
  const idArray = itemHelper.getItemTplsOfBaseType(BaseClasses.SIMPLE_CONTAINER);
  for(const id of idArray) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    //template._props.CanSellOnRagfair = true;
    template._props.Weight = 0;
    template._props.Width = 1;
    template._props.Height = 1;
  }

  const idArray2 = [ItemTpl.CONTAINER_LUCKY_SCAV_JUNK_BOX];
  for(const id of idArray2) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    template._props.CanSellOnRagfair = true;
    template._props.Weight = 0;
    template._props.Width = 1;
    template._props.Height = 1;
    template._props.Grids[0]._props.cellsH = 24;
    //template._props.Grids[0]._props.cellsH = 14;
  }

  logger.success('[MyCustomSPTAKI]: BaseClasses.SIMPLE_CONTAINER 已调整');
}
