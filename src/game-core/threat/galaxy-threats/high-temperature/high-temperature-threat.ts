import {gameplayState, gameState} from '../../../../core/game-platform';
import {GalaxyAreaState} from '../../../../engine/game-state/gameplay-state/galaxy-state/galaxy-area-state/galaxy-area-state';
import {PlanetState} from '../../../../engine/game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/planet-state';
import {Threat} from '../../threat';
import {TourEffect} from '../../../tour/tour-effect/tour-effect';

export class HighTemperatureThreat extends Threat {
    public name = 'High temperature';
    public description = 'Test';

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
                gameplayState().galaxyState.galaxyAreaStates.forEach((area: GalaxyAreaState) => {
                    area.planetStates.forEach((planet: PlanetState) => {
                        planet.temperature += this.value;
                    });
                });
            })
        );
    }

    public stop(): void {
        gameState().tourManager.addTourEffect(
            new TourEffect(9999, true, () => {
                gameplayState().galaxyState.galaxyAreaStates.forEach((area: GalaxyAreaState) => {
                    area.planetStates.forEach((planet: PlanetState) => {
                        planet.temperature -= this.value;
                    });
                });
            })
        );
    }

    public remove(): void {
        gameState().tourManager.addTourEffect(
            new TourEffect(10000, true, () => {
                gameplayState().galaxyState.galaxyOriginState.threats = gameplayState().galaxyState.galaxyOriginState.threats.filter((el: Threat) => el !== this);
            })
        );
    }
}
