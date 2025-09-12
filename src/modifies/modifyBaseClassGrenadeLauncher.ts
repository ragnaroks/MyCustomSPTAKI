import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';
import {ItemTpl} from '@spt/models/enums/ItemTpl';

export default function modifyBaseClassGrenadeLauncher(logger:ILogger,itemHelper:ItemHelper,tables:IDatabaseTables) : void {
  //const idArray = itemHelper.getItemTplsOfBaseType(BaseClasses.GRENADE_LAUNCHER);
  const idArray = [
    ItemTpl.LAUNCHER_GP25_KOSTYOR_40MM_UNDERBARREL_GRENADE,
    ItemTpl.LAUNCHER_M203_40MM_UNDERBARREL_GRENADE,
    ItemTpl.GRENADELAUNCHER_FN40GL_01,
    ItemTpl.REVOLVER_MILKOR_M32A1_MSGL_40MM_GRENADE_LAUNCHER
  ];
  for(const id of idArray) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    //template._props.CanSellOnRagfair = true;
    template._props.AllowJam = false;
    template._props.AllowFeed = false;
    template._props.AllowMisfire = false;
    template._props.AllowSlide = false;
    template._props.AllowOverheat = false;
    template._props.Ergonomics = 100;
    for(const container of template._props.Chambers) {
      container._props.filters[0].Filter = [
        ItemTpl.AMMO_40X46_M381,
        ItemTpl.AMMO_40X46_M386,
        ItemTpl.AMMO_40X46_M406,
        ItemTpl.AMMO_40X46_M433,
        ItemTpl.AMMO_40X46_M441,
        ItemTpl.AMMO_40X46_M576,
        ItemTpl.AMMO_40X46_M716,
        ItemTpl.AMMO_40MMRU_VOG25
      ];
    }
  }

  const mag_msgl_milkor_cylinder_mag_std_40x46_6 = tables.templates.items[ItemTpl.MAGAZINE_40X46_MSGL_0RND] || null;
  if(mag_msgl_milkor_cylinder_mag_std_40x46_6 !== null) {
    for(const cartridges of mag_msgl_milkor_cylinder_mag_std_40x46_6._props.Cartridges) {
      cartridges._props.filters[0].Filter.push(ItemTpl.AMMO_40MMRU_VOG25);
    }
    for(const slot of mag_msgl_milkor_cylinder_mag_std_40x46_6._props.Slots) {
      slot._props.filters[0].Filter.push(ItemTpl.AMMO_40MMRU_VOG25);
    }
  }

  logger.success('[MyCustomSPTAKI]: BaseClasses.GRENADE_LAUNCHER 已调整');
}
