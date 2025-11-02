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
public class AddMasterArmband : IOnLoad {
    private ISptLogger<AddMasterArmband> Logger { get; }
    private DatabaseService DatabaseService { get; }
    private CustomItemService CustomItemService { get; }
    private Double HandbookPrice { get; } = 1000_0000D;
    private MongoId BaseId { get; } = new("680b992ddb2d7f5fd00e7a00");
    private MongoId NewId { get; } = new("680b992ddb2d7f5fd00e7a01");
    private MongoId RotateId { get; set; } = new("680b992ddb2d7f5fd00e7a20");

#pragma warning disable IDE0290 // 使用主构造函数
    public AddMasterArmband (ISptLogger<AddMasterArmband> logger, DatabaseService databaseService, CustomItemService customItemService) {
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
                CellsH = 6,
                CellsV = 3,
                Filters = [
                    new(){
                        Filter = [BaseClasses.AMMO],
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
                CellsH = 6,
                CellsV = 3,
                Filters = [
                    new(){
                        Filter = [BaseClasses.THROW_WEAP],
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
                CellsH = 3,
                CellsV = 6,
                Filters = [
                    new(){
                        Filter = [BaseClasses.FOOD_DRINK],
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
                CellsH = 6,
                CellsV = 6,
                Filters = [
                    new(){
                        Filter = [BaseClasses.MEDS],
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
            ItemTplToClone = ItemTpl.ARMBAND_EVASION,
            NewId = this.NewId,
            ParentId = BaseClasses.ARM_BAND,
            FleaPriceRoubles = Math.Ceiling(this.HandbookPrice * 1.25),
            HandbookPriceRoubles = this.HandbookPrice,
            HandbookParentId = "5b5f6fd286f774093f2ecf0d",
            Locales = new(){
                {"en",new(){Name = "master armband",ShortName = "Master",Description = "skydust™ master armband"}},
                {"ch",new(){Name = "大师肩带",ShortName = "大师肩带",Description = "skydust™ 大师肩带"}}
            },
            OverrideProperties = new() {
                BackgroundColor = "blue",
                CanSellOnRagfair = false,
                Rarity = LootRarity.Not_exist,
                RarityPvE = "not_exist",
                Weight = 0D,
                Width = 1,
                Height = 1,
                MousePenalty = 0D,
                SpeedPenaltyPercent = 0D,
                WeaponErgonomicPenalty = 0D,
                ExamineExperience = (Int32)Math.Ceiling(this.HandbookPrice / 10000),
                LootExperience = (Int32)Math.Ceiling(this.HandbookPrice / 10000),
                Unlootable = true,
                InsuranceDisabled = true,
                IsSecured = true,
                Grids = [colume1,colume2,colume3,colume4]
            }
        };
        CreateItemResult createItemResult = this.CustomItemService.CreateItemFromClone(newItem);
        if (createItemResult.Success is false) {
            this.Logger.Log(
                LogLevel.Info,
                String.Concat(Constants.LoggerPrefix, "AddMasterArmband.OnLoad() / failed / ", String.Join("；", createItemResult.Errors ?? Enumerable.Empty<String>())),
                LogTextColor.Yellow
            );
            return Task.CompletedTask;
        }

        Trader? trader = this.DatabaseService.GetTrader(Traders.REF);
        if (trader is null) {
            this.Logger.Log(
                LogLevel.Info,
                String.Concat(Constants.LoggerPrefix, "AddMasterArmband.OnLoad() / failed / trader not found"),
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

        this.Logger.Log(
            LogLevel.Info,
            String.Concat(Constants.LoggerPrefix, "AddMasterArmband.OnLoad() / success / ", this.BaseId, " / ", this.RotateId),
            LogTextColor.Green
        );
        return Task.CompletedTask;
    }
}
