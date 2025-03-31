import {IRagfairConfig} from '@spt/models/spt/config/IRagfairConfig';
import {ILogger} from '@spt/models/spt/utils/ILogger';

export default function applyRagfairConfig(logger:ILogger,ragfairConfig:IRagfairConfig) : void {
  ragfairConfig.dynamic.purchasesAreFoundInRaid = false;

  logger.success('[MyCustomSPTAKI]: ragfairConfig 已调整');
}
