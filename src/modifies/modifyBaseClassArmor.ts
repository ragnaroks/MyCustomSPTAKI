import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';

const plateArea: Array<string> = [
  'LeftCalf','LeftForearm','LeftSideChestDown','LeftSideChestUp','LeftThigh','LeftUpperArm',
  'Pelvis','PelvisBack','RibcageLow','RibcageUp','SpineDown','SpineTop',
  'RightCalf','RightForearm','RightSideChestDown','RightSideChestUp','RightThigh','RightUpperArm'
];

const plateArea2: Array<string> = [
  'Plate_Granit_SAPI_back','Plate_Granit_SAPI_chest','Plate_Korund_chest','Plate_6B13_back'
];

export default function modifyBaseClassArmor(logger:ILogger,itemHelper:ItemHelper,tables: IDatabaseTables): void {
  const idArray = itemHelper.getItemTplsOfBaseType(BaseClasses.ARMOR);
  for(const id of idArray) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    //template._props.CanSellOnRagfair = true;
    template._props.Width = 1;
    template._props.Height = 1;
    template._props.mousePenalty = 0;
    template._props.speedPenaltyPercent = 0;
    template._props.weaponErgonomicPenalty = 0;
  }
  const plateArmorList = [
    ItemTpl.ARMOR_511_TACTICAL_HEXGRID_PLATE_CARRIER,
    ItemTpl.ARMOR_HEXATAC_HPC_PLATE_CARRIER_MULTICAM_BLACK
  ];
  for(const armorId of plateArmorList) {
    const template = tables.templates.items[armorId] || null;
    if(!template) {continue;}
    for(const armorSlot of template._props.Slots) {
      armorSlot._props.filters[0].armorColliders = plateArea;
    }
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.ARMOR 已调整');

  const idArray2 = itemHelper.getItemTplsOfBaseType(BaseClasses.ARMOR_PLATE);
  for(const id of idArray2) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    //template._props.CanSellOnRagfair = true;
    template._props.Width = 1;
    template._props.Height = 1;
    template._props.mousePenalty = 0;
    template._props.speedPenaltyPercent = 0;
    template._props.weaponErgonomicPenalty = 0;
    template._props.armorColliders = [...plateArea,...plateArea2];
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.ARMOR_PLATE 已调整');
}
