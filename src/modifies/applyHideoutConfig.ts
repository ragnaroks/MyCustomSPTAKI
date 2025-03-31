import {IHideoutConfig} from '@spt/models/spt/config/IHideoutConfig';
import {ILogger} from '@spt/models/spt/utils/ILogger';

export default function applyHideoutConfig(logger:ILogger,hideoutConfig:IHideoutConfig) : void {
  // 建筑时间
  hideoutConfig.overrideBuildTimeSeconds = 60;

  // 生产时间
  hideoutConfig.overrideCraftTimeSeconds = 60;
  
  // 仪式圈时间
  hideoutConfig.cultistCircle.craftTimeOverride = 60;
  
  logger.success('[MyCustomSPTAKI]: hideoutConfig 已调整');
}
