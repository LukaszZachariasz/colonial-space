import {SectorSceneBuilder} from '../../../../../game-scenes/sector-scene/sector-scene-builder';
import {
    SectorState
} from '../../../../game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/sector-state/sector-state';
import gameState from '../../../../game-state/game-state';

export class LoadSectorScene {
    public loadSectorScene(sectorState: SectorState): void {
        const builder = new SectorSceneBuilder();
        
        builder.withArcCamera()
            .withGround()
            .withLights()
            .withGui();

        gameState.gameScenes.push(builder.build());
    }
}