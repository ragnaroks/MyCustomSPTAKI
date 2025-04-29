import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';
import {Traders} from '@spt/models/enums/Traders';

export default function addNewItemSpecialPistolMagazine2(logger: ILogger,customItemService: CustomItemService,tables: IDatabaseTables) {
  const newId: string = '67dd07553f86d487ade69a70';
  const assortId: string = '67dd07553f86d487ade69a80';

  const templateItem = tables.templates.items[ItemTpl.MAGAZINE_9X19_BIG_STICK_33RND] || null;
  if(!templateItem) {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialPistolMagazine2，错误：模板物品 MAGAZINE_9X19_BIG_STICK_33RND 不存在');
    return;
  }

  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.MAGAZINE_9X19_BIG_STICK_33RND,
    newId: newId,
    parentId: BaseClasses.MAGAZINE,
    fleaPriceRoubles: 12_5000,
    handbookPriceRoubles: 10_0000,
    handbookParentId: '5b5f754a86f774094242f19b',
    locales: {
      en: {
        name: 'special pistol magazine type 2',
        shortName: 'SPM2',
        description: 'special pistol magazine, can load any pistol ammo but only work with SAP and SSMG'
      },
      ch: {
        name: '特制手枪弹匣 2 型',
        shortName: 'SPM2',
        description: '特制手枪弹匣，可以使用任何手枪弹药，只能用于特制手枪和特制冲锋枪'
      }
    },
    overrideProperties: {
      CanSellOnRagfair: false,
      BackgroundColor: 'red',
      ExamineExperience: 10,
      LootExperience: 10,
      Cartridges: [
        {
          _id: '67dd07553f86d487ade69a71',// id+0x01
          _name: 'cartridges',
          _parent: newId,
          _proto: '5748538b2459770af276a261',
          _max_count: 200,
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
      CheckTimeModifier: 20,
      Ergonomics: -5,
      ExtraSizeForceAdd: false,
      ExtraSizeDown: 0,
      ExtraSizeLeft: 0,
      ExtraSizeRight: 0,
      ExtraSizeUp: 0,
      LoadUnloadModifier: 20,
      MalfunctionChance: 0,
      Rarity: 'Superrare',
      RarityPvE: 'Superrare',
      Recoil: 0
    }
  };

  const createResult = customItemService.createItemFromClone(newItem);
  if(!createResult.success) {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialPistolMagazine2，错误：' + createResult.errors.join('、'));
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
      BuyRestrictionMax: 3,
      BuyRestrictionCurrent: 0
    }
  });
  assort.loyal_level_items[assortId] = 1;
  assort.barter_scheme[assortId] = [
    [
      {_tpl: ItemTpl.MONEY_ROUBLES,count: newItem.handbookPriceRoubles}
    ]
  ];

  logger.success('[MyCustomSPTAKI]: 已加入 SpecialPistolMagazine2，ID：' + createResult.itemId);
}
