import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {Traders} from '@spt/models/enums/Traders';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';

export default function addNewItemBigMedkit(logger:ILogger,customItemService:CustomItemService,tables: IDatabaseTables): void {
  const newId:string = 'a45acf65633b4e7189bb57c7';
  const assortId:string = 'a45acf65633b4e7189bb57d7';

  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.MEDKIT_GRIZZLY_MEDICAL_KIT,
    newId: newId,
    parentId: BaseClasses.MEDKIT,
    fleaPriceRoubles: 625_0000,
    handbookPriceRoubles: 500_0000,
    handbookParentId: '5b47574386f77428ca22b338',
    locales: {
      en: {
        name: 'BigMedkit',
        shortName: 'BigMedkit',
        description: 'just a big medkit and remove some debuffs'
      },
      ch: {
        name: '大医疗包',
        shortName: '医疗包',
        description: '大医疗包，可移除一些负面状态'
      }
    },
    overrideProperties: {
      CanSellOnRagfair: true,
      Rarity: 'Superrare',
      RarityPvE: 'Superrare',
      Weight: 10.0,
      Width: 2,
      Height: 2,
      ExamineExperience: 50,
      LootExperience: 50,
      MaxHpResource: 18_0000,
      hpResourceRate: 200,
      StimulatorBuffs: '',
      BackgroundColor: 'red',
      effects_damage: {
        LightBleeding: {cost: 50,delay: 0,duration: 0,fadeOut: 0},
        HeavyBleeding: {cost: 150,delay: 0,duration: 0,fadeOut: 0},
        Fracture: {cost: 50,delay: 0,duration: 0,fadeOut: 0},
        RadExposure: {cost: 0,delay: 0,duration: 0,fadeOut: 0},
        Contusion: {cost: 0,delay: 0,duration: 0,fadeOut: 0},
        Intoxication: {cost: 300,delay: 0,duration: 0,fadeOut: 0},
      },
      effects_health: {}
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
    logger.success('[MyCustomSPTAKI]: 已加入 BigMedkit，ID：' + createResult.itemId);
  } else {
    logger.error('[MyCustomSPTAKI]: 未加入 BigMedkit，错误：' + createResult.errors.join('、'));
  }
}
