using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Models.Common;
using SPTarkov.Server.Core.Models.Eft.Common.Tables;
using SPTarkov.Server.Core.Models.Logging;
using SPTarkov.Server.Core.Models.Spt.Logging;
using SPTarkov.Server.Core.Models.Utils;
using SPTarkov.Server.Core.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyCustomSPTAKI.Modifies;

[Injectable(InjectionType.Transient, null, OnLoadOrder.PostDBModLoader + 1)]
public class ApplyInsuranceImmediately : IOnLoad {
    private ISptLogger<ApplyInsuranceImmediately> Logger { get; }
    private DatabaseService DatabaseService { get; }

#pragma warning disable IDE0290 // 使用主构造函数    
    public ApplyInsuranceImmediately (ISptLogger<ApplyInsuranceImmediately> logger, DatabaseService databaseService) {
        this.Logger = logger;
        this.DatabaseService = databaseService;
    }
#pragma warning restore IDE0290 // 使用主构造函数

    public Task OnLoad () {
        Dictionary<MongoId, Trader> traders = this.DatabaseService.GetTraders();
        foreach (KeyValuePair<MongoId, Trader> keyValuePair in traders) {
            TraderInsurance? insurance = keyValuePair.Value.Base.Insurance;
            if (insurance is null || insurance.Availability is false) { continue; }
            insurance.MaxReturnHour = 0;
            insurance.MinReturnHour = 0;
            insurance.MaxStorageTime = 168;
        }        

        this.Logger.Log(
            LogLevel.Info,
            String.Concat(Constants.LoggerPrefix, "ApplyInsuranceImmediately.OnLoad() / success"),
            LogTextColor.Green
        );
        return Task.CompletedTask;
    }
}
