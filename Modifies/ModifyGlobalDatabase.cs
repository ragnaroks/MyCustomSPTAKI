using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Models.Eft.Common;
using SPTarkov.Server.Core.Models.Logging;
using SPTarkov.Server.Core.Models.Spt.Logging;
using SPTarkov.Server.Core.Models.Spt.Server;
using SPTarkov.Server.Core.Models.Utils;
using SPTarkov.Server.Core.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyCustomSPTAKI.Modifies;

[Injectable(InjectionType.Scoped, null, OnLoadOrder.PostDBModLoader + 1)]
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
        Dictionary<String, Location> locations = this.DatabaseService.GetLocations().GetDictionary();
        //Dictionary<MongoId, TemplateItem> templates = this.DatabaseService.GetItems();

        //globals.Configuration.BaseCheckTime = 0D;
        //globals.Configuration.BaseLoadTime = 0D;
        globals.Configuration.BaseUnloadTime = 0D;
        globals.Configuration.AimPunchMagnitude = 0D;
        globals.Configuration.RestrictionsInRaid = [];
        globals.Configuration.SkillFatiguePerPoint = 0D;
        globals.Configuration.SkillMinEffectiveness = 1D;
        globals.Configuration.SkillFreshEffectiveness = 3D;
        globals.Configuration.SavagePlayCooldown = 60;

        
        foreach (MaxActiveOfferCount maxActiveOfferCount in globals.Configuration.RagFair.MaxActiveOfferCount) {
            maxActiveOfferCount.Count *= 10;
            maxActiveOfferCount.CountForSpecialEditions *= 10;
        }

        // 物品无同时上架数量限制
        globals.Configuration.RagFair.ItemRestrictions = [];

        // 战局时间 4 倍，撤离点无条件
        foreach (KeyValuePair<String, Location> location in locations) {
            if(location.Key.Equals("Develop", StringComparison.InvariantCultureIgnoreCase)) {continue;}
            if(location.Key.Equals("Hideout", StringComparison.InvariantCultureIgnoreCase)) {continue;}
            if(location.Key.Equals("PrivateArea", StringComparison.InvariantCultureIgnoreCase)) {continue;}
            if(location.Key.Equals("Suburbs", StringComparison.InvariantCultureIgnoreCase)) {continue;}
            if(location.Key.Equals("Terminal", StringComparison.InvariantCultureIgnoreCase)) {continue;}
            if(location.Key.Equals("Town", StringComparison.InvariantCultureIgnoreCase)) {continue;}
            location.Value.Base.EscapeTimeLimit *= 4;
            foreach (AllExtractsExit extractsExit in location.Value.AllExtracts) {
                extractsExit.PassageRequirement = SPTarkov.Server.Core.Models.Enums.RequirementState.None;
                extractsExit.ExfiltrationType = SPTarkov.Server.Core.Models.Enums.ExfiltrationType.Individual;
            }
        }
        

        this.Logger.Log(
            LogLevel.Info,
            String.Concat(Constants.LoggerPrefix, "ModifyGlobalDatabase.OnLoad() / success"),
            LogTextColor.Green
        );
        return Task.CompletedTask;
    }
}
