import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';
import {Traders} from '@spt/models/enums/Traders';
import idcalc from '../helpers/idcalc';

const newId: string = '680b992ddb2d7f5fd00e7a00';
const assortId1: string = idcalc(newId,0xff);
const assortId2: string = idcalc(newId,0xfe);

export default function addNewItemSpecialAmmoArmband(logger: ILogger,customItemService: CustomItemService,tables: IDatabaseTables) {
  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.ARMBAND_EVASION,
    newId: newId,
    parentId: BaseClasses.MOB_CONTAINER,
    fleaPriceRoubles: 625_0000,
    handbookPriceRoubles: 500_0000,
    handbookParentId: '5b5f6fd286f774093f2ecf0d',
    locales: {
      en: {
        name: 'special ammo armband',
        shortName: 'SAA',
        description: 'special ammo armband'
      },
      ch: {
        name: '特制子弹臂带',
        shortName: '子弹臂带',
        description: '特制子弹臂带'
      }
    },
    overrideProperties: {
      CanSellOnRagfair: false,
      Weight: 0,
      Width: 1,
      Height: 1,
      mousePenalty: 0,
      speedPenaltyPercent: 0,
      weaponErgonomicPenalty: 0,
      ExaminedByDefault: true,
      ExamineExperience: 0,
      LootExperience: 500,
      BackgroundColor: 'red',
      RigLayoutName: '',
      Unlootable: true,
      InsuranceDisabled: false,
      isSecured: true,
      Grids: [
        {
          _id: idcalc(newId,0x01),
          _name: 'main',
          _parent: newId,
          _proto: '55d329c24bdc2d892f8b4567',
          _props: {
            cellsH: 24,
            cellsV: 6,
            filters: [
              {
                Filter: [BaseClasses.AMMO,BaseClasses.AMMO_BOX],
                ExcludedFilter: []
              }
            ],
            isSortingTable: false,
            maxCount: 0,
            maxWeight: 0,
            minCount: 0
          }
        }
      ]
    }
  };

  const createResult = customItemService.createItemFromClone(newItem);
  if(!createResult.success) {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialAmmoArmband，错误：' + createResult.errors.join('、'));
    return;
  }

  const assort1 = tables.traders[Traders.REF].assort;
  assort1.items.push({
    _id: assortId1,
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
  assort1.loyal_level_items[assortId1] = 1;
  assort1.barter_scheme[assortId1] = [
    [
      {_tpl: ItemTpl.MONEY_GP_COIN,count: Math.floor(newItem.handbookPriceRoubles / 7500)}
    ]
  ];

  const assort2 = tables.traders[Traders.MECHANIC].assort;
  assort2.items.push({
    _id: assortId2,
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
  assort2.loyal_level_items[assortId2] = 2;
  assort2.barter_scheme[assortId2] = [
    [
      {_tpl: ItemTpl.MONEY_ROUBLES,count: newItem.handbookPriceRoubles}
    ]
  ];

  const defaultInv = tables.templates.items[ItemTpl.INVENTORY_DEFAULT] || null;
  if(defaultInv) {
    for(const slot of defaultInv._props.Slots) {
      if(slot._name !== 'ArmBand') {continue;}
      slot._props.filters[0].Filter.push(createResult.itemId);
      break;
    }
  }

  logger.success('[MyCustomSPTAKI]: 已加入 SpecialAmmoArmband，ID：' + createResult.itemId);
}
