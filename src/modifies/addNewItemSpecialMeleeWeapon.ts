import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';
import {Traders} from '@spt/models/enums/Traders';

const newId: string = '6808da7b5de660341b9fb4a0';

const assortId: string = '6808da7b5de660341b9fb4b0';

export default function addNewItemSpecialMeleeWeapon(logger: ILogger,customItemService: CustomItemService,tables: IDatabaseTables) {
  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.KNIFE_FREEMAN_CROWBAR,
    newId: newId,
    parentId: BaseClasses.KNIFE,
    fleaPriceRoubles: 1_2500_0000,
    handbookPriceRoubles: 1_0000_0000,
    handbookParentId: '5b5f7a0886f77409407a7f96',
    locales: {
      en: {
        name: 'special crowbar',
        shortName: 'crowbar',
        description: 'special crowbar'
      },
      ch: {
        name: '特制撬棍',
        shortName: '撬棍',
        description: '特制撬棍'
      }
    },
    overrideProperties: {
      CanSellOnRagfair: false,
      Weight: 0,
      Width: 1,
      Height: 3,
      mousePenalty: 0,
      speedPenaltyPercent: 0,
      weaponErgonomicPenalty: 0,
      ExamineExperience: 10000,
      LootExperience: 10000,
      BackgroundColor: 'red',
      RarityPvE:'Superrare',
      Rarity:'Superrare',
      PrimaryConsumption:1,
      PrimaryDistance:1,
      SecondryConsumption:1,
      SecondryDistance:2,
      SlashPenetration:1,
      StabPenetration:1,
      StaminaBurnRate:2,
      //StimulatorBuffs:'Buffs_hultafors',
      knifeHitDelay:0,
      knifeHitRadius:1,
      knifeHitSlashDam:2000,
      knifeHitStabDam:1000,
      knifeHitStabRate:1,
    }
  };

  const createResult = customItemService.createItemFromClone(newItem);
  if(!createResult.success) {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialMeleeWeapon，错误：' + createResult.errors.join('、'));
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

  logger.success('[MyCustomSPTAKI]: 已加入 SpecialMeleeWeapon，ID：' + createResult.itemId);
}
