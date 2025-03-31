import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {Traders} from '@spt/models/enums/Traders';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';

const newId:string = '05eea6795e2e4ced85390ea2';

const assortId:string = '05eea6795e2e4ced85390eb2';

export default function addNewItemBigFood(logger:ILogger,customItemService:CustomItemService,tables: IDatabaseTables): void {
  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.DRUGS_ANALGIN_PAINKILLERS,
    newId: newId,
    parentId: BaseClasses.DRUGS,
    fleaPriceRoubles: 187_5000,
    handbookPriceRoubles: 150_0000,
    handbookParentId: '5b47574386f77428ca22b336',
    locales: {
      en: {
        name: 'BigFood',
        shortName: 'food',
        description: '50 energy each eat'
      },
      ch: {
        name: '大型虚空食物',
        shortName: '大吃',
        description: '一口 50 能量'
      }
    },
    overrideProperties: {
      Prefab: {path: 'assets/content/weapons/usable_items/item_ifr/item_ifr_loot.bundle',rcid: ''},
      UsePrefab: {path: 'assets/content/weapons/usable_items/item_ifr/item_irf_container.bundle',rcid: ''},
      ExamineExperience: 150,
      LootExperience: 150,
      CanSellOnRagfair: true,
      Rarity: 'Superrare',
      RarityPvE: 'Superrare',
      Weight: 10.0,
      Width: 1,
      Height: 2,
      MaxHpResource: 150,
      StimulatorBuffs: '',
      BackgroundColor: 'red',
      medUseTime: 5,
      effects_damage: {},
      effects_health: {
        Energy: {value: 50}
      }
    }
  };
  const createResult = customItemService.createItemFromClone(newItem);
  if(createResult.success) {
    const assort = tables.traders[Traders.THERAPIST].assort;
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
    logger.success('[MyCustomSPTAKI]: 已加入 BigFood，ID：' + createResult.itemId);
  } else {
    logger.error('[MyCustomSPTAKI]: 未加入 BigFood，错误：' + createResult.errors.join('、'));
  }
}
