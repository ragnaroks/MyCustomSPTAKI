import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';

export default function applyInsuranceConfig(logger:ILogger,tables:IDatabaseTables) : void {
  for(const traderKey of Object.keys(tables.traders)) {
    const trader = tables.traders[traderKey] || null;
    if(!trader || !trader.base.insurance.availability) {continue;}
    trader.base.insurance.max_return_hour = 2;
    trader.base.insurance.min_return_hour = 1;
    trader.base.insurance.max_storage_time = 144;
  }

  logger.success('[MyCustomSPTAKI]: 保险配置 已调整');
}
