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
        botConfig.MaxBotCap["default"] = 18;
        botConfig.MaxBotCap["Default"] = 18;
        botConfig.MaxBotCap["factory4_day"] = 7;
        botConfig.MaxBotCap["Factory4Day"] = 7;
        botConfig.MaxBotCap["factory4_night"] = 7;
        botConfig.MaxBotCap["Factory4Night"] = 7;
        botConfig.MaxBotCap["bigmap"] = 26;
        botConfig.MaxBotCap["Bigmap"] = 26;
        botConfig.MaxBotCap["interchange"] = 24;
        botConfig.MaxBotCap["Interchange"] = 24;
        botConfig.MaxBotCap["laboratory"] = 19;
        botConfig.MaxBotCap["Laboratory"] = 19;
        botConfig.MaxBotCap["labyrinth"] = 8;
        botConfig.MaxBotCap["Labyrinth"] = 8;
        botConfig.MaxBotCap["lighthouse"] = 23;
        botConfig.MaxBotCap["Lighthouse"] = 23;
        botConfig.MaxBotCap["rezervbase"] = 23;
        botConfig.MaxBotCap["RezervBase"] = 23;
        botConfig.MaxBotCap["sandbox"] = 11;
        botConfig.MaxBotCap["Sandbox"] = 11;
        botConfig.MaxBotCap["sandbox_hgh"] = 12;
        botConfig.MaxBotCap["SandboxHigh"] = 12;
        botConfig.MaxBotCap["shoreline"] = 25;
        botConfig.MaxBotCap["Shoreline"] = 25;
        botConfig.MaxBotCap["tarkovstreets"] = 24;
        botConfig.MaxBotCap["TarkovStreets"] = 24;
        botConfig.MaxBotCap["woods"] = 23;
        botConfig.MaxBotCap["Woods"] = 23;

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
