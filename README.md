# description
my personal custom modification for spt-aki

# install
unarchive released zip file and put them in your spt-aki game folder like `C:\EscapeFromTarkov`, it is should be have the file `SPT.Server.exe` there.

**this mod need latter order**, suggesting use [LOE](https://forge.sp-tarkov.com/mod/810/loe-load-order-editor) to set mods load order.

# configure
edit the `config.json`, suggest use VSCode or notepad2
```json
{
  "applyGlobalConfig":true,
  "allowRagfairList":[
    "66b5f6985891c84aab75ca76",
    "657089638db3adca1009f4ca",
    "5b4329f05acfc47a86086aa1",
    "5ea18c84ecf1982c7712d9a2",
    "5c0e66e2d174af02a96252f4",
    "5aa7e276e5b5b000171d0647",
    "5aa7e373e5b5b000137b76f0",
    "5f60c74e3b85f6263c145586",
    "5f60c85b58eff926626a60f7",
    "5ca20ee186f774799474abc2",
    "5ca2113f86f7740b2547e1d2"
  ],
  "applyLocationConfig":true,
  "escapeTimeLimit": 60,
  "modifyBaseClassBackpack":true,
  "modifyBaseClassSimpleContainer":true,
  "modifyBaseClassLockableContainer":true,
  "modifyBaseClassSecureContainer":true,
  "modifyBaseClassNightVision":true,
  "modifyBaseClassThermalVision":true,
  "modifyBaseClassPistol":true,
  "modifyBaseClassShotgun":true,
  "modifyBaseClassGrenadeLauncher":true,
  "modifyBaseClassSmg":true,
  "modifyBaseClassSniperRifle":true,
  "modifyBaseClassRevolver":true,
  "modifyBaseClassMarksmanRifle":true,
  "modifyBaseClassMachineGun":true,
  "modifyBaseClassAssaultCarbine":true,
  "modifyBaseClassAssaultRifle":true,
  "modifyBaseClassBarrel":true,
  "modifyBaseClassSilencer":true,
  "modifyBaseClassUBGL":true,
  "modifyBaseClassMoney":true,
  "modifyBaseClassAmmo":true,
  "modifyBaseClassThrowWeapon":true,
  "modifyBaseClassMagazine":true,
  "modifyBaseClassPistolGrip":true,
  "modifyBaseClassForeGrip":true,
  "modifyBaseClassStock":true,
  "modifyBaseClassIronSight":true,
  "modifyBaseClassQuickSight":true,
  "modifyBaseClassOpticSight":true,
  "modifyBaseClassVest":true,
  "modifyBaseClassArmor":true,
  "modifyBaseClassArmorPlant":true,
  "modifyBaseClassHeadwear":true,
  "modifyBaseClassHeadphones":true,
  "modifyBaseClassVisors":true,
  "modifyBaseClassFacecover":true,
  "modifyBaseClassInventory":true,
  "modifyBaseClassItem":true,
  "enhancedMPR45":true,
  // health scale but exclude head
  "modifyBotHealth":3,
  // health scale
  "modifyPlayerHealth":3
}
```

# attention
require clear cache after re-config/upgrade/delete this mod.
