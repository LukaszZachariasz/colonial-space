import {BuildingState} from '../../store/building/building.state';
import {v4 as uuid} from 'uuid';

export class BuildingGenerator {
    public generate(): BuildingState {
        return {
            id: uuid(),
            scopes: [
                {
                    id: uuid(),
                    label: 'Facilities',
                    currentBuildingObjectId: null,
                    sectors: [
                        {
                            name: 'Common',
                            objects: [
                                {
                                    name: 'Water silos',
                                    id: uuid(),
                                    production: 500
                                },
                                {
                                    name: 'Sunlight generator',
                                    id: uuid(),
                                    production: 600
                                },
                                {
                                    name: 'Colonization center',
                                    id: uuid(),
                                    production: 1500
                                },
                                {
                                    name: 'Some other building',
                                    id: uuid(),
                                    production: 2200
                                },
                                {
                                    name: 'Some other building',
                                    id: uuid(),
                                    production: 2200
                                },
                                {
                                    name: 'Some other building',
                                    id: uuid(),
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
                                    production: 500
                                },
                                {
                                    name: 'Journey support',
                                    id: uuid(),
                                    production: 500
                                }
                            ]
                        }
                    ]
                },
                {
                    id: uuid(),
                    label: 'Units',
                    currentBuildingObjectId: null,
                    sectors: [
                        {
                            name: 'Utilities',
                            objects: []
                        },
                        {
                            name: 'Science',
                            objects: []
                        }
                    ]
                }
            ]
        };
    }
}