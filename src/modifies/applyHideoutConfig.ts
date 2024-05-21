import {IHideoutConfig} from '@spt/models/spt/config/IHideoutConfig';
import {ILogger} from '@spt/models/spt/utils/ILogger';

export default function applyHideoutConfig(logger:ILogger,hideoutConfig:IHideoutConfig) : void {
  hideoutConfig.overrideBuildTimeSeconds = 60;
  
  // 仪式圈（当你在藏身处时）可以通过控制台 reload 命令跳过
  hideoutConfig.cultistCircle.hideoutTaskRewardTimeSeconds = 15;
  for (const element of hideoutConfig.cultistCircle.craftTimeThreshholds) {
    element.craftTimeSeconds = 25;
  }

  logger.success('[MyCustomSPTAKI]: hideoutConfig 已调整');
}
