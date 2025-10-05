import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';
import {Traders} from '@spt/models/enums/Traders';
import idcalc from '../helpers/idcalc';

const baseId: string = '68e26eec9e772862f63f5600';
const assortId: string = idcalc(baseId,0xff);

export default function addNewItemSpecialGrenadeLauncher(logger: ILogger,customItemService: CustomItemService,tables: IDatabaseTables) {
  const templateItem = tables.templates.items[ItemTpl.PISTOL_LEBEDEV_PL15_9X19] || null;
  if(!templateItem) {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialGrenadeLauncher，错误：模板物品 PISTOL_LEBEDEV_PL15_9X19 不存在');
    return;
  }

  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.PISTOL_LEBEDEV_PL15_9X19,
    newId: baseId,
    parentId: BaseClasses.GRENADE_LAUNCHER,
    fleaPriceRoubles: 625_0000,
    handbookPriceRoubles: 500_0000,
    handbookParentId: '5b5f79d186f774093f2ed3c2',
    locales: {
      en: {
        name: 'special grenade launcher',
        shortName: 'SGL',
        description: 'special grenade launcher'
      },
      ch: {
        name: '特制榴弹发射器',
        shortName: 'SGL',
        description: '特制榴弹发射器'
      }
    },
    overrideProperties: {
      CanSellOnRagfair: false,
      AllowFeed: false,
      AllowJam: false,
      AllowMisfire: false,
      AllowOverheat: false,
      AllowSlide: false,
      BackgroundColor: 'red',
      BaseMalfunctionChance: 0,
      BurstShotsCount: 0,
      DurabilityBurnRatio: 1.0,
      ExamineExperience: 500,
      LootExperience: 500,
      Chambers: [
        {
          _id: idcalc(baseId,0x01),
          _name: 'patron_in_weapon',
          _parent: baseId,
          _mergeSlotWithChildren: false,
          _proto: '55d4af244bdc2d962f8b4571',
          _required: false,
          _props: {
            filters: [
              {
                Filter: [
                  ItemTpl.AMMO_40MMRU_VOG25,
                  ItemTpl.AMMO_40X46_M381,
                  ItemTpl.AMMO_40X46_M386,
                  ItemTpl.AMMO_40X46_M406,
                  ItemTpl.AMMO_40X46_M433,
                  ItemTpl.AMMO_40X46_M576,
                  ItemTpl.AMMO_40X46_M716
                ]
              }
            ]
          }
        }
      ],
      Ergonomics: 100,
      HeatFactorByShot: 1.0,
      HeatFactorGun: 1.0,
      Rarity: 'Superrare',
      RarityPvE: 'Superrare',
      //SingleFireRate: 600,
      Slots: [
        {
          _id: idcalc(baseId,0x02),//id+0x02
          _mergeSlotWithChildren: false,
          _name: 'mod_barrel',
          _parent: baseId,
          _proto: '55d30c4c4bdc2db4468b457e',
          _required: true,
          _props: templateItem._props.Slots.find(x => x._name === 'mod_barrel')._props
        },{
          _id: idcalc(baseId,0x03),//id+0x03
          _mergeSlotWithChildren: false,
          _name: 'mod_reciever',
          _parent: baseId,
          _proto: '55d30c4c4bdc2db4468b457e',
          _required: true,
          _props: templateItem._props.Slots.find(x => x._name === 'mod_reciever')._props
        },{
          _id: idcalc(baseId,0x04),//id+0x04
          _mergeSlotWithChildren: false,
          _name: 'mod_magazine',
          _parent: baseId,
          _proto: '55d30c394bdc2dae468b4577',
          _required: false,
          _props: {
            filters: [
              {
                AnimationIndex: 0,
                Filter: ['68e2717a6b1529f042820f00']
              }
            ]
          }
        },{
          _id: idcalc(baseId,0x05),//id+0x05
          _mergeSlotWithChildren: false,
          _name: 'mod_tactical',
          _parent: baseId,
          _proto: '55d30c4c4bdc2db4468b457e',
          _required: false,
          _props: templateItem._props.Slots.find(x => x._name === 'mod_tactical')._props
        }
      ],
      //bFirerate: 1200,
      weapFireType: ['single']
    }
  };

  const createResult = customItemService.createItemFromClone(newItem);
  if(!createResult.success) {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialGrenadeLauncher，错误：' + createResult.errors.join('、'));
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

  tables.globals.config.Mastering.push({Name:'SGL',Level2:1000,Level3:3000,Templates:[createResult.itemId]});

  logger.success('[MyCustomSPTAKI]: 已加入 SpecialGrenadeLauncher，ID：' + createResult.itemId);
}
