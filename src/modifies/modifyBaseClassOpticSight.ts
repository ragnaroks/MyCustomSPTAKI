import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';
import {ItemTpl} from '@spt/models/enums/ItemTpl';

export default function modifyBaseClassOpticSight(logger:ILogger,itemHelper:ItemHelper,tables: IDatabaseTables): void {
  const idArray1 = itemHelper.getItemTplsOfBaseType(BaseClasses.OPTIC_SCOPE);//光学
  const idArray2 = itemHelper.getItemTplsOfBaseType(BaseClasses.ASSAULT_SCOPE);//突击
  const idArray3 = itemHelper.getItemTplsOfBaseType(BaseClasses.SPECIAL_SCOPE);//特种
  for(const id of [...idArray1,...idArray2]) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    template._props.CanSellOnRagfair = true;
    template._props.Ergonomics = -3;
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.OPTIC_SCOPE 已调整');
  logger.success('[MyCustomSPTAKI]: BaseClasses.ASSAULT_SCOPE 已调整');
  for(const id of idArray3) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    template._props.CanSellOnRagfair = true;
    template._props.Ergonomics = -3;
    template._props.IsNoisy = false;
    template._props.IsFpsStuck = false;
    template._props.IsMotionBlurred = false;
    template._props.IsGlitch = false;
    template._props.IsPixelated = false;
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.SPECIAL_SCOPE 已调整');
}
