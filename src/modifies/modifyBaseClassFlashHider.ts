import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';

export default function modifyBaseClassFlashHider(logger:ILogger,itemHelper:ItemHelper,tables: IDatabaseTables): void {
  const idArray = itemHelper.getItemTplsOfBaseType(BaseClasses.FLASH_HIDER);
  for(const id of idArray) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    template._props.CanSellOnRagfair = true;
    template._props.Width = 1;
    template._props.Height = 1;
    template._props.Ergonomics = 2;
    template._props.DurabilityBurnModificator = 1.0;
    template._props.ExtraSizeForceAdd = false;
    template._props.ExtraSizeLeft = 0;
    template._props.ExtraSizeRight = 0;
    template._props.ExtraSizeUp = 0;
    template._props.ExtraSizeDown = 0;
    template._props.Recoil = template._props.Recoil > -2 ? -5 : Math.floor(template._props.Recoil * 1.15);
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.FLASH_HIDER 已调整');
}
