import * as BABYLON from 'babylonjs';
import {GalaxyAreaBuilder} from '../../game-objects/galaxy-area/galaxy-area-builder';
import {GalaxyAreaState} from '../../engine/game-state/gameplay-state/galaxy-state/galaxy-area-state/galaxy-area-state';
import {GalaxySceneBuilder} from './galaxy-scene-builder';
import {GalaxyState} from '../../engine/game-state/gameplay-state/galaxy-state/galaxy-state';
import {GeneratedGalaxyDust} from '../../game-objects/galaxy/generated-galaxy-dust';
import {GeneratedGalaxyOrigin} from '../../game-objects/galaxy/generated-galaxy-origin';
import {PlanetBuilder} from '../../game-objects/planet/planet-builder';
import {PlanetSceneCreator} from '../planet/planet-scene-creator';
import {
    PlanetState
} from '../../engine/game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/planet-state';
import {SceneCreator} from '../scene-creator';
import {SceneRoute} from '../../engine/scene-manager/scene-route';

export class GalaxySceneCreator extends SceneCreator<GalaxyState> {
    private planetSceneCreator: PlanetSceneCreator = new PlanetSceneCreator();

    public create(galaxyState: GalaxyState, parentRoute: SceneRoute): void {
        this.createRoute(galaxyState.name, parentRoute);

        const builder: GalaxySceneBuilder = new GalaxySceneBuilder();

        builder
            .name(galaxyState.name)
            .withArcCamera()
            .withGui(galaxyState)
            .withGeneratedGalaxyOrigin(new GeneratedGalaxyOrigin())
            .withGalaxyDust(new GeneratedGalaxyDust())
            .withSkybox()
            .withLights();

        galaxyState.galaxyAreas.forEach((galaxyAreaState: GalaxyAreaState) => {
            const galaxyAreaBuilder: GalaxyAreaBuilder = new GalaxyAreaBuilder();

            galaxyAreaBuilder.startPath(galaxyAreaState.startPath[0], galaxyAreaState.startPath[1]);
            galaxyAreaState.arcPathTo.forEach((arc: [number, number, number, number]) => {
                galaxyAreaBuilder.pathArcTo(arc[0], arc[1], arc[2], arc[3]);
            });

            galaxyAreaState.planets.forEach((planetState: PlanetState) => {
                galaxyAreaBuilder.withPlanet(
                    new PlanetBuilder()
                        .name(planetState.name)
                        .size(planetState.size)
                        .texture(planetState.textureUrl)
                        .position(new BABYLON.Vector3(planetState.position.x, planetState.position.y, planetState.position.z))
                        .build()
                );
                galaxyAreaBuilder.withSceneRoute(new SceneRoute(planetState.name, this.route));

                this.planetSceneCreator.create(planetState, this.route);
            });

            builder.withGalaxyArea(galaxyAreaBuilder.build());
        });

        this.addScene(builder.build());
    }
}
