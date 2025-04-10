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
using System.Linq;
using System.Threading.Tasks;

namespace MyCustomSPTAKI.Modifies;

[Injectable(InjectionType.Scoped, null, OnLoadOrder.PostDBModLoader + 1)]
public class ModifyTemplateFN40GL : IOnLoad {
    private ISptLogger<ModifyTemplateFN40GL> Logger { get; }
    private DatabaseService DatabaseService { get; }
    private ItemHelper ItemHelper{ get; }

#pragma warning disable IDE0290 // 使用主构造函数    
    public ModifyTemplateFN40GL (ISptLogger<ModifyTemplateFN40GL> logger, DatabaseService databaseService, ItemHelper itemHelper) {
        this.Logger = logger;
        this.DatabaseService = databaseService;
        this.ItemHelper = itemHelper;
    }
#pragma warning restore IDE0290 // 使用主构造函数

    public Task OnLoad () {
        Dictionary<MongoId, TemplateItem> templates = this.DatabaseService.GetItems();

        Boolean v1 = templates.TryGetValue(ItemTpl.GRENADELAUNCHER_FN40GL_01,out TemplateItem? weaponGL40);
        if(v1 is false || weaponGL40 is null) {
            this.Logger.Log(
                LogLevel.Info,
                String.Concat(Constants.LoggerPrefix, "ModifyTemplateFN40GL.OnLoad() / failed / not found template GRENADELAUNCHER_FN40GL_01"),
                LogTextColor.Yellow
            );
            return Task.CompletedTask;
        }
        if(weaponGL40.Properties is null || weaponGL40.Properties.Chambers is null || weaponGL40.Properties.Slots is null) {
            this.Logger.Log(
                LogLevel.Info,
                String.Concat(Constants.LoggerPrefix, "ModifyTemplateFN40GL.OnLoad() / failed / template GRENADELAUNCHER_FN40GL_01 does not have properties"),
                LogTextColor.Yellow
            );
            return Task.CompletedTask;
        }
        weaponGL40.Properties.Ergonomics = 100;
        foreach (Slot slot in weaponGL40.Properties.Chambers) {
            if(slot.Properties is null || slot.Properties.Filters is null){continue;}
            foreach (SlotFilter slotFilter in slot.Properties.Filters) {
                if(slotFilter.Filter is null){continue;}
                slotFilter.Filter = [
                    ItemTpl.AMMO_40X46_M381,
                    ItemTpl.AMMO_40X46_M386,
                    ItemTpl.AMMO_40X46_M406,
                    ItemTpl.AMMO_40X46_M433,
                    ItemTpl.AMMO_40X46_M441,
                    ItemTpl.AMMO_40X46_M576,
                    //ItemTpl.AMMO_40X46_M716,
                    ItemTpl.AMMO_40MMRU_VOG25
                ];
            }
        }
        foreach (Slot slot in weaponGL40.Properties.Slots) {
            if(slot.Properties is null || slot.Properties.Filters is null){continue;}
            if(slot.Name is not "mod_scope"){continue;}
            foreach (SlotFilter slotFilter in slot.Properties.Filters) {
                if(slotFilter.Filter is null){continue;}
                _ = slotFilter.Filter.Add(ItemTpl.MOUNT_LARUE_LT101_QD_TACTICAL_PICATINNY_RISER);
            }
            break;
        }


        IEnumerable<MongoId> tpls = this.ItemHelper.GetItemTplsOfBaseType(BaseClasses.INVENTORY);
        foreach (MongoId id in tpls) {
            if(templates.TryGetValue(id,out TemplateItem? template) is false || template is null){continue;}
            if(template.Properties is null || template.Properties.Slots is null || template.Properties.Slots.Any() is false){continue;}
            foreach (Slot slot in template.Properties.Slots) {
                if(slot.Name is not "Holster"){continue;}
                if(slot.Properties is null || slot.Properties.Filters is null){continue;}
                foreach (SlotFilter slotFilter in slot.Properties.Filters) {
                    if(slotFilter.Filter is null){continue;}
                    _ = slotFilter.Filter.Add(ItemTpl.GRENADELAUNCHER_FN40GL_01);
                }
                break;
            }
        }

        this.Logger.Log(
            LogLevel.Info,
            String.Concat(Constants.LoggerPrefix, "ModifyTemplateFN40GL.OnLoad() / success"),
            LogTextColor.Green
        );
        return Task.CompletedTask;
    }
}
