using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Models.Eft.Common.Tables;
using SPTarkov.Server.Core.Models.Logging;
using SPTarkov.Server.Core.Models.Spt.Bots;
using SPTarkov.Server.Core.Models.Spt.Logging;
using SPTarkov.Server.Core.Models.Utils;
using SPTarkov.Server.Core.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyCustomSPTAKI.Modifies;

[Injectable(InjectionType.Scoped, null, OnLoadOrder.PostDBModLoader + 1)]
public class ModifyBotHealth : IOnLoad {
    private ISptLogger<ModifyBotHealth> Logger { get; }
    private DatabaseService DatabaseService { get; }

#pragma warning disable IDE0290 // 使用主构造函数    
    public ModifyBotHealth (ISptLogger<ModifyBotHealth> logger, DatabaseService databaseService) {
        this.Logger = logger;
        this.DatabaseService = databaseService;
    }
#pragma warning restore IDE0290 // 使用主构造函数

    public Task OnLoad () {
        Bots bots = this.DatabaseService.GetBots();
        foreach (KeyValuePair<String, BotType?> botType in bots.Types) {
            if(botType.Key.Contains("test",StringComparison.InvariantCultureIgnoreCase)) {continue;}
            if(botType.Value is null){continue;}
            foreach (BodyPart bodyPart in botType.Value.BotHealth.BodyParts) {
                //bodyPart.Head.Min *= 2;
                //bodyPart.Head.Max *= 2;
                bodyPart.Chest.Max *= 2;
                bodyPart.Chest.Min *= 2;
                bodyPart.Stomach.Max *= 2;
                bodyPart.Stomach.Min *= 2;
                bodyPart.LeftArm.Max *= 2;
                bodyPart.LeftArm.Min *= 2;
                bodyPart.RightArm.Max *= 2;
                bodyPart.RightArm.Min *= 2;
                bodyPart.LeftLeg.Max *= 2;
                bodyPart.LeftLeg.Min *= 2;
                bodyPart.RightLeg.Max *= 2;
                bodyPart.RightLeg.Min *= 2;
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
