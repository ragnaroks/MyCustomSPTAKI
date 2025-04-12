import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {Traders} from '@spt/models/enums/Traders';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';
import {ItemHelper} from '@spt/helpers/ItemHelper';

const newId:string = 'c3419b66b3684cffb0744dff';

const assortId:string = 'c3419b66b3684cffb0744e00';

export default function addNewItemBigDrink(logger:ILogger,customItemService:CustomItemService,itemHelper:ItemHelper,tables:IDatabaseTables): void {
  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.DRUGS_ANALGIN_PAINKILLERS,
    newId: newId,
    parentId: BaseClasses.DRUGS,
    fleaPriceRoubles: 125_0000,
    handbookPriceRoubles: 100_0000,
    handbookParentId: '5b47574386f77428ca22b335',
    locales: {
      en: {
        name: 'BigDrink',
        shortName: 'drink',
        description: '50 hydration each drink'
      },
      ch: {
        name: '大型虚空饮料',
        shortName: '大喝',
        description: '一口 50 水分'
      }
    },
    overrideProperties: {
      Prefab: {path: 'assets/content/weapons/usable_items/item_bottle/item_water_bottle_loot.bundle',rcid: ''},
      UsePrefab: {path: 'assets/content/weapons/usable_items/item_bottle/item_water_bottle_container.bundle',rcid: ''},
      ExamineExperience: 100,
      LootExperience: 100,
      CanSellOnRagfair: true,
      Rarity: 'Superrare',
      RarityPvE: 'Superrare',
      Weight: 10.0,
      Width: 1,
      Height: 2,
      MaxHpResource: 100,
      StimulatorBuffs: '',
      BackgroundColor: 'red',
      medUseTime: 3,
      effects_damage: {},
      effects_health: {
        Hydration: {value: 50}
      }
    }
  };

  const createResult = customItemService.createItemFromClone(newItem);
  if(!createResult.success) {
    logger.error('[MyCustomSPTAKI]: 未加入 BigDrink，错误：' + createResult.errors.join('、'));
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

  for (const id of itemHelper.getItemTplsOfBaseType(BaseClasses.POCKETS)) {
    const template = tables.templates.items[id] || null;
    if(!template || template._props.Slots.length<1){continue;}
    for (const slot of template._props.Slots) {
      slot._props.filters[0].Filter.push(createResult.itemId);
    }
  }

  logger.success('[MyCustomSPTAKI]: 已加入 BigDrink，ID：' + createResult.itemId);
}
