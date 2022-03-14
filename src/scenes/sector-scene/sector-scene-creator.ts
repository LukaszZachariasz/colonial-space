import {SceneCreator} from '../scene-creator';
import {SceneRoute} from '../../engine/scene-manager/scene-route';
import {SectorSceneBuilder} from './sector-scene-builder';
import {
    SectorState
} from '../../engine/game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/sector-state/sector-state';

export class SectorSceneCreator extends SceneCreator<SectorState> {
    public create(sectorState: SectorState, parentRoute: SceneRoute): void {
        this.createRoute(sectorState.name, parentRoute);

        const builder = new SectorSceneBuilder();

        builder.withArcCamera()
            .name(sectorState.name)
            .withGround()
            .withLights()
            .withGui();

        this.addScene(builder.build());
    }
}
