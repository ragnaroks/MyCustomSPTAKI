import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';

export default function modifyBaseClassMagazine(logger:ILogger,itemHelper:ItemHelper,tables: IDatabaseTables): void {
  const idArray = itemHelper.getItemTplsOfBaseType(BaseClasses.MAGAZINE);
  for(const id of idArray) {
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
    template._props.Ergonomics = 5 - Math.floor(template._props.Cartridges[0]._max_count / 10);
    template._props.Recoil = 0;
    if(Array.isArray(template._props.Slots) && template._props.Slots.length > 0) {continue;}
    /* 弹匣扩容会导致战局刷出大量弹药
    for (const slot of template._props.Cartridges) {
        slot._max_count = slot._max_count * 3;
    }
    */
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.MAGAZINE 已调整');
}
