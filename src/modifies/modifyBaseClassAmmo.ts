import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';
import {ItemTpl} from '@spt/models/enums/ItemTpl';

export default function modifyBaseClassAmmo(logger: ILogger,itemHelper: ItemHelper,tables: IDatabaseTables): void {
  const idArray = itemHelper.getItemTplsOfBaseType(BaseClasses.AMMO);
  for(const id of idArray) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    //template._props.CanSellOnRagfair = true;
    template._props.StackMaxSize = 9600;
    template._props.DurabilityBurnModificator = 0.01;
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.AMMO 已调整');

  const glArray = [
    ItemTpl.AMMO_40X46_M381,ItemTpl.AMMO_40X46_M386,ItemTpl.AMMO_40X46_M406,ItemTpl.AMMO_40X46_M433,
    ItemTpl.AMMO_40X46_M441,ItemTpl.AMMO_40X46_M576,ItemTpl.AMMO_40MMRU_VOG25
  ];
  for(const id of glArray) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    //template._props.CanSellOnRagfair = true;
    template._props.FuzeArmTimeSec = 0.04;
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.AMMO 枪榴弹已调整');
}
