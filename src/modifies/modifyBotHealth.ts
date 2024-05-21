import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';

export default function modifyBotHealth(logger:ILogger,tables: IDatabaseTables) {
  for(const botType in tables.bots.types) {
    if(botType === 'test') {continue;}
    const character = tables.bots.types[botType];
    for(const bodyPartItem of character.health.BodyParts) {
      //bodyPartItem.Head.max *= 2;
      //bodyPartItem.Head.min *= 2;
      bodyPartItem.Chest.max *= 2;
      bodyPartItem.Chest.min *= 2;
      bodyPartItem.Stomach.max *= 2;
      bodyPartItem.Stomach.min *= 2;
      bodyPartItem.LeftArm.max *= 2;
      bodyPartItem.LeftArm.min *= 2;
      bodyPartItem.RightArm.max *= 2;
      bodyPartItem.RightArm.min *= 2;
      bodyPartItem.LeftLeg.max *= 2;
      bodyPartItem.LeftLeg.min *= 2;
      bodyPartItem.RightLeg.max *= 2;
      bodyPartItem.RightLeg.min *= 2;
    }
  }
  logger.success('[MyCustomSPTAKI]: AI ' + Object.keys(tables.bots.types).join('/') + ' 已获得 2 倍生命值');
}
