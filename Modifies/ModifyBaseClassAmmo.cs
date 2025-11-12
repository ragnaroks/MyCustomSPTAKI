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

[Injectable(InjectionType.Transient, null, OnLoadOrder.PostDBModLoader + 1)]
public class ModifyBaseClassAmmo : IOnLoad {
    private ISptLogger<ModifyBaseClassAmmo> Logger { get; }
    private DatabaseService DatabaseService { get; }
    private ItemHelper ItemHelper { get; }
    private IEnumerable<MongoId> ItemTpls { get; } = [
        ItemTpl.AMMO_40X46_M381,
        ItemTpl.AMMO_40X46_M386,
        ItemTpl.AMMO_40X46_M406,
        ItemTpl.AMMO_40X46_M433,
        ItemTpl.AMMO_40X46_M441,
        ItemTpl.AMMO_40X46_M576,
        ItemTpl.AMMO_40MMRU_VOG25
    ];

#pragma warning disable IDE0290 // 使用主构造函数    
    public ModifyBaseClassAmmo (ISptLogger<ModifyBaseClassAmmo> logger, DatabaseService databaseService, ItemHelper itemHelper) {
        this.Logger = logger;
        this.DatabaseService = databaseService;
        this.ItemHelper = itemHelper;
    }
#pragma warning restore IDE0290 // 使用主构造函数

    public Task OnLoad () {
        Dictionary<MongoId, TemplateItem> templates = this.DatabaseService.GetItems();
        foreach (MongoId id in this.ItemTpls) {
            if(templates.TryGetValue(id,out TemplateItem? template) is false){continue;}
            if(template is null || template.Properties is null){continue;}
            template.Properties.StackMaxSize = 10;
            template.Properties.StackMinRandom = 1;
            template.Properties.StackMaxRandom = 3;
        }

        this.Logger.Log(
            LogLevel.Info,
            String.Concat(Constants.LoggerPrefix, "ModifyBaseClassAmmo.OnLoad() / success"),
            LogTextColor.Green
        );
        return Task.CompletedTask;
    }
}
