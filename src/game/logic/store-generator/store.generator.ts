import {GlobalResourceGenerator} from './global-resource-generator/global-resource.generator';
import {MapGenerator} from './map-generator/map.generator';
import {PlayerGenerator} from './player-generator/player-generator';
import {TerritoryGenerator} from './territory-generator/territory-generator';
import {TerritoryState} from '../store/territory/territory.state';
import {TourGenerator} from './tour-generator/tour-generator';
import {UnitGenerator} from './unit-generator/unit-generator';
import {addTerritory} from '../store/territory/territory.slice';
import {addUnit} from '../store/unit/unit.slice';
import {removeFogOfWar, setMap, setSquarePlayerId, setSquareTerritoryId, setSquareUnitId} from '../store/map/map.slice';
import {selectPlayerId} from '../store/player/player.selectors';
import {
    selectRandomEmptySquare,
    selectSquareArrayPosition,
    selectSquaresWithTerritory
} from '../store/map/square/square.selectors';
import {selectUnits} from '../store/unit/unit.selectors';
import {setGlobalResources} from '../store/global-resource/global-resource.slice';
import {setPlayer} from '../store/player/player.slice';
import {setTour} from '../store/tour/tour.slice';
import {store} from '../store/store';

export class StoreGenerator {
    private mapGenerator: MapGenerator = new MapGenerator();
    private globalResourceGenerator: GlobalResourceGenerator = new GlobalResourceGenerator();
    private playerGenerator: PlayerGenerator = new PlayerGenerator();
    private territoryGenerator: TerritoryGenerator = new TerritoryGenerator();
    private tourGenerator: TourGenerator = new TourGenerator();
    private unitGenerator: UnitGenerator = new UnitGenerator();

    public generate(): void {
        store.dispatch(setMap(this.mapGenerator.generate()));
        store.dispatch(setPlayer(this.playerGenerator.generate()));
        store.dispatch(setGlobalResources(this.globalResourceGenerator.generate()));
        store.dispatch(setTour(this.tourGenerator.generate()));

        this.territoryGenerator.generate().forEach((territoryState: TerritoryState) => {
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

        store.dispatch(addUnit(this.unitGenerator.generate(selectPlayerId())));
        store.dispatch(setSquareUnitId({
            unitId: selectUnits()[0].id,
            squareId: selectSquaresWithTerritory()[0].id
        }));
    }
}
