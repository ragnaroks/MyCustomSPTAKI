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

[Injectable(InjectionType.Transient, null, OnLoadOrder.PostDBModLoader + 1)]
public class AddMasterBodyArmor : IOnLoad {
    private ISptLogger<AddMasterBodyArmor> Logger { get; }
    private DatabaseService DatabaseService { get; }
    private CustomItemService CustomItemService { get; }
    private Double HandbookPrice { get; } = 100_0000D;
    private MongoId BaseId { get; } = new("690e702019c77df600753000");
    private MongoId NewId { get; } = new("690e702019c77df600753001");
    private MongoId RotateId { get; set; } = new("690e702019c77df600753020");

#pragma warning disable IDE0290 // 使用主构造函数
    public AddMasterBodyArmor (ISptLogger<AddMasterBodyArmor> logger, DatabaseService databaseService, CustomItemService customItemService) {
        this.Logger = logger;
        this.DatabaseService = databaseService;
        this.CustomItemService = customItemService;
    }
#pragma warning restore IDE0290 // 使用主构造函数

    public Task OnLoad () {
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        

        NewItemFromCloneDetails newItem = new() {
            ItemTplToClone = ItemTpl.ARMOR_511_TACTICAL_HEXGRID_PLATE_CARRIER,
            NewId = this.NewId,
            ParentId = BaseClasses.ARMOR,
            FleaPriceRoubles = Math.Ceiling(this.HandbookPrice * 1.25),
            HandbookPriceRoubles = this.HandbookPrice,
            HandbookParentId = "5b5f701386f774093f2ecf0f",
            Locales = new(){
                {"en",new(){Name = "master body armor",ShortName = "Master",Description = "skydust™ master body armor"}},
                {"ch",new(){Name = "大师防弹衣",ShortName = "大师",Description = "skydust™ 大师防弹衣"}}
            },
            OverrideProperties = new() {
                BackgroundColor = "blue",
                CanSellOnRagfair = false,
                Rarity = LootRarity.Not_exist,
                RarityPvE = "not_exist",
                Weight = 0D,
                Width = 3,
                Height = 3,
                MousePenalty = 0D,
                SpeedPenaltyPercent = 0D,
                WeaponErgonomicPenalty = 0D,
                ExamineExperience = (Int32)Math.Ceiling(this.HandbookPrice / 10000),
                LootExperience = (Int32)Math.Ceiling(this.HandbookPrice / 10000),
                Slots = [],
                Grids = [],
                ConflictingItems = null,
                BlocksEarpiece = false,
                BlocksEyewear = false,
                BlocksFaceCover = false,
                BlocksHeadwear = false,
                BluntThroughput = 0.1D,
                Durability = 600D,
                MaxDurability = 600D,
                RepairCost = 100,
                MaxRepairDegradation = 1D,
                MinRepairDegradation = 0.5D,
                MaxRepairKitDegradation = 0.25D,
                MinRepairKitDegradation = 0.125D,
                Indestructibility = 0.95D,
                ArmorClass = 10,
                ArmorColliders = [
                    "LeftCalf","LeftForearm","LeftSideChestDown","LeftSideChestUp","LeftThigh","LeftUpperArm",
                    "Pelvis","PelvisBack","RibcageLow","RibcageUp","SpineDown","SpineTop",
                    "RightCalf","RightForearm","RightSideChestDown","RightSideChestUp","RightThigh","RightUpperArm",
                    //
                    "Plate_Granit_SAPI_back","Plate_Granit_SAPI_chest","Plate_Korund_chest","Plate_6B13_back",
                    "Plate_Granit_SSAPI_side_left_high","Plate_Granit_SSAPI_side_left_low",
                    "Plate_Granit_SSAPI_side_right_high","Plate_Granit_SSAPI_side_right_low",
                    "Plate_Korund_side_left_high","Plate_Korund_side_left_low",
                    "Plate_Korund_side_right_high","Plate_Korund_side_right_low"
                ]
            }
        };
        CreateItemResult createItemResult = this.CustomItemService.CreateItemFromClone(newItem);
        if (createItemResult.Success is false) {
            this.Logger.Log(
                LogLevel.Info,
                String.Concat(Constants.LoggerPrefix, "AddMasterBodyArmor.OnLoad() / failed / ", String.Join("；", createItemResult.Errors ?? Enumerable.Empty<String>())),
                LogTextColor.Yellow
            );
            return Task.CompletedTask;
        }

        Trader? trader = this.DatabaseService.GetTrader(Traders.REF);
        if (trader is null) {
            this.Logger.Log(
                LogLevel.Info,
                String.Concat(Constants.LoggerPrefix, "AddMasterBodyArmor.OnLoad() / failed / trader not found"),
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

        this.Logger.Log(
            LogLevel.Info,
            String.Concat(Constants.LoggerPrefix, "AddMasterBodyArmor.OnLoad() / success / ", this.BaseId, " / ", this.RotateId),
            LogTextColor.Green
        );
        return Task.CompletedTask;
    }
}
