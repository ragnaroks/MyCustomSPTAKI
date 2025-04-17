import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';
import {Traders} from '@spt/models/enums/Traders';

export default function addNewItemSpecialRifleMagazine2(logger:ILogger,customItemService:CustomItemService,tables: IDatabaseTables) {
  const newId: string = '67dd1dce40aca0ed6482f8c0';
  const assortId:string = '67dd1dce40aca0ed6482f8d0';
  
  const templateItem = tables.templates.items[ItemTpl.MAGAZINE_762X51_L7AWM_25RND] || null;
  if(!templateItem){
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialRifleMagazine60，错误：模板物品 MAGAZINE_762X51_L7AWM_25RND 不存在');
    return;
  }

  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.MAGAZINE_762X51_L7AWM_25RND,
    newId: newId,
    parentId: BaseClasses.MAGAZINE,
    fleaPriceRoubles: 25_0000,
    handbookPriceRoubles: 20_0000,
    handbookParentId: '5b5f754a86f774094242f19b',
    locales: {
      en: {
        name: 'special rifle magazine type 2',
        shortName: 'SRM2',
        description: 'special rifle magazine, can load any assault rifle ammo but only work with SAR'
      },
      ch: {
        name: '特制步枪弹匣 2 型',
        shortName: 'SRM2',
        description: '特制步枪弹匣，可以使用任何突击步枪弹药，只适用于特制突击步枪'
      }
    },
    overrideProperties: {
      CanSellOnRagfair: false,
      BackgroundColor: 'red',
      ExamineExperience: 20,
      LootExperience: 20,
      Cartridges: [
        {
          _id:'67dd1dce40aca0ed6482f8c1',// id+0x01
          _name:'cartridges',
          _parent:newId,
          _proto:'5748538b2459770af276a261',
          _max_count: 200,
          _props:{
            filters:[
              {
                Filter:[
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
                  ItemTpl.AMMO_9X33R_SP
                ]
              }
            ]
          }
        }
      ],
      CheckTimeModifier: 20,
      Ergonomics: -5,
      ExtraSizeForceAdd:false,
      ExtraSizeDown:0,
      ExtraSizeLeft:0,
      ExtraSizeRight:0,
      ExtraSizeUp:0,
      Height:1,
      LoadUnloadModifier:20,
      MalfunctionChance:0,
      Rarity:'Superrare',
      RarityPvE:'Superrare',
      Recoil:0,
      Width:1
    }
  };
  
  const createResult = customItemService.createItemFromClone(newItem);
  if(!createResult.success) {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialRifleMagazine2，错误：' + createResult.errors.join('、'));
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

  logger.success('[MyCustomSPTAKI]: 已加入 SpecialRifleMagazine2，ID：' + createResult.itemId);
}
