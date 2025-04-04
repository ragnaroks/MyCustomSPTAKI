import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';

const newId: string = '67d8cf554af778ed3f60478d';

export default function addNewItemSpecialPocket(logger:ILogger,customItemService:CustomItemService,tables: IDatabaseTables) {
  const originItem = tables.templates.items[ItemTpl.POCKETS_1X4_SPECIAL] || null;
  if(!originItem){
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialPocket，错误：模板物品 POCKETS_1X4_SPECIAL 不存在');
    return;
  }
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
      ],
      Slots:[
        {
          _id: '67d8cf554af778ed3f604793',
          _name: 'SpecialSlot1',
          _parent: newId,
          _proto: '55d721144bdc2d89028b456f',
          _required:false,
          _mergeSlotWithChildren:false,
          _props: {
            filters: [
              {
                locked:false,
                Filter: [...originItem._props.Slots[0]._props.filters[0].Filter,'c3419b66b3684cffb0744dff','05eea6795e2e4ced85390ea2','a45acf65633b4e7189bb57c7','67eb1cb18609418ea4389d10']
              }
            ]
          }
        },{
          _id: '67d8cf554af778ed3f604794',
          _name: 'SpecialSlot2',
          _parent: newId,
          _proto: '55d721144bdc2d89028b456f',
          _required:false,
          _mergeSlotWithChildren:false,
          _props: {
            filters: [
              {
                locked:false,
                Filter: [...originItem._props.Slots[0]._props.filters[0].Filter,'c3419b66b3684cffb0744dff','05eea6795e2e4ced85390ea2','a45acf65633b4e7189bb57c7','67eb1cb18609418ea4389d10']
              }
            ]
          }
        },{
          _id: '67d8cf554af778ed3f604795',
          _name: 'SpecialSlot3',
          _parent: newId,
          _proto: '55d721144bdc2d89028b456f',
          _required:false,
          _mergeSlotWithChildren:false,
          _props: {
            filters: [
              {
                locked:false,
                Filter: [...originItem._props.Slots[0]._props.filters[0].Filter,'c3419b66b3684cffb0744dff','05eea6795e2e4ced85390ea2','a45acf65633b4e7189bb57c7','67eb1cb18609418ea4389d10']
              }
            ]
          }
        }
      ]
    }
  };

  const createResult = customItemService.createItemFromClone(newItem);
  if(!createResult.success) {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialPocket，错误：' + createResult.errors.join('、'));
    return;
  }
  
  logger.success('[MyCustomSPTAKI]: 已加入 SpecialPocket，ID：' + createResult.itemId);
}
