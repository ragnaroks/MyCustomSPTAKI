import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';
import {Traders} from '@spt/models/enums/Traders';
import idcalc from '../helpers/idcalc';

const baseId: string = '68e277c17e17026fcff79d00';
const assortId: string = idcalc(baseId,0xff);

export default function addNewItemSpecialArmorPlate6(logger: ILogger,customItemService: CustomItemService,tables: IDatabaseTables) {
  const templateItem = tables.templates.items[ItemTpl.ARMORPLATE_GAC_4SSS2_BALLISTIC_PLATE] || null;
  if(!templateItem) {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialArmorPlate6，错误：模板物品 ARMORPLATE_GAC_4SSS2_BALLISTIC_PLATE 不存在');
    return;
  }

  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.ARMORPLATE_GAC_4SSS2_BALLISTIC_PLATE,
    newId: baseId,
    parentId: BaseClasses.ARMOR_PLATE,
    fleaPriceRoubles: 2500_0000,
    handbookPriceRoubles: 2000_0000,
    handbookParentId: '5b5f704686f77447ec5d76d7',
    locales: {
      en: {
        name: 'special class-6 armor plate',
        shortName: 'SAP6',
        description: 'special class-6 armor plate'
      },
      ch: {
        name: '特制 6 级插板',
        shortName: 'SAP6',
        description: '特制 6 级插板'
      }
    },
    overrideProperties: {
      CanSellOnRagfair: false,
      BackgroundColor: 'red',
      ExamineExperience: 2000,
      LootExperience: 2000,
      Width:1,
      Height:1,
      Ergonomics: 0,
      ExtraSizeForceAdd: false,
      ExtraSizeDown: 0,
      ExtraSizeLeft: 0,
      ExtraSizeRight: 0,
      ExtraSizeUp: 0,
      Rarity: 'Superrare',
      RarityPvE: 'Superrare',
      RepairCost: 100,
      Weight: 0,
      BluntThroughput: 0.15,
      Durability: 1_0000,
      MaxDurability: 1_0000,
      InsuranceDisabled:true,
      armorClass: '6',
      armorColliders: [
        'BackHead','Ears','Eyes','HeadCommon','Jaw','NeckBack','NeckFront','ParietalHead',
        //
        'LeftCalf','LeftForearm','LeftSideChestDown','LeftSideChestUp','LeftThigh','LeftUpperArm',
        'Pelvis','PelvisBack','RibcageLow','RibcageUp','SpineDown','SpineTop',
        'RightCalf','RightForearm','RightSideChestDown','RightSideChestUp','RightThigh','RightUpperArm',
        //
        'Plate_Granit_SAPI_back','Plate_Granit_SAPI_chest','Plate_Korund_chest','Plate_6B13_back',
        'Plate_Granit_SSAPI_side_left_high','Plate_Granit_SSAPI_side_left_low',
        'Plate_Granit_SSAPI_side_right_high','Plate_Granit_SSAPI_side_right_low',
        'Plate_Korund_side_left_high','Plate_Korund_side_left_low',
        'Plate_Korund_side_right_high','Plate_Korund_side_right_low'
      ],
      armorPlateColliders: [],
      mousePenalty:0,
      speedPenaltyPercent:0,
      weaponErgonomicPenalty:0
    }
  };

  const createResult = customItemService.createItemFromClone(newItem);
  if(!createResult.success) {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialArmorPlate6，错误：' + createResult.errors.join('、'));
    return;
  }

  const assort = tables.traders[Traders.REF].assort;
  assort.items.push({
    _id: assortId,
    _tpl: createResult.itemId,
    parentId: 'hideout',
    slotId: 'hideout',
    upd: {
      UnlimitedCount: true,
      StackObjectsCount: 9999999,
      BuyRestrictionMax: 3,
      BuyRestrictionCurrent: 0
    }
  });
  assort.loyal_level_items[assortId] = 1;
  assort.barter_scheme[assortId] = [
    [
      {_tpl: ItemTpl.MONEY_ROUBLES,count: newItem.handbookPriceRoubles}
    ]
  ];

  logger.success('[MyCustomSPTAKI]: 已加入 SpecialArmorPlate6，ID：' + createResult.itemId);
}
