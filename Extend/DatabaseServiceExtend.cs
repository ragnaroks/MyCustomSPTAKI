using SPTarkov.Server.Core.Models.Common;
using SPTarkov.Server.Core.Models.Eft.Common.Tables;
using SPTarkov.Server.Core.Services;

namespace MyCustomSPTAKI.Extend;

public static class DatabaseServiceExtend {
    public static TemplateItem? GetItem (this DatabaseService databaseService,MongoId mongoId) {        
        return databaseService.GetItems().TryGetValue(mongoId,out TemplateItem? item) ? item : null;
    }
}
