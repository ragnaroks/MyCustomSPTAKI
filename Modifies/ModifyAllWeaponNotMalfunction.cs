using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Helpers;
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
public class ModifyAllWeaponNotMalfunction : IOnLoad {
    private ISptLogger<ModifyAllWeaponNotMalfunction> Logger { get; }
    private DatabaseService DatabaseService { get; }
    private ItemHelper ItemHelper{ get; }

#pragma warning disable IDE0290 // 使用主构造函数    
    public ModifyAllWeaponNotMalfunction (ISptLogger<ModifyAllWeaponNotMalfunction> logger, DatabaseService databaseService, ItemHelper itemHelper) {
        this.Logger = logger;
        this.DatabaseService = databaseService;
        this.ItemHelper = itemHelper;
    }
#pragma warning restore IDE0290 // 使用主构造函数

    public Task OnLoad () {
        Dictionary<MongoId, TemplateItem> templates = this.DatabaseService.GetItems();
        IEnumerable<MongoId> weapons = this.ItemHelper.GetItemTplsOfBaseType(BaseClasses.WEAPON);
        foreach (MongoId id in weapons) {
            if(templates.TryGetValue(id, out TemplateItem? templateItem) is false){continue;}
            if(templateItem is null || templateItem.Properties is null){continue;}
            templateItem.Properties.AllowFeed = false;
            templateItem.Properties.AllowJam = false;
            templateItem.Properties.AllowMisfire = false;
            templateItem.Properties.AllowSlide = false;
            templateItem.Properties.BaseMalfunctionChance = 0D;
            templateItem.Properties.MalfFeedChance = 0D;
            templateItem.Properties.MalfMisfireChance = 0D;
            templateItem.Properties.MalfunctionChance = 0D;
            templateItem.Properties.AllowOverheat = true;
            templateItem.Properties.Ergonomics = 128D;
        }

        this.Logger.Log(
            LogLevel.Info,
            String.Concat(Constants.LoggerPrefix, "ModifyAllWeaponNotMalfunction.OnLoad() / success"),
            LogTextColor.Green
        );
        return Task.CompletedTask;
    }
}
