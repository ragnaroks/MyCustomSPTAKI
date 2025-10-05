import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';

export default function modifyBaseClassInventory(logger:ILogger,itemHelper:ItemHelper,tables: IDatabaseTables): void {
  const idArray = itemHelper.getItemTplsOfBaseType(BaseClasses.INVENTORY);
  
  for(const id of idArray) {
    const template = tables.templates.items[id] || null;
    if(!template) {continue;}
    template._props.CanSellOnRagfair = false;
    for(const slot of template._props.Slots) {
      if(slot._name !== 'Holster') {continue;}
      slot._props.filters[0].Filter.push(
        '68e26eec9e772862f63f5600',//SGL
        ItemTpl.REVOLVER_MILKOR_M32A1_MSGL_40MM_GRENADE_LAUNCHER,
        ItemTpl.GRENADELAUNCHER_FN40GL_01
      );
    }
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.INVENTORY 已调整');
}
