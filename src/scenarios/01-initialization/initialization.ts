import {GameSnapshot} from '../../engine/game-load/game-snapshot/game-snapshot';
import {HighTemperatureData} from '../../game-core/threat/galaxy-threats/high-temperature/high-temperature-data';
import {
    ThreatState
} from '../../engine/game-state/gameplay-state/galaxy-state/galaxy-origin-state/threat-state/threat-state';
import {ThreatTypeEnum} from '../../game-core/threat/threat-type.enum';

export const initialization: GameSnapshot = {
    route: 'Alpha Galaxy',
    tour: {
        currentTour: 1
    },
    resource: {
        wood: 500
    },
    galaxy: {
        name: 'Alpha Galaxy',
        galaxyOrigin: {
            name: 'Origin 01',
            threats: [
                {
                    name: 'High Temperature',
                    description: 'Big eruption on sun',
                    type: ThreatTypeEnum.HIGH_TEMPERATURE_GALAXY_THREAT,
                    tourStart: 4,
                    tourEnd: 7,
                    visibleFromTour: 2,
                    unknownUntilTour: 3,
                    data: {
                        value: 5
                    }
                } as ThreatState<HighTemperatureData>
            ]
        },
        orbits: [
            {
                distance: 20,
                planetCurrentPosition: 0.9,
                planet: {
                    name: 'Earth',
                    belongsToPlayer: true,
                    temperature: 22,
                    size: 2.5,
                    textureUrl: 'resources/planet/earth.jpg',
                    sectors: [
                        {
                            name: 'Sector 1'
                        }
                    ]
                }
            },
            {
                distance: 30,
                planetCurrentPosition: 0.1,
                planet: {
                    name: 'Mars',
                    belongsToPlayer: false,
                    temperature: 10,
                    size: 1,
                    textureUrl: 'resources/planet/mars.jpg',
                    sectors: [
                        {
                            name: 'Sector 1'
                        }
                    ]
                }
            },
            {
                distance: 45,
                planetCurrentPosition: 0.5,
                planet: {
                    name: 'Jupiter',
                    belongsToPlayer: false,
                    temperature: -33,
                    size: 7,
                    textureUrl: 'resources/planet/jupiter.jpg',
                    sectors: [
                        {
                            name: 'Sector 1'
                        }
                    ]
                }
            }
        ]
    }
};
