import {GalaxyAreaState} from '../../../../engine/game-state/gameplay-state/galaxy-state/galaxy-area-state/galaxy-area-state';
import {PlanetState} from '../../../../engine/game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/planet-state';
import {Threat} from '../../threat';
import {TourEffect} from '../../../tour/tour-effect/tour-effect';
import {gameState, gameplayState} from '../../../../core/game-platform';

export class LowTemperatureThreat extends Threat {
    public name = 'Low temperature';
    public description = 'Test';
    public value: number;

    public start(): void {
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

    public stop(): void {
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

    public remove(): void {
        gameState().tourManager.addTourEffect(
            new TourEffect(10000, true, () => {
                gameplayState().galaxyState.galaxyOriginState.threats = gameplayState().galaxyState.galaxyOriginState.threats.filter((el: Threat) => el !== this);
            })
        );
    }
}
