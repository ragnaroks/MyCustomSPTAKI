using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Helpers;
using SPTarkov.Server.Core.Models.Common;
using SPTarkov.Server.Core.Models.Eft.Common.Tables;
using SPTarkov.Server.Core.Models.Enums;
using SPTarkov.Server.Core.Models.Logging;
using SPTarkov.Server.Core.Models.Spt.Logging;
using SPTarkov.Server.Core.Models.Spt.Mod;
using SPTarkov.Server.Core.Models.Utils;
using SPTarkov.Server.Core.Services;
using SPTarkov.Server.Core.Services.Mod;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyCustomSPTAKI.Modifies;

[Injectable(InjectionType.Scoped, null, OnLoadOrder.PostDBModLoader + 1)]
public class AddNightVisionGoggles : IOnLoad {
    private ISptLogger<AddNightVisionGoggles> Logger { get; }
    private DatabaseService DatabaseService { get; }
    private CustomItemService CustomItemService { get; }
    private ItemHelper ItemHelper{get;}
    private Double HandbookPrice { get; } = 50_0000D;
    private MongoId BaseId { get; } = new("67f65b10352e88d7cb840100");
    private MongoId NewId { get; } = new("67f65b10352e88d7cb840101");
    private MongoId RotateId { get; set; } = new("67f65b10352e88d7cb840120");

#pragma warning disable IDE0290 // 使用主构造函数
    public AddNightVisionGoggles (ISptLogger<AddNightVisionGoggles> logger, DatabaseService databaseService, CustomItemService customItemService,ItemHelper itemHelper) {
        this.Logger = logger;
        this.DatabaseService = databaseService;
        this.CustomItemService = customItemService;
        this.ItemHelper = itemHelper;
    }
#pragma warning restore IDE0290 // 使用主构造函数

    public Task OnLoad () {
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        NewItemFromCloneDetails newItem = new() {
            ItemTplToClone = ItemTpl.THERMALVISION_T7_THERMAL_GOGGLES_WITH_A_NIGHT_VISION_MOUNT,
            NewId = this.NewId,
            ParentId = BaseClasses.NIGHT_VISION,
            FleaPriceRoubles = Math.Ceiling(this.HandbookPrice * 1.25),
            HandbookPriceRoubles = this.HandbookPrice,
            HandbookParentId = "5b5f749986f774094242f199",
            Locales = new(){
                {"en",new(){Name = "night vision goggles",ShortName = "NightVision",Description = "skydust™ night vision goggles"}},
                {"ch",new(){Name = "夜视仪",ShortName = "夜视仪",Description = "skydust™ 夜视仪"}}
            },
            OverrideProperties = new() {
                BackgroundColor = "blue",
                CanSellOnRagfair = false,
                Rarity = LootRarity.Not_exist,
                RarityPvE = "not_exist",
                Weight = 1D,
                MousePenalty = 0D,
                SpeedPenaltyPercent = 0D,
                WeaponErgonomicPenalty = 0D,
                ExamineExperience = (Int32)Math.Ceiling(this.HandbookPrice / 10000),
                LootExperience = (Int32)Math.Ceiling(this.HandbookPrice / 10000),
                NoiseIntensity = 0D,
                NoiseScale = 0D,
                Color = new(){R=150,G=214,B=240,A=0},
                Intensity = 1.618D,
                DiffuseIntensity = 0D,
                IsNoisy = false,
                IsMotionBlurred = false,
                IsFpsStuck = false,
                IsPixelated = false,
                IsGlitch = false,
                Mask = "Anvis",
                MaskSize = 2D
            }
        };
        CreateItemResult createItemResult = this.CustomItemService.CreateItemFromClone(newItem);
        if (createItemResult.Success is false) {
            this.Logger.Log(
                LogLevel.Info,
                String.Concat(Constants.LoggerPrefix, "AddNightVisionGoggles.OnLoad() / failed / ", String.Join("；", createItemResult.Errors ?? Enumerable.Empty<String>())),
                LogTextColor.Yellow
            );
            return Task.CompletedTask;
        }

        Trader? trader = this.DatabaseService.GetTrader(Traders.REF);
        if (trader is null) {
            this.Logger.Log(
                LogLevel.Info,
                String.Concat(Constants.LoggerPrefix, "AddNightVisionGoggles.OnLoad() / failed / trader not found"),
                LogTextColor.Yellow
            );
            return Task.CompletedTask;
        }
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        trader.Assort.LoyalLevelItems.Add(this.RotateId, 1);
        trader.Assort.BarterScheme.Add(
            this.RotateId,
            [
                [
                    new(){
                        Template = ItemTpl.MONEY_ROUBLES,
                        Count = this.HandbookPrice,
                        Level = 15
                    }
                ]
            ]
        );
        trader.Assort.Items.Add(new() {
            Id = this.RotateId,
            Template = this.NewId,
            ParentId = "hideout",
            SlotId = "hideout",
            Upd = new() {
                UnlimitedCount = true,
                StackObjectsCount = 999,
                BuyRestrictionMax = 9,
                BuyRestrictionCurrent = 0
            }
        });

        Dictionary<MongoId, TemplateItem> templates = this.DatabaseService.GetItems();

        IEnumerable<MongoId> headwears = this.ItemHelper.GetItemTplsOfBaseType(BaseClasses.HEADWEAR);
        foreach (MongoId id in headwears) {
            if(templates.TryGetValue(id, out TemplateItem? template) is false || template is null){continue;}
            if(template.Properties is null || template.Properties.Slots is null || template.Properties.Slots.Any() is false){continue;}
            foreach (Slot slot in template.Properties.Slots) {
                if(slot.Name is not "mod_nvg"){continue;}
                if(slot.Properties is null || slot.Properties.Filters is null){continue;}
                SlotFilter slotFilter = slot.Properties.Filters.First();
                if(slotFilter.Filter is null){continue;}
                if(slotFilter.Filter.Contains(ItemTpl.NIGHTVISION_L3HARRIS_GPNVG18_NIGHT_VISION_GOGGLES) is false){continue;}
                _ = slotFilter.Filter.Add(this.NewId);
                break;
            }
        }

        if(templates.TryGetValue(ItemTpl.MOUNT_PVS7_WILCOX_ADAPTER, out TemplateItem? templateAdapter) is true && templateAdapter is not null) {
            if(templateAdapter.Properties is not null && templateAdapter.Properties.Slots is not null && templateAdapter.Properties.Slots.Any() is true) {
                foreach (Slot slot in templateAdapter.Properties.Slots) {
                    if(slot.Name is not "mod_nvg"){continue;}
                    if(slot.Properties is null || slot.Properties.Filters is null){continue;}
                    SlotFilter slotFilter = slot.Properties.Filters.First();
                    if(slotFilter.Filter is null){continue;}
                    if(slotFilter.Filter.Contains(ItemTpl.THERMALVISION_T7_THERMAL_GOGGLES_WITH_A_NIGHT_VISION_MOUNT) is false){continue;}
                    _ = slotFilter.Filter.Add(this.NewId);
                    break;
                }
            }
        }

        this.Logger.Log(
            LogLevel.Info,
            String.Concat(Constants.LoggerPrefix, "AddNightVisionGoggles.OnLoad() / success / ", this.BaseId, " / ", this.RotateId),
            LogTextColor.Green
        );
        return Task.CompletedTask;
    }
}
