import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';

export default function modifyBotHealth(logger:ILogger,tables: IDatabaseTables,scale:number) {
  if(scale<=0){return;}
  for(const botType in tables.bots.types) {
    if(botType === 'test') {continue;}
    const character = tables.bots.types[botType];
    for(const bodyPartItem of character.health.BodyParts) {
      //bodyPartItem.Head.max *= 2;
      //bodyPartItem.Head.min *= 2;
      bodyPartItem.Chest.max *= scale;
      bodyPartItem.Chest.min *= scale;
      bodyPartItem.Stomach.max *= scale;
      bodyPartItem.Stomach.min *= scale;
      bodyPartItem.LeftArm.max *= scale;
      bodyPartItem.LeftArm.min *= scale;
      bodyPartItem.RightArm.max *= scale;
      bodyPartItem.RightArm.min *= scale;
      bodyPartItem.LeftLeg.max *= scale;
      bodyPartItem.LeftLeg.min *= scale;
      bodyPartItem.RightLeg.max *= scale;
      bodyPartItem.RightLeg.min *= scale;
    }
  }
  logger.success('[MyCustomSPTAKI]: AI ' + Object.keys(tables.bots.types).join('/') + ' 已获得 '+scale+' 倍生命值');
}
