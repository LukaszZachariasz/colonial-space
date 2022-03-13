import * as BABYLON from 'babylonjs';
import {GalaxyAreaBuilder} from '../../../game-objects/galaxy-area/galaxy-area-builder';
import {GalaxyAreaState} from '../../game-state/gameplay-state/galaxy-state/galaxy-area-state/galaxy-area-state';
import {GalaxySceneBuilder} from '../../../scenes/galaxy/galaxy-scene-builder';
import {GalaxyState} from '../../game-state/gameplay-state/galaxy-state/galaxy-state';
import {GeneratedGalaxyDust} from '../../../game-objects/galaxy/generated-galaxy-dust';
import {GeneratedGalaxyOrigin} from '../../../game-objects/galaxy/generated-galaxy-origin';
import {LoadPlanetScene} from './load-planet-scene/load-planet-scene';
import {PlanetBuilder} from '../../../game-objects/planet/planet-builder';
import {PlanetState} from '../../game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/planet-state';
import {sceneManager} from '../../../core/game-platform';

export class LoadGalaxyScene {
    public loadPlanetScene: LoadPlanetScene = new LoadPlanetScene();

    public loadGalaxyScene(galaxyState: GalaxyState): void {
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

                this.loadPlanetScene.loadPlanetScene(planetState);
            });

            builder.withGalaxyArea(galaxyAreaBuilder.build());
        });

        sceneManager().addScene(builder.build());
    }
}
