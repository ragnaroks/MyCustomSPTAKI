using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Models.Common;
using SPTarkov.Server.Core.Models.Eft.Common;
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
public class ModifyMoneyCount : IOnLoad {
    private ISptLogger<ModifyMoneyCount> Logger { get; }
    private DatabaseService DatabaseService { get; }

#pragma warning disable IDE0290 // 使用主构造函数    
    public ModifyMoneyCount (ISptLogger<ModifyMoneyCount> logger, DatabaseService databaseService) {
        this.Logger = logger;
        this.DatabaseService = databaseService;
    }
#pragma warning restore IDE0290 // 使用主构造函数

    public Task OnLoad () {
        Dictionary<MongoId, TemplateItem> templates = this.DatabaseService.GetItems();

        IEnumerable<MongoId> tpls = [ItemTpl.MONEY_DOLLARS,ItemTpl.MONEY_EUROS,ItemTpl.MONEY_ROUBLES];
        foreach (MongoId id in tpls) {
            if(templates.TryGetValue(id, out TemplateItem? templateItem) is false){continue;}
            if(templateItem is null || templateItem.Properties is null){continue;}
            templateItem.Properties.StackMaxSize = 5000_0000;
        }

        IEnumerable<MongoId> tpls2 = [ItemTpl.MONEY_GP_COIN];
        foreach (MongoId id in tpls2) {
            if(templates.TryGetValue(id, out TemplateItem? templateItem) is false){continue;}
            if(templateItem is null || templateItem.Properties is null){continue;}
            templateItem.Properties.StackMaxSize = 1_0000;
        }

        this.Logger.Log(
            LogLevel.Info,
            String.Concat(Constants.LoggerPrefix, "ModifyMoneyCount.OnLoad() / success"),
            LogTextColor.Green
        );
        return Task.CompletedTask;
    }
}
