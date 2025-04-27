import {ISptProfile} from '@spt/models/eft/profile/ISptProfile';
import {ILogger} from '@spt/models/spt/utils/ILogger';

export default function modifyPlayerHealth(logger:ILogger,profiles: Record<string,ISptProfile>,health:Array<number>) {
  if(health.length<5){return;}
  if(health.find(x=>x<1)){return;}
  for(const key in profiles) {
    const profile = profiles[key];
    const character = profile.characters.pmc;
    character.Health.Hydration.Maximum = 175;
    character.Health.Energy.Maximum = 150;
    // 建议搭配 持续治疗mod 否则很繁琐
    character.Health.BodyParts.Head.Health.Maximum = health[0];
    character.Health.BodyParts.Chest.Health.Maximum = health[1];
    character.Health.BodyParts.Stomach.Health.Maximum = health[2];
    character.Health.BodyParts.LeftArm.Health.Maximum = health[3];
    character.Health.BodyParts.RightArm.Health.Maximum = health[3];
    character.Health.BodyParts.LeftLeg.Health.Maximum = health[4];
    character.Health.BodyParts.RightLeg.Health.Maximum = health[4];
    logger.warning('[MyCustomSPTAKI]: 玩家 <' + profile.info.username + '> 已获得 '+JSON.stringify(health)+' 生命值');
  }
  logger.success('[MyCustomSPTAKI]: 玩家生命值已调整');
}
