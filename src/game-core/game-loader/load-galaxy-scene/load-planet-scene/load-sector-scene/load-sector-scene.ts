import {
    PlanetState
} from '../../../../game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/planet-state';
import {SectorSceneBuilder} from '../../../../../scenes/sector-scene/sector-scene-builder';
import {
    SectorState
} from '../../../../game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/sector-state/sector-state';
import {gamePlatform} from '../../../../../core/game-platform';

export class LoadSectorScene {
    public loadSectorScene(sectorState: SectorState, planetState: PlanetState): void {
        const builder = new SectorSceneBuilder();
        
        builder.withArcCamera()
            .name(sectorState.name)
            .withGround()
            .withLights()
            .withGui(planetState);

        gamePlatform().engine.sceneManager.addScene(builder.build());
    }
}
