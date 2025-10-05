import {DependencyContainer} from 'tsyringe';
import {IPreSptLoadMod} from '@spt/models/external/IPreSptLoadMod';
import {IPostDBLoadMod} from '@spt/models/external/IPostDBLoadMod';
import {IPostSptLoadMod} from '@spt/models/external/IPostSptLoadMod';
import {ILogger} from "@spt/models/spt/utils/ILogger";
import {DatabaseServer} from '@spt/servers/DatabaseServer';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ProfileHelper} from '@spt/helpers/ProfileHelper';
import {ItemHelper} from '@spt/helpers/ItemHelper';
import {ConfigServer} from '@spt/servers/ConfigServer';
import {ConfigTypes} from '@spt/models/enums/ConfigTypes';
import {IRagfairConfig} from '@spt/models/spt/config/IRagfairConfig';
import {IHideoutConfig} from '@spt/models/spt/config/IHideoutConfig';
import {IBotConfig} from '@spt/models/spt/config/IBotConfig';
import {ISeasonalEventConfig} from '@spt/models/spt/config/ISeasonalEventConfig';
import {ILostOnDeathConfig} from '@spt/models/spt/config/ILostOnDeathConfig';
import {CustomItemService} from '@spt/services/mod/CustomItemService';
import {HandbookHelper} from '@spt/helpers/HandbookHelper';
import myConfig from './config.json';
import applyGlobalConfig from './modifies/applyGlobalConfig';
import modifyBaseClassBackpack from './modifies/modifyBaseClassBackpack';
import modifyBaseClassSimpleContainer from './modifies/modifyBaseClassSimpleContainer';
import modifyBaseClassLockableContainer from './modifies/modifyBaseClassLockableContainer';
import modifyBaseClassSecureContainer from './modifies/modifyBaseClassSecureContainer';
import modifyBaseClassPistol from './modifies/modifyBaseClassPistol';
import modifyBaseClassShotgun from './modifies/modifyBaseClassShotgun';
import modifyBaseClassGrenadeLauncher from './modifies/modifyBaseClassGrenadeLauncher';
import modifyBaseClassSmg from './modifies/modifyBaseClassSmg';
import modifyBaseClassSniperRifle from './modifies/modifyBaseClassSniperRifle';
import modifyBaseClassRevolver from './modifies/modifyBaseClassRevolver';
import modifyBaseClassMarksmanRifle from './modifies/modifyBaseClassMarksmanRifle';
import modifyBaseClassMachineGun from './modifies/modifyBaseClassMachineGun';
import modifyBaseClassAssaultCarbine from './modifies/modifyBaseClassAssaultCarbine';
import modifyBaseClassAssaultRifle from './modifies/modifyBaseClassAssaultRifle';
import modifyBaseClassMoney from './modifies/modifyBaseClassMoney';
import modifyBaseClassAmmo from './modifies/modifyBaseClassAmmo';
import modifyBaseClassThrowWeapon from './modifies/modifyBaseClassThrowWeapon';
import modifyBaseClassMagazine from './modifies/modifyBaseClassMagazine';
import modifyBaseClassIronSight from './modifies/modifyBaseClassIronSight';
import modifyBaseClassQuickSight from './modifies/modifyBaseClassQuickSight';
import modifyBaseClassOpticSight from './modifies/modifyBaseClassOpticSight';
import modifyBaseClassVest from './modifies/modifyBaseClassVest';
import modifyBaseClassInventory from './modifies/modifyBaseClassInventory';
import modifyBaseClassArmor from './modifies/modifyBaseClassArmor';
import addNewItemBigMedkit from './modifies/addNewItemBigMedkit';
import addNewItemBigDrink from './modifies/addNewItemBigDrink';
import addNewItemBigFood from './modifies/addNewItemBigFood';
import addNewItemSpecialPocket from './modifies/addNewItemSpecialPocket';
import modifyBotHealth from './modifies/modifyBotHealth';
import modifyPlayerHealth from './modifies/modifyPlayerHealth';
import addNewItemSpecialVestRig from './modifies/addNewItemSpecialVestRig';
import addNewItemSpecialSecureContainer from './modifies/addNewItemSpecialSecureContainer';
import addNewItemSpecialConsumeContainer from './modifies/addNewItemSpecialConsumeContainer';
import addNewItemSpecialMedicalContainer from './modifies/addNewItemSpecialMedicalContainer';
import addNewItemSpecialMagazineContainer from './modifies/addNewItemSpecialMagazineContainer';
import modifyBaseClassHeadwear from './modifies/modifyBaseClassHeadwear';
import modifyBaseClassHeadphones from './modifies/modifyBaseClassHeadphones';
import modifyBaseClassVisors from './modifies/modifyBaseClassVisors';
import modifyBaseClassFacecover from './modifies/modifyBaseClassFacecover';
import addNewItemSpecialAmmoContainer from './modifies/addNewItemSpecialAmmoContainer';
import addNewItemSpecialAutoPistol from './modifies/addNewItemSpecialAutoPistol';
import addNewItemSpecialSubMachineGun from './modifies/addNewItemSpecialSubMachineGun';
import addNewItemSpecialRifleMagazine1 from './modifies/addNewItemSpecialRifleMagazine1';
import addNewItemSpecialAssaultRifle from './modifies/addNewItemSpecialAssaultRifle';
import addNewItemSpecialGrenadeContainer from './modifies/addNewItemSpecialGrenadeContainer';
import addNewItemSpecialItemContainer from './modifies/addNewItemSpecialItemContainer';
import addNewItemSpecialPistolMagazine1 from './modifies/addNewItemSpecialPistolMagazine1';
import addNewItemSpecialWeaponContainer from './modifies/addNewItemSpecialWeaponContainer';
import addNewItemSpecialLightPlateCarrier from './modifies/addNewItemSpecialLightPlateCarrier';
import addNewItemSpecialHeavyPlateCarrier from './modifies/addNewItemSpecialHeavyPlateCarrier';
import modifyBaseClassItem from './modifies/modifyBaseClassItem';
import modifyBaseClassNightVision from './modifies/modifyBaseClassNightVision';
import modifyBaseClassThermalVision from './modifies/modifyBaseClassThermalVision';
import addNewItemBigHealingInjector from './modifies/addNewItemBigHealingInjector';
import enhancedMPR45 from './modifies/enhancedMPR45';
import addNewItemSpecialNightVisionDevice from './modifies/addNewItemSpecialNightVisionDevice';
import addNewItemSpecialThermalVisionDevice from './modifies/addNewItemSpecialThermalVisionDevice';
import addNewItemSpecialContainerArmband from './modifies/addNewItemSpecialContainerArmband';
import addNewItemBigBuffInjector from './modifies/addNewItemBigBuffInjector';
import addNewItemSpecialSmallBackpack from './modifies/addNewItemSpecialSmallBackpack';
import addNewItemSpecialBigBackpack from './modifies/addNewItemSpecialBigBackpack';
import addNewItemSpecialMeleeWeapon from './modifies/addNewItemSpecialMeleeWeapon';
import addNewItemSpecialAmmoArmband from './modifies/addNewItemSpecialAmmoArmband';
import addNewItemSpecialGrenadeLauncher from './modifies/addNewItemSpecialGrenadeLauncher';
import addNewItemSpecialGrenadeLauncherMagazine from './modifies/addNewItemSpecialGrenadeLauncherMagazine';
import addNewItemSpecialArmorPlate5 from './modifies/addNewItemSpecialArmorPlate5';
import addNewItemSpecialArmorPlate6 from './modifies/addNewItemSpecialArmorPlate6';

