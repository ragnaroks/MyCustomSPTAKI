import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';
import {Traders} from '@spt/models/enums/Traders';
import {ISlotFilter} from '@spt/models/eft/common/tables/ITemplateItem';

const plantSlotFilter:ISlotFilter = {
  Filter:[BaseClasses.ARMOR_PLATE],
  Plate:ItemTpl.ARMORPLATE_GAC_3S15M_BALLISTIC_PLATE,
  armorColliders:[
    'LeftCalf','LeftForearm','LeftSideChestDown','LeftSideChestUp','LeftThigh','LeftUpperArm',
    'Pelvis','PelvisBack','RibcageLow','RibcageUp','SpineDown','SpineTop',
    'RightCalf','RightForearm','RightSideChestDown','RightSideChestUp','RightThigh','RightUpperArm',
  ],
  armorPlateColliders:[
    'Plate_Granit_SAPI_back','Plate_Granit_SAPI_chest','Plate_Korund_chest','Plate_6B13_back',
    'Plate_Granit_SSAPI_side_left_high','Plate_Granit_SSAPI_side_left_low',
    'Plate_Granit_SSAPI_side_right_high','Plate_Granit_SSAPI_side_right_low',
    'Plate_Korund_side_left_high','Plate_Korund_side_left_low',
    'Plate_Korund_side_right_high','Plate_Korund_side_right_low'
  ]
};

const newId: string = '67e643969bdc5111d9dbe060';

const assortId:string = '67e643969bdc5111d9dbe070';

export default function addNewItemSpecialLightPlateCarrier(logger:ILogger,customItemService:CustomItemService,tables: IDatabaseTables) {
  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.ARMOR_HEXATAC_HPC_PLATE_CARRIER_MULTICAM_BLACK,
    newId: newId,
    parentId: BaseClasses.ARMOR,
    fleaPriceRoubles: 62_5000,
    handbookPriceRoubles: 50_0000,
    handbookParentId: '5b5f701386f774093f2ecf0f',
    locales: {
      en: {
        name: 'special light plate carrier',
        shortName: 'SLPC',
        description: 'special light plate carrier'
      },
      ch: {
        name: '特制轻型插板背心',
        shortName: '轻型插板',
        description: '特制轻型插板背心'
      }
    },
    overrideProperties: {
      CanSellOnRagfair: true,
      Weight: 0,
      Width: 1,
      Height: 1,
      mousePenalty:0,
      speedPenaltyPercent:0,
      weaponErgonomicPenalty:0,
      ExamineExperience: 30,
      LootExperience: 30,
      BackgroundColor: 'red',
      BluntThroughput: 0.05,
      Slots: [
        {
          _id:'67e643969bdc5111d9dbe061',//id+0x01
          _mergeSlotWithChildren:true,
          _name:'plate1',
          _parent:newId,
          _proto:'64479fdf9731c8fadc0642c1',
          _required:false,
          _props:{
            filters:[plantSlotFilter]
          }
        },{
          _id:'67e643969bdc5111d9dbe062',//id+0x02
          _mergeSlotWithChildren:true,
          _name:'plate2',
          _parent:newId,
          _proto:'64479fdf9731c8fadc0642c1',
          _required:false,
          _props:{
            filters:[plantSlotFilter]
          }
        },{
          _id:'67e643969bdc5111d9dbe063',//id+0x03
          _mergeSlotWithChildren:true,
          _name:'plate3',
          _parent:newId,
          _proto:'64479fdf9731c8fadc0642c1',
          _required:false,
          _props:{
            filters:[plantSlotFilter]
          }
        },{
          _id:'67e643969bdc5111d9dbe064',//id+0x04
          _mergeSlotWithChildren:true,
          _name:'plate4',
          _parent:newId,
          _proto:'64479fdf9731c8fadc0642c1',
          _required:false,
          _props:{
            filters:[plantSlotFilter]
          }
        },{
          _id:'67e643969bdc5111d9dbe065',//id+0x05
          _mergeSlotWithChildren:true,
          _name:'plate5',
          _parent:newId,
          _proto:'64479fdf9731c8fadc0642c1',
          _required:false,
          _props:{
            filters:[plantSlotFilter]
          }
        },{
          _id:'67e643969bdc5111d9dbe066',//id+0x06
          _mergeSlotWithChildren:true,
          _name:'plate6',
          _parent:newId,
          _proto:'64479fdf9731c8fadc0642c1',
          _required:false,
          _props:{
            filters:[plantSlotFilter]
          }
        },{
          _id:'67e643969bdc5111d9dbe067',//id+0x07
          _mergeSlotWithChildren:true,
          _name:'plate7',
          _parent:newId,
          _proto:'64479fdf9731c8fadc0642c1',
          _required:false,
          _props:{
            filters:[plantSlotFilter]
          }
        },{
          _id:'67e643969bdc5111d9dbe068',//id+0x08
          _mergeSlotWithChildren:true,
          _name:'plate8',
          _parent:newId,
          _proto:'64479fdf9731c8fadc0642c1',
          _required:false,
          _props:{
            filters:[plantSlotFilter]
          }
        },{
          _id:'67e643969bdc5111d9dbe069',//id+0x09
          _mergeSlotWithChildren:true,
          _name:'plate9',
          _parent:newId,
          _proto:'64479fdf9731c8fadc0642c1',
          _required:false,
          _props:{
            filters:[plantSlotFilter]
          }
        },{
          _id:'67e643969bdc5111d9dbe06a',//id+0x0a
          _mergeSlotWithChildren:true,
          _name:'plate10',
          _parent:newId,
          _proto:'64479fdf9731c8fadc0642c1',
          _required:false,
          _props:{
            filters:[plantSlotFilter]
          }
        }
      ]
    }
  };
  const createResult = customItemService.createItemFromClone(newItem);
  if(createResult.success) {
    const assort = tables.traders[Traders.RAGMAN].assort;
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
    assort.loyal_level_items[assortId] = 4;
    assort.barter_scheme[assortId] = [
      [
        {_tpl: ItemTpl.MONEY_ROUBLES,count: newItem.handbookPriceRoubles}
      ]
    ];
    logger.success('[MyCustomSPTAKI]: 已加入 SpecialLightPlateCarrier，ID：' + createResult.itemId);
  } else {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialLightPlateCarrier，错误：' + createResult.errors.join('、'));
  }
}
