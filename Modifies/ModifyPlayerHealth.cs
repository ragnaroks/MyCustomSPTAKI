using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Helpers;
using SPTarkov.Server.Core.Models.Common;
using SPTarkov.Server.Core.Models.Eft.Common.Tables;
using SPTarkov.Server.Core.Models.Eft.Profile;
using SPTarkov.Server.Core.Models.Logging;
using SPTarkov.Server.Core.Models.Spt.Logging;
using SPTarkov.Server.Core.Models.Utils;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyCustomSPTAKI.Modifies;

[Injectable(InjectionType.Scoped, null, OnLoadOrder.PostSptModLoader + 1)]
public class ModifyPlayerHealth : IOnLoad {
    private ISptLogger<ModifyPlayerHealth> Logger { get; }
    private ProfileHelper ProfileHelper { get; }

#pragma warning disable IDE0290 // 使用主构造函数    
    public ModifyPlayerHealth (ISptLogger<ModifyPlayerHealth> logger, ProfileHelper profileHelper) {
        this.Logger = logger;
        this.ProfileHelper = profileHelper;
    }
#pragma warning restore IDE0290 // 使用主构造函数

    public Task OnLoad () {
        Dictionary<MongoId, SptProfile> profiles = this.ProfileHelper.GetProfiles();
        foreach (KeyValuePair<MongoId, SptProfile> profile in profiles) {
            BotBaseHealth? botBaseHealth = profile.Value.CharacterData?.PmcData?.Health;
            if (botBaseHealth is null || botBaseHealth.BodyParts is null) { continue; }
            foreach (KeyValuePair<String, BodyPartHealth> bodyPart in botBaseHealth.BodyParts){
                CurrentMinMax? current = bodyPart.Value.Health;
                if (current is null) { continue; }
                current.Maximum = 200;
                current.Minimum = 0;
            }
            this.Logger.Log(
                LogLevel.Info,
                String.Concat(Constants.LoggerPrefix, "ModifyPlayerHealth.OnLoad() / ", profile.Value.ProfileInfo?.Username, " / 已调整生命值"),
                LogTextColor.White
            );
        }

        this.Logger.Log(
            LogLevel.Info,
            String.Concat(Constants.LoggerPrefix, "ModifyPlayerHealth.OnLoad() / success"),
            LogTextColor.Green
        );
        return Task.CompletedTask;
    }
}
