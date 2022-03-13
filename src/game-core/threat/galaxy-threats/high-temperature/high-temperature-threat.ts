import {GalaxyAreaState} from '../../../../engine/game-state/gameplay-state/galaxy-state/galaxy-area-state/galaxy-area-state';
import {HighTemperatureData} from './high-temperature-data';
import {PlanetState} from '../../../../engine/game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/planet-state';
import {Threat} from '../../threat';
import {ThreatTypeEnum} from '../../threat-type.enum';
import {TourEffect} from '../../../tour/tour-effect/tour-effect';
import {gameState, gameplayState} from '../../../../core/game-platform';

export class HighTemperatureThreat extends Threat<HighTemperatureData> {
    public type = ThreatTypeEnum.HIGH_TEMPERATURE_GALAXY_THREAT;

    constructor(public value: number,
                public tourStart: number,
                public tourEnd: number,
                public visibleFromTour: number,
                public unknownUntilTour: number) {
        super(tourStart, tourEnd, visibleFromTour, unknownUntilTour);
    }

    public start(): void {
        gameState().tourManager.addTourEffect(
            new TourEffect(9999, true, () => {
                gameplayState().galaxy.galaxyAreas.forEach((area: GalaxyAreaState) => {
                    area.planets.forEach((planet: PlanetState) => {
                        planet.temperature += this.value;
                    });
                });
            })
        );
    }

    public stop(): void {
        gameState().tourManager.addTourEffect(
            new TourEffect(9999, true, () => {
                gameplayState().galaxy.galaxyAreas.forEach((area: GalaxyAreaState) => {
                    area.planets.forEach((planet: PlanetState) => {
                        planet.temperature -= this.value;
                    });
                });
            })
        );
    }

    public remove(): void {
/*        gameState().tourManager.addTourEffect(
            new TourEffect(10000, true, () => {
                gameplayState().galaxyState.galaxyOriginState.threats = gameplayState().galaxyState.galaxyOriginState.threats.filter((el: Threat) => el !== this);
            })
        );*/
    }
}
