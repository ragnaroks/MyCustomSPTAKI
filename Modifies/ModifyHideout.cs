using System;
using System.Threading.Tasks;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Models.Logging;
using SPTarkov.Server.Core.Models.Spt.Config;
using SPTarkov.Server.Core.Models.Spt.Logging;
using SPTarkov.Server.Core.Models.Utils;
using SPTarkov.Server.Core.Servers;

namespace MyCustomSPTAKI.Modifies;

[Injectable(InjectionType.Scoped, null, OnLoadOrder.PostDBModLoader + 1)]
public class ModifyHideout : IOnLoad {
    private ISptLogger<ModifyHideout> Logger { get; }
    private ConfigServer ConfigServer { get; }

#pragma warning disable IDE0290 // 使用主构造函数    
    public ModifyHideout (ISptLogger<ModifyHideout> logger, ConfigServer configServer) {
        this.Logger = logger;
        this.ConfigServer = configServer;
    }
#pragma warning restore IDE0290 // 使用主构造函数

    public Task OnLoad () {
        HideoutConfig hideoutConfig = this.ConfigServer.GetConfig<HideoutConfig>();

        hideoutConfig.OverrideBuildTimeSeconds = 15;
        hideoutConfig.OverrideCraftTimeSeconds = 15;

        hideoutConfig.CultistCircle.CraftTimeOverride = 15;
        hideoutConfig.CultistCircle.HideoutTaskRewardTimeSeconds = 15;

        this.Logger.Log(
            LogLevel.Info,
            String.Concat(Constants.LoggerPrefix, "ModifyHideout.OnLoad() / success"),
            LogTextColor.Green
        );
        return Task.CompletedTask;
    }
}
