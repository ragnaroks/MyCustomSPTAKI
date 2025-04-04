import {ISptProfile} from '@spt/models/eft/profile/ISptProfile';
import {ILogger} from '@spt/models/spt/utils/ILogger';

export default function modifyPlayerHealth(logger:ILogger,profiles: Record<string,ISptProfile>,scale:number) {
  if(scale<=0){return;}
  for(const key in profiles) {
    const profile = profiles[key];
    const character = profile.characters.pmc;
    character.Health.Hydration.Maximum = 175;
    character.Health.Energy.Maximum = 150;
    character.Health.BodyParts.Head.Health.Maximum = 35 * 10 * scale;
    character.Health.BodyParts.Chest.Health.Maximum = 85 * 10 * scale;
    // 建议搭配 持续治疗mod 否则很繁琐
    character.Health.BodyParts.Stomach.Health.Maximum = 70 * scale;
    character.Health.BodyParts.LeftArm.Health.Maximum = 60 * scale;
    character.Health.BodyParts.RightArm.Health.Maximum = 60 * scale;
    character.Health.BodyParts.LeftLeg.Health.Maximum = 65 * scale;
    character.Health.BodyParts.RightLeg.Health.Maximum = 65 * scale;
    logger.warning('[MyCustomSPTAKI]: 玩家 <' + profile.info.username + '> 已获得 '+scale+' 倍生命值');
  }
  logger.success('[MyCustomSPTAKI]: 玩家生命值已调整');
}
