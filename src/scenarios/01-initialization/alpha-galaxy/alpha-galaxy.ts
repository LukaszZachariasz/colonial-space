import * as BABYLON from 'babylonjs';
import {GalaxyAreaBuilder} from '../../../game-objects/galaxy-area/galaxy-area-builder';
import {GalaxyOrigin} from '../../../game-objects/galaxy-origin/galaxy-origin';
import {GalaxyScene} from '../../../game-scenes/galaxy-scene/galaxy-scene';
import {GalaxySceneBuilder} from '../../../game-scenes/galaxy-scene/galaxy-scene-builder';
import {PlanetBuilder} from '../../../game-objects/planet/planet-builder';
import {PlanetScene} from '../../../game-scenes/planet-scene/planet-scene';

export class AlphaGalaxy {
    public create(planetScene: PlanetScene): GalaxyScene {
        return new GalaxySceneBuilder()
            .name('Alpha Galaxy')
            .withLockedCamera()
            .withGalaxyOrigin(new GalaxyOrigin())
            .withSkybox()
            .withGalaxyArea(
                new GalaxyAreaBuilder()
                    .startPath(-30, -20)
                    .pathArcTo(-28, -19.5, -21.5, -21)
                    .pathArcTo(-16.5, -16, -18, -14)
                    .pathArcTo(-15, -1, -19, -5)
                    .pathArcTo(-19, -3, -21, 0)
                    .pathArcTo(-32, -18, -30, -20)
                    .withPlanet(
                        new PlanetBuilder()
                            .size(2.5)
                            .position(new BABYLON.Vector3(-25, -1.5, -10))
                            .texture('resources/planet/earth.jpg')
                            .build(),
                        planetScene
                    )
                    .build()
            )
            .withGalaxyArea(
                new GalaxyAreaBuilder()
                    .startPath(-10, -15)
                    .pathArcTo(-7, -19.5, -5, -20)
                    .pathArcTo(0, -19, 5, -20)
                    .pathArcTo(9, -17, 8, -10)
                    .pathArcTo(0, -7, -7, -12)
                    .pathArcTo(-8, -13, -10, -15)
                    .build()
            )
            .withGalaxyArea(
                new GalaxyAreaBuilder()
                    .startPath(-15, 0)
                    .pathArcTo(-18, -5, -17, -12)
                    .pathArcTo(-14, -13, -10, -12)
                    .pathArcTo(-8, -9, -4, -7)
                    .pathArcTo(-2, 0, -7, 2)
                    .build()
            )
            .withLights()
            .withGui()
            .build();
    }
}
