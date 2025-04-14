import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';
import {Traders} from '@spt/models/enums/Traders';
import {ISlotFilter} from '@spt/models/eft/common/tables/ITemplateItem';

const plantSlotFilter: ISlotFilter = {
  Filter: [BaseClasses.ARMOR_PLATE],
  Plate: ItemTpl.ARMORPLATE_GAC_3S15M_BALLISTIC_PLATE,
  armorColliders: [
    'BackHead','Ears','Eyes','HeadCommon','Jaw','NeckBack','NeckFront','ParietalHead',
    'LeftCalf','LeftForearm','LeftSideChestDown','LeftSideChestUp','LeftThigh','LeftUpperArm',
    'Pelvis','PelvisBack','RibcageLow','RibcageUp','SpineDown','SpineTop',
    'RightCalf','RightForearm','RightSideChestDown','RightSideChestUp','RightThigh','RightUpperArm',
  ],
  armorPlateColliders: [
    'Plate_Granit_SAPI_back','Plate_Granit_SAPI_chest','Plate_Korund_chest','Plate_6B13_back',
    'Plate_Granit_SSAPI_side_left_high','Plate_Granit_SSAPI_side_left_low',
    'Plate_Granit_SSAPI_side_right_high','Plate_Granit_SSAPI_side_right_low',
    'Plate_Korund_side_left_high','Plate_Korund_side_left_low',
    'Plate_Korund_side_right_high','Plate_Korund_side_right_low'
  ]
};

const newId: string = '67e643969bdc5111d9dbe090';

const assortId: string = '67e643969bdc5111d9dbe0b0';

