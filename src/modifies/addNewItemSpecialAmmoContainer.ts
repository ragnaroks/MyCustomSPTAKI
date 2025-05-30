import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';
import {Traders} from '@spt/models/enums/Traders';
import idcalc from '../helpers/idcalc';

const newId: string = '67dccdd9a480dda56ab15bba';
const assortId1: string = idcalc(newId,0xff);
const assortId2: string = idcalc(newId,0xfe);

export default function addNewItemSpecialAmmoContainer(logger: ILogger,customItemService: CustomItemService,tables: IDatabaseTables) {
  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.CONTAINER_THICC_ITEM_CASE,
    newId: newId,
    parentId: BaseClasses.SIMPLE_CONTAINER,
    fleaPriceRoubles: 1250_0000,
    handbookPriceRoubles: 1000_0000,
    handbookParentId: '5b5f6fa186f77409407a7eb7',
    locales: {
      en: {
        name: 'special ammo container',
        shortName: 'SAC',
        description: 'special ammo container'
      },
      ch: {
        name: '特制弹药箱',
        shortName: '弹药箱',
        description: '特制弹药箱'
      }
    },
    overrideProperties: {
      CanSellOnRagfair: false,
      BackgroundColor: 'red',
      Prefab: {path: 'assets/content/items/containers/item_container_ammo/item_container_ammo.bundle',rcid: ''},
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
          _id: idcalc(newId,0x01),
          _name: 'main',
          _parent: newId,
          _proto: '55d329c24bdc2d892f8b4567',
          _props: {
            cellsH: 24,
            cellsV: 14,
            filters: [
              {
                Filter: [BaseClasses.AMMO,BaseClasses.AMMO_BOX],
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
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialAmmoContainer，错误：' + createResult.errors.join('、'));
    return;
  }

  const assort1 = tables.traders[Traders.REF].assort;
    assort1.items.push({
      _id: assortId1,
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
    assort1.loyal_level_items[assortId1] = 1;
    assort1.barter_scheme[assortId1] = [
      [
        {_tpl: ItemTpl.MONEY_GP_COIN,count: Math.floor(newItem.handbookPriceRoubles / 7500)}
      ]
    ];
  
    const assort2 = tables.traders[Traders.MECHANIC].assort;
    assort2.items.push({
      _id: assortId2,
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
    assort2.loyal_level_items[assortId2] = 2;
    assort2.barter_scheme[assortId2] = [
      [
        {_tpl: ItemTpl.MONEY_ROUBLES,count: newItem.handbookPriceRoubles}
      ]
    ];

  logger.success('[MyCustomSPTAKI]: 已加入 SpecialAmmoContainer，ID：' + createResult.itemId);
}
