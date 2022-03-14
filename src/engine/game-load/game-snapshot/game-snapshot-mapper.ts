import * as BABYLON from 'babylonjs';
import {GalaxyAreaSnapshot} from './galaxy-snapshot/galaxy-area-snapshot/galaxy-area-snapshot';
import {GameSnapshot} from './game-snapshot';
import {GameplayState} from '../../game-state/gameplay-state/gameplay-state';
import {PlanetSnapshot} from './galaxy-snapshot/galaxy-area-snapshot/planet-snapshot/planet-snapshot';
import {SectorSnapshot} from './galaxy-snapshot/galaxy-area-snapshot/planet-snapshot/sector-snapshot/sector-snapshot';
import {ThreatFactory} from '../../../game-core/threat/threat.factory';
import {ThreatSnapshot} from './galaxy-snapshot/galaxy-origin-snapshot/threat-snapshot/threat-snapshot';
import {gameplayState} from '../../../core/game-platform';

export class GameSnapshotMapper {
    private threatFactory: ThreatFactory = new ThreatFactory();
    
    public map(snapshot: GameSnapshot): GameplayState {
        return {
            initGameSceneName: snapshot.initGameSceneName,
            tour: {
                currentTour: snapshot.tour.currentTour,
                tourEffects: gameplayState().tour.tourEffects // In order to persist tour effects we need to rewrite this, but no worries about old state - initialize is called before.
            },
            resource: snapshot.resource,
            galaxy: {
                name: snapshot.galaxy.name,
                galaxyOrigin: {
                    name: snapshot.galaxy.galaxyOrigin.name,
                    threats: snapshot.galaxy.galaxyOrigin.threats.map((threat: ThreatSnapshot<any>) => {
                        return this.threatFactory.create(threat.type, threat);
                    })
                },
                galaxyAreas: snapshot.galaxy.galaxyAreas.map((galaxyArea: GalaxyAreaSnapshot) => {
                    return {
                        name: galaxyArea.name,
                        arcPathTo: galaxyArea.arcPathTo,
                        startPath: galaxyArea.startPath,
                        planets: galaxyArea.planets.map((planet: PlanetSnapshot) => {
                            return {
                                name: planet.name,
                                position: new BABYLON.Vector3(planet.position.x, planet.position.y, planet.position.z),
                                size: planet.size,
                                temperature: planet.temperature,
                                textureUrl: planet.textureUrl,
                                sectors: planet.sectors.map((sector: SectorSnapshot) => {
                                    return {
                                        name: sector.name
                                    };
                                })
                            };
                        })
                    };
                })
            }
        };
    }
}
