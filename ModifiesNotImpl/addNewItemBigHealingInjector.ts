import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {Traders} from '@spt/models/enums/Traders';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';
import {IBuff} from '@spt/models/eft/common/IGlobals';
import {ItemHelper} from '@spt/helpers/ItemHelper';

const newId: string = '67eb1cb18609418ea4389d10';

const assortId: string = '67eb1cb18609418ea4389d20';

export default function addNewItemBigHealingInjector(logger: ILogger,customItemService: CustomItemService,itemHelper: ItemHelper,tables: IDatabaseTables): void {
  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.STIM_ETGCHANGE_REGENERATIVE_STIMULANT_INJECTOR,
    newId: newId,
    parentId: BaseClasses.STIMULATOR,
    fleaPriceRoubles: 625_0000,
    handbookPriceRoubles: 500_0000,
    handbookParentId: '5b47574386f77428ca22b33a',
    locales: {
      en: {
        name: 'BigHealingInjector',
        shortName: 'Healing',
        description: 'just a big healing injector'
      },
      ch: {
        name: '大治疗针',
        shortName: '治疗针',
        description: '大治疗针'
      }
    },
    overrideProperties: {
      CanSellOnRagfair: false,
      Rarity: 'Superrare',
      RarityPvE: 'Superrare',
      Weight: 10.0,
      Width: 1,
      Height: 1,
      ExamineExperience: 500,
      LootExperience: 500,
      MaxHpResource: 100,
      hpResourceRate: 0,
      StimulatorBuffs: 'Buffs_BigHealingInjector',
      BackgroundColor: 'red',
      effects_damage: {},
      effects_health: {}
    }
  };

  const createResult = customItemService.createItemFromClone(newItem);
  if(!createResult.success) {
    logger.error('[MyCustomSPTAKI]: 未加入 BigHealingInjector，错误：' + createResult.errors.join('、'));
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

  for(const id of itemHelper.getItemTplsOfBaseType(BaseClasses.POCKETS)) {
    const template = tables.templates.items[id] || null;
    if(!template || template._props.Slots.length < 1) {continue;}
    for(const slot of template._props.Slots) {
      slot._props.filters[0].Filter.push(createResult.itemId);
    }
  }

  tables.globals.config.Health.Effects.Stimulator.Buffs['Buffs_BigHealingInjector'] = [
    {AbsoluteValue: true,BuffType: 'HealthRate',Chance: 1,Delay: 1,Duration: 60,SkillName: '',Value: 30},
    {AbsoluteValue: true,BuffType: 'EnergyRate',Chance: 1,Delay: 1,Duration: 60,SkillName: '',Value: -0.1},
    {AbsoluteValue: true,BuffType: 'HydrationRate',Chance: 1,Delay: 1,Duration: 60,SkillName: '',Value: -0.2},
  ];

  logger.success('[MyCustomSPTAKI]: 已加入 BigHealingInjector，ID：' + createResult.itemId);
}
