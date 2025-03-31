import {BaseClasses} from '@spt/models/enums/BaseClasses';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {ItemHelper} from '@spt/helpers/ItemHelper';

export default function modifyBaseClassLockableContainer(logger:ILogger,itemHelper:ItemHelper,tables:IDatabaseTables) : void {
  const idArray = itemHelper.getItemTplsOfBaseType(BaseClasses.LOCKABLE_CONTAINER);
  for(const id of idArray) {
    const template = tables.templates.items[id] || null;
    if(!template || template._type !== "Item") {continue;}
    template._props.Weight = 0;
  }
  logger.success('[MyCustomSPTAKI]: BaseClasses.LOCKABLE_CONTAINER 已调整');
}
