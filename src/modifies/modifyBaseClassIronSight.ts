import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';

export default function modifyBaseClassIronSight(logger:ILogger,itemHelper:ItemHelper,tables: IDatabaseTables): void {
  const idArray = itemHelper.getItemTplsOfBaseType(BaseClasses.IRON_SIGHT);
  for(const id of idArray) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    template._props.CanSellOnRagfair = true;
    template._props.Ergonomics = 3;
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.IRON_SIGHT 已调整');
}
