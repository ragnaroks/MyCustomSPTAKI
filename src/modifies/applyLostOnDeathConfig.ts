import {ILostOnDeathConfig} from '@spt/models/spt/config/ILostOnDeathConfig';
import {ILogger} from '@spt/models/spt/utils/ILogger';

export default function applyLostOnDeathConfig(logger:ILogger,lostOnDeathConfig:ILostOnDeathConfig) : void {
  lostOnDeathConfig.questItems = false;
  lostOnDeathConfig.specialSlotItems = false;
  lostOnDeathConfig.equipment.ArmBand = false;
  lostOnDeathConfig.equipment.TacticalVest = false;
  lostOnDeathConfig.equipment.PocketItems = false;
  lostOnDeathConfig.equipment.Holster = false;
  lostOnDeathConfig.equipment.Scabbard = false;

  logger.success('[MyCustomSPTAKI]: lostOnDeathConfig 已调整');
}
