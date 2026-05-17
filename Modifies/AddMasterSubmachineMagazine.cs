using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Models.Common;
using SPTarkov.Server.Core.Models.Eft.Common.Tables;
using SPTarkov.Server.Core.Models.Enums;
using SPTarkov.Server.Core.Models.Logging;
using SPTarkov.Server.Core.Models.Spt.Bots;
using SPTarkov.Server.Core.Models.Spt.Config;
using SPTarkov.Server.Core.Models.Spt.Logging;
using SPTarkov.Server.Core.Models.Spt.Mod;
using SPTarkov.Server.Core.Models.Utils;
using SPTarkov.Server.Core.Servers;
using SPTarkov.Server.Core.Services;
using SPTarkov.Server.Core.Services.Mod;

namespace MyCustomSPTAKI.Modifies;

[Injectable(InjectionType.Scoped, null, OnLoadOrder.PostDBModLoader + 1)]
public class AddMasterSubmachineMagazine : IOnLoad {
    private ISptLogger<AddMasterSubmachineMagazine> Logger { get; }
    private DatabaseService DatabaseService { get; }
    private CustomItemService CustomItemService { get; }
    private ConfigServer ConfigServer { get; }
    private Double HandbookPrice { get; } = 33_0000D;
    private MongoId BaseId { get; } = new("6a08f2d0d1e5c3ff0f95b700");
    private MongoId NewId { get; } = new("6a08f2d0d1e5c3ff0f95b701");
    private MongoId RotateId { get; set; } = new("6a08f2d0d1e5c3ff0f95b720");

#pragma warning disable IDE0290 // 使用主构造函数
    public AddMasterSubmachineMagazine (ISptLogger<AddMasterSubmachineMagazine> logger, DatabaseService databaseService, CustomItemService customItemService, ConfigServer configServer) {
        this.Logger = logger;
        this.DatabaseService = databaseService;
        this.CustomItemService = customItemService;
        this.ConfigServer = configServer;
    }
#pragma warning restore IDE0290 // 使用主构造函数

