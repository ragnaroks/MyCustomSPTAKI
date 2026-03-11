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
using System.Linq;
using System.Threading.Tasks;

namespace MyCustomSPTAKI.Modifies;

[Injectable(InjectionType.Scoped, null, OnLoadOrder.PostDBModLoader + 1)]
public class AddMasterSupportKit : IOnLoad {
    private ISptLogger<AddMasterSupportKit> Logger { get; }
    private DatabaseService DatabaseService { get; }
    private CustomItemService CustomItemService { get; }
    private Double HandbookPrice { get; } = 100_0000D;
    private MongoId BaseId { get; } = new("680b992ddb2d7f5fd00e7a00");
    private MongoId NewId { get; } = new("680b992ddb2d7f5fd00e7a01");
    private MongoId RotateId { get; set; } = new("680b992ddb2d7f5fd00e7a20");

#pragma warning disable IDE0290 // 使用主构造函数
    public AddMasterSupportKit (ISptLogger<AddMasterSupportKit> logger, DatabaseService databaseService, CustomItemService customItemService) {
        this.Logger = logger;
        this.DatabaseService = databaseService;
        this.CustomItemService = customItemService;
    }
#pragma warning restore IDE0290 // 使用主构造函数

    public Task OnLoad () {
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        Grid colume1 = new() {
            Id = this.RotateId,
            Name = "colume1",
            Parent = this.NewId,
            Prototype = "55d329c24bdc2d892f8b4567",
            Properties = new() {
                CellsH = 2,
                CellsV = 14,
                Filters = [
                    new(){
                        Filter = [BaseClasses.AMMO,BaseClasses.MAGAZINE],
                        ExcludedFilter = null
                    }
                ],
                IsSortingTable = false,
                MaxCount = 0,
                MaxWeight = 0,
                MinCount = 0
            }
        };
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        Grid colume2 = new() {
            Id = this.RotateId,
            Name = "colume2",
            Parent = this.NewId,
            Prototype = "55d329c24bdc2d892f8b4567",
            Properties = new() {
                CellsH = 4,
                CellsV = 14,
                Filters = [
                    new(){
                        Filter = [
                            BaseClasses.MED_KIT,
                            ItemTpl.MEDICAL_CMS_SURGICAL_KIT,
                            ItemTpl.MEDICAL_SURV12_FIELD_SURGICAL_KIT
                        ],
                        ExcludedFilter = null
                    }
                ],
                IsSortingTable = false,
                MaxCount = 0,
                MaxWeight = 0,
                MinCount = 0
            }
        };
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        Grid colume3 = new() {
            Id = this.RotateId,
            Name = "colume3",
            Parent = this.NewId,
            Prototype = "55d329c24bdc2d892f8b4567",
            Properties = new() {
                CellsH = 1,
                CellsV = 14,
                Filters = [
                    new(){
                        Filter = [
                            ItemTpl.MEDICAL_CALOKB_HEMOSTATIC_APPLICATOR,
                            ItemTpl.MEDICAL_CAT_HEMOSTATIC_TOURNIQUET,
                            ItemTpl.MEDICAL_ESMARCH_TOURNIQUET
                        ],
                        ExcludedFilter = null
                    }
                ],
                IsSortingTable = false,
                MaxCount = 0,
                MaxWeight = 0,
                MinCount = 0
            }
        };
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        Grid colume4 = new() {
            Id = this.RotateId,
            Name = "colume4",
            Parent = this.NewId,
            Prototype = "55d329c24bdc2d892f8b4567",
            Properties = new() {
                CellsH = 1,
                CellsV = 14,
                Filters = [
                    new(){
                        Filter = [ItemTpl.MEDICAL_ARMY_BANDAGE,ItemTpl.MEDICAL_ASEPTIC_BANDAGE],
                        ExcludedFilter = null
                    }
                ],
                IsSortingTable = false,
                MaxCount = 0,
                MaxWeight = 0,
                MinCount = 0
            }
        };
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        Grid colume5 = new() {
            Id = this.RotateId,
            Name = "colume5",
            Parent = this.NewId,
            Prototype = "55d329c24bdc2d892f8b4567",
            Properties = new() {
                CellsH = 1,
                CellsV = 14,
                Filters = [
                    new(){
                        Filter = [ItemTpl.MEDICAL_ALUMINUM_SPLINT,ItemTpl.MEDICAL_IMMOBILIZING_SPLINT],
                        ExcludedFilter = null
                    }
                ],
                IsSortingTable = false,
                MaxCount = 0,
                MaxWeight = 0,
                MinCount = 0
            }
        };
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        Grid colume6 = new() {
            Id = this.RotateId,
            Name = "colume6",
            Parent = this.NewId,
            Prototype = "55d329c24bdc2d892f8b4567",
            Properties = new() {
                CellsH = 1,
                CellsV = 14,
                Filters = [
                    new(){
                        Filter = [
                            ItemTpl.DRUGS_ANALGIN_PAINKILLERS,
                            ItemTpl.DRUGS_AUGMENTIN_ANTIBIOTIC_PILLS,
                            ItemTpl.DRUGS_IBUPROFEN_PAINKILLERS,
                            ItemTpl.DRUGS_VASELINE_BALM,
                            ItemTpl.DRUGS_GOLDEN_STAR_BALM
                        ],
                        ExcludedFilter = null
                    }
                ],
                IsSortingTable = false,
                MaxCount = 0,
                MaxWeight = 0,
                MinCount = 0
            }
        };
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        Grid colume7 = new() {
            Id = this.RotateId,
            Name = "colume7",
            Parent = this.NewId,
            Prototype = "55d329c24bdc2d892f8b4567",
            Properties = new() {
                CellsH = 4,
                CellsV = 14,
                Filters = [
                    new(){
                        Filter = [BaseClasses.STIMULATOR,ItemTpl.DRUGS_MORPHINE_INJECTOR],
                        ExcludedFilter = null
                    }
                ],
                IsSortingTable = false,
                MaxCount = 0,
                MaxWeight = 0,
                MinCount = 0
            }
        };


        NewItemFromCloneDetails newItem = new() {
            ItemTplToClone = ItemTpl.CONTAINER_ITEM_CASE,
            NewId = this.NewId,
            ParentId = BaseClasses.SIMPLE_CONTAINER,
            FleaPriceRoubles = Math.Ceiling(this.HandbookPrice * 1.25),
            HandbookPriceRoubles = this.HandbookPrice,
            HandbookParentId = "5b5f701386f774093f2ecf0f",
            Locales = new(){
                {"en",new(){Name = "master support kit",ShortName = "Master",Description = "skydust™ master support kit"}},
                {"ch",new(){Name = "大师支援包",ShortName = "大师",Description = "skydust™ 大师支援包"}}
            },
            OverrideProperties = new() {
                BackgroundColor = "blue",
                CanSellOnRagfair = false,
                Rarity = LootRarity.Not_exist,
                RarityPvE = "not_exist",
                Weight = -196D,
                Width = 2,
                Height = 2,
                MousePenalty = 0D,
                SpeedPenaltyPercent = 0D,
                WeaponErgonomicPenalty = 0D,
                ExamineExperience = (Int32)Math.Ceiling(this.HandbookPrice / 10000),
                LootExperience = (Int32)Math.Ceiling(this.HandbookPrice / 10000),
                Grids = [colume1, colume2, colume3, colume4, colume5, colume6, colume7],
                Prefab = new() {
                    Path = "assets/content/weapons/usable_items/item_meds_grizly/item_grizzly_loot.bundle"
                }
            }
        };
        CreateItemResult createItemResult = this.CustomItemService.CreateItemFromClone(newItem);
        if (createItemResult.Success is false) {
            this.Logger.Log(
                LogLevel.Info,
                String.Concat(Constants.LoggerPrefix, "AddMasterSupportKit.OnLoad() / failed / ", String.Join("；", createItemResult.Errors ?? Enumerable.Empty<String>())),
                LogTextColor.Yellow
            );
            return Task.CompletedTask;
        }

        Trader? trader = this.DatabaseService.GetTrader(Traders.REF);
        if (trader is null) {
            this.Logger.Log(
                LogLevel.Info,
                String.Concat(Constants.LoggerPrefix, "AddMasterSupportKit.OnLoad() / failed / trader not found"),
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
                BuyRestrictionMax = 3,
                BuyRestrictionCurrent = 0
            }
        });

        /*
        Dictionary<MongoId, TemplateItem> templates = this.DatabaseService.GetItems();
        if (templates.TryGetValue(ItemTpl.INVENTORY_DEFAULT, out TemplateItem? template) is true && template is not null) {
            if (template.Properties is not null && template.Properties.Slots is not null) {
                foreach (Slot slot in template.Properties.Slots) {
                    if (slot.Name is not "ArmBand") { continue; }
                    if (slot.Properties is null || slot.Properties.Filters is null) { continue; }
                    SlotFilter slotFilter = slot.Properties.Filters.First();
                    if (slotFilter.Filter is null) { continue; }
                    _ = slotFilter.Filter.Add(this.NewId);
                    break;
                }
            }
        }
        */

        this.Logger.Log(
            LogLevel.Info,
            String.Concat(Constants.LoggerPrefix, "AddMasterSupportKit.OnLoad() / success / ", this.BaseId, " / ", this.RotateId),
            LogTextColor.Green
        );
        return Task.CompletedTask;
    }
}
