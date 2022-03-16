import {GalaxySceneBuilder} from './galaxy-scene-builder';
import {GalaxyState} from '../../engine/game-state/gameplay-state/galaxy-state/galaxy-state';
import {GeneratedGalaxyDust} from '../../game-objects/galaxy/generated-galaxy-dust';
import {GeneratedGalaxyOrigin} from '../../game-objects/galaxy/generated-galaxy-origin';
import {OrbitBuilder} from '../../game-objects/orbit/orbit-builder';
import {OrbitState} from '../../engine/game-state/gameplay-state/galaxy-state/orbit-state/orbit-state';
import {PlanetBuilder} from '../../game-objects/planet/planet-builder';
import {PlanetSceneCreator} from '../planet/planet-scene-creator';
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


        galaxyState.orbits.forEach((orbitState: OrbitState) => {
            const orbitBuilder: OrbitBuilder =
                new OrbitBuilder()
                    .radius(orbitState.distance);

            const planetBuilder = new PlanetBuilder()
                .name(orbitState.planet.name)
                .size(orbitState.planet.size)
                .texture(orbitState.planet.textureUrl);

            if (orbitState.planet.belongsToPlayer) {
                planetBuilder.withSceneRoute(new SceneRoute(orbitState.planet.name, this.route));
            }

            orbitBuilder.withPlanet(planetBuilder.build(), orbitState.planetCurrentPosition);

            this.planetSceneCreator.create(orbitState.planet, this.route);
            builder.addOrbit(orbitBuilder.build());
        });

        this.addScene(builder.build());
    }
}
