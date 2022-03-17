import {GameSnapshot} from '../../engine/game-load/game-snapshot/game-snapshot';
import {
    PlanetTypeEnum
} from '../../engine/game-state/gameplay-state/galaxy-state/orbit-state/planet-state/planet-type.enum';
import {
    SectorBuildEnum
} from '../../engine/game-state/gameplay-state/galaxy-state/orbit-state/planet-state/sector-state/sector-build.enum';
import {
    SectorTypeEnum
} from '../../engine/game-state/gameplay-state/galaxy-state/orbit-state/planet-state/sector-state/sector-type.enum';
import {ThreatTypeEnum} from '../../game-logic/threat/threat-type.enum';

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
                    type: ThreatTypeEnum.HIGH_TEMPERATURE_GALAXY_THREAT,
                    tourStart: 4,
                    tourEnd: 7,
                    visibleFromTour: 2,
                    unknownUntilTour: 3,
                    data: {
                        value: 5
                    }
                }
            ]
        },
        orbits: [
            {
                distance: 20,
                planetCurrentPosition: 0.9,
                planet: {
                    name: 'Earth',
                    type: PlanetTypeEnum.DEVELOPMENTAL,
                    belongsToPlayer: true,
                    temperature: 22,
                    size: 2.5,
                    textureUrl: 'resources/planet/earth.jpg',
                    sectors: [
                        [
                            {
                                type: SectorTypeEnum.EMPTY,
                                build: SectorBuildEnum.EMPTY
                            },
                            {
                                type: SectorTypeEnum.EMPTY,
                                build: SectorBuildEnum.EMPTY
                            },
                            {
                                type: SectorTypeEnum.INDUSTRIAL,
                                build: SectorBuildEnum.EMPTY
                            },
                            {
                                type: SectorTypeEnum.WATER,
                                build: SectorBuildEnum.EMPTY
                            }
                        ],
                        [
                            {
                                type: SectorTypeEnum.EMPTY,
                                build: SectorBuildEnum.EMPTY
                            },
                            {
                                type: SectorTypeEnum.EMPTY,
                                build: SectorBuildEnum.EMPTY
                            },
                            {
                                type: SectorTypeEnum.INDUSTRIAL,
                                build: SectorBuildEnum.EMPTY
                            },
                            {
                                type: SectorTypeEnum.EMPTY,
                                build: SectorBuildEnum.EMPTY
                            }
                        ],
                        [
                            {
                                type: SectorTypeEnum.WATER,
                                build: SectorBuildEnum.EMPTY
                            },
                            {
                                type: SectorTypeEnum.WATER,
                                build: SectorBuildEnum.EMPTY
                            },
                            {
                                type: SectorTypeEnum.INDUSTRIAL,
                                build: SectorBuildEnum.EMPTY
                            },
                            {
                                type: SectorTypeEnum.EMPTY,
                                build: SectorBuildEnum.EMPTY
                            }
                        ],
                        [
                            {
                                type: SectorTypeEnum.EMPTY,
                                build: SectorBuildEnum.EMPTY
                            },
                            {
                                type: SectorTypeEnum.SCIENCE,
                                build: SectorBuildEnum.EMPTY
                            },
                            {
                                type: SectorTypeEnum.SCIENCE,
                                build: SectorBuildEnum.EMPTY
                            },
                            {
                                type: SectorTypeEnum.EMPTY,
                                build: SectorBuildEnum.EMPTY
                            }
                        ],
                    ]
                }
            },
            {
                distance: 30,
                planetCurrentPosition: 0.1,
                planet: {
                    name: 'Mars',
                    type: PlanetTypeEnum.DEVELOPMENTAL,
                    belongsToPlayer: false,
                    temperature: 10,
                    size: 1,
                    textureUrl: 'resources/planet/mars.jpg',
                    sectors: []
                }
            },
            {
                distance: 45,
                planetCurrentPosition: 0.5,
                planet: {
                    name: 'Jupiter',
                    type: PlanetTypeEnum.DEVELOPMENTAL,
                    belongsToPlayer: false,
                    temperature: -33,
                    size: 7,
                    textureUrl: 'resources/planet/jupiter.jpg',
                    sectors: []
                }
            }
        ]
    }
};
