import {HighTemperatureThreat} from './galaxy-threats/high-temperature/high-temperature-threat';
import {Threat} from './threat';
import {
    ThreatSnapshot
} from '../../engine/game-load/game-snapshot/galaxy-snapshot/galaxy-origin-snapshot/threat-snapshot/threat-snapshot';
import {ThreatTypeEnum} from './threat-type.enum';

export class ThreatFactory {
    public create(threatType: ThreatTypeEnum, threatSnapshot: ThreatSnapshot<any>): Threat<any> {
        switch (threatType) {
            case ThreatTypeEnum.HIGH_TEMPERATURE_GALAXY_THREAT:
                return new HighTemperatureThreat(threatSnapshot.data.value, threatSnapshot.tourStart, threatSnapshot.tourEnd, threatSnapshot.visibleFromTour, threatSnapshot.unknownUntilTour);
        }
    }
}
