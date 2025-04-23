import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';
import {Traders} from '@spt/models/enums/Traders';

const newId: string = '67d8fe7b00471695d35c1cfb';

const assortId: string = '67d8fe7b00471695d35c1d0b';

export default function addNewItemSpecialSecureContainer(logger:ILogger,customItemService:CustomItemService,tables: IDatabaseTables) {
  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.SECURE_CONTAINER_KAPPA,
    newId: newId,
    parentId: BaseClasses.MOB_CONTAINER,
    fleaPriceRoubles: 6_2500_0000,
    handbookPriceRoubles: 5_0000_0000,
    handbookParentId: '5b5f6fd286f774093f2ecf0d',
    locales: {
      en: {
        name: 'special secure container',
        shortName: 'SSC',
        description: 'special secure container'
      },
      ch: {
        name: '特制安全箱',
        shortName: '安全箱',
        description: '特制安全箱'
      }
    },
    overrideProperties: {
      CanSellOnRagfair: false,
      Weight: -10000,
      Width: 4,
      Height: 4,
      mousePenalty:0,
      speedPenaltyPercent:0,
      weaponErgonomicPenalty:0,
      ExamineExperience: 1000,
      LootExperience: 1000,
      BackgroundColor: 'red',
      Grids: [
        {
          _id: '67d8fe7b00471695d35c1cfc',
          _name: 'main',
          _parent: newId,
          _proto: '55d329c24bdc2d892f8b4567',
          _props: {
            cellsH: 6,
            cellsV: 4,
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
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialSecureContainer，错误：' + createResult.errors.join('、'));
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
      {_tpl: ItemTpl.MONEY_ROUBLES,count: 2_0000_0000},
      {_tpl: ItemTpl.MONEY_DOLLARS,count: 100_0000},
      {_tpl: ItemTpl.MONEY_EUROS,count: 100_0000}
    ]
  ];
  
  logger.success('[MyCustomSPTAKI]: 已加入 SpecialSecureContainer，ID：' + createResult.itemId);
}
