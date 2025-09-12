import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';

export default function modifyBaseClassSmg(logger:ILogger,itemHelper:ItemHelper,tables: IDatabaseTables): void {
  const idArray = itemHelper.getItemTplsOfBaseType(BaseClasses.SMG);
  for(const id of idArray) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    //template._props.CanSellOnRagfair = true;
    template._props.AllowJam = false;
    template._props.AllowFeed = false;
    template._props.AllowMisfire = false;
    template._props.AllowSlide = false;
    template._props.AllowOverheat = false;
    template._props.Ergonomics = 100;
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.SMG 已调整');
}
