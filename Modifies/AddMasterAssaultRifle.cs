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
public class AddMasterAssaultRifle : IOnLoad {
    private ISptLogger<AddMasterAssaultRifle> Logger { get; }
    private DatabaseService DatabaseService { get; }
    private CustomItemService CustomItemService { get; }
    private ConfigServer ConfigServer { get; }
    private Double HandbookPrice { get; } = 250_0000D;
    private MongoId BaseId { get; } = new("6a0901f08779ac57da23c100");
    private MongoId NewId { get; } = new("6a0901f08779ac57da23c101");
    private MongoId RotateId { get; set; } = new("6a0901f08779ac57da23c120");
    private MongoId OriginTemplateId { get; } = ItemTpl.SMG_TDI_KRISS_VECTOR_GEN2_45_ACP_SUBMACHINE_GUN;

#pragma warning disable IDE0290 // 使用主构造函数
    public AddMasterAssaultRifle (ISptLogger<AddMasterAssaultRifle> logger, DatabaseService databaseService, CustomItemService customItemService, ConfigServer configServer) {
        this.Logger = logger;
        this.DatabaseService = databaseService;
        this.CustomItemService = customItemService;
        this.ConfigServer = configServer;
    }
#pragma warning restore IDE0290 // 使用主构造函数

    public Task OnLoad () {
        IList<Slot> chambers = [];
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        chambers.Add(new() {
            Id = this.RotateId,
            Parent = this.NewId,
            Name = "patron_in_weapon",
            Required = false,
            MergeSlotWithChildren = false,
            Prototype = "55d4af244bdc2d962f8b4571",
            Properties = new() {
                Filters = [
                    new(){
                        Filter = Constants.AssaultAmmoSet
                    }
                ]
            }
        });

        IList<Slot> slots = [];
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        slots.Add(new() {
            Id = this.RotateId,
            Parent = this.NewId,
            Name = "mod_magazine",
            Required = false,
            MergeSlotWithChildren = false,
            Prototype = "55d30c394bdc2dae468b4577",
            Properties = new() {
                Filters = [
                    new(){
                        AnimationIndex = -1,
                        Filter = [new("6a08f67d799458e8c3913101")]
                    }
                ]
            }
        });
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        slots.Add(new() {
            Id = this.RotateId,
            Parent = this.NewId,
            Name = "mod_sight_front",
            Required = false,
            MergeSlotWithChildren = false,
            Prototype = "55d30c4c4bdc2db4468b457e",
            Properties = new() {
                Filters = [
                    new(){
                        Shift = 0,
                        Filter = [
                            ItemTpl.IRONSIGHT_MAGPUL_MBUS_GEN2_FLIPUP_FRONT_SIGHT,
                            ItemTpl.IRONSIGHT_MAGPUL_MBUS_GEN2_FLIPUP_FRONT_SIGHT_FDE,
                            ItemTpl.IRONSIGHT_KRISS_DEFIANCE_LOW_PROFILE_FLIPUP_FRONT_SIGHT,
                            ItemTpl.IRONSIGHT_KAC_FOLDING_MICRO_FRONT_SIGHT
                        ]
                    }
                ]
            }
        });
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        slots.Add(new() {
            Id = this.RotateId,
            Parent = this.NewId,
            Name = "mod_sight_rear",
            Required = false,
            MergeSlotWithChildren = false,
            Prototype = "55d30c4c4bdc2db4468b457e",
            Properties = new() {
                Filters = [
                    new(){
                        Shift = 0,
                        Filter = [
                            ItemTpl.IRONSIGHT_MAGPUL_MBUS_GEN2_FLIPUP_REAR_SIGHT,
                            ItemTpl.IRONSIGHT_MAGPUL_MBUS_GEN2_FLIPUP_REAR_SIGHT_FDE,
                            ItemTpl.IRONSIGHT_KRISS_DEFIANCE_LOW_PROFILE_FLIPUP_REAR_SIGHT,
                            ItemTpl.IRONSIGHT_KAC_FOLDING_MICRO_REAR_SIGHT
                        ]
                    }
                ]
            }
        });
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        slots.Add(new() {
            Id = this.RotateId,
            Parent = this.NewId,
            Name = "mod_scope",
            Required = false,
            MergeSlotWithChildren = false,
            Prototype = "55d30c4c4bdc2db4468b457e",
            Properties = new() {
                Filters = [
                    new(){
                        Shift = 0,
                        Filter = [
                            BaseClasses.ASSAULT_SCOPE,
                            //BaseClasses.OPTIC_SCOPE,
                            BaseClasses.SPECIAL_SCOPE
                        ]
                    }
                ]
            }
        });
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        slots.Add(new() {
            Id = this.RotateId,
            Parent = this.NewId,
            Name = "mod_tactical_000",
            Required = false,
            MergeSlotWithChildren = false,
            Prototype = "55d30c4c4bdc2db4468b457e",
            Properties = new() {
                Filters = [
                    new(){
                        Shift = 0,
                        Filter = [
                            ItemTpl.TACTICALCOMBO_HOLOSUN_LS321_TACTICAL_DEVICE,
                            ItemTpl.TACTICALCOMBO_L3HARRIS_ANPEQ15_TACTICAL_DEVICE,
                            ItemTpl.TACTICALCOMBO_L3HARRIS_LA5BPEQ_TACTICAL_DEVICE,
                            ItemTpl.TACTICALCOMBO_SUREFIRE_XC1_TACTICAL_FLASHLIGHT,
                            ItemTpl.TACTICALCOMBO_WILCOX_RAPTAR_ES_TACTICAL_RANGEFINDER,
                            ItemTpl.TACTICALCOMBO_ZENIT_PERST3_TACTICAL_DEVICE,
                            ItemTpl.TACTICALCOMBO_BE_MEYERS_MAWLC1_TACTICAL_DEVICE
                        ]
                    }
                ]
            }
        });
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        slots.Add(new() {
            Id = this.RotateId,
            Parent = this.NewId,
            Name = "mod_stock",
            Required = false,
            MergeSlotWithChildren = false,
            Prototype = "55d30c4c4bdc2db4468b457e",
            Properties = new() {
                Filters = [
                    new(){
                        Shift = 0,
                        Filter = [
                            ItemTpl.STOCK_KRISS_VECTOR_NONFOLDING_STOCK_ADAPTER,
                            ItemTpl.STOCK_KRISS_VECTOR_GEN2_FOLDING
                        ]
                    }
                ]
            }
        });
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        slots.Add(new() {
            Id = this.RotateId,
            Parent = this.NewId,
            Name = "mod_barrel",
            Required = false,
            MergeSlotWithChildren = false,
            Prototype = "55d30c4c4bdc2db4468b457e",
            Properties = new() {
                Filters = [
                    new(){
                        Shift = 0,
                        Filter = [
                            ItemTpl.BARREL_KRISS_VECTOR_45_ACP_5_INCH,
                            ItemTpl.BARREL_KRISS_VECTOR_45_ACP_6_INCH
                        ]
                    }
                ]
            }
        });
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        slots.Add(new() {
            Id = this.RotateId,
            Parent = this.NewId,
            Name = "mod_mount",
            Required = false,
            MergeSlotWithChildren = false,
            Prototype = "55d30c4c4bdc2db4468b457e",
            Properties = new() {
                Filters = [
                    new(){
                        Shift = 0,
                        Filter = [
                            ItemTpl.MOUNT_KRISS_VECTOR_MK5_MODULAR_RAIL,
                            ItemTpl.MOUNT_KRISS_VECTOR_BOTTOM_RAIL
                        ]
                    }
                ]
            }
        });
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        slots.Add(new() {
            Id = this.RotateId,
            Parent = this.NewId,
            Name = "mod_mount_001",
            Required = false,
            MergeSlotWithChildren = false,
            Prototype = "55d30c4c4bdc2db4468b457e",
            Properties = new() {
                Filters = [
                    new(){
                        Shift = 0,
                        Filter = [
                            ItemTpl.MOUNT_KRISS_VECTOR_SIDE_RAIL
                        ]
                    }
                ]
            }
        });
        this.RotateId = Helper.Miscellaneous.MongoIdCalc(this.RotateId, 1);
        slots.Add(new() {
            Id = this.RotateId,
            Parent = this.NewId,
            Name = "mod_mount_002",
            Required = false,
            MergeSlotWithChildren = false,
            Prototype = "55d30c4c4bdc2db4468b457e",
            Properties = new() {
                Filters = [
                    new(){
                        Shift = 0,
                        Filter = [
                            ItemTpl.MOUNT_KRISS_VECTOR_SIDE_RAIL
                        ]
                    }
                ]
            }
        });

        NewItemFromCloneDetails newItem = new() {
            ItemTplToClone = this.OriginTemplateId,
            NewId = this.NewId,
            ParentId = BaseClasses.ASSAULT_RIFLE,
            FleaPriceRoubles = Math.Ceiling(this.HandbookPrice * 1.25),
            HandbookPriceRoubles = this.HandbookPrice,
            HandbookParentId = "5b5f796a86f774093f2ed3c0",
            Locales = new(){
                {"en",new(){Name = "master assault rifle",ShortName = "Master",Description = "skydust™ master assault rifle"}},
                {"ch",new(){Name = "大师突击步枪",ShortName = "大师",Description = "skydust™ 大师突击步枪"}}
            },
            OverrideProperties = new() {
                BackgroundColor = "blue",
                CanSellOnRagfair = false,
                Rarity = LootRarity.Not_exist,
                RarityPvE = "not_exist",
                MousePenalty = 0D,
                SpeedPenaltyPercent = 0D,
                WeaponErgonomicPenalty = 0D,
                ExamineExperience = (Int32)Math.Ceiling(this.HandbookPrice / 10000),
                LootExperience = (Int32)Math.Ceiling(this.HandbookPrice / 10000),
                RecoilAngle = 90D,
                DeviationCurve = 2.25D,
                Ergonomics = 100D,
                MaxDurability = 9600D,
                Durability = 9600D,
                AllowFeed = false,
                AllowJam = false,
                AllowMisfire = false,
                AllowOverheat = true,
                AllowSlide = false,
                BaseMalfunctionChance = 0D,
                Foldable = false,
                WeapFireType = ["single", "fullauto"],
                BFirerate = 900D,
                Slots = slots,
                Chambers = chambers

            }
        };
        CreateItemResult createItemResult = this.CustomItemService.CreateItemFromClone(newItem);
        if (createItemResult.Success is false) {
            this.Logger.Log(
                LogLevel.Info,
                String.Concat(Constants.LoggerPrefix, "AddMasterAssaultRifle.OnLoad() / failed / ", String.Join("；", createItemResult.Errors ?? Enumerable.Empty<String>())),
                LogTextColor.Yellow
            );
            return Task.CompletedTask;
        }

        Trader? trader = this.DatabaseService.GetTrader(Traders.MECHANIC);
        if (trader is null) {
            this.Logger.Log(
                LogLevel.Info,
                String.Concat(Constants.LoggerPrefix, "AddMasterAssaultRifle.OnLoad() / failed / trader not found"),
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
            String.Concat(Constants.LoggerPrefix, "AddMasterAssaultRifle.OnLoad() / success / ", this.BaseId, " / ", this.RotateId),
            LogTextColor.Green
        );
        return Task.CompletedTask;
    }
}
