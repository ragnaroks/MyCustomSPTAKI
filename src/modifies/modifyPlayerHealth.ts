import {ISptProfile} from '@spt/models/eft/profile/ISptProfile';
import {ILogger} from '@spt/models/spt/utils/ILogger';

export default function modifyPlayerHealth(logger:ILogger,profiles: Record<string,ISptProfile>) {
  for(const key in profiles) {
    const profile = profiles[key];
    const character = profile.characters.pmc;
    character.Health.Hydration.Maximum = 175;
    character.Health.Energy.Maximum = 150;
    character.Health.BodyParts.Head.Health.Maximum = 5000;
    // 建议搭配 持续治疗mod 否则很繁琐
    character.Health.BodyParts.Chest.Health.Maximum = 255;
    character.Health.BodyParts.Stomach.Health.Maximum = 210;
    character.Health.BodyParts.LeftArm.Health.Maximum = 180;
    character.Health.BodyParts.RightArm.Health.Maximum = 180;
    character.Health.BodyParts.LeftLeg.Health.Maximum = 195;
    character.Health.BodyParts.RightLeg.Health.Maximum = 195;
    logger.warning('[MyCustomSPTAKI]: 玩家 <' + profile.info.username + '> 已获得 5000 点头部生命值');
  }
  logger.success('[MyCustomSPTAKI]: 玩家生命值已调整');
}
