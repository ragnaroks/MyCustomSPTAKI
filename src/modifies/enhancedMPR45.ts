import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';
import {ItemTpl} from '@spt/models/enums/ItemTpl';

export default function enhancedMPR45(logger:ILogger,itemHelper:ItemHelper,tables: IDatabaseTables): void {
  const mpr45 = tables.templates.items[ItemTpl.MOUNT_NCSTAR_MPR45_BACKUP] || null;
  if(!mpr45){
    logger.error('[MyCustomSPTAKI]: 未调整 MPR45，错误：模板物品 MOUNT_NCSTAR_MPR45_BACKUP 不存在');
    return;
  }
  const lt101 = tables.templates.items[ItemTpl.MOUNT_LARUE_LT101_QD_TACTICAL_PICATINNY_RISER] || null;
  if(!lt101){
    logger.error('[MyCustomSPTAKI]: 未调整 MPR45，错误：模板物品 MOUNT_LARUE_LT101_QD_TACTICAL_PICATINNY_RISER 不存在');
    return;
  }

  for (const id in tables.templates.items) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    if(!template._props.Slots || template._props.Slots.length<1){continue;}
    for (const slot of template._props.Slots) {
      switch(slot._name){
        case 'mod_sight_front':
        case 'mod_sight_rear':
          slot._props.filters[0].Filter.push(ItemTpl.MOUNT_NCSTAR_MPR45_BACKUP);
          break;
        default:break;
      }
      
    }
  }

  mpr45._props.Slots[0]._props.filters[0].Filter.push(ItemTpl.MOUNT_LARUE_LT101_QD_TACTICAL_PICATINNY_RISER);

  logger.success('[MyCustomSPTAKI]: 已调整 MPR45 侧轨');
}
