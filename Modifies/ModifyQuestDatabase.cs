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

[Injectable(InjectionType.Scoped, null, OnLoadOrder.PostDBModLoader + 1)]
public class ModifyQuestDatabase : IOnLoad {
    private ISptLogger<ModifyQuestDatabase> Logger { get; }
    private DatabaseService DatabaseService { get; }

#pragma warning disable IDE0290 // 使用主构造函数    
    public ModifyQuestDatabase (ISptLogger<ModifyQuestDatabase> logger, DatabaseService databaseService) {
        this.Logger = logger;
        this.DatabaseService = databaseService;
    }
#pragma warning restore IDE0290 // 使用主构造函数

    public Task OnLoad () {
        Dictionary<MongoId, Quest> quests = this.DatabaseService.GetQuests();

        foreach (KeyValuePair<MongoId, Quest> keyValuePair in quests) {
            if (keyValuePair.Value.Conditions.AvailableForStart is not null) {
                foreach (QuestCondition condition in keyValuePair.Value.Conditions.AvailableForStart) {
                    condition.AvailableAfter = 0;
                }
            }

            if (keyValuePair.Value.Conditions.AvailableForFinish is not null) {
                foreach (QuestCondition condition in keyValuePair.Value.Conditions.AvailableForFinish) {
                    condition.AvailableAfter = 0;
                    if (condition.PlantTime is not null and > 5D) {
                        condition.PlantTime = 5D;
                    }
                    /*
                    if(condition.Counter is not null && condition.Counter.Conditions is not null) {
                        condition.Counter.Conditions = condition.Counter.Conditions.Where(x=>x.ConditionType!="InZone").ToList();
                    }
                    */
                }
            }
        }

        this.Logger.Log(
            LogLevel.Info,
            String.Concat(Constants.LoggerPrefix, "ModifyQuestDatabase.OnLoad() / success"),
            LogTextColor.Green
        );
        return Task.CompletedTask;
    }
}
