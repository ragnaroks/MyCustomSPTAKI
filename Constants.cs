using System;
using System.Collections.Generic;
using SPTarkov.Server.Core.Models.Common;

namespace MyCustomSPTAKI;

public static class Constants {
    public static ModMetadata ModMetadata { get; } = new ModMetadata();

    public static String LoggerPrefix { get; } = String.Concat('[', ModMetadata.Name, '@', ModMetadata.Version, ']', ' ');

    public static String HandbookIdForContainer { get; } = "5b5f6fa186f77409407a7eb7";

    public static HashSet<MongoId> SubmachineAmmoSet { get; } = [
        // 9x18
        ItemTpl.AMMO_9X18PM_BZHT,
        ItemTpl.AMMO_9X18PM_P,
        ItemTpl.AMMO_9X18PM_PBM,
        ItemTpl.AMMO_9X18PM_PPE,
        ItemTpl.AMMO_9X18PM_PPT,
        ItemTpl.AMMO_9X18PM_PRS,
        ItemTpl.AMMO_9X18PM_PSO,
        ItemTpl.AMMO_9X18PM_PST,
        ItemTpl.AMMO_9X18PM_PSTM,
        ItemTpl.AMMO_9X18PM_PSV,
        ItemTpl.AMMO_9X18PM_PS_PPO,
        ItemTpl.AMMO_9X18PM_RG028,
        ItemTpl.AMMO_9X18PM_SHRAPNEL,
        ItemTpl.AMMO_9X18PM_SP7,
        ItemTpl.AMMO_9X18PM_SP8,
        // 9x19
        ItemTpl.AMMO_9X19_AP_63,
        ItemTpl.AMMO_9X19_GT,
        ItemTpl.AMMO_9X19_LUGER_CCI,
        ItemTpl.AMMO_9X19_M882,
        ItemTpl.AMMO_9X19_PBP,
        ItemTpl.AMMO_9X19_PSO,
        ItemTpl.AMMO_9X19_PST,
        ItemTpl.AMMO_9X19_QUAKEMAKER,
        ItemTpl.AMMO_9X19_RIP,
        // .45ACP
        ItemTpl.AMMO_45ACP_AP,
        ItemTpl.AMMO_45ACP_FMJ,
        ItemTpl.AMMO_45ACP_HYDRASHOK,
        ItemTpl.AMMO_45ACP_LASERMATCH,
        ItemTpl.AMMO_45ACP_RIP,
        // 4.6x30
        ItemTpl.AMMO_46X30_ACTION_SX,
        ItemTpl.AMMO_46X30_AP_SX,
        ItemTpl.AMMO_46X30_FMJ_SX,
        ItemTpl.AMMO_46X30_JSP_SX,
        ItemTpl.AMMO_46X30_SUBSONIC_SX,
        // 5.7x28
        ItemTpl.AMMO_57X28_L191,
        ItemTpl.AMMO_57X28_R37F,
        ItemTpl.AMMO_57X28_R37X,
        ItemTpl.AMMO_57X28_SB193,
        ItemTpl.AMMO_57X28_SS190,
        ItemTpl.AMMO_57X28_SS197SR,
        ItemTpl.AMMO_57X28_SS198LF,
        // 9x21
        ItemTpl.AMMO_9X21_7N42,
        ItemTpl.AMMO_9X21_7U4,
        ItemTpl.AMMO_9X21_PS,
        ItemTpl.AMMO_9X21_PE,
        ItemTpl.AMMO_9X21_P,
        ItemTpl.AMMO_9X21_BT,
        // 7.62x25TT
        ItemTpl.AMMO_762X25TT_AKBS,
        ItemTpl.AMMO_762X25TT_FMJ43,
        ItemTpl.AMMO_762X25TT_LRN,
        ItemTpl.AMMO_762X25TT_LRNPC,
        ItemTpl.AMMO_762X25TT_P,
        ItemTpl.AMMO_762X25TT_PST,
        ItemTpl.AMMO_762X25TT_PT
    ];

