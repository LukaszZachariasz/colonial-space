import * as BABYLON from 'babylonjs';
import {GameplayState} from '../../game-core/game-state/gameplay-state/gameplay-state';
import {HighTemperatureThreat} from '../../game-core/threat/galaxy-threats/high-temperature/high-temperature-threat';

export const initialization: GameplayState = {
    currentGameSceneName: 'Alpha Galaxy',
    resourceState: {
        wood: 500
    },
    galaxyState: {
        name: 'Alpha Galaxy',
        galaxyOriginState: {
            name: 'Origin 01',
            threats: [
                new HighTemperatureThreat(4, 5, 7, 2, 4)
            ]
        },
        galaxyAreaStates: [
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
                planetStates: [
                    {
                        name: 'Earth',
                        temperature: 22,
                        size: 2.5,
                        textureUrl: 'resources/planet/earth.jpg',
                        position: new BABYLON.Vector3(-25, -1.5, -10),
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
                planetStates: []
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
                planetStates: []
            }
        ]
    }
};
