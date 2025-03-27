import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';

export default function modifyBotHealth(logger:ILogger,tables: IDatabaseTables) {
  for(const botType in tables.bots.types) {
    if(botType === 'test') {continue;}
    const character = tables.bots.types[botType];
    for(const bodyPartItem of character.health.BodyParts) {
      //bodyPartItem.Head.max *= 2;
      //bodyPartItem.Head.min *= 2;
      bodyPartItem.Chest.max *= 5;
      bodyPartItem.Chest.min *= 5;
      bodyPartItem.Stomach.max *= 3;
      bodyPartItem.Stomach.min *= 3;
      bodyPartItem.LeftArm.max *= 3;
      bodyPartItem.LeftArm.min *= 3;
      bodyPartItem.RightArm.max *= 3;
      bodyPartItem.RightArm.min *= 3;
      bodyPartItem.LeftLeg.max *= 3;
      bodyPartItem.LeftLeg.min *= 3;
      bodyPartItem.RightLeg.max *= 3;
      bodyPartItem.RightLeg.min *= 3;
    }
  }
  logger.success('[MyCustomSPTAKI]: AI ' + Object.keys(tables.bots.types).join('/') + ' 已获得 3 倍生命值');
}