    public static HashSet<MongoId> AssaultAmmoSet { get; } = [
        // .300BLK
        ItemTpl.AMMO_762X35_AP,
        ItemTpl.AMMO_762X35_BCP_FMJ,
        ItemTpl.AMMO_762X35_CBJ,
        ItemTpl.AMMO_762X35_M62,
        ItemTpl.AMMO_762X35_VMAX,
        ItemTpl.AMMO_762X35_WHISPER,
        // .357MG
        ItemTpl.AMMO_9X33R_FMJ,
        ItemTpl.AMMO_9X33R_HP,
        ItemTpl.AMMO_9X33R_JHP,
        ItemTpl.AMMO_9X33R_SP,
        // .366TKM
        ItemTpl.AMMO_366TKM_APM,
        ItemTpl.AMMO_366TKM_EKO,
        ItemTpl.AMMO_366TKM_FMJ,
        ItemTpl.AMMO_366TKM_GEKSA,
        // .50AE
        ItemTpl.AMMO_127X33_COPPER,
        ItemTpl.AMMO_127X33_FMJ,
        ItemTpl.AMMO_127X33_HAWK_JSP,
        ItemTpl.AMMO_127X33_JHP,
        // 12.7x55
        ItemTpl.AMMO_127X55_PS12,
        ItemTpl.AMMO_127X55_PS12A,
        ItemTpl.AMMO_127X55_PS12B,
        // 5.45x39
        ItemTpl.AMMO_545X39_7N40,
        ItemTpl.AMMO_545X39_BP,
        ItemTpl.AMMO_545X39_BS,
        ItemTpl.AMMO_545X39_BT,
        ItemTpl.AMMO_545X39_FMJ,
        ItemTpl.AMMO_545X39_HP,
        ItemTpl.AMMO_545X39_PP,
        ItemTpl.AMMO_545X39_PPBS,
        ItemTpl.AMMO_545X39_PRS,
        ItemTpl.AMMO_545X39_PS,
        ItemTpl.AMMO_545X39_SP,
        ItemTpl.AMMO_545X39_T,
        ItemTpl.AMMO_545X39_US,
        // 5.56x45
        ItemTpl.AMMO_556X45_FMJ,
        ItemTpl.AMMO_556X45_HP,
        ItemTpl.AMMO_556X45_M855,
        ItemTpl.AMMO_556X45_M855A1,
        ItemTpl.AMMO_556X45_M856,
        ItemTpl.AMMO_556X45_M856A1,
        ItemTpl.AMMO_556X45_M995,
        ItemTpl.AMMO_556X45_RRLP,
        ItemTpl.AMMO_556X45_SOST,
        ItemTpl.AMMO_556X45_SSA_AP,
        ItemTpl.AMMO_556X45_WARMAGE,
        // 6.8x51
        ItemTpl.AMMO_68X51_FMJ,
        ItemTpl.AMMO_68X51_HYBRID,
        // 7.62x39
        ItemTpl.AMMO_762X39_BP,
        ItemTpl.AMMO_762X39_FMJ,
        ItemTpl.AMMO_762X39_HP,
        ItemTpl.AMMO_762X39_MAI_AP,
        ItemTpl.AMMO_762X39_PP,
        ItemTpl.AMMO_762X39_PS,
        ItemTpl.AMMO_762X39_SP,
        ItemTpl.AMMO_762X39_T45M1,
        ItemTpl.AMMO_762X39_US,
        // 7.62x51
        ItemTpl.AMMO_762X51_BCP_FMJ,
        ItemTpl.AMMO_762X51_M61,
        ItemTpl.AMMO_762X51_M62,
        ItemTpl.AMMO_762X51_M80,
        ItemTpl.AMMO_762X51_M80A1,
        ItemTpl.AMMO_762X51_M993,
        ItemTpl.AMMO_762X51_TCW_SP,
        ItemTpl.AMMO_762X51_ULTRA_NOSLER,
        // 9x39
        ItemTpl.AMMO_9X39_BP,
        ItemTpl.AMMO_9X39_FMJ,
        ItemTpl.AMMO_9X39_PAB9,
        ItemTpl.AMMO_9X39_SP5,
        ItemTpl.AMMO_9X39_SP6,
        ItemTpl.AMMO_9X39_SPP
    ];

    public static HashSet<MongoId> SinperAmmoSet { get; } = [
        // .338LM
        ItemTpl.AMMO_86X70_AP,
        ItemTpl.AMMO_86X70_FMJ,
        ItemTpl.AMMO_86X70_TACX,
        ItemTpl.AMMO_86X70_UCW,
        // .50BMG
        ItemTpl.AMMO_127X99_HP,
        ItemTpl.AMMO_127X99_M21,
        ItemTpl.AMMO_127X99_M33,
        ItemTpl.AMMO_127X99_M903,
        // 7.62x54R
        ItemTpl.AMMO_762X54R_BS,
        ItemTpl.AMMO_762X54R_BT,
        ItemTpl.AMMO_762X54R_FMJ,
        ItemTpl.AMMO_762X54R_HP_BT,
        ItemTpl.AMMO_762X54R_LPS,
        ItemTpl.AMMO_762X54R_PS,
        ItemTpl.AMMO_762X54R_SNB,
        ItemTpl.AMMO_762X54R_SP_BT,
        ItemTpl.AMMO_762X54R_T46M
    ];
}