    public Task OnLoad () {
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        NewItemFromCloneDetails newItem = new() {
            // IDK why the magazine of toygun will cause a strange bug in detail window 
            ItemTplToClone = ItemTpl.MAGAZINE_9X19_BIG_STICK_33RND,
            NewId = this.NewId,
            ParentId = BaseClasses.MAGAZINE,
            FleaPriceRoubles = Math.Ceiling(this.HandbookPrice * 1.25),
            HandbookPriceRoubles = this.HandbookPrice,
            HandbookParentId = "5b5f754a86f774094242f19b",
            Locales = new(){
                {"en",new(){Name = "master submachine magazine",ShortName = "Master",Description = "skydust™ master submachine magazine"}},
                {"ch",new(){Name = "大师冲锋枪弹匣",ShortName = "大师",Description = "skydust™ 大师冲锋枪弹匣"}}
            },
            OverrideProperties = new() {
                BackgroundColor = "blue",
                CanSellOnRagfair = false,
                Rarity = LootRarity.Not_exist,
                RarityPvE = "not_exist",
                Weight = 0.25,
                Width = 1,
                Height = 2,
                ExamineExperience = (Int32)Math.Ceiling(this.HandbookPrice / 10000),
                LootExperience = (Int32)Math.Ceiling(this.HandbookPrice / 10000),
                Cartridges = [
                    new(){
                        Name = "cartridges",
                        Id = this.RotateId,
                        Parent = this.NewId,
                        MaxCount = 9600,
                        Properties = new(){
                            Filters = [
                                new(){
                                    Filter = Constants.SubmachineAmmoSet
                                }
                            ]
                        }

                    }
                ],
                CheckTimeModifier = 0D,
                LoadUnloadModifier = 0D,
                Ergonomics = 100,
                CanFast = false,
                AllowFeed = false,
                AllowJam = false,
                AllowMisfire = false,
                AllowSlide = false,
                BaseMalfunctionChance = 0D,
                MalfFeedChance = 0D,
                MalfMisfireChance = 0D,
                MalfunctionChance = 0D,
                AllowOverheat = true,
                ExtraSizeForceAdd = false,
                ExtraSizeDown = 0,
                ExtraSizeLeft = 0,
                ExtraSizeRight = 0,
                ExtraSizeUp = 0
            }
        };
        CreateItemResult createItemResult = this.CustomItemService.CreateItemFromClone(newItem);
        if (createItemResult.Success is false) {
            this.Logger.Log(
                LogLevel.Info,
                String.Concat(Constants.LoggerPrefix, "AddMasterSubmachineMagazine.OnLoad() / failed / ", String.Join("；", createItemResult.Errors ?? Enumerable.Empty<String>())),
                LogTextColor.Yellow
            );
            return Task.CompletedTask;
        }

        Trader? trader = this.DatabaseService.GetTrader(Traders.MECHANIC);
        if (trader is null) {
            this.Logger.Log(
                LogLevel.Info,
                String.Concat(Constants.LoggerPrefix, "AddMasterSubmachineMagazine.OnLoad() / failed / trader not found"),
                LogTextColor.Yellow
            );
            return Task.CompletedTask;
        }
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        trader.Assort.LoyalLevelItems.Add(this.RotateId, 4);
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

        BotConfig botConfig = this.ConfigServer.GetConfig<BotConfig>();
        // IDK why this HashSet will have 2 same item at final, and seems like equipmentFilterDetails not work
        EquipmentFilterDetails equipmentFilterDetails = new() {
            LevelRange = new() {
                Min = 1,
                Max = 100
            },
            Cartridge = [],
            Equipment = new(){
                {"mod_magazine",[this.NewId]}
            }
        };
        foreach (String botTypeName in botConfig.Equipment.Keys) {
            if (!botConfig.Equipment.ContainsKey(botTypeName)) { continue; }
            EquipmentFilters? equipmentFilters = botConfig.Equipment[botTypeName];
            if (equipmentFilters is null) {
                equipmentFilters = new() {
                    Blacklist = [equipmentFilterDetails]
                };
            } else if (equipmentFilters.Blacklist is null) {
                equipmentFilters.Blacklist = [equipmentFilterDetails];
                continue;
            } else {
                equipmentFilters.Blacklist.Add(equipmentFilterDetails);
            }
            botConfig.Equipment[botTypeName] = equipmentFilters;
        }

        // this copy from https://github.com/jbs4bmx/HoltzmanShield/blob/7082fa820b4f465373181197ef08f02b4d033448/project/HoltzmanShield/HoltzmanShieldMod.cs#L281
        foreach (KeyValuePair<String, Dictionary<MongoId, Double>> spawnLimit in botConfig.ItemSpawnLimits) {
            spawnLimit.Value[this.NewId] = 0D;
        }

        PmcConfig pmcConfig = this.ConfigServer.GetConfig<PmcConfig>();
        _ = pmcConfig.PocketLoot.Blacklist.Add(this.NewId);
        _ = pmcConfig.VestLoot.Blacklist.Add(this.NewId);
        _ = pmcConfig.BackpackLoot.Blacklist.Add(this.NewId);
        pmcConfig.GlobalLootBlacklist.Add(this.NewId);


        // and this, maybe work?
        Bots bots = this.DatabaseService.GetBots();
        foreach (KeyValuePair<String, BotType?> botType in bots.Types) {
            if (botType.Key.Contains("test", StringComparison.InvariantCultureIgnoreCase)) { continue; }
            if (botType.Value is null) { continue; }
            foreach (KeyValuePair<MongoId, Dictionary<String, HashSet<MongoId>>> modOnItem in botType.Value.BotInventory.Mods) {
                if (modOnItem.Value.TryGetValue("mod_magazine", out HashSet<MongoId>? modIdSet) is false) { continue; }
                if (modIdSet is null) { continue; }
                _ = modIdSet.Remove(this.NewId);
            }
            if (botType.Value.BotGeneration.Items.Magazines.Whitelist is not null) {
                _ = botType.Value.BotGeneration.Items.Magazines.Whitelist.Remove(this.NewId);
            }
        }

        // this way works fine
        ItemConfig itemConfig = this.ConfigServer.GetConfig<ItemConfig>();
        _ = itemConfig.Blacklist.Add(this.NewId);

        this.Logger.Log(
            LogLevel.Info,
            String.Concat(Constants.LoggerPrefix, "AddMasterSubmachineMagazine.OnLoad() / success / ", this.BaseId, " / ", this.RotateId),
            LogTextColor.Green
        );
        return Task.CompletedTask;
    }
}
