import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {BaseClasses} from '@spt/models/enums/BaseClasses';

export default function modifyBaseClassItem(logger:ILogger,tables: IDatabaseTables): void {
  const excludeBaseClassArray:Array<string> = [
    BaseClasses.WEAPON,BaseClasses.PISTOL,BaseClasses.REVOLVER,BaseClasses.SMG,
    BaseClasses.SHOTGUN,BaseClasses.ASSAULT_CARBINE,BaseClasses.ASSAULT_RIFLE,BaseClasses.MARKSMAN_RIFLE,
    BaseClasses.SNIPER_RIFLE,BaseClasses.MACHINE_GUN,BaseClasses.GRENADE_LAUNCHER,BaseClasses.SPECIAL_WEAPON
  ];
  for(const id of Object.keys(tables.templates.items)) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    if(excludeBaseClassArray.includes(template._parent)){continue;}
    //template._props.CanSellOnRagfair = true;
    template._props.Width = 1;
    template._props.Height = 1;
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.ITEM 已调整');
}
