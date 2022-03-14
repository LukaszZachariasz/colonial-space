import {AddTourEffect} from '../../../tour/tour-effect/add-tour-effect';
import {
    GalaxyAreaState
} from '../../../../engine/game-state/gameplay-state/galaxy-state/galaxy-area-state/galaxy-area-state';
import {HasTourEffects} from '../../../tour/tour-effect/has-tour-effects';
import {HighTemperatureData} from './high-temperature-data';
import {
    PlanetState
} from '../../../../engine/game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/planet-state';
import {Threat} from '../../threat';
import {ThreatTypeEnum} from '../../threat-type.enum';
import {TourEffectPriorityEnum} from '../../../tour/tour-effect/tour-effect-priority.enum';
import {gameplayState} from '../../../../core/game-platform';

@HasTourEffects()
export class HighTemperatureThreat extends Threat<HighTemperatureData> {
    public type = ThreatTypeEnum.HIGH_TEMPERATURE_GALAXY_THREAT;

    constructor(public name: string,
                public data: HighTemperatureData,
                public fromTour: number,
                public toTour: number,
                public visibleFromTour: number,
                public unknownUntilTour: number) {
        super(data, fromTour, toTour, visibleFromTour, unknownUntilTour);
    }

    @AddTourEffect({
        name: 'start',
        priority: TourEffectPriorityEnum.START_THREAT_PRIORITY,
        fromTourFieldName: Threat.fromTourFieldName,
        toTourFieldName: Threat.fromTourFieldName
    })
    public start(): void {
        gameplayState().galaxy.galaxyAreas.forEach((area: GalaxyAreaState) => {
            area.planets.forEach((planet: PlanetState) => {
                planet.temperature += this.data.value;
            });
        });
    }

    @AddTourEffect({
        name: 'stop',
        priority: TourEffectPriorityEnum.STOP_THREAT_PRIORITY,
        fromTourFieldName: Threat.toTourFieldName,
        toTourFieldName: Threat.toTourFieldName
    })
    public stop(): void {
        gameplayState().galaxy.galaxyAreas.forEach((area: GalaxyAreaState) => {
            area.planets.forEach((planet: PlanetState) => {
                planet.temperature -= this.data.value;
            });
        });
    }
}