export default function addNewItemSpecialHeavyPlateCarrier(logger: ILogger,customItemService: CustomItemService,tables: IDatabaseTables) {
  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.ARMOR_511_TACTICAL_HEXGRID_PLATE_CARRIER,
    newId: newId,
    parentId: BaseClasses.ARMOR,
    fleaPriceRoubles: 125_0000,
    handbookPriceRoubles: 100_0000,
    handbookParentId: '5b5f701386f774093f2ecf0f',
    locales: {
      en: {
        name: 'special heavy plate carrier',
        shortName: 'SHPC',
        description: 'special heavy plate carrier'
      },
      ch: {
        name: '特制重型插板背心',
        shortName: '重型插板',
        description: '特制重型插板背心'
      }
    },
    overrideProperties: {
      CanSellOnRagfair: true,
      Weight: 0,
      Width: 1,
      Height: 1,
      mousePenalty: 0,
      speedPenaltyPercent: 0,
      weaponErgonomicPenalty: 0,
      ExamineExperience: 100,
      LootExperience: 100,
      BackgroundColor: 'red',
      BluntThroughput: 0.05,
      Slots: [
        {
          _id: '67e643969bdc5111d9dbe091',//id+0x01
          _mergeSlotWithChildren: true,
          _name: 'plate1',
          _parent: newId,
          _proto: '64479fdf9731c8fadc0642c1',
          _required: false,
          _props: {
            filters: [plantSlotFilter]
          }
        },{
          _id: '67e643969bdc5111d9dbe092',//id+0x02
          _mergeSlotWithChildren: true,
          _name: 'plate2',
          _parent: newId,
          _proto: '64479fdf9731c8fadc0642c1',
          _required: false,
          _props: {
            filters: [plantSlotFilter]
          }
        },{
          _id: '67e643969bdc5111d9dbe093',//id+0x03
          _mergeSlotWithChildren: true,
          _name: 'plate3',
          _parent: newId,
          _proto: '64479fdf9731c8fadc0642c1',
          _required: false,
          _props: {
            filters: [plantSlotFilter]
          }
        },{
          _id: '67e643969bdc5111d9dbe094',//id+0x04
          _mergeSlotWithChildren: true,
          _name: 'plate4',
          _parent: newId,
          _proto: '64479fdf9731c8fadc0642c1',
          _required: false,
          _props: {
            filters: [plantSlotFilter]
          }
        },{
          _id: '67e643969bdc5111d9dbe095',//id+0x05
          _mergeSlotWithChildren: true,
          _name: 'plate5',
          _parent: newId,
          _proto: '64479fdf9731c8fadc0642c1',
          _required: false,
          _props: {
            filters: [plantSlotFilter]
          }
        },{
          _id: '67e643969bdc5111d9dbe096',//id+0x06
          _mergeSlotWithChildren: true,
          _name: 'plate6',
          _parent: newId,
          _proto: '64479fdf9731c8fadc0642c1',
          _required: false,
          _props: {
            filters: [plantSlotFilter]
          }
        },{
          _id: '67e643969bdc5111d9dbe097',//id+0x07
          _mergeSlotWithChildren: true,
          _name: 'plate7',
          _parent: newId,
          _proto: '64479fdf9731c8fadc0642c1',
          _required: false,
          _props: {
            filters: [plantSlotFilter]
          }
        },{
          _id: '67e643969bdc5111d9dbe098',//id+0x08
          _mergeSlotWithChildren: true,
          _name: 'plate8',
          _parent: newId,
          _proto: '64479fdf9731c8fadc0642c1',
          _required: false,
          _props: {
            filters: [plantSlotFilter]
          }
        },{
          _id: '67e643969bdc5111d9dbe099',//id+0x09
          _mergeSlotWithChildren: true,
          _name: 'plate9',
          _parent: newId,
          _proto: '64479fdf9731c8fadc0642c1',
          _required: false,
          _props: {
            filters: [plantSlotFilter]
          }
        },{
          _id: '67e643969bdc5111d9dbe09a',//id+0x0a
          _mergeSlotWithChildren: true,
          _name: 'plate10',
          _parent: newId,
          _proto: '64479fdf9731c8fadc0642c1',
          _required: false,
          _props: {
            filters: [plantSlotFilter]
          }
        },{
          _id: '67e643969bdc5111d9dbe09b',//id+0x0b
          _mergeSlotWithChildren: true,
          _name: 'plate11',
          _parent: newId,
          _proto: '64479fdf9731c8fadc0642c1',
          _required: false,
          _props: {
            filters: [plantSlotFilter]
          }
        },{
          _id: '67e643969bdc5111d9dbe09c',//id+0x0c
          _mergeSlotWithChildren: true,
          _name: 'plate12',
          _parent: newId,
          _proto: '64479fdf9731c8fadc0642c1',
          _required: false,
          _props: {
            filters: [plantSlotFilter]
          }
        },{
          _id: '67e643969bdc5111d9dbe09d',//id+0x0d
          _mergeSlotWithChildren: true,
          _name: 'plate13',
          _parent: newId,
          _proto: '64479fdf9731c8fadc0642c1',
          _required: false,
          _props: {
            filters: [plantSlotFilter]
          }
        },{
          _id: '67e643969bdc5111d9dbe09e',//id+0x0e
          _mergeSlotWithChildren: true,
          _name: 'plate14',
          _parent: newId,
          _proto: '64479fdf9731c8fadc0642c1',
          _required: false,
          _props: {
            filters: [plantSlotFilter]
          }
        },{
          _id: '67e643969bdc5111d9dbe09f',//id+0x0f
          _mergeSlotWithChildren: true,
          _name: 'plate15',
          _parent: newId,
          _proto: '64479fdf9731c8fadc0642c1',
          _required: false,
          _props: {
            filters: [plantSlotFilter]
          }
        },{
          _id: '67e643969bdc5111d9dbe0a0',//id+0x10
          _mergeSlotWithChildren: true,
          _name: 'plate16',
          _parent: newId,
          _proto: '64479fdf9731c8fadc0642c1',
          _required: false,
          _props: {
            filters: [plantSlotFilter]
          }
        },{
          _id: '67e643969bdc5111d9dbe0a1',//id+0x11
          _mergeSlotWithChildren: true,
          _name: 'plate17',
          _parent: newId,
          _proto: '64479fdf9731c8fadc0642c1',
          _required: false,
          _props: {
            filters: [plantSlotFilter]
          }
        },{
          _id: '67e643969bdc5111d9dbe0a2',//id+0x12
          _mergeSlotWithChildren: true,
          _name: 'plate18',
          _parent: newId,
          _proto: '64479fdf9731c8fadc0642c1',
          _required: false,
          _props: {
            filters: [plantSlotFilter]
          }
        },{
          _id: '67e643969bdc5111d9dbe0a3',//id+0x13
          _mergeSlotWithChildren: true,
          _name: 'plate19',
          _parent: newId,
          _proto: '64479fdf9731c8fadc0642c1',
          _required: false,
          _props: {
            filters: [plantSlotFilter]
          }
        },{
          _id: '67e643969bdc5111d9dbe0a4',//id+0x14
          _mergeSlotWithChildren: true,
          _name: 'plate20',
          _parent: newId,
          _proto: '64479fdf9731c8fadc0642c1',
          _required: false,
          _props: {
            filters: [plantSlotFilter]
          }
        }
      ]
    }
  };

  const createResult = customItemService.createItemFromClone(newItem);
  if(!createResult.success) {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialHeavyPlateCarrier，错误：' + createResult.errors.join('、'));
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
      BuyRestrictionMax: 1,
      BuyRestrictionCurrent: 0
    }
  });
  assort.loyal_level_items[assortId] = 1;
  assort.barter_scheme[assortId] = [
    [
      {_tpl: ItemTpl.MONEY_ROUBLES,count: newItem.handbookPriceRoubles}
    ]
  ];

  logger.success('[MyCustomSPTAKI]: 已加入 SpecialHeavyPlateCarrier，ID：' + createResult.itemId);
}
