using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Models.Logging;
using SPTarkov.Server.Core.Models.Spt.Config;
using SPTarkov.Server.Core.Models.Spt.Logging;
using SPTarkov.Server.Core.Models.Utils;
using SPTarkov.Server.Core.Servers;
using System;
using System.Threading.Tasks;

namespace MyCustomSPTAKI.Modifies;

[Injectable(InjectionType.Scoped, null, OnLoadOrder.PostDBModLoader + 1)]
public class ModifyLostOnDeathConfig : IOnLoad {
    private ISptLogger<ModifyLostOnDeathConfig> Logger { get; }
    private ConfigServer ConfigServer { get; }

#pragma warning disable IDE0290 // 使用主构造函数    
    public ModifyLostOnDeathConfig (ISptLogger<ModifyLostOnDeathConfig> logger, ConfigServer configServer) {
        this.Logger = logger;
        this.ConfigServer = configServer;
    }
#pragma warning restore IDE0290 // 使用主构造函数

    public Task OnLoad () {
        LostOnDeathConfig lostOnDeathConfig = this.ConfigServer.GetConfig<LostOnDeathConfig>();
        //lostOnDeathConfig.QuestItems = false;
        lostOnDeathConfig.SpecialSlotItems = false;
        //lostOnDeathConfig.Equipment.PocketItems = false;
        lostOnDeathConfig.Equipment.ArmBand = false;
        //lostOnDeathConfig.Equipment.Holster = false;
        lostOnDeathConfig.Equipment.Scabbard = false;
        lostOnDeathConfig.Equipment.SecuredContainer = false;


        this.Logger.Log(
            LogLevel.Info,
            String.Concat(Constants.LoggerPrefix, "ModifyLostOnDeathConfig.OnLoad() / success"),
            LogTextColor.Green
        );
        return Task.CompletedTask;
    }
}
