import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';

export default function modifyBaseClassHeadwear(logger:ILogger,itemHelper:ItemHelper,tables: IDatabaseTables): void {
  const idArray = itemHelper.getItemTplsOfBaseType(BaseClasses.HEADWEAR);
  for(const id of idArray) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    //template._props.CanSellOnRagfair = true;
    template._props.mousePenalty = 0;
    template._props.speedPenaltyPercent = 0;
    template._props.weaponErgonomicPenalty = 0;
    template._props.ConflictingItems = [];
    template._props.BlocksEarpiece = false;
    template._props.BlocksEyewear = false;
    template._props.BlocksFaceCover = false;
    template._props.BlocksHeadwear = false;
    template._props.FaceShieldMask = 'NoMask';
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.HEADWEAR 已调整');
}
