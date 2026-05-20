using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Helpers;
using SPTarkov.Server.Core.Models.Common;
using SPTarkov.Server.Core.Models.Eft.Common.Tables;
using SPTarkov.Server.Core.Models.Logging;
using SPTarkov.Server.Core.Models.Spt.Logging;
using SPTarkov.Server.Core.Models.Utils;
using SPTarkov.Server.Core.Services;

namespace MyCustomSPTAKI.Modifies;

[Injectable(InjectionType.Scoped, null, OnLoadOrder.PostDBModLoader + 1)]
public class ModifyBaseClassBarrel : IOnLoad {
    private ISptLogger<ModifyBaseClassBarrel> Logger { get; }
    private DatabaseService DatabaseService { get; }
    private ItemHelper ItemHelper { get; }

#pragma warning disable IDE0290 // 使用主构造函数    
    public ModifyBaseClassBarrel(ISptLogger<ModifyBaseClassBarrel> logger, DatabaseService databaseService, ItemHelper itemHelper) {
        this.Logger = logger;
        this.DatabaseService = databaseService;
        this.ItemHelper = itemHelper;
    }
#pragma warning restore IDE0290 // 使用主构造函数

    public Task OnLoad() {
        Dictionary<MongoId, TemplateItem> templates = this.DatabaseService.GetItems();

        IEnumerable<MongoId> barrels = this.ItemHelper.GetItemTplsOfBaseType(BaseClasses.BARREL);
        foreach (MongoId id in barrels) {
            if (templates.TryGetValue(id, out TemplateItem? template) is false) { continue; }
            if (template is null || template.Properties is null) { continue; }
            template.Properties.CenterOfImpact = 0.01D;
        }

        this.Logger.Log(
            LogLevel.Info,
            String.Concat(Constants.LoggerPrefix, "ModifyBaseClassBarrel.OnLoad() / success"),
            LogTextColor.Green
        );
        return Task.CompletedTask;
    }
}
