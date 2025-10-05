import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';
import {Traders} from '@spt/models/enums/Traders';

const newId: string = '6808d4958d784f8cad5861b0';

const assortId:string = '6808d4958d784f8cad5861c0';

export default function addNewItemSpecialBigBackpack(logger:ILogger,customItemService:CustomItemService,tables: IDatabaseTables) {
  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.BACKPACK_PARTISANS_BAG,
    newId: newId,
    parentId: BaseClasses.BACKPACK,
    fleaPriceRoubles: 45_0000,
    handbookPriceRoubles: 30_0000,
    handbookParentId: '5b5f6f6c86f774093f2ecf0b',
    locales: {
      en: {
        name: 'special big backpack',
        shortName: 'SBB',
        description: 'special big backpack'
      },
      ch: {
        name: '特制大背包',
        shortName: '大背包',
        description: '特制大背包'
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
      ExamineExperience: 15,
      LootExperience: 15,
      BackgroundColor: 'red',
      RigLayoutName:'',
      Grids: [
        {
          _id: '6808d4958d784f8cad5861b1',//id+0x01
          _name: 'main',
          _parent: newId,
          _proto: '55d329c24bdc2d892f8b4567',
          _props: {
            cellsH: 6,
            cellsV: 12,
            filters: [
              {
                Filter: [BaseClasses.ITEM],
                ExcludedFilter: [BaseClasses.MOB_CONTAINER]
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
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialBigBackpack，错误：' + createResult.errors.join('、'));
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
  
  logger.success('[MyCustomSPTAKI]: 已加入 SpecialBigBackpack，ID：' + createResult.itemId);
}
