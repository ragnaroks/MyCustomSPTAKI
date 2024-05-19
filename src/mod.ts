import {DependencyContainer} from 'tsyringe';
import {IPostDBLoadMod} from '@spt-aki/models/external/IPostDBLoadMod';
import {ILogger} from "@spt-aki/models/spt/utils/ILogger";
import {DatabaseServer} from '@spt-aki/servers/DatabaseServer';
import {IDatabaseTables} from '@spt-aki/models/spt/server/IDatabaseTables';

class Mod implements IPostDBLoadMod {
    public postDBLoad(container:DependencyContainer): void {
        const logger = container.resolve<ILogger>('WinstonLogger');
        const databaseServer = container.resolve<DatabaseServer>('DatabaseServer');
        
        const tables:IDatabaseTables = databaseServer.getTables();

        // check time
        tables.globals.config.BaseCheckTime = 0.25;

        // ammo action time
        tables.globals.config.BaseLoadTime = 0.5;
        tables.globals.config.BaseUnloadTime = 0.1;

        // RestrictionsInRaid
        tables.globals.config.RestrictionsInRaid = [];

        // SkillMinEffectiveness
        tables.globals.config.SkillMinEffectiveness = 0;
        
        // EscapeTimeLimit
        tables.locations.bigmap.base.EscapeTimeLimit = 240;
        tables.locations.factory4_day.base.EscapeTimeLimit = 240;
        tables.locations.factory4_night.base.EscapeTimeLimit = 240;
        tables.locations.interchange.base.EscapeTimeLimit = 240;
        tables.locations.laboratory.base.EscapeTimeLimit = 240;
        tables.locations.lighthouse.base.EscapeTimeLimit = 240;
        tables.locations.rezervbase.base.EscapeTimeLimit = 240;
        tables.locations.sandbox.base.EscapeTimeLimit = 240;
        tables.locations.shoreline.base.EscapeTimeLimit = 240;
        tables.locations.tarkovstreets.base.EscapeTimeLimit = 240;
        tables.locations.woods.base.EscapeTimeLimit = 240;

        // scav period
        tables.globals.config.SavagePlayCooldown = 60;
        tables.globals.config.SavagePlayCooldownNdaFree = 60;

        logger.warning('[MyCustomSPTAKI]: modified');
    }
}

module.exports = {
    mod: new Mod()
};
