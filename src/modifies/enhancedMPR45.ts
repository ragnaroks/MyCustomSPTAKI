import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';
import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {BaseClasses} from '@spt/models/enums/BaseClasses';

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

  const hkmfi = tables.templates.items[ItemTpl.MOUNT_HK_MP5_MFI_HK_UNIVERSAL_LOW_PROFILE_SCOPE] || null;
  if(!hkmfi){
    logger.error('[MyCustomSPTAKI]: 未调整 MPR45，错误：模板物品 MOUNT_HK_MP5_MFI_HK_UNIVERSAL_LOW_PROFILE_SCOPE 不存在');
    return;
  }

  lt101._props.Slots[0]._props.filters[0].Filter.push(
    ItemTpl.MOUNT_LARUE_LT101_QD_TACTICAL_PICATINNY_RISER,
    ItemTpl.MOUNT_HK_MP5_MFI_HK_UNIVERSAL_LOW_PROFILE_SCOPE
  );

  hkmfi._props.Slots[0]._props.filters[0].Filter.push(
    ItemTpl.MOUNT_LARUE_LT101_QD_TACTICAL_PICATINNY_RISER,
    ItemTpl.MOUNT_HK_MP5_MFI_HK_UNIVERSAL_LOW_PROFILE_SCOPE
  );

  mpr45._props.Slots[0]._props.filters[0].Filter.push(
    ItemTpl.MOUNT_LARUE_LT101_QD_TACTICAL_PICATINNY_RISER,
    ItemTpl.MOUNT_HK_MP5_MFI_HK_UNIVERSAL_LOW_PROFILE_SCOPE,
    ItemTpl.MOUNT_HARTMAN_LENOK_70MM_RAIL
  );

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

  /*
  const bravo4 = tables.templates.items[ItemTpl.ASSAULTSCOPE_SIG_SAUER_BRAVO4_4X30_SCOPE] || null;
  if(bravo4){
    for (const slot of bravo4._props.Slots) {
      if(slot._name!=='mod_scope'){continue;}
      slot._props.filters[0].Filter.push(
        ItemTpl.COLLIMATOR_VOMZ_PILAD_P1X42_WEAVER_REFLEX_SIGHT,
        ItemTpl.COLLIMATOR_WALTHER_MRS_REFLEX_SIGHT,
        ItemTpl.COMPACTCOLLIMATOR_BELOMO_PK06_REFLEX_SIGHT,
        ItemTpl.COLLIMATOR_TRIJICON_SRS02_REFLEX_SIGHT,
        ItemTpl.COLLIMATOR_LEAPERS_UTG_REFLEX_SIGHT,
      );
      break;
    }
  }
  */

  logger.success('[MyCustomSPTAKI]: 已调整 MPR45 侧轨');
}
