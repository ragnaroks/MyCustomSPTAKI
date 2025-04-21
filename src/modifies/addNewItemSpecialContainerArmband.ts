import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';
import {Traders} from '@spt/models/enums/Traders';

const newId: string = '67f9fbe1727f56bdc866b020';

const assortId:string = '67f9fbe1727f56bdc866b030';

export default function addNewItemSpecialContainerArmband(logger:ILogger,customItemService:CustomItemService,tables: IDatabaseTables) {
  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.ARMBAND_DEADSKUL,
    newId: newId,
    parentId: BaseClasses.VEST,
    fleaPriceRoubles: 625_0000,
    handbookPriceRoubles: 500_0000,
    handbookParentId: '5b47574386f77428ca22b33f',
    locales: {
      en: {
        name: 'special container armband',
        shortName: 'SCA',
        description: 'special container armband'
      },
      ch: {
        name: '特制空间臂带',
        shortName: '空间臂带',
        description: '特制空间臂带'
      }
    },
    overrideProperties: {
      CanSellOnRagfair: false,
      Weight: 0,
      Width: 1,
      Height: 1,
      mousePenalty:0,
      speedPenaltyPercent:0,
      weaponErgonomicPenalty:0,
      ExamineExperience: 500,
      LootExperience: 500,
      BackgroundColor: 'red',
      RigLayoutName:'',
      Unlootable: true,
      InsuranceDisabled: false,
      Grids: [
        {
          _id: '67f9fbe1727f56bdc866b021',//id+0x01
          _name: 'main',
          _parent: newId,
          _proto: '55d329c24bdc2d892f8b4567',
          _props: {
            cellsH: 14,
            cellsV: 14,
            filters: [
              {
                Filter: [BaseClasses.ITEM],
                ExcludedFilter: [BaseClasses.SIMPLE_CONTAINER,BaseClasses.MOB_CONTAINER]
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
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialContainerArmband，错误：' + createResult.errors.join('、'));
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

  const defaultInv = tables.templates.items[ItemTpl.INVENTORY_DEFAULT] || null;
  if(defaultInv){
    for (const slot of defaultInv._props.Slots) {
      if(slot._name!=='ArmBand'){continue;}
      slot._props.filters[0].Filter.push(createResult.itemId);
      break;
    }
  }
  
  logger.success('[MyCustomSPTAKI]: 已加入 SpecialContainerArmband，ID：' + createResult.itemId);
}
