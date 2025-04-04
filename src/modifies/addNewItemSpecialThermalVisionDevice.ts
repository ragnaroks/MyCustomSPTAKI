import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {NewItemFromCloneDetails} from '@spt/models/spt/mod/NewItemDetails';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {CustomItemService} from '@spt/services/mod/CustomItemService';
import {Traders} from '@spt/models/enums/Traders';
import {ItemHelper} from '@spt/helpers/ItemHelper';

const newId: string = '67f65b10352e88d7cb8401b0';

const assortId: string = '67f65b10352e88d7cb8401c0';

export default function addNewItemSpecialThermalVisionDevice(logger: ILogger,customItemService: CustomItemService,itemHelper: ItemHelper,tables: IDatabaseTables) {
  const templateItem = tables.templates.items[ItemTpl.THERMALVISION_T7_THERMAL_GOGGLES_WITH_A_NIGHT_VISION_MOUNT] || null;
  if(!templateItem) {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialThermalVisionDevice，错误：模板物品 THERMALVISION_T7_THERMAL_GOGGLES_WITH_A_NIGHT_VISION_MOUNT 不存在');
    return;
  }

  const newItem: NewItemFromCloneDetails = {
    itemTplToClone: ItemTpl.THERMALVISION_T7_THERMAL_GOGGLES_WITH_A_NIGHT_VISION_MOUNT,
    newId: newId,
    parentId: BaseClasses.THERMAL_VISION,
    fleaPriceRoubles: 125_0000,
    handbookPriceRoubles: 100_0000,
    handbookParentId: '5b5f749986f774094242f199',
    locales: {
      en: {
        name: 'special thermal vision goggles',
        shortName: 'STVG',
        description: 'special thermal vision goggles'
      },
      ch: {
        name: '特制热成像',
        shortName: '热成像',
        description: '特制热成像'
      }
    },
    overrideProperties: {
      CanSellOnRagfair: true,
      CanRequireOnRagfair: false,
      BackgroundColor: 'red',
      ExamineExperience: 100,
      LootExperience: 100,
      Height: 1,
      Width: 1,
      Rarity: 'Superrare',
      RarityPvE: 'Superrare',
      NoiseIntensity: 0,
      NoiseScale: 0,
      DiffuseIntensity: 0,
      IsNoisy: false,
      IsMotionBlurred: false,
      IsFpsStuck: false,
      IsPixelated: false,
      IsGlitch: false,
      Mask: 'Anvis',
      MaskSize: 2,
      DepthFade: 0,
      RoughnessCoef: 0,
      SpecularCoef: 1.5,
      MainTexColorCoef: 0.6,
      MinimumTemperatureValue: 0.2,
      RampShift: 0,
      HeatMin: 0,
      ColdMax: 0
    }
  };

  const createResult = customItemService.createItemFromClone(newItem);
  if(!createResult.success) {
    logger.error('[MyCustomSPTAKI]: 未加入 SpecialThermalVisionDevice，错误：' + createResult.errors.join('、'));
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

  const template = tables.templates.items[ItemTpl.MOUNT_PVS7_WILCOX_ADAPTER] || null;
  if(template && template._props.Slots && template._props.Slots.length > 0) {
    for(const slot of template._props.Slots) {
      if(slot._name !== 'mod_nvg') {continue;}
      if(!slot._props.filters[0].Filter.includes(ItemTpl.THERMALVISION_T7_THERMAL_GOGGLES_WITH_A_NIGHT_VISION_MOUNT)) {continue;}
      slot._props.filters[0].Filter.push(createResult.itemId);
      break;
    }
  }

  logger.success('[MyCustomSPTAKI]: 已加入 SpecialThermalVisionDevice，ID：' + createResult.itemId);
}
