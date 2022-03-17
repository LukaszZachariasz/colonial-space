import {PlanetBuilder} from '../../game-objects/planet/planet-builder';
import {PlanetSceneBuilder} from './planet-scene-builder';
import {
    PlanetState
} from '../../engine/game-state/gameplay-state/galaxy-state/orbit-state/planet-state/planet-state';
import {SceneCreator} from '../scene-creator';
import {SceneRoute} from '../../engine/scene-manager/scene-route';

export class PlanetSceneCreator extends SceneCreator<PlanetState> {
    public create(planetState: PlanetState, parentRoute: SceneRoute): void {
        this.createRoute(planetState.name, parentRoute);

        const builder: PlanetSceneBuilder = new PlanetSceneBuilder();

        builder.withArcCamera(planetState.size)
            .name(planetState.name)
            .withSkyBox()
            .withPlanet(
                new PlanetBuilder()
                    .name(planetState.name)
                    .type(planetState.type)
                    .size(planetState.size)
                    .texture(planetState.textureUrl)
                    .withState(planetState)
                    .build()
            )
            .withLights()
            .withGui(planetState);

        this.addScene(builder.build());
    }
    
}
