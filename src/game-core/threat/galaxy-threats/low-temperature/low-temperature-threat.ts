import {AddTourEffect} from '../../../tour/tour-effect/add-tour-effect';
import {
    GalaxyAreaState
} from '../../../../engine/game-state/gameplay-state/galaxy-state/galaxy-area-state/galaxy-area-state';
import {HasTourEffects} from '../../../tour/tour-effect/has-tour-effects';
import {LowTemperatureData} from './low-temperature-data';
import {
    PlanetState
} from '../../../../engine/game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/planet-state';
import {Threat} from '../../threat';
import {ThreatTypeEnum} from '../../threat-type.enum';
import {gameplayState} from '../../../../core/game-platform';

@HasTourEffects()
export class LowTemperatureThreat extends Threat<LowTemperatureData> {
    public type = ThreatTypeEnum.LOW_TEMPERATURE_GALAXY_THREAT;

    constructor(public data: LowTemperatureData,
                public fromTour: number,
                public toTour: number,
                public visibleFromTour: number,
                public unknownUntilTour: number) {
        super(data, fromTour, toTour, visibleFromTour, unknownUntilTour);
    }

    @AddTourEffect({
        name: 'start',
        priority: 9999,
        fromTourFieldName: 'fromTour',
        toTourFieldName: 'fromTour'
    })
    public start(): void {
        gameplayState().galaxy.galaxyAreas.forEach((area: GalaxyAreaState) => {
            area.planets.forEach((planet: PlanetState) => {
                planet.temperature -= this.data.value;
            });
        });
    }

    @AddTourEffect({
        name: 'stop',
        priority: 9999,
        fromTourFieldName: 'toTour',
        toTourFieldName: 'toTour'
    })
    public stop(): void {
        gameplayState().galaxy.galaxyAreas.forEach((area: GalaxyAreaState) => {
            area.planets.forEach((planet: PlanetState) => {
                planet.temperature += this.data.value;
            });
        });
    }
}
