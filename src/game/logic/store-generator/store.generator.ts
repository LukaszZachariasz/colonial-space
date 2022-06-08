import {BuildingGenerator} from './building-generator/building-generator';
import {MapGenerator} from './map-generator/map.generator';
import {PlayerGenerator} from './player-generator/player-generator';
import {ScoutShipGenerator} from './unit-generator/scout-ship-generator/scout-ship.generator';
import {TerritoryGenerator} from './territory-generator/territory-generator';
import {TerritoryState} from '../store/territory/territory.state';
import {TourGenerator} from './tour-generator/tour-generator';
import {addBuilding} from '../store/building/building.slice';
import {addTerritory} from '../store/territory/territory.slice';
import {addUnit} from '../store/unit/unit.slice';
import {isPlanet} from '../store/territory/planet/is-planet';
import {removeFogOfWar, setMap, setSquarePlayerId, setSquareTerritoryId, setSquareUnitId} from '../store/map/map.slice';
import {selectPlayerId} from '../store/player/player.selectors';
import {
    selectRandomEmptySquare,
    selectSquareArrayPosition,
    selectSquaresWithTerritory
} from '../store/map/square/square.selectors';
import {selectUnits} from '../store/unit/unit.selectors';
import {setPlayer} from '../store/player/player.slice';
import {setTour} from '../store/tour/tour.slice';
import {store} from '../store/store';

export class StoreGenerator {
    public generate(): void {
        store.dispatch(setMap(MapGenerator.generate()));
        store.dispatch(setPlayer(PlayerGenerator.generate()));
        store.dispatch(setTour(TourGenerator.generate()));

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

        store.dispatch(setSquarePlayerId({
            squareId: selectSquaresWithTerritory()[0].id,
            playerId: selectPlayerId()
        }));
        store.dispatch(removeFogOfWar({
            position: {
                x: selectSquareArrayPosition(selectSquaresWithTerritory()[0].id).x,
                y: selectSquareArrayPosition(selectSquaresWithTerritory()[0].id).y
            },
            range: 2
        }));

        store.dispatch(addUnit(ScoutShipGenerator.generate(selectPlayerId())));
        store.dispatch(setSquareUnitId({
            unitId: selectUnits()[0].id,
            squareId: selectSquaresWithTerritory()[0].id
        }));
    }
}
