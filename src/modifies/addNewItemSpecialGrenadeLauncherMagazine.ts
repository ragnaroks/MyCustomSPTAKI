import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';
import {Traders} from '@spt/models/enums/Traders';
import idcalc from '../helpers/idcalc';

const baseId: string = '68e2717a6b1529f042820f00';
const assortId: string = idcalc(baseId,0xff);

export default function addNewItemSpecialGrenadeLauncherMagazine(logger: ILogger,customItemService: CustomItemService,tables: IDatabaseTables) {
  const templateItem = tables.templates.items[ItemTpl.MAGAZINE_9X19_PL15_16RND] || null;
  if(!templateItem) {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialGrenadeLauncherMagazine，错误：模板物品 MAGAZINE_9X19_PL15_16RND 不存在');
    return;
  }

  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.MAGAZINE_9X19_PL15_16RND,
    newId: baseId,
    parentId: BaseClasses.MAGAZINE,
    fleaPriceRoubles: 62_5000,
    handbookPriceRoubles: 50_0000,
    handbookParentId: '5b5f754a86f774094242f19b',
    locales: {
      en: {
        name: 'special grenade launcher magazine',
        shortName: 'SGLM',
        description: 'special grenade launcher magazine'
      },
      ch: {
        name: '特制榴弹发射器弹匣',
        shortName: 'SGLM',
        description: '特制榴弹发射器弹匣'
      }
    },
    overrideProperties: {
      CanSellOnRagfair: false,
      BackgroundColor: 'red',
      ExamineExperience: 50,
      LootExperience: 50,
      Width:1,
      Height:1,
      Cartridges: [
        {
          _id: idcalc(baseId,0x01),// id+0x01
          _name: 'cartridges',
          _parent: baseId,
          _proto: '5748538b2459770af276a261',
          _max_count: 100,
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
      CheckTimeModifier: 0,
      Ergonomics: 0,
      ExtraSizeForceAdd: false,
      ExtraSizeDown: 0,
      ExtraSizeLeft: 0,
      ExtraSizeRight: 0,
      ExtraSizeUp: 0,
      LoadUnloadModifier: 0,
      MalfunctionChance: 0,
      Rarity: 'Superrare',
      RarityPvE: 'Superrare',
      Recoil: 0
    }
  };

  const createResult = customItemService.createItemFromClone(newItem);
  if(!createResult.success) {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialGrenadeLauncherMagazine，错误：' + createResult.errors.join('、'));
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

  logger.success('[MyCustomSPTAKI]: 已加入 SpecialGrenadeLauncherMagazine，ID：' + createResult.itemId);
}
