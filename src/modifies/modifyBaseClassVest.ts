import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';

export default function modifyBaseClassVest(logger:ILogger,itemHelper:ItemHelper,tables: IDatabaseTables): void {
  const idArray = itemHelper.getItemTplsOfBaseType(BaseClasses.VEST);
  for(const id of idArray) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    //template._props.CanSellOnRagfair = true;
    template._props.Width = 1;
    template._props.Height = 1;
    template._props.mousePenalty = 0;
    template._props.speedPenaltyPercent = 0;
    template._props.weaponErgonomicPenalty = 0;
    if(template._props.Slots.length > 0) {continue;}
    template._props.Weight = 0;
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.VEST 已调整');
}
