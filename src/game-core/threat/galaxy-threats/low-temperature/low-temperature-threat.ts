import {GalaxyAreaState} from '../../../../engine/game-state/gameplay-state/galaxy-state/galaxy-area-state/galaxy-area-state';
import {LowTemperatureData} from './low-temperature-data';
import {PlanetState} from '../../../../engine/game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/planet-state';
import {Threat} from '../../threat';
import {TourEffect} from '../../../tour/tour-effect/tour-effect';
import {gameState, gameplayState} from '../../../../core/game-platform';

export class LowTemperatureThreat extends Threat<LowTemperatureData> {
    public name = 'Low temperature';
    public description = 'Test';
    public value: number;

    public start(): void {
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

    public stop(): void {
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

    public remove(): void {
        gameState().tourManager.addTourEffect(
            new TourEffect(10000, true, () => {
                gameplayState().galaxy.galaxyOrigin.threats = gameplayState().galaxy.galaxyOrigin.threats.filter((el: Threat) => el !== this);
            })
        );
    }
}