// example：https://github.com/sp-tarkov/mod-examples

class Mod implements IPreSptLoadMod,IPostDBLoadMod,IPostSptLoadMod {
  private logger: ILogger;
  private databaseServer: DatabaseServer;
  private profileHelper: ProfileHelper;
  private itemHelper: ItemHelper;
  private handbookHelper: HandbookHelper;
  private configServer: ConfigServer;
  private customItemService: CustomItemService;

  public preSptLoad(container: DependencyContainer): void {
    this.logger = container.resolve<ILogger>('WinstonLogger');
    this.databaseServer = container.resolve<DatabaseServer>('DatabaseServer');
    this.profileHelper = container.resolve<ProfileHelper>('ProfileHelper');
    this.itemHelper = container.resolve<ItemHelper>('ItemHelper');
    this.handbookHelper = container.resolve<HandbookHelper>('HandbookHelper');
    this.configServer = container.resolve<ConfigServer>('ConfigServer');
    this.customItemService = container.resolve<CustomItemService>('CustomItemService');
  }

  public postDBLoad(container: DependencyContainer): void {
    const tables: IDatabaseTables = this.databaseServer.getTables();
    const lostOnDeathConfig: ILostOnDeathConfig = this.configServer.getConfig<ILostOnDeathConfig>(ConfigTypes.LOST_ON_DEATH);
    const ragfairConfig: IRagfairConfig = this.configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
    const hideoutConfig: IHideoutConfig = this.configServer.getConfig<IHideoutConfig>(ConfigTypes.HIDEOUT);
    const botConfig: IBotConfig = this.configServer.getConfig<IBotConfig>(ConfigTypes.BOT);
    const seasonalEventConfig: ISeasonalEventConfig = this.configServer.getConfig<ISeasonalEventConfig>(ConfigTypes.SEASONAL_EVENT);

    // global
    myConfig.applyGlobalConfig && applyGlobalConfig(
      this.logger,
      hideoutConfig,
      lostOnDeathConfig,
      ragfairConfig,
      botConfig,
      seasonalEventConfig,
      tables,
      myConfig.allowRagfairList,
      myConfig.escapeTimeLimit
    );

    // 背包
    myConfig.modifyBaseClassBackpack && modifyBaseClassBackpack(this.logger,this.itemHelper,tables);

    // 容器
    myConfig.modifyBaseClassSimpleContainer && modifyBaseClassSimpleContainer(this.logger,this.itemHelper,tables);

    // 上锁容器
    myConfig.modifyBaseClassLockableContainer && modifyBaseClassLockableContainer(this.logger,this.itemHelper,tables);

    // 安全箱
    myConfig.modifyBaseClassSecureContainer && modifyBaseClassSecureContainer(this.logger,this.itemHelper,tables);

    // 夜视仪
    myConfig.modifyBaseClassNightVision && modifyBaseClassNightVision(this.logger,this.itemHelper,tables);

    // 热成像
    myConfig.modifyBaseClassThermalVision && modifyBaseClassThermalVision(this.logger,this.itemHelper,tables);

    // 手枪
    myConfig.modifyBaseClassPistol && modifyBaseClassPistol(this.logger,this.itemHelper,tables);

    // 霰弹枪
    myConfig.modifyBaseClassShotgun && modifyBaseClassShotgun(this.logger,this.itemHelper,tables);

    // 榴弹发射器
    myConfig.modifyBaseClassGrenadeLauncher && modifyBaseClassGrenadeLauncher(this.logger,this.itemHelper,tables);

    // 冲锋枪
    myConfig.modifyBaseClassSmg && modifyBaseClassSmg(this.logger,this.itemHelper,tables);

    // 狙击步枪
    myConfig.modifyBaseClassSniperRifle && modifyBaseClassSniperRifle(this.logger,this.itemHelper,tables);

    // 转轮手枪
    myConfig.modifyBaseClassRevolver && modifyBaseClassRevolver(this.logger,this.itemHelper,tables);

    // 精确射手步枪
    myConfig.modifyBaseClassMarksmanRifle && modifyBaseClassMarksmanRifle(this.logger,this.itemHelper,tables);

    // 机枪
    myConfig.modifyBaseClassMachineGun && modifyBaseClassMachineGun(this.logger,this.itemHelper,tables);

    // 突击卡宾枪
    myConfig.modifyBaseClassAssaultCarbine && modifyBaseClassAssaultCarbine(this.logger,this.itemHelper,tables);

    // 突击步枪
    myConfig.modifyBaseClassAssaultRifle && modifyBaseClassAssaultRifle(this.logger,this.itemHelper,tables);

    // 货币堆叠
    myConfig.modifyBaseClassMoney && modifyBaseClassMoney(this.logger,this.itemHelper,tables);

    // 弹药，包括榴弹，堆叠 300，堆叠改太大容易在空投捡到大量高级弹药
    myConfig.modifyBaseClassAmmo && modifyBaseClassAmmo(this.logger,this.itemHelper,tables);

    // 投掷武器，包括手榴弹，可出售
    // 改堆叠数量无用，投掷会清空整个堆叠
    myConfig.modifyBaseClassThrowWeapon && modifyBaseClassThrowWeapon(this.logger,this.itemHelper,tables);

    // 弹匣，不包括转轮手枪弹巢
    myConfig.modifyBaseClassMagazine && modifyBaseClassMagazine(this.logger,this.itemHelper,tables);

    // 瞄具
    myConfig.modifyBaseClassIronSight && modifyBaseClassIronSight(this.logger,this.itemHelper,tables);
    myConfig.modifyBaseClassQuickSight && modifyBaseClassQuickSight(this.logger,this.itemHelper,tables);
    myConfig.modifyBaseClassOpticSight && modifyBaseClassOpticSight(this.logger,this.itemHelper,tables);

    // 胸挂
    myConfig.modifyBaseClassVest && modifyBaseClassVest(this.logger,this.itemHelper,tables);

    // 护甲
    myConfig.modifyBaseClassArmor && modifyBaseClassArmor(this.logger,this.itemHelper,tables);

    // 头盔
    myConfig.modifyBaseClassHeadwear && modifyBaseClassHeadwear(this.logger,this.itemHelper,tables);

    // 耳机
    myConfig.modifyBaseClassHeadphones && modifyBaseClassHeadphones(this.logger,this.itemHelper,tables);

    // 观测物品，包括护目镜
    myConfig.modifyBaseClassVisors && modifyBaseClassVisors(this.logger,this.itemHelper,tables);

    // 面部装备
    myConfig.modifyBaseClassFacecover && modifyBaseClassFacecover(this.logger,this.itemHelper,tables);

    // 库存调整
    // 主要是让手枪位置可以放入榴弹发射器
    myConfig.modifyBaseClassInventory && modifyBaseClassInventory(this.logger,this.itemHelper,tables);

    // 所有物品占位 1x1
    myConfig.modifyBaseClassItem && modifyBaseClassItem(this.logger,tables);

    // MPR45 侧轨增强
    myConfig.enhancedMPR45 && enhancedMPR45(this.logger,this.itemHelper,tables);

    // AI 生命值修改
    modifyBotHealth(this.logger,tables,myConfig.modifyBotHealthMultiple);

    // 自定义物品：超大医疗包
    addNewItemBigMedkit(this.logger,this.customItemService,this.itemHelper,tables);

    // 自定义物品：超大治疗针
    addNewItemBigHealingInjector(this.logger,this.customItemService,this.itemHelper,tables);

    // 自定义物品：超大状态针
    addNewItemBigBuffInjector(this.logger,this.customItemService,this.itemHelper,tables);

    // 自定义物品：超大水
    addNewItemBigDrink(this.logger,this.customItemService,this.itemHelper,tables);

    // 自定义物品：超大食物
    addNewItemBigFood(this.logger,this.customItemService,this.itemHelper,tables);

    // 自定义物品：特制口袋
    //addNewItemSpecialPocket(this.logger,this.customItemService,tables);

    // 自定义物品：特制胸挂
    addNewItemSpecialVestRig(this.logger,this.customItemService,tables);

    // 自定义物品：特制插板背心
    addNewItemSpecialArmorPlate5(this.logger,this.customItemService,tables);
    addNewItemSpecialArmorPlate6(this.logger,this.customItemService,tables);
    addNewItemSpecialLightPlateCarrier(this.logger,this.customItemService,tables);
    addNewItemSpecialHeavyPlateCarrier(this.logger,this.customItemService,tables);

    // 自定义物品：特制安全箱
    addNewItemSpecialSecureContainer(this.logger,this.customItemService,tables);

    // 自定义物品：特制食物箱
    addNewItemSpecialConsumeContainer(this.logger,this.customItemService,tables);

    // 自定义物品：特制医药箱
    addNewItemSpecialMedicalContainer(this.logger,this.customItemService,tables);

    // 自定义物品：特制弹匣箱
    addNewItemSpecialMagazineContainer(this.logger,this.customItemService,tables);

    // 自定义物品：特制弹药箱
    addNewItemSpecialAmmoContainer(this.logger,this.customItemService,tables);

    // 自定义物品：特制手榴弹箱
    addNewItemSpecialGrenadeContainer(this.logger,this.customItemService,tables);

    // 自定义物品：特制武器箱
    addNewItemSpecialWeaponContainer(this.logger,this.customItemService,tables);

    // 自定义物品：特制物品箱
    addNewItemSpecialItemContainer(this.logger,this.customItemService,tables);

    // 自定义物品：特制武器适用弹匣
    addNewItemSpecialPistolMagazine1(this.logger,this.customItemService,tables);
    addNewItemSpecialRifleMagazine1(this.logger,this.customItemService,tables);
    addNewItemSpecialGrenadeLauncherMagazine(this.logger,this.customItemService,tables);

    // 自定义物品：特制手枪
    addNewItemSpecialAutoPistol(this.logger,this.customItemService,tables);

    // 自定义物品：特制冲锋枪
    addNewItemSpecialSubMachineGun(this.logger,this.customItemService,tables);

    // 自定义物品：特制突击步枪
    addNewItemSpecialAssaultRifle(this.logger,this.customItemService,tables);

    // 自定义物品：特制榴弹发射器
    addNewItemSpecialGrenadeLauncher(this.logger,this.customItemService,tables);

    // 自定义物品：特制夜视仪
    addNewItemSpecialNightVisionDevice(this.logger,this.customItemService,this.itemHelper,tables);

    // 自定义物品：特制热成像
    addNewItemSpecialThermalVisionDevice(this.logger,this.customItemService,this.itemHelper,tables);

    // 自定义物品：特制空间臂带
    addNewItemSpecialContainerArmband(this.logger,this.customItemService,tables);

    // 自定义物品：特制子弹臂带
    addNewItemSpecialAmmoArmband(this.logger,this.customItemService,tables);

    // 自定义物品：特制背包，6x6 和 6x12
    addNewItemSpecialSmallBackpack(this.logger,this.customItemService,tables);
    addNewItemSpecialBigBackpack(this.logger,this.customItemService,tables);

    // 自定义物品：特制近战武器
    addNewItemSpecialMeleeWeapon(this.logger,this.customItemService,tables);

    //
    this.logger.success('[MyCustomSPTAKI]: 处理完成');
  }

  public postSptLoad(container: DependencyContainer): void {
    const profiles = this.profileHelper.getProfiles();

    // 玩家生命值修改
    modifyPlayerHealth(this.logger,profiles,myConfig.modifyPlayerHealth);
  }
}

export const mod = new Mod();
