import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';
import {Traders} from '@spt/models/enums/Traders';

export default function addNewItemSpecialMagazineContainer(logger: ILogger,customItemService: CustomItemService,tables: IDatabaseTables) {
  const newId: string = '67d9342ae33410e5fba6be24';
  const assortId: string = '67d9342ae33410e5fba6be34';

  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.CONTAINER_THICC_ITEM_CASE,
    newId: newId,
    parentId: BaseClasses.SIMPLE_CONTAINER,
    fleaPriceRoubles: 1250_0000,
    handbookPriceRoubles: 1000_0000,
    handbookParentId: '5b5f6fa186f77409407a7eb7',
    locales: {
      en: {
        name: 'special magazine container',
        shortName: 'SMC',
        description: 'special magazine container'
      },
      ch: {
        name: '特制弹匣箱',
        shortName: '弹匣箱',
        description: '特制弹匣箱'
      }
    },
    overrideProperties: {
      CanSellOnRagfair: true,
      BackgroundColor: 'red',
      Prefab: {path: 'assets/content/items/containers/item_container_magbox/item_container_magbox.bundle',rcid: ''},
      Weight: 0,
      Width: 1,
      Height: 1,
      mousePenalty: 0,
      speedPenaltyPercent: 0,
      weaponErgonomicPenalty: 0,
      ExamineExperience: 100,
      LootExperience: 100,
      Grids: [
        {
          _id: '67d9342ae33410e5fba6be25',
          _name: 'main',
          _parent: newId,
          _proto: '55d329c24bdc2d892f8b4567',
          _props: {
            cellsH: 24,
            cellsV: 14,
            filters: [
              {
                Filter: [BaseClasses.MAGAZINE],
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
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialMagazineContainer，错误：' + createResult.errors.join('、'));
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

  logger.success('[MyCustomSPTAKI]: 已加入 SpecialMagazineContainer，ID：' + createResult.itemId);
}
