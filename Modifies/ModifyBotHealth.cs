using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Models.Eft.Common.Tables;
using SPTarkov.Server.Core.Models.Logging;
using SPTarkov.Server.Core.Models.Spt.Bots;
using SPTarkov.Server.Core.Models.Spt.Logging;
using SPTarkov.Server.Core.Models.Utils;
using SPTarkov.Server.Core.Services;

namespace MyCustomSPTAKI.Modifies;

[Injectable(InjectionType.Scoped, null, OnLoadOrder.PostDBModLoader + 1)]
public class ModifyBotHealth : IOnLoad {
    private ISptLogger<ModifyBotHealth> Logger { get; }
    private DatabaseService DatabaseService { get; }

#pragma warning disable IDE0290 // 使用主构造函数    
    public ModifyBotHealth(ISptLogger<ModifyBotHealth> logger, DatabaseService databaseService) {
        this.Logger = logger;
        this.DatabaseService = databaseService;
    }
#pragma warning restore IDE0290 // 使用主构造函数

    public Task OnLoad() {
        Bots bots = this.DatabaseService.GetBots();
        foreach (KeyValuePair<String, BotType?> botType in bots.Types) {
            if (botType.Key.Contains("test", StringComparison.InvariantCultureIgnoreCase)) { continue; }
            if (botType.Value is null) { continue; }
            foreach (BodyPart bodyPart in botType.Value.BotHealth.BodyParts) {
                //bodyPart.Head.Min *= 2;
                //bodyPart.Head.Max *= 2;
                bodyPart.Chest.Max *= 4;
                bodyPart.Chest.Min *= 4;
                bodyPart.Stomach.Max *= 4;
                bodyPart.Stomach.Min *= 4;
                bodyPart.LeftArm.Max *= 4;
                bodyPart.LeftArm.Min *= 4;
                bodyPart.RightArm.Max *= 4;
                bodyPart.RightArm.Min *= 4;
                bodyPart.LeftLeg.Max *= 4;
                bodyPart.LeftLeg.Min *= 4;
                bodyPart.RightLeg.Max *= 4;
                bodyPart.RightLeg.Min *= 4;
            }
        }

        this.Logger.Log(
            LogLevel.Info,
            String.Concat(Constants.LoggerPrefix, "ModifyBotHealth.OnLoad() / success"),
            LogTextColor.Green
        );
        return Task.CompletedTask;
    }
}
