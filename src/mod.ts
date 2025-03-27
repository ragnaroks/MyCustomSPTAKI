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
import {ILostOnDeathConfig} from '@spt/models/spt/config/ILostOnDeathConfig';
import {CustomItemService} from '@spt/services/mod/CustomItemService';
import myConfig from './config.json';
import applyGlobalConfig from './modifies/applyGlobalConfig';
import applyLostOnDeathConfig from './modifies/applyLostOnDeathConfig';
import applyRagfairConfig from './modifies/applyRagfairConfig';
import applyHideoutConfig from './modifies/applyHideoutConfig';
import applyExfilConfig from './modifies/applyExfilConfig';
import applyInsuranceConfig from './modifies/applyInsuranceConfig';
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
import modifyBaseClassMasterMod from './modifies/modifyBaseClassMasterMod';
import modifyBaseClassBarrel from './modifies/modifyBaseClassBarrel';
import modifyBaseClassSilencer from './modifies/modifyBaseClassSilencer';
import modifyBaseClassUBGL from './modifies/modifyBaseClassUBGL';
import modifyBaseClassMoney from './modifies/modifyBaseClassMoney';
import modifyBaseClassAmmo from './modifies/modifyBaseClassAmmo';
import modifyBaseClassThrowWeapon from './modifies/modifyBaseClassThrowWeapon';
import modifyBaseClassMagazine from './modifies/modifyBaseClassMagazine';
import modifyBaseClassPistolGrip from './modifies/modifyBaseClassPistolGrip';
import modifyBaseClassForeGrip from './modifies/modifyBaseClassForeGrip';
import modifyBaseClassStock from './modifies/modifyBaseClassStock';
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
import addNewItemSpecialRig from './modifies/addNewItemSpecialRig';
import addNewItemSpecialSecureContainer from './modifies/addNewItemSpecialSecureContainer';
import addNewItemSpecialConsumeContainer from './modifies/addNewItemSpecialConsumeContainer';
import addNewItemSpecialMedicalContainer from './modifies/addNewItemSpecialMedicalContainer';
import addNewItemSpecialMagazineContainer from './modifies/addNewItemSpecialMagazineContainer';
import modifyBaseClassHeadwear from './modifies/modifyBaseClassHeadwear';
import modifyBaseClassHeadphones from './modifies/modifyBaseClassHeadphones';
import modifyBaseClassVisors from './modifies/modifyBaseClassVisors';
import modifyBaseClassFacecover from './modifies/modifyBaseClassFacecover';
import modifyBaseClassMount from './modifies/modifyBaseClassMount';
import modifyBaseClassHandguard from './modifies/modifyBaseClassHandguard';
import modifyBaseClassReceiver from './modifies/modifyBaseClassReceiver';
import addNewItemSpecialAmmoContainer from './modifies/addNewItemSpecialAmmoContainer';
import addNewItemSpecialAutoPistol from './modifies/addNewItemSpecialAutoPistol';
import addNewItemSpecialSubMachineGun from './modifies/addNewItemSpecialSubMachineGun';
import addNewItemSpecialRifleMagazine1 from './modifies/addNewItemSpecialRifleMagazine1';
import addNewItemSpecialAssaultRifle from './modifies/addNewItemSpecialAssaultRifle';
import addNewItemSpecialGrenadeContainer from './modifies/addNewItemSpecialGrenadeContainer';
import addNewItemSpecialItemContainer from './modifies/addNewItemSpecialItemContainer';
import addNewItemSpecialPistolMagazine1 from './modifies/addNewItemSpecialPistolMagazine1';
import addNewItemSpecialPistolMagazine2 from './modifies/addNewItemSpecialPistolMagazine2';
import addNewItemSpecialRifleMagazine2 from './modifies/addNewItemSpecialRifleMagazine2';
import addNewItemSpecialRifleMagazine3 from './modifies/addNewItemSpecialRifleMagazine3';
import addNewItemSpecialPistolMagazine3 from './modifies/addNewItemSpecialPistolMagazine3';
import addNewItemSpecialWeaponContainer from './modifies/addNewItemSpecialWeaponContainer';
import modifyBaseClassCompensator from './modifies/modifyBaseClassCompensator';
import modifyBaseClassFlashHider from './modifies/modifyBaseClassFlashHider';
import modifyBaseClassCombMuzzleDevice from './modifies/modifyBaseClassCombMuzzleDevice';

