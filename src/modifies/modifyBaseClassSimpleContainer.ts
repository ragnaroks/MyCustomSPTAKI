import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';

export default function modifyBaseClassSimpleContainer(logger:ILogger,itemHelper:ItemHelper,tables:IDatabaseTables) : void {
  const idArray = [
    ItemTpl.CONTAINER_AMMUNITION_CASE,
    ItemTpl.CONTAINER_BALLISTIC_PLATE_CASE,
    //ItemTpl.CONTAINER_DOCUMENTS_CASE,
    ItemTpl.CONTAINER_DOGTAG_CASE,
    //ItemTpl.CONTAINER_GINGY_KEYCHAIN,
    ItemTpl.CONTAINER_GRENADE_CASE,
    //ItemTpl.CONTAINER_INJECTOR_CASE,
    ItemTpl.CONTAINER_ITEM_CASE,
    //ItemTpl.CONTAINER_KEY_TOOL,
    //ItemTpl.CONTAINER_KEYCARD_HOLDER_CASE,
    ItemTpl.CONTAINER_MAGAZINE_CASE,
    ItemTpl.CONTAINER_MEDICINE_CASE,
    ItemTpl.CONTAINER_MONEY_CASE,
    ItemTpl.CONTAINER_MR_HOLODILNICK_THERMAL_BAG,
    ItemTpl.CONTAINER_SICC,
    //ItemTpl.CONTAINER_STREAMER_ITEM_CASE,
    ItemTpl.CONTAINER_WEAPON_CASE,
    //ItemTpl.CONTAINER_SIMPLE_WALLET,
    //ItemTpl.CONTAINER_WZ_WALLET,
  ];

  for(const id of idArray) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    //template._props.CanSellOnRagfair = true;
    template._props.Weight = 0;
    template._props.Width = 1;
    template._props.Height = 1;
    template._props.Grids[0]._props.cellsH = 14;
    template._props.Grids[0]._props.cellsV = 14;
  }

  const idArray2 = [
    ItemTpl.CONTAINER_LUCKY_SCAV_JUNK_BOX,//3.12 的时候移到上面去
    //ItemTpl.CONTAINER_THICC_ITEM_CASE, 3.12 的时候再应用
    //ItemTpl.CONTAINER_THICC_WEAPON_CASE, 3.12 的时候再应用
  ];

  for(const id of idArray2) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    template._props.CanSellOnRagfair = true;
    template._props.Weight = 0;
    //template._props.Width = 2; 3.12 的时候再应用
    //template._props.Height = 2; 3.12 的时候再应用
    template._props.Grids[0]._props.cellsH = 24;
    template._props.Grids[0]._props.cellsV = 14;
  }

  const itemCase = tables.templates.items[ItemTpl.CONTAINER_ITEM_CASE] || null;
  if(itemCase){
    for (const grid of itemCase._props.Grids) {
      for (const filter of grid._props.filters) {
        filter.Filter = [BaseClasses.ITEM];
        filter.ExcludedFilter = [
          BaseClasses.MOB_CONTAINER,
          ItemTpl.CONTAINER_ITEM_CASE,
          ItemTpl.CONTAINER_THICC_ITEM_CASE,
          ItemTpl.CONTAINER_THICC_WEAPON_CASE,
          ItemTpl.CONTAINER_LUCKY_SCAV_JUNK_BOX
        ];
      }
    }
  }

  const thiccItemCase = tables.templates.items[ItemTpl.CONTAINER_THICC_ITEM_CASE] || null;
  if(itemCase){
    for (const grid of itemCase._props.Grids) {
      for (const filter of grid._props.filters) {
        filter.Filter = [BaseClasses.ITEM];
        filter.ExcludedFilter = [
          BaseClasses.MOB_CONTAINER,
          ItemTpl.CONTAINER_THICC_ITEM_CASE,
          ItemTpl.CONTAINER_THICC_WEAPON_CASE
        ];
      }
    }
  }

  logger.success('[MyCustomSPTAKI]: BaseClasses.SIMPLE_CONTAINER 已调整');
}
