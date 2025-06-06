import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';
import {Traders} from '@spt/models/enums/Traders';

export default function addNewItemSpecialAutoPistol(logger: ILogger,customItemService: CustomItemService,tables: IDatabaseTables) {
  const newId: string = '67dce787331916fd3364d670';
  const assortId: string = '67dce787331916fd3364d680';

  const templateItem = tables.templates.items[ItemTpl.PISTOL_GLOCK_17_9X19] || null;
  if(!templateItem) {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialAutoPistol，错误：模板物品 PISTOL_GLOCK_17_9X19 不存在');
    return;
  }

  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.PISTOL_GLOCK_17_9X19,
    newId: newId,
    parentId: BaseClasses.PISTOL,
    fleaPriceRoubles: 62_5000,
    handbookPriceRoubles: 50_0000,
    handbookParentId: '5b5f792486f77447ed5636b3',
    locales: {
      en: {
        name: 'special auto pistol',
        shortName: 'SAP',
        description: 'special auto pistol, can use any pistol ammo'
      },
      ch: {
        name: '特制自动手枪',
        shortName: '特制手枪',
        description: '特制自动手枪，可以使用任何手枪弹药'
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
      BurstShotsCount: 3,
      DurabilityBurnRatio: 1.0,
      ExamineExperience: 50,
      LootExperience: 50,
      DeviationCurve: 2,
      Chambers: [
        {
          _id: '67dce787331916fd3364d671',// id+0x01
          _name: 'patron_in_weapon',
          _parent: newId,
          _mergeSlotWithChildren: false,
          _proto: '55d4af244bdc2d962f8b4571',
          _required: false,
          _props: {
            filters: [
              {
                Filter: [
                  // 9x19
                  ItemTpl.AMMO_9X19_PBP,
                  ItemTpl.AMMO_9X19_AP_63,
                  ItemTpl.AMMO_9X19_PST,
                  ItemTpl.AMMO_9X19_M882,
                  ItemTpl.AMMO_9X19_GT,
                  ItemTpl.AMMO_9X19_PSO,
                  ItemTpl.AMMO_9X19_LUGER_CCI,
                  ItemTpl.AMMO_9X19_QUAKEMAKER,
                  ItemTpl.AMMO_9X19_RIP,
                  // 9x18
                  ItemTpl.AMMO_9X18PM_PBM,
                  ItemTpl.AMMO_9X18PM_PSTM,
                  ItemTpl.AMMO_9X18PM_BZHT,
                  ItemTpl.AMMO_9X18PM_RG028,
                  ItemTpl.AMMO_9X18PM_PST,
                  ItemTpl.AMMO_9X18PM_PPT,
                  ItemTpl.AMMO_9X18PM_PPE,
                  ItemTpl.AMMO_9X18PM_PRS,
                  ItemTpl.AMMO_9X18PM_PS_PPO,
                  ItemTpl.AMMO_9X18PM_PSO,
                  ItemTpl.AMMO_9X18PM_P,
                  ItemTpl.AMMO_9X18PM_PSV,
                  ItemTpl.AMMO_9X18PM_SP7,
                  ItemTpl.AMMO_9X18PM_SP8,
                  // 9x21
                  ItemTpl.AMMO_9X21_7N42,
                  ItemTpl.AMMO_9X21_BT,
                  ItemTpl.AMMO_9X21_7U4,
                  ItemTpl.AMMO_9X21_PS,
                  ItemTpl.AMMO_9X21_P,
                  ItemTpl.AMMO_9X21_PE,
                  // .45ACP
                  ItemTpl.AMMO_45ACP_AP,
                  ItemTpl.AMMO_45ACP_FMJ,
                  ItemTpl.AMMO_45ACP_LASERMATCH,
                  ItemTpl.AMMO_45ACP_HYDRASHOK,
                  ItemTpl.AMMO_45ACP_RIP,
                  // .50
                  ItemTpl.AMMO_127X33_FMJ,
                  ItemTpl.AMMO_127X33_COPPER,
                  ItemTpl.AMMO_127X33_HAWK_JSP,
                  ItemTpl.AMMO_127X33_JHP,
                  // 5.7x28
                  ItemTpl.AMMO_57X28_SS190,
                  ItemTpl.AMMO_57X28_L191,
                  ItemTpl.AMMO_57X28_SB193,
                  ItemTpl.AMMO_57X28_SS197SR,
                  ItemTpl.AMMO_57X28_SS198LF,
                  ItemTpl.AMMO_57X28_R37X,
                  ItemTpl.AMMO_57X28_R37F,
                  // 4.6x30
                  ItemTpl.AMMO_46X30_ACTION_SX,
                  ItemTpl.AMMO_46X30_AP_SX,
                  ItemTpl.AMMO_46X30_FMJ_SX,
                  ItemTpl.AMMO_46X30_JSP_SX,
                  ItemTpl.AMMO_46X30_SUBSONIC_SX,
                  // 7.62x25TT
                  ItemTpl.AMMO_762X25TT_AKBS,
                  ItemTpl.AMMO_762X25TT_FMJ43,
                  ItemTpl.AMMO_762X25TT_LRN,
                  ItemTpl.AMMO_762X25TT_LRNPC,
                  ItemTpl.AMMO_762X25TT_P,
                  ItemTpl.AMMO_762X25TT_PST,
                  ItemTpl.AMMO_762X25TT_PT,
                  // 9x33r
                  ItemTpl.AMMO_9X33R_FMJ,
                  ItemTpl.AMMO_9X33R_HP,
                  ItemTpl.AMMO_9X33R_JHP,
                  ItemTpl.AMMO_9X33R_SP
                ]
              }
            ]
          }
        }
      ],
      Ergonomics: 93,
      HeatFactorByShot: 1.0,
      HeatFactorGun: 1.0,
      Rarity: 'Superrare',
      RarityPvE: 'Superrare',
      SingleFireRate: 500,
      Slots: [
        {
          _id: '67dce787331916fd3364d672',//id+0x02
          _mergeSlotWithChildren: false,
          _name: 'mod_barrel',
          _parent: newId,
          _proto: '55d30c4c4bdc2db4468b457e',
          _required: true,
          _props: templateItem._props.Slots.find(x => x._name === 'mod_barrel')._props
        },{
          _id: '67dce787331916fd3364d673',//id+0x03
          _mergeSlotWithChildren: false,
          _name: 'mod_pistol_grip',
          _parent: newId,
          _proto: '55d30c4c4bdc2db4468b457e',
          _required: false,
          _props: templateItem._props.Slots.find(x => x._name === 'mod_pistol_grip')._props
        },{
          _id: '67dce787331916fd3364d674',//id+0x04
          _mergeSlotWithChildren: false,
          _name: 'mod_reciever',
          _parent: newId,
          _proto: '55d30c4c4bdc2db4468b457e',
          _required: true,
          _props: templateItem._props.Slots.find(x => x._name === 'mod_reciever')._props
        },{
          _id: '67dce787331916fd3364d675',//id+0x05
          _mergeSlotWithChildren: false,
          _name: 'mod_magazine',
          _parent: newId,
          _proto: '55d30c394bdc2dae468b4577',
          _required: false,
          _props: {
            filters: [
              {
                AnimationIndex: 0,
                Filter: ['67dd012b1b3dd0c240cb5350','67dd07553f86d487ade69a70','67dd07553f86d487ade89c70']
              }
            ]
          }
        },{
          _id: '67dce787331916fd3364d676',//id+0x06
          _mergeSlotWithChildren: false,
          _name: 'mod_tactical',
          _parent: newId,
          _proto: '55d30c4c4bdc2db4468b457e',
          _required: false,
          _props: templateItem._props.Slots.find(x => x._name === 'mod_tactical')._props
        },
        {
          _id: '67dce787331916fd3364d677',//id+0x07
          _mergeSlotWithChildren: false,
          _name: 'mod_mount',
          _parent: newId,
          _proto: '55d30c4c4bdc2db4468b457e',
          _required: false,
          _props: templateItem._props.Slots.find(x => x._name === 'mod_mount')._props
        },
        {
          _id: '67dce787331916fd3364d678',//id+0x08
          _mergeSlotWithChildren: false,
          _name: 'mod_stock',
          _parent: newId,
          _proto: '55d30c4c4bdc2db4468b457e',
          _required: false,
          _props: templateItem._props.Slots.find(x => x._name === 'mod_stock')._props
        }
      ],
      bFirerate: 1200,
      weapFireType: ['single','burst','fullauto']
    }
  };

  const createResult = customItemService.createItemFromClone(newItem);
  if(!createResult.success) {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialAutoPistol，错误：' + createResult.errors.join('、'));
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

  tables.globals.config.Mastering.push({Name:'SAP',Level2:1000,Level3:3000,Templates:[createResult.itemId]});

  logger.success('[MyCustomSPTAKI]: 已加入 SpecialAutoPistol，ID：' + createResult.itemId);
}
