import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';

export default function modifyBotHealth(logger: ILogger,tables: IDatabaseTables,scale: number) {
  if(scale <= 0) {return;}
  for(const botType in tables.bots.types) {
    if(botType === 'test') {continue;}
    const character = tables.bots.types[botType];
    let multiple = botType.startsWith('boss') ? scale * 2 : scale;
    for(const bodyPartItem of character.health.BodyParts) {
      //bodyPartItem.Head.max *= multiple;
      //bodyPartItem.Head.min *= multiple;
      bodyPartItem.Chest.max *= multiple;
      bodyPartItem.Chest.min *= multiple;
      bodyPartItem.Stomach.max *= multiple;
      bodyPartItem.Stomach.min *= multiple;
      bodyPartItem.LeftArm.max *= multiple;
      bodyPartItem.LeftArm.min *= multiple;
      bodyPartItem.RightArm.max *= multiple;
      bodyPartItem.RightArm.min *= multiple;
      bodyPartItem.LeftLeg.max *= multiple;
      bodyPartItem.LeftLeg.min *= multiple;
      bodyPartItem.RightLeg.max *= multiple;
      bodyPartItem.RightLeg.min *= multiple;
    }
    logger.success('[MyCustomSPTAKI]: AI [' + botType + '] 已获得 ' + multiple + ' 倍生命值');
  }
}
