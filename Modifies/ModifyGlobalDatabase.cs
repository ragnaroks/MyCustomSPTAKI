using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Models.Eft.Common;
using SPTarkov.Server.Core.Models.Logging;
using SPTarkov.Server.Core.Models.Spt.Logging;
using SPTarkov.Server.Core.Models.Utils;
using SPTarkov.Server.Core.Services;
using System;
using System.Threading.Tasks;

namespace MyCustomSPTAKI.Modifies;

[Injectable(InjectionType.Transient, null, OnLoadOrder.PostDBModLoader + 1)]
public class ModifyGlobalDatabase : IOnLoad {
    private ISptLogger<ModifyGlobalDatabase> Logger { get; }
    private DatabaseService DatabaseService { get; }

#pragma warning disable IDE0290 // 使用主构造函数    
    public ModifyGlobalDatabase (ISptLogger<ModifyGlobalDatabase> logger, DatabaseService databaseService) {
        this.Logger = logger;
        this.DatabaseService = databaseService;
    }
#pragma warning restore IDE0290 // 使用主构造函数

    public Task OnLoad () {
        Globals globals = this.DatabaseService.GetGlobals();
        //globals.Configuration.BaseCheckTime = 0D;
        //globals.Configuration.BaseLoadTime = 0D;
        globals.Configuration.BaseUnloadTime = 0D;
        globals.Configuration.AimPunchMagnitude = 0D;
        globals.Configuration.RestrictionsInRaid = [];
        globals.Configuration.SkillFatiguePerPoint = 0D;
        globals.Configuration.SkillMinEffectiveness = 1D;
        globals.Configuration.SkillFreshEffectiveness = 3D;
        globals.Configuration.SavagePlayCooldown = 60;
        //globals.Configuration.MaxBotsAliveOnMap = 11D;
        //globals.Configuration.MaxBotsAliveOnMapPvE = 11D;

        foreach (MaxActiveOfferCount maxActiveOfferCount in globals.Configuration.RagFair.MaxActiveOfferCount) {
            maxActiveOfferCount.Count *= 10;
            maxActiveOfferCount.CountForSpecialEditions *= 10;
        }

        this.Logger.Log(
            LogLevel.Info,
            String.Concat(Constants.LoggerPrefix, "ModifyGlobalDatabase.OnLoad() / success"),
            LogTextColor.Green
        );
        return Task.CompletedTask;
    }
}
