import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';

export default function modifyBaseClassSecureContainer(logger:ILogger,itemHelper:ItemHelper,tables:IDatabaseTables) : void {
  const idArray = itemHelper.getItemTplsOfBaseType(BaseClasses.MOB_CONTAINER);
  for(const id of idArray) {
    if(id===ItemTpl.SECURE_CONTAINER_BOSS){continue;}
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    template._props.mousePenalty = 0;
    template._props.speedPenaltyPercent = 0;
    template._props.weaponErgonomicPenalty = 0;
    const grids = template._props.Grids;
    if(!grids || grids.length < 1) {continue;}
    for(const grid of grids) {
      grid._props.filters = [
        {
          ExcludedFilter:[BaseClasses.MOB_CONTAINER],
          Filter:[BaseClasses.ITEM]
        }
      ];
    }
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.MOB_CONTAINER 已调整');
}
