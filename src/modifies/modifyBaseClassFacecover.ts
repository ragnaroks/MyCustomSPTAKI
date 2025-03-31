import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';

export default function modifyBaseClassFacecover(logger:ILogger,itemHelper:ItemHelper,tables: IDatabaseTables): void {
  const idArray = itemHelper.getItemTplsOfBaseType(BaseClasses.FACECOVER);
  for(const id of idArray) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    //template._props.CanSellOnRagfair = true;
    template._props.mousePenalty = 0;
    template._props.speedPenaltyPercent = 0;
    template._props.weaponErgonomicPenalty = 0;
    template._props.ConflictingItems = [];
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.FACECOVER 已调整');
}
