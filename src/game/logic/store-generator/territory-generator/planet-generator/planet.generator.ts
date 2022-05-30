import {PlanetNameGenerator} from './planet-name/planet-name.generator';
import {PlanetState} from '../../../store/territory/planet/planet.state';
import {TerritoryState} from '../../../store/territory/territory.state';
import {TerritoryType} from '../../../store/territory/territory-type';
import {v4 as uuid} from 'uuid';

export class PlanetGenerator {
    private static readonly Planets = 10;

    public generate(): TerritoryState<PlanetState>[] {
        const planets: TerritoryState<PlanetState>[] = [];
        for (let i = 0; i < PlanetGenerator.Planets; i++) {
            const planetState: TerritoryState<PlanetState> = {
                id: uuid(),
                type: TerritoryType.PLANET,
                name: PlanetNameGenerator.generate(),
                artUrl: './resources/territory/planet/planet-art.png',
                data: {
                    water: Math.floor(BABYLON.Scalar.RandomRange(40,60)),
                    sunlight: Math.floor(BABYLON.Scalar.RandomRange(40,60)),
                    building: {
                        facilities: {
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
                        units: {
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
                    }
                }
            };
            planets.push(planetState);
        }
        return planets;
    }
}
