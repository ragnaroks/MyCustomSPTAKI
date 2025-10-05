import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';
import {Traders} from '@spt/models/enums/Traders';

export default function addNewItemSpecialAssaultRifle(logger: ILogger,customItemService: CustomItemService,tables: IDatabaseTables) {
  const newId: string = '67dd1f71aadac40ff26204d0';
  const assortId: string = '67dd1f71aadac40ff26204e0';

  const templateItem = tables.templates.items[ItemTpl.ASSAULTRIFLE_SIG_MCXSPEAR_68X51_ASSAULT_RIFLE] || null;
  if(!templateItem) {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialAssaultRifle，错误：模板物品 ASSAULTRIFLE_SIG_MCXSPEAR_68X51_ASSAULT_RIFLE 不存在');
    return;
  }

  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.ASSAULTRIFLE_SIG_MCXSPEAR_68X51_ASSAULT_RIFLE,
    newId: newId,
    parentId: BaseClasses.ASSAULT_RIFLE,
    fleaPriceRoubles: 375_0000,
    handbookPriceRoubles: 300_0000,
    handbookParentId: '5b5f78fc86f77409407a7f90',
    locales: {
      en: {
        name: 'special assault rifle',
        shortName: 'SAR',
        description: 'special assault rifle, can use any assault rifle ammo'
      },
      ch: {
        name: '特制突击步枪',
        shortName: '特制突击步枪',
        description: '特制突击步枪，可以使用任何突击步枪弹药'
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
      BurstShotsCount: 5,
      DurabilityBurnRatio: 1.0,
      ExamineExperience: 300,
      LootExperience: 300,
      DeviationCurve: 1,
      Chambers: [
        {
          _id: '67dd1f71aadac40ff26204d1',// id+0x01
          _name: 'patron_in_weapon',
          _parent: newId,
          _mergeSlotWithChildren: false,
          _proto: '55d4af244bdc2d962f8b4571',
          _required: false,
          _props: {
            filters: [
              {
                Filter: [
                  // 5.56x45
                  ItemTpl.AMMO_556X45_6MM_BB,
                  ItemTpl.AMMO_556X45_FMJ,
                  ItemTpl.AMMO_556X45_HP,
                  ItemTpl.AMMO_556X45_M855,
                  ItemTpl.AMMO_556X45_M855A1,
                  ItemTpl.AMMO_556X45_M856,
                  ItemTpl.AMMO_556X45_M856A1,
                  ItemTpl.AMMO_556X45_M995,
                  ItemTpl.AMMO_556X45_RRLP,
                  ItemTpl.AMMO_556X45_SOST,
                  ItemTpl.AMMO_556X45_SSA_AP,
                  ItemTpl.AMMO_556X45_WARMAGE,
                  // 5.45x39
                  ItemTpl.AMMO_545X39_7N40,
                  ItemTpl.AMMO_545X39_BP,
                  ItemTpl.AMMO_545X39_BS,
                  ItemTpl.AMMO_545X39_BT,
                  ItemTpl.AMMO_545X39_FMJ,
                  ItemTpl.AMMO_545X39_HP,
                  ItemTpl.AMMO_545X39_PP,
                  ItemTpl.AMMO_545X39_PPBS,
                  ItemTpl.AMMO_545X39_PRS,
                  ItemTpl.AMMO_545X39_PS,
                  ItemTpl.AMMO_545X39_SP,
                  ItemTpl.AMMO_545X39_T,
                  ItemTpl.AMMO_545X39_US,
                  // 9x39
                  ItemTpl.AMMO_9X39_BP,
                  ItemTpl.AMMO_9X39_FMJ,
                  ItemTpl.AMMO_9X39_PAB9,
                  ItemTpl.AMMO_9X39_SP5,
                  ItemTpl.AMMO_9X39_SP6,
                  ItemTpl.AMMO_9X39_SPP,
                  // .366TKM
                  ItemTpl.AMMO_366TKM_APM,
                  ItemTpl.AMMO_366TKM_EKO,
                  ItemTpl.AMMO_366TKM_FMJ,
                  ItemTpl.AMMO_366TKM_GEKSA,
                  // 6.8x51
                  ItemTpl.AMMO_68X51_FMJ,
                  ItemTpl.AMMO_68X51_HYBRID,
                  // 7.62x39
                  ItemTpl.AMMO_762X39_BP,
                  ItemTpl.AMMO_762X39_FMJ,
                  ItemTpl.AMMO_762X39_HP,
                  ItemTpl.AMMO_762X39_MAI_AP,
                  ItemTpl.AMMO_762X39_PP,
                  ItemTpl.AMMO_762X39_PS,
                  ItemTpl.AMMO_762X39_SP,
                  ItemTpl.AMMO_762X39_T45M1,
                  ItemTpl.AMMO_762X39_US,
                  // 7.62x51
                  ItemTpl.AMMO_762X51_BCP_FMJ,
                  ItemTpl.AMMO_762X51_M61,
                  ItemTpl.AMMO_762X51_M62,
                  ItemTpl.AMMO_762X51_M80,
                  ItemTpl.AMMO_762X51_M993,
                  ItemTpl.AMMO_762X51_TCW_SP,
                  ItemTpl.AMMO_762X51_ULTRA_NOSLER,
                  // .300blk
                  ItemTpl.AMMO_762X35_AP,
                  ItemTpl.AMMO_762X35_BCP_FMJ,
                  ItemTpl.AMMO_762X35_CBJ,
                  ItemTpl.AMMO_762X35_M62,
                  ItemTpl.AMMO_762X35_VMAX,
                  ItemTpl.AMMO_762X35_WHISPER,
                  // 9x33r
                  ItemTpl.AMMO_9X33R_FMJ,
                  ItemTpl.AMMO_9X33R_HP,
                  ItemTpl.AMMO_9X33R_JHP,
                  ItemTpl.AMMO_9X33R_SP,
                  // 7.62x54r
                  ItemTpl.AMMO_762X54R_BS,
                  ItemTpl.AMMO_762X54R_BT,
                  ItemTpl.AMMO_762X54R_FMJ,
                  ItemTpl.AMMO_762X54R_HP_BT,
                  ItemTpl.AMMO_762X54R_LPS,
                  ItemTpl.AMMO_762X54R_PS,
                  ItemTpl.AMMO_762X54R_SNB,
                  ItemTpl.AMMO_762X54R_SP_BT,
                  ItemTpl.AMMO_762X54R_T46M,
                  // 12.7x55
                  ItemTpl.AMMO_127X55_PS12,
                  ItemTpl.AMMO_127X55_PS12A,
                  ItemTpl.AMMO_127X55_PS12B,
                ]
              }
            ]
          }
        }
      ],
      Ergonomics: 71,
      HeatFactorByShot: 1.0,
      HeatFactorGun: 1.0,
      Rarity: 'Superrare',
      RarityPvE: 'Superrare',
      SingleFireRate: 500,
      Slots: [
        {
          _id: '67dd1f71aadac40ff26204d2',//id+0x02
          _mergeSlotWithChildren: false,
          _name: 'mod_pistol_grip',
          _parent: newId,
          _proto: '55d30c4c4bdc2db4468b457e',
          _required: true,
          _props: templateItem._props.Slots.find(x => x._name === 'mod_pistol_grip')._props
        },{
          _id: '67dd1f71aadac40ff26204d3',//id+0x03
          _mergeSlotWithChildren: false,
          _name: 'mod_magazine',
          _parent: newId,
          _proto: '55d30c394bdc2dae468b4577',
          _required: false,
          _props: {
            filters: [
              {
                AnimationIndex: -1,
                Filter: ['67dd17915bdad9aa03d95570']
              }
            ]
          }
        },{
          _id: '67dd1f71aadac40ff26204d4',//id+0x04
          _mergeSlotWithChildren: false,
          _name: 'mod_reciever',
          _parent: newId,
          _proto: '55d30c4c4bdc2db4468b457e',
          _required: true,
          _props: templateItem._props.Slots.find(x => x._name === 'mod_reciever')._props
        },{
          _id: '67dd1f71aadac40ff26204d5',//id+0x05
          _mergeSlotWithChildren: false,
          _name: 'mod_stock_000',
          _parent: newId,
          _proto: '55d30c394bdc2dae468b4577',
          _required: true,
          _props: templateItem._props.Slots.find(x => x._name === 'mod_stock_000')._props
        },{
          _id: '67dd1f71aadac40ff26204d6',//id+0x06
          _mergeSlotWithChildren: false,
          _name: 'mod_charge',
          _parent: newId,
          _proto: '55d30c4c4bdc2db4468b457e',
          _required: true,
          _props: templateItem._props.Slots.find(x => x._name === 'mod_charge')._props
        }
      ],
      bFirerate: 900,
      weapFireType: ['single','burst','fullauto']
    }
  };

  const createResult = customItemService.createItemFromClone(newItem);
  if(!createResult.success) {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialAssaultRifle，错误：' + createResult.errors.join('、'));
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

  tables.globals.config.Mastering.push({Name: 'SAR',Level2: 1000,Level3: 3000,Templates: [createResult.itemId]});

  logger.success('[MyCustomSPTAKI]: 已加入 SpecialAssaultRifle，ID：' + createResult.itemId);
}