// example：https://dev.sp-tarkov.com/chomp/ModExamples/

class Mod implements IPreSptLoadMod,IPostDBLoadMod,IPostSptLoadMod {
  private logger:ILogger;
  private databaseServer:DatabaseServer;
  private profileHelper:ProfileHelper;
  private itemHelper:ItemHelper;
  private configServer:ConfigServer;
  private customItemService:CustomItemService;

  public preSptLoad(container:DependencyContainer): void {
    this.logger = container.resolve<ILogger>('WinstonLogger');
    this.databaseServer = container.resolve<DatabaseServer>('DatabaseServer');
    this.profileHelper = container.resolve<ProfileHelper>('ProfileHelper');
    this.itemHelper = container.resolve<ItemHelper>('ItemHelper');
    this.configServer = container.resolve<ConfigServer>('ConfigServer');
    this.customItemService = container.resolve<CustomItemService>('CustomItemService');
  }

  public postDBLoad(container:DependencyContainer): void {
    const tables: IDatabaseTables = this.databaseServer.getTables();
    const lostOnDeathConfig: ILostOnDeathConfig = this.configServer.getConfig<ILostOnDeathConfig>(ConfigTypes.LOST_ON_DEATH);
    const ragfairConfig: IRagfairConfig = this.configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
    const hideoutConfig: IHideoutConfig = this.configServer.getConfig<IHideoutConfig>(ConfigTypes.HIDEOUT);
    
    // global
    myConfig.applyGlobalConfig && applyGlobalConfig(this.logger,tables);
    
    // lostOnDeathConfig
    myConfig.applyLostOnDeathConfig && applyLostOnDeathConfig(this.logger,lostOnDeathConfig);

    // ragfairConfig
    myConfig.applyRagfairConfig && applyRagfairConfig(this.logger,ragfairConfig);

    // hideoutConfig
    myConfig.applyHideoutConfig && applyHideoutConfig(this.logger,hideoutConfig);
    
    // exfil
    myConfig.applyExfilConfig && applyExfilConfig(this.logger,tables);
    
    // 保险归还
    myConfig.applyInsuranceConfig && applyInsuranceConfig(this.logger,tables);
    
    // 背包无副作用，占位 1x1，可交易
    myConfig.modifyBaseClassBackpack && modifyBaseClassBackpack(this.logger,this.itemHelper,tables);
    
    // 容器无副作用，占位 1x1，可交易
    myConfig.modifyBaseClassSimpleContainer && modifyBaseClassSimpleContainer(this.logger,this.itemHelper,tables);
    
    // 上锁容器无副作用，占位 1x1，包含几个任务物品
    myConfig.modifyBaseClassLockableContainer && modifyBaseClassLockableContainer(this.logger,this.itemHelper,tables);
    
    // 安全箱无副作用，负重修改，可存放任何物品但不包括安全箱
    myConfig.modifyBaseClassSecureContainer && modifyBaseClassSecureContainer(this.logger,this.itemHelper,tables);
    
    // 夜视仪增强
    //modifyBaseClassNightVision(this.logger,this.itemHelper,tables);

    // 手枪增强
    myConfig.modifyBaseClassPistol && modifyBaseClassPistol(this.logger,this.itemHelper,tables);
    
    // 霰弹枪增强
    myConfig.modifyBaseClassShotgun && modifyBaseClassShotgun(this.logger,this.itemHelper,tables);
    
    // 榴弹发射器增强
    myConfig.modifyBaseClassGrenadeLauncher && modifyBaseClassGrenadeLauncher(this.logger,this.itemHelper,tables);
    
    // 冲锋枪增强
    myConfig.modifyBaseClassSmg && modifyBaseClassSmg(this.logger,this.itemHelper,tables);
    
    // 狙击步枪增强
    myConfig.modifyBaseClassSniperRifle && modifyBaseClassSniperRifle(this.logger,this.itemHelper,tables);
    
    // 转轮手枪增强
    myConfig.modifyBaseClassRevolver && modifyBaseClassRevolver(this.logger,this.itemHelper,tables);
    
    // 精确射手步枪增强
    myConfig.modifyBaseClassMarksmanRifle && modifyBaseClassMarksmanRifle(this.logger,this.itemHelper,tables);
    
    // 机枪增强
    myConfig.modifyBaseClassMachineGun && modifyBaseClassMachineGun(this.logger,this.itemHelper,tables);

    // 突击卡宾枪增强
    myConfig.modifyBaseClassAssaultCarbine && modifyBaseClassAssaultCarbine(this.logger,this.itemHelper,tables);

    // 突击步枪增强
    myConfig.modifyBaseClassAssaultRifle && modifyBaseClassAssaultRifle(this.logger,this.itemHelper,tables);

    // 武器配件增强
    myConfig.modifyBaseClassMasterMod && modifyBaseClassMasterMod(this.logger,this.itemHelper,tables);

    // 枪管调整
    myConfig.modifyBaseClassBarrel && modifyBaseClassBarrel(this.logger,this.itemHelper,tables);

    // 组合式膛口装置
    myConfig.modifyBaseClassCombMuzzleDevice && modifyBaseClassCombMuzzleDevice(this.logger,this.itemHelper,tables);

    // 消焰器增强
    myConfig.modifyBaseClassFlashHider && modifyBaseClassFlashHider(this.logger,this.itemHelper,tables);

    // 制退器增强
    myConfig.modifyBaseClassCompensator && modifyBaseClassCompensator(this.logger,this.itemHelper,tables);

    // 消音器增强
    myConfig.modifyBaseClassSilencer && modifyBaseClassSilencer(this.logger,this.itemHelper,tables);

    // 下挂式发射器增强
    myConfig.modifyBaseClassUBGL && modifyBaseClassUBGL(this.logger,this.itemHelper,tables);
    
    // 货币堆叠
    myConfig.modifyBaseClassMoney && modifyBaseClassMoney(this.logger,this.itemHelper,tables);
    
    // 弹药，包括榴弹，可出售，堆叠 9600（40、50、60 均能除尽 1200，再放大几倍）
    myConfig.modifyBaseClassAmmo && modifyBaseClassAmmo(this.logger,this.itemHelper,tables);
    
    // 投掷武器，包括手榴弹，可出售
    // 改堆叠数量无用，投掷会清空整个堆叠
    myConfig.modifyBaseClassThrowWeapon && modifyBaseClassThrowWeapon(this.logger,this.itemHelper,tables);
    
    // 弹匣增强，人机优化，占位 1x1，不包括转轮手枪弹巢
    myConfig.modifyBaseClassMagazine && modifyBaseClassMagazine(this.logger,this.itemHelper,tables);

    // 手枪式握把增强
    myConfig.modifyBaseClassPistolGrip && modifyBaseClassPistolGrip(this.logger,this.itemHelper,tables);

    // 前握把增强
    myConfig.modifyBaseClassForeGrip && modifyBaseClassForeGrip(this.logger,this.itemHelper,tables);

    // 枪托增强
    myConfig.modifyBaseClassStock && modifyBaseClassStock(this.logger,this.itemHelper,tables);

    // 导轨调整
    myConfig.modifyBaseClassMount && modifyBaseClassMount(this.logger,this.itemHelper,tables);

    // 护木调整
    myConfig.modifyBaseClassHandguard && modifyBaseClassHandguard(this.logger,this.itemHelper,tables);

    // 上机匣调整
    myConfig.modifyBaseClassReceiver && modifyBaseClassReceiver(this.logger,this.itemHelper,tables);

    // 瞄具增强
    myConfig.modifyBaseClassIronSight && modifyBaseClassIronSight(this.logger,this.itemHelper,tables);
    myConfig.modifyBaseClassQuickSight && modifyBaseClassQuickSight(this.logger,this.itemHelper,tables);
    myConfig.modifyBaseClassOpticSight && modifyBaseClassOpticSight(this.logger,this.itemHelper,tables);

    // 胸挂增强
    myConfig.modifyBaseClassVest && modifyBaseClassVest(this.logger,this.itemHelper,tables);

    // 护甲插板增强
    myConfig.modifyBaseClassArmor && modifyBaseClassArmor(this.logger,this.itemHelper,tables);

    // 头盔增强
    myConfig.modifyBaseClassHeadwear && modifyBaseClassHeadwear(this.logger,this.itemHelper,tables);

    // 耳机增强
    myConfig.modifyBaseClassHeadphones && modifyBaseClassHeadphones(this.logger,this.itemHelper,tables);

    // 观测物品，包括护目镜
    myConfig.modifyBaseClassVisors && modifyBaseClassVisors(this.logger,this.itemHelper,tables);
    
    // 面部装备
    myConfig.modifyBaseClassFacecover && modifyBaseClassFacecover(this.logger,this.itemHelper,tables);

    // 物品增强，可堆叠，可出售
    // 排除可使用的物品（食物、药物等），排除任务物品
    // 物品堆叠会导致变成不可交易

    // 库存调整
    // 主要是让手枪位置可以放入榴弹发射器
    myConfig.modifyBaseClassInventory && modifyBaseClassInventory(this.logger,this.itemHelper,tables);

    // AI 生命值修改，不修改头部
    myConfig.modifyBotHealth && modifyBotHealth(this.logger,tables);
    
    // 自定义物品：超大医疗包
    addNewItemBigMedkit(this.logger,this.customItemService,tables);

    // 自定义物品：超大水
    addNewItemBigDrink(this.logger,this.customItemService,tables);

    // 自定义物品：超大食物
    addNewItemBigFood(this.logger,this.customItemService,tables);

    // 自定义物品：特制口袋
    addNewItemSpecialPocket(this.logger,this.customItemService,tables);

    // 自定义物品：特制胸挂
    addNewItemSpecialRig(this.logger,this.customItemService,tables);

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
    addNewItemSpecialPistolMagazine2(this.logger,this.customItemService,tables);
    addNewItemSpecialPistolMagazine3(this.logger,this.customItemService,tables);
    addNewItemSpecialRifleMagazine1(this.logger,this.customItemService,tables);
    addNewItemSpecialRifleMagazine2(this.logger,this.customItemService,tables);
    addNewItemSpecialRifleMagazine3(this.logger,this.customItemService,tables);

    // 自定义物品：特制手枪
    addNewItemSpecialAutoPistol(this.logger,this.customItemService,tables);

    // 自定义物品：特制冲锋枪
    addNewItemSpecialSubMachineGun(this.logger,this.customItemService,tables);

    // 自定义物品：特制突击步枪
    addNewItemSpecialAssaultRifle(this.logger,this.customItemService,tables);

    //
    this.logger.success('[MyCustomSPTAKI]: 处理完成');
  }
  
  public postSptLoad(container: DependencyContainer): void {
    const profiles = this.profileHelper.getProfiles();

    // 玩家生命值修改
    myConfig.modifyPlayerHealth && modifyPlayerHealth(this.logger,profiles);
  }
}

export const mod = new Mod();
