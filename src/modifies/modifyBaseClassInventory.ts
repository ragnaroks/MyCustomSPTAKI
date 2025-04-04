import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';

export default function modifyBaseClassInventory(logger:ILogger,itemHelper:ItemHelper,tables: IDatabaseTables): void {
  const idArray = itemHelper.getItemTplsOfBaseType(BaseClasses.INVENTORY);
  const glArray = [
    ItemTpl.REVOLVER_MILKOR_M32A1_MSGL_40MM_GRENADE_LAUNCHER,
    ItemTpl.GRENADELAUNCHER_FN40GL_01,
    //ItemTpl.GRENADELAUNCHER_FN40GL_02,
    //ItemTpl.GRENADELAUNCHER_FN40GL_03
  ];
  for(const id of idArray) {
    const template = tables.templates.items[id] || null;
    if(!template) {continue;}
    template._props.CanSellOnRagfair = false;
    for(const slot of template._props.Slots) {
      if(slot._name !== 'Holster') {continue;}
      slot._props.filters[0].Filter.push(...glArray);
    }
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.INVENTORY 已调整');
}
