import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';

export default function modifyBaseClassStock(logger:ILogger,itemHelper:ItemHelper,tables: IDatabaseTables): void {
  const idArray = itemHelper.getItemTplsOfBaseType(BaseClasses.STOCK);
  for(const id of idArray) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    template._props.CanSellOnRagfair = true;
    const base:number = template._props.Ergonomics < 1 ? 1 : template._props.Ergonomics;
    template._props.Ergonomics = base * 2;
    template._props.Recoil = -Math.floor(base * 1.5);
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.STOCK 已调整');
}
