import {BuildingObjectType} from '../../store/building/building-scope/building-object/building-object-type';
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
                    objects: [
                        {
                            name: 'Scout ship',
                            type: BuildingObjectType.SCOUT_SHIP,
                            id: uuid(),
                            artUrl: 'resources/unit/scout-ship/scout-ship-art.png',
                            productionLeft: 400,
                            production: 400,
                            isBuilt: false
                        }
                    ]
                },
                {
                    name: 'Common',
                    objects: [
                        {
                            name: 'Water filter',
                            type: BuildingObjectType.WATER_FILTER,
                            id: uuid(),
                            artUrl: './resources/territory/planet/planet-green/planet-art.png',
                            productionLeft: 500,
                            production: 500,
                            isBuilt: false
                        },
                        {
                            name: 'Sunlight amplifier',
                            type: BuildingObjectType.SUNLIGHT_AMPLIFIER,
                            id: uuid(),
                            artUrl: './resources/territory/planet/planet-green/planet-art.png',
                            productionLeft: 600,
                            production: 600,
                            isBuilt: false
                        }
                    ]
                },
                {
                    name: 'Science',
                    objects: [
                    ]
                },
                {
                    name: 'Awareness',
                    objects: [
                    ]
                },
            ]
        };
    }
}
