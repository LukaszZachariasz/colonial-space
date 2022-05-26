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
                                    objects: []
                                },
                                {
                                    name: 'Science',
                                    objects: []
                                },
                                {
                                    name: 'Awareness',
                                    objects: []
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
