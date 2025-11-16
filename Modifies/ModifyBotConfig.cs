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

[Injectable(InjectionType.Transient, null, OnLoadOrder.PostDBModLoader + 1)]
public class ModifyBotConfig : IOnLoad {
    private ISptLogger<ModifyBotConfig> Logger { get; }
    private ConfigServer ConfigServer { get; }

#pragma warning disable IDE0290 // 使用主构造函数    
    public ModifyBotConfig (ISptLogger<ModifyBotConfig> logger, ConfigServer configServer) {
        this.Logger = logger;
        this.ConfigServer = configServer;
    }
#pragma warning restore IDE0290 // 使用主构造函数

    public Task OnLoad () {
        BotConfig botConfig = this.ConfigServer.GetConfig<BotConfig>();
        botConfig.ShowTypeInNickname = true;
        //this.Logger.Log(LogLevel.Warn,Constants.LoggerPrefix+String.Join("/",botConfig.MaxBotCap.Keys));
        foreach (String key in botConfig.MaxBotCap.Keys) {
            if (key is "factory4_day" or "factory4_night") {
                botConfig.MaxBotCap[key] = 7;
            } else {
                //botConfig.MaxBotCap[key] = 11;
                continue;
            }
        }
        /*
        foreach( String key in botConfig.AssaultBrainType.Keys) {
            botConfig.AssaultBrainType[key].Clear();
            botConfig.AssaultBrainType[key].Add("pmcBot",1);
        }
        foreach( String key in botConfig.PlayerScavBrainType.Keys) {
            botConfig.PlayerScavBrainType[key].Clear();
            botConfig.PlayerScavBrainType[key].Add("pmcBot",1);
        }
        */

        this.Logger.Log(
            LogLevel.Info,
            String.Concat(Constants.LoggerPrefix, "ModifyBotConfig.OnLoad() / success"),
            LogTextColor.Green
        );
        return Task.CompletedTask;
    }
}
