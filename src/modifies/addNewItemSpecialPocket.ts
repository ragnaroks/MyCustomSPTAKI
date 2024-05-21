import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';

export default function addNewItemSpecialPocket(logger:ILogger,customItemService:CustomItemService,tables: IDatabaseTables) {
  const newId: string = '67d8cf554af778ed3f60478d';
  
  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.POCKETS_1X4_SPECIAL,
    newId: newId,
    parentId: BaseClasses.POCKETS,
    fleaPriceRoubles: 0,
    handbookPriceRoubles: 0,
    handbookParentId: '',
    locales: {
      en: {
        name: 'special pocket',
        shortName: 'SP',
        description: 'special pocket'
      },
      ch: {
        name: '特制口袋',
        shortName: 'SP 口袋',
        description: '特制口袋'
      }
    },
    overrideProperties: {
      CanSellOnRagfair: false,
      Weight: 0,
      Grids: [
        {
          _id: '67d8cf554af778ed3f604790',
          _name: 'pocket1',
          _parent: newId,
          _proto: '55d329c24bdc2d892f8b4567',
          _props: {
            cellsH: 1,
            cellsV: 2,
            filters: [
              {
                Filter: [BaseClasses.ITEM],
                ExcludedFilter: [BaseClasses.POCKETS,BaseClasses.MOB_CONTAINER,BaseClasses.MAGAZINE]
              }
            ],
            isSortingTable: false,
            maxCount: 0,
            maxWeight: 0,
            minCount: 0
          }
        },{
          _id: '67d8cf554af778ed3f604791',
          _name: 'pocket2',
          _parent: newId,
          _proto: '55d329c24bdc2d892f8b4567',
          _props: {
            cellsH: 2,
            cellsV: 2,
            filters: [
              {
                Filter: [BaseClasses.ITEM],
                ExcludedFilter: [BaseClasses.POCKETS,BaseClasses.MOB_CONTAINER,BaseClasses.MAGAZINE]
              }
            ],
            isSortingTable: false,
            maxCount: 0,
            maxWeight: 0,
            minCount: 0
          }
        },{
          _id: '67d8cf554af778ed3f604792',
          _name: 'pocket3',
          _parent: newId,
          _proto: '55d329c24bdc2d892f8b4567',
          _props: {
            cellsH: 1,
            cellsV: 2,
            filters: [
              {
                Filter: [BaseClasses.ITEM],
                ExcludedFilter: [BaseClasses.POCKETS,BaseClasses.MOB_CONTAINER,BaseClasses.MAGAZINE]
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
  if(createResult.success) {
    logger.success('[MyCustomSPTAKI]: 已加入 SpecialPocket，ID：' + createResult.itemId);
  } else {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialPocket，错误：' + createResult.errors.join('、'));
  }
}
