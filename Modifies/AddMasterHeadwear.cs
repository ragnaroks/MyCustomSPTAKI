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

[Injectable(InjectionType.Transient, null, OnLoadOrder.PostDBModLoader + 1)]
public class AddMasterHeadwear : IOnLoad {
    private ISptLogger<AddMasterHeadwear> Logger { get; }
    private DatabaseService DatabaseService { get; }
    private CustomItemService CustomItemService { get; }
    private Double HandbookPrice { get; } = 100_0000D;
    private MongoId BaseId { get; } = new("690e702019c77df600752000");
    private MongoId NewId { get; } = new("690e702019c77df600752001");
    private MongoId RotateId { get; set; } = new("690e702019c77df600752020");

#pragma warning disable IDE0290 // 使用主构造函数
    public AddMasterHeadwear (ISptLogger<AddMasterHeadwear> logger, DatabaseService databaseService, CustomItemService customItemService) {
        this.Logger = logger;
        this.DatabaseService = databaseService;
        this.CustomItemService = customItemService;
    }
#pragma warning restore IDE0290 // 使用主构造函数

    public Task OnLoad () {
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        

        NewItemFromCloneDetails newItem = new() {
            ItemTplToClone = ItemTpl.FACECOVER_GHOST_BALACLAVA,
            NewId = this.NewId,
            ParentId = BaseClasses.FACE_COVER,
            FleaPriceRoubles = Math.Ceiling(this.HandbookPrice * 1.25),
            HandbookPriceRoubles = this.HandbookPrice,
            HandbookParentId = "5b47574386f77428ca22b32f",
            Locales = new(){
                {"en",new(){Name = "master headwear",ShortName = "Master",Description = "skydust™ master headwear"}},
                {"ch",new(){Name = "大师头饰",ShortName = "大师",Description = "skydust™ 大师头饰"}}
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
                ConflictingItems = null,
                BlocksEarpiece = false,
                BlocksEyewear = false,
                BlocksFaceCover = false,
                BlocksHeadwear = false,
                BluntThroughput = 0D,
                Durability = 300D,
                MaxDurability = 300D,
                RepairCost = 300,
                MaxRepairDegradation = 0D,
                MinRepairDegradation = 0D,
                MaxRepairKitDegradation = 0D,
                MinRepairKitDegradation = 0D,
                Indestructibility = 1D,
                ArmorClass = 10,
                ArmorColliders = ["BackHead","Ears","Eyes","HeadCommon","Jaw","NeckBack","NeckFront","ParietalHead"]
            }
        };
        CreateItemResult createItemResult = this.CustomItemService.CreateItemFromClone(newItem);
        if (createItemResult.Success is false) {
            this.Logger.Log(
                LogLevel.Info,
                String.Concat(Constants.LoggerPrefix, "AddMasterHeadwear.OnLoad() / failed / ", String.Join("；", createItemResult.Errors ?? Enumerable.Empty<String>())),
                LogTextColor.Yellow
            );
            return Task.CompletedTask;
        }

        Trader? trader = this.DatabaseService.GetTrader(Traders.REF);
        if (trader is null) {
            this.Logger.Log(
                LogLevel.Info,
                String.Concat(Constants.LoggerPrefix, "AddMasterHeadwear.OnLoad() / failed / trader not found"),
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
            String.Concat(Constants.LoggerPrefix, "AddMasterHeadwear.OnLoad() / success / ", this.BaseId, " / ", this.RotateId),
            LogTextColor.Green
        );
        return Task.CompletedTask;
    }
}
