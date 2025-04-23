import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';
import {Traders} from '@spt/models/enums/Traders';
import {ItemHelper} from '@spt/helpers/ItemHelper';

const newId: string = '67f65b10352e88d7cb8401e0';

const assortId: string = '67f65b10352e88d7cb8401f0';

export default function addNewItemSpecialNightVisionDevice(logger: ILogger,customItemService: CustomItemService,itemHelper: ItemHelper,tables: IDatabaseTables) {
  const templateItem = tables.templates.items[ItemTpl.NIGHTVISION_L3HARRIS_GPNVG18_NIGHT_VISION_GOGGLES] || null;
  if(!templateItem) {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialNightVisionDevice，错误：模板物品 NIGHTVISION_L3HARRIS_GPNVG18_NIGHT_VISION_GOGGLES 不存在');
    return;
  }

  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.NIGHTVISION_L3HARRIS_GPNVG18_NIGHT_VISION_GOGGLES,
    newId: newId,
    parentId: BaseClasses.NIGHTVISION,
    fleaPriceRoubles: 125_0000,
    handbookPriceRoubles: 100_0000,
    handbookParentId: '5b5f749986f774094242f199',
    locales: {
      en: {
        name: 'special night vision goggles',
        shortName: 'SNVG',
        description: 'special night vision goggles'
      },
      ch: {
        name: '特制夜视仪',
        shortName: '夜视仪',
        description: '特制夜视仪'
      }
    },
    overrideProperties: {
      CanSellOnRagfair: false,
      BackgroundColor: 'red',
      ExamineExperience: 100,
      LootExperience: 100,
      Height: 1,
      Width: 1,
      Rarity: 'Superrare',
      RarityPvE: 'Superrare',
      NoiseIntensity: 0,
      NoiseScale: 0,
      Color: {r: 150,g: 214,b: 240,a: 0},
      Intensity: 1.618,
      DiffuseIntensity: 0,
      IsNoisy: false,
      IsMotionBlurred: false,
      IsFpsStuck: false,
      IsPixelated: false,
      IsGlitch: false,
      Mask: 'Anvis',
      MaskSize: 2
    }
  };

  const createResult = customItemService.createItemFromClone(newItem);
  if(!createResult.success) {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialNightVisionDevice，错误：' + createResult.errors.join('、'));
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

  const idArray = itemHelper.getItemTplsOfBaseType(BaseClasses.HEADWEAR);
  for(const id of idArray) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    if(!template._props.Slots || template._props.Slots.length < 1) {continue;}
    for(const slot of template._props.Slots) {
      if(slot._name !== 'mod_nvg') {continue;}
      if(!slot._props.filters[0].Filter.includes(ItemTpl.NIGHTVISION_L3HARRIS_GPNVG18_NIGHT_VISION_GOGGLES)) {continue;}
      slot._props.filters[0].Filter.push(createResult.itemId);
      break;
    }
  }

  const template = tables.templates.items[ItemTpl.MOUNT_PVS7_WILCOX_ADAPTER] || null;
  if(template && template._props.Slots && template._props.Slots.length > 0) {
    for(const slot of template._props.Slots) {
      if(slot._name !== 'mod_nvg') {continue;}
      if(!slot._props.filters[0].Filter.includes(ItemTpl.THERMALVISION_T7_THERMAL_GOGGLES_WITH_A_NIGHT_VISION_MOUNT)) {continue;}
      slot._props.filters[0].Filter.push(createResult.itemId);
      break;
    }
  }

  logger.success('[MyCustomSPTAKI]: 已加入 SpecialNightVisionDevice，ID：' + createResult.itemId);
}
