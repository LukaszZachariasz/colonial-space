import {BuildingGenerator} from './building-generator/building-generator';
import {MapGenerator} from './map-generator/map.generator';
import {PlanetState} from '../store/territory/planet/planet.state';
import {PlayerGenerator} from './player-generator/player-generator';
import {ScoutShipGenerator} from './unit-generator/scout-ship-generator/scout-ship.generator';
import {Service} from 'typedi';
import {SquareState} from '../store/map/square/square.state';
import {TerritoryGenerator} from './territory-generator/territory-generator';
import {TerritoryState} from '../store/territory/territory.state';
import {TerritoryType} from '../store/territory/territory-type';
import {TourGenerator} from './tour-generator/tour-generator';
import {addBuilding} from '../store/building/building.slice';
import {addTerritory, completeAnalysis, completeColonization} from '../store/territory/territory.slice';
import {addUnit} from '../store/unit/unit.slice';
import {isPlanet} from '../store/territory/planet/is-planet';
import {removeFogOfWar, setMap, setSquarePlayerId, setSquareTerritoryId, setSquareUnitId} from '../store/map/map.slice';
import {selectPlayerId} from '../store/player/player.selectors';
import {
    selectRandomEmptySquare,
    selectSquareArrayPosition, selectSquareByTerritoryId
} from '../store/map/square/square.selectors';
import {selectTerritoryByTerritoryType} from '../store/territory/territory.selectors';
import {setPlayer} from '../store/player/player.slice';
import {setTour} from '../store/tour/tour.slice';
import {store} from '../store/store';

@Service()
export class StoreGenerator {
    public generate(): void {
        store.dispatch(setMap(MapGenerator.generate()));
        store.dispatch(setPlayer(PlayerGenerator.generate()));
        store.dispatch(setTour(TourGenerator.generate()));

        this.createTerritories();
        this.colonizeFirstGreenPlanet();
    }

    private createTerritories(): void {
        TerritoryGenerator.generate().forEach((territoryState: TerritoryState) => {
            if (isPlanet(territoryState)) {
                const buildingState = BuildingGenerator.generate();
                territoryState.data.buildingId = buildingState.id;
                store.dispatch(addBuilding(buildingState));
            }

            store.dispatch(addTerritory(territoryState));
            const randomSquare = selectRandomEmptySquare();
            store.dispatch(setSquareTerritoryId({
                squareId: randomSquare.id,
                territoryId: territoryState.id
            }));
        });
    }

    private colonizeFirstGreenPlanet(): void {
        const planetGreenTerritory: TerritoryState<PlanetState> = selectTerritoryByTerritoryType(TerritoryType.PLANET_GREEN)[0];
        const square: SquareState = selectSquareByTerritoryId(planetGreenTerritory.id);
        store.dispatch(completeAnalysis({territoryId: planetGreenTerritory.id}));
        store.dispatch(completeColonization({territoryId: planetGreenTerritory.id}));
        store.dispatch(setSquarePlayerId({
            squareId: square.id,
            playerId: selectPlayerId()
        }));
        store.dispatch(removeFogOfWar({
            position: {
                x: selectSquareArrayPosition(square.id).x,
                y: selectSquareArrayPosition(square.id).y
            },
            range: 2
        }));

        const unit = ScoutShipGenerator.generate(selectPlayerId());
        store.dispatch(addUnit(unit));
        store.dispatch(setSquareUnitId({
            unitId: unit.id,
            squareId: square.id
        }));
    }
}
