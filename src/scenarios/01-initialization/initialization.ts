import {GameSnapshot} from '../../engine/game-load/game-snapshot/game-snapshot';
import {HighTemperatureData} from '../../game-core/threat/galaxy-threats/high-temperature/high-temperature-data';
import {
    ThreatState
} from '../../engine/game-state/gameplay-state/galaxy-state/galaxy-origin-state/threat-state/threat-state';
import {ThreatTypeEnum} from '../../game-core/threat/threat-type.enum';

export const initialization: GameSnapshot = {
    tour: {
        currentTour: 1
    },
    initGameSceneName: 'Alpha Galaxy',
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
        galaxyAreas: [
            {
                name: 'Area 01',
                startPath: [-30, -20],
                arcPathTo: [
                    [-28, -19.5, -21.5, -21],
                    [-16.5, -16, -18, -14],
                    [-15, -1, -19, -5],
                    [-19, -3, -21, 0],
                    [-32, -18, -30, -20],
                ],
                planets: [
                    {
                        name: 'Earth',
                        temperature: 22,
                        size: 2.5,
                        textureUrl: 'resources/planet/earth.jpg',
                        position: {
                            x: -25,
                            y: -1.5,
                            z: -10
                        },
                        sectors: [
                            {
                                name: 'Sector 1'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Area 02',
                startPath: [-10, -15],
                arcPathTo: [
                    [-7, -19.5, -5, -20],
                    [0, -19, 5, -20],
                    [9, -17, 8, -10],
                    [0, -7, -7, -12],
                    [-8, -13, -10, -15],
                ],
                planets: []
            },
            {
                name: 'Area 03',
                startPath: [-15, 0],
                arcPathTo: [
                    [-18, -5, -17, -12],
                    [-14, -13, -10, -12],
                    [-8, -9, -4, -7],
                    [-2, 0, -7, 2]
                ],
                planets: []
            }
        ]
    }
};
