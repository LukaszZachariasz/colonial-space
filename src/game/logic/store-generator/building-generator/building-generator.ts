import {BuildingState} from '../../store/building/building.state';
import {v4 as uuid} from 'uuid';

export class BuildingGenerator {
    public generate(): BuildingState {
        return {
            id: uuid(),
            currentBuildingObjectId: null,
            scopes: [
                {
                    name: 'Units',
                    objects: []
                },
                {
                    name: 'Common',
                    objects: [
                        {
                            name: 'Water silos',
                            id: uuid(),
                            artUrl: './resources/territory/planet/planet-art.png',
                            production: 500
                        },
                        {
                            name: 'Sunlight generator',
                            id: uuid(),
                            artUrl: './resources/territory/planet/planet-art.png',
                            production: 600
                        },
                        {
                            name: 'Colonization center',
                            id: uuid(),
                            artUrl: './resources/territory/planet/planet-art.png',
                            production: 1500
                        },
                        {
                            name: 'Some other building',
                            id: uuid(),
                            artUrl: './resources/territory/planet/planet-art.png',
                            production: 2200
                        },
                        {
                            name: 'Some other building',
                            id: uuid(),
                            artUrl: './resources/territory/planet/planet-art.png',
                            production: 2200
                        },
                        {
                            name: 'Some other building',
                            id: uuid(),
                            artUrl: './resources/territory/planet/planet-art.png',
                            production: 2200
                        }
                    ]
                },
                {
                    name: 'Science',
                    objects: [
                        {
                            name: 'Laboratory',
                            id: uuid(),
                            artUrl: './resources/territory/planet/planet-art.png',
                            production: 5500
                        }
                    ]
                },
                {
                    name: 'Awareness',
                    objects: [
                        {
                            name: 'Telescope',
                            id: uuid(),
                            artUrl: './resources/territory/planet/planet-art.png',
                            production: 500
                        },
                        {
                            name: 'Journey support',
                            id: uuid(),
                            artUrl: './resources/territory/planet/planet-art.png',
                            production: 500
                        }
                    ]
                },
            ]
        };
    }
}