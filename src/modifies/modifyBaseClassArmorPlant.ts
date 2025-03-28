import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';

export default function modifyBaseClassArmorPlant(logger:ILogger,itemHelper:ItemHelper,tables: IDatabaseTables): void {
  const idArray = itemHelper.getItemTplsOfBaseType(BaseClasses.ARMOR_PLATE);
  for(const id of idArray) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    //template._props.CanSellOnRagfair = true;
    template._props.Width = 1;
    template._props.Height = 1;
    template._props.mousePenalty = 0;
    template._props.speedPenaltyPercent = 0;
    template._props.weaponErgonomicPenalty = 0;
    template._props.armorColliders = [
      'LeftCalf','LeftForearm','LeftSideChestDown','LeftSideChestUp','LeftThigh','LeftUpperArm',
      'Pelvis','PelvisBack','RibcageLow','RibcageUp','SpineDown','SpineTop',
      'RightCalf','RightForearm','RightSideChestDown','RightSideChestUp','RightThigh','RightUpperArm',
      //
      'Plate_Granit_SAPI_back','Plate_Granit_SAPI_chest','Plate_Korund_chest','Plate_6B13_back',
      'Plate_Granit_SSAPI_side_left_high','Plate_Granit_SSAPI_side_left_low',
      'Plate_Granit_SSAPI_side_right_high','Plate_Granit_SSAPI_side_right_low',
      'Plate_Korund_side_left_high','Plate_Korund_side_left_low',
      'Plate_Korund_side_right_high','Plate_Korund_side_right_low'
    ];
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.ARMOR_PLATE 已调整');
}
