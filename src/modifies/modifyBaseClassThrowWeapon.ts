import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';

export default function modifyBaseClassThrowWeapon(logger:ILogger,itemHelper:ItemHelper,tables: IDatabaseTables): void {
  const idArray = itemHelper.getItemTplsOfBaseType(BaseClasses.THROW_WEAPON);
  for(const id of idArray) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    //template._props.CanSellOnRagfair = true;
    //template._props.MinTimeToContactExplode = 0.04; //碰撞引信时间
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.THROW_WEAPON 已调整');
}
