import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';
import {Traders} from '@spt/models/enums/Traders';
import idcalc from '../helpers/idcalc';

const newId: string = '67d8d6e2b96d1278ae75d242';
const assortId:string = idcalc(newId,0xff);

export default function addNewItemSpecialVestRig(logger:ILogger,customItemService:CustomItemService,tables: IDatabaseTables) {
  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.VEST_POYASA_POYASB_GEAR_RIG,
    newId: newId,
    parentId: BaseClasses.VEST,
    fleaPriceRoubles: 62_5000,
    handbookPriceRoubles: 50_0000,
    handbookParentId: '5b5f6f8786f77447ed563642',
    locales: {
      en: {
        name: 'special vest rig',
        shortName: 'SVR',
        description: 'special vest rig'
      },
      ch: {
        name: '特制胸挂',
        shortName: '特制胸挂',
        description: '特制胸挂'
      }
    },
    overrideProperties: {
      CanSellOnRagfair: false,
      Weight: 0,
      Width: 1,
      Height: 1,
      mousePenalty:0,
      speedPenaltyPercent:0,
      weaponErgonomicPenalty:0,
      ExamineExperience: 50,
      LootExperience: 50,
      BackgroundColor: 'red',
      RigLayoutName:'SATL_Bridger',
      Grids: [
        {
          _id: idcalc(newId,0x01),
          _name: 'down',
          _parent: newId,
          _proto: '55d329c24bdc2d892f8b4567',
          _props: {
            cellsH: 6,
            cellsV: 2,
            filters: [
              {
                Filter: [
                  ItemTpl.GRENADE_F1_HAND,
                  ItemTpl.GRENADE_M67_HAND,
                  ItemTpl.GRENADE_RGD5_HAND,
                  ItemTpl.GRENADE_V40_MINI,
                  ItemTpl.GRENADE_VOG17_KHATTABKA_IMPROVISED_HAND,
                  ItemTpl.GRENADE_VOG25_KHATTABKA_IMPROVISED_HAND
                ],
                ExcludedFilter: []
              }
            ],
            isSortingTable: false,
            maxCount: 0,
            maxWeight: 0,
            minCount: 0
          }
        },{
          _id: idcalc(newId,0x02),
          _name: 'left',
          _parent: newId,
          _proto: '55d329c24bdc2d892f8b4567',
          _props: {
            cellsH: 3,
            cellsV: 4,
            filters: [
              {
                Filter: [
                  BaseClasses.MAGAZINE,
                  BaseClasses.SPECIAL_WEAPON
                ],
                ExcludedFilter: []
              }
            ],
            isSortingTable: false,
            maxCount: 0,
            maxWeight: 0,
            minCount: 0
          }
        },{
          _id: idcalc(newId,0x03),
          _name: 'right',
          _parent: newId,
          _proto: '55d329c24bdc2d892f8b4567',
          _props: {
            cellsH: 3,
            cellsV: 4,
            filters: [
              {
                Filter: [
                  BaseClasses.AMMO,
                  ItemTpl.GRENADE_M18_SMOKE_GRENADE_GREEN,
                  ItemTpl.GRENADE_MODEL_7290_FLASH_BANG,
                  ItemTpl.GRENADE_RDG2B_SMOKE,
                  ItemTpl.GRENADE_RGN_HAND,
                  ItemTpl.GRENADE_RGO_HAND,
                  ItemTpl.GRENADE_ZARYA_STUN
                ],
                ExcludedFilter: []
              }
            ],
            isSortingTable: false,
            maxCount: 0,
            maxWeight: 0,
            minCount: 0
          }
        }
      ]
    }
  };

  const createResult = customItemService.createItemFromClone(newItem);
  if(!createResult.success) {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialVestRig，错误：' + createResult.errors.join('、'));
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
  
  logger.success('[MyCustomSPTAKI]: 已加入 SpecialVestRig，ID：' + createResult.itemId);
}
