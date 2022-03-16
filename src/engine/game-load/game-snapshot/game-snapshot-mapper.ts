import {GameSnapshot} from './game-snapshot';
import {GameplayState} from '../../game-state/gameplay-state/gameplay-state';
import {OrbitSnapshot} from './galaxy-snapshot/orbit-snapshot/orbit-snapshot';
import {SectorSnapshot} from './galaxy-snapshot/orbit-snapshot/planet-snapshot/sector-snapshot/sector-snapshot';
import {ThreatFactory} from '../../../game-core/threat/threat.factory';
import {ThreatSnapshot} from './galaxy-snapshot/galaxy-origin-snapshot/threat-snapshot/threat-snapshot';
import {gameplayState} from '../../../core/game-platform';

export class GameSnapshotMapper {
    private threatFactory: ThreatFactory = new ThreatFactory();
    
    public map(snapshot: GameSnapshot): GameplayState {
        return {
            route: snapshot.route,
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
                orbits: snapshot.galaxy.orbits.map((orbit: OrbitSnapshot) => {
                    return {
                        distance: orbit.distance,
                        planetCurrentPosition: orbit.planetCurrentPosition,
                        planet: {
                            name: orbit.planet.name,
                            belongsToPlayer: orbit.planet.belongsToPlayer,
                            size: orbit.planet.size,
                            temperature: orbit.planet.temperature,
                            textureUrl: orbit.planet.textureUrl,
                            sectors: orbit.planet.sectors.map((sector: SectorSnapshot) => {
                                return {
                                    name: sector.name
                                };
                            })
                        }
                    };
                })
            }
        };
    }
}
