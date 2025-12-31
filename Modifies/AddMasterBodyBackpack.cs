using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
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
public class AddMasterBodyBackpack : IOnLoad {
    private ISptLogger<AddMasterBodyBackpack> Logger { get; }
    private DatabaseService DatabaseService { get; }
    private CustomItemService CustomItemService { get; }
    private Double HandbookPrice { get; } = 196_0000D;
    private MongoId BaseId { get; } = new("6938900eebe7860edeced700");
    private MongoId NewId { get; } = new("6938900eebe7860edeced701");
    private MongoId RotateId { get; set; } = new("6938900eebe7860edeced720");

#pragma warning disable IDE0290 // 使用主构造函数
    public AddMasterBodyBackpack (ISptLogger<AddMasterBodyBackpack> logger, DatabaseService databaseService, CustomItemService customItemService) {
        this.Logger = logger;
        this.DatabaseService = databaseService;
        this.CustomItemService = customItemService;
    }
#pragma warning restore IDE0290 // 使用主构造函数

    public Task OnLoad () {
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        Grid main = new() {
            Id = this.RotateId,
            Name = "main",
            Parent = this.NewId,
            Prototype = "55d329c24bdc2d892f8b4567",
            Properties = new() {
                CellsH = 14,
                CellsV = 14,
                Filters = [
                    new(){
                        Filter = [BaseClasses.ITEM],
                        ExcludedFilter = [BaseClasses.MOB_CONTAINER,BaseClasses.SIMPLE_CONTAINER,BaseClasses.BACKPACK]
                    }
                ],
                IsSortingTable = false,
                MaxCount = 0,
                MaxWeight = 0,
                MinCount = 0
            }
        };
        
        NewItemFromCloneDetails newItem = new() {
            ItemTplToClone = ItemTpl.ARMOR_LBT6094A_SLICK_PLATE_CARRIER_BLACK,
            NewId = this.NewId,
            ParentId = BaseClasses.SIMPLE_CONTAINER,
            FleaPriceRoubles = Math.Ceiling(this.HandbookPrice * 1.25),
            HandbookPriceRoubles = this.HandbookPrice,
            HandbookParentId = "5b5f701386f774093f2ecf0f",
            Locales = new(){
                {"en",new(){Name = "master body backpack",ShortName = "MasterBody",Description = "skydust™ master body backpack"}},
                {"ch",new(){Name = "大师身体背包",ShortName = "大师身体",Description = "skydust™ 大师身体背包"}}
            },
            OverrideProperties = new() {
                BackgroundColor = "blue",
                CanSellOnRagfair = false,
                Rarity = LootRarity.Not_exist,
                RarityPvE = "not_exist",
                Weight = -98D,
                //Width = 3,
                //Height = 3,
                MousePenalty = 0D,
                SpeedPenaltyPercent = 0D,
                WeaponErgonomicPenalty = 0D,
                ExamineExperience = (Int32)Math.Ceiling(this.HandbookPrice / 10000),
                LootExperience = (Int32)Math.Ceiling(this.HandbookPrice / 10000),
                Grids = [main],
                Slots = [],
                ArmorColliders = [],
                ArmorPlateColliders = [],
                ConflictingItems = [],
                BluntThroughput = 0.85D,
                Durability = 100D,
                MaxDurability = 100D
            }
        };
        CreateItemResult createItemResult = this.CustomItemService.CreateItemFromClone(newItem);
        if (createItemResult.Success is false) {
            this.Logger.Log(
                LogLevel.Info,
                String.Concat(Constants.LoggerPrefix, "AddMasterBodyBackpack.OnLoad() / failed / ", String.Join("；", createItemResult.Errors ?? Enumerable.Empty<String>())),
                LogTextColor.Yellow
            );
            return Task.CompletedTask;
        }

        Trader? trader = this.DatabaseService.GetTrader(Traders.REF);
        if (trader is null) {
            this.Logger.Log(
                LogLevel.Info,
                String.Concat(Constants.LoggerPrefix, "AddMasterBodyBackpack.OnLoad() / failed / trader not found"),
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
        if(templates.TryGetValue(ItemTpl.INVENTORY_DEFAULT,out TemplateItem? template) is true && template is not null) {
            if(template.Properties is not null && template.Properties.Slots is not null) {
                foreach (Slot slot in template.Properties.Slots) {
                    if(slot.Name is not "ArmorVest"){continue;}
                    if(slot.Properties is null || slot.Properties.Filters is null){continue;}
                    SlotFilter slotFilter = slot.Properties.Filters.First();
                    if(slotFilter.Filter is null){continue;}
                    _ = slotFilter.Filter.Add(this.NewId);
                    break;
                }
            }
        }

        this.Logger.Log(
            LogLevel.Info,
            String.Concat(Constants.LoggerPrefix, "AddMasterBodyBackpack.OnLoad() / success / ", this.BaseId, " / ", this.RotateId),
            LogTextColor.Green
        );
        return Task.CompletedTask;
    }
}
