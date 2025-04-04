import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';

export default function modifyBaseClassThermalVision(logger:ILogger,itemHelper:ItemHelper,tables:IDatabaseTables) : void {
  const idArray = itemHelper.getItemTplsOfBaseType(BaseClasses.THERMAL_VISION);
  for(const id of idArray) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    //template._props.CanSellOnRagfair = true;
    template._props.NoiseIntensity = 0.0;
    template._props.NoiseScale = 0.0;
    template._props.IsNoisy = false;
    template._props.IsMotionBlurred = false;
    template._props.IsFpsStuck = false;
    template._props.IsPixelated = false;
    template._props.IsGlitch = false;
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.THERMAL_VISION 已调整');
}
