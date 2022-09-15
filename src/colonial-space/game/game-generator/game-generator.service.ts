import {BuildingGeneratorService} from './building-generator/building-generator.service';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {MapGeneratorService} from './map-generator/map-generator.service';
import {PlanetState} from '../game-logic/store/territory/planet/planet.state';
import {PlayerGeneratorService} from './player-generator/player-generator.service';
import {ScoutShipGeneratorService} from './unit-generator/scout-ship-generator/scout-ship-generator.service';
import {SquareState} from '../game-logic/store/map/square/square.state';
import {TerritoryGeneratorService} from './territory-generator/territory-generator.service';
import {TerritoryState} from '../game-logic/store/territory/territory.state';
import {TerritoryType} from '../game-logic/store/territory/territory-type';
import {TourGeneratorService} from './tour-generator/tour-generator.service';
import {addBuilding} from '../game-logic/store/building/building.slice';
import {addTerritory, completeAnalysis, completeColonization} from '../game-logic/store/territory/territory.slice';
import {addUnit} from '../game-logic/store/unit/unit.slice';
import {isPlanet} from '../game-logic/store/territory/planet/is-planet';
import {removeFogOfWar, setMap, setSquarePlayerId, setSquareTerritoryId, setSquareUnitId} from '../game-logic/store/map/map.slice';
import {selectPlayerId} from '../game-logic/store/player/player.selectors';
import {
    selectRandomEmptySquare,
    selectSquareArrayPosition, selectSquareByTerritoryId
} from '../game-logic/store/map/square/square.selectors';
import {selectTerritoryByTerritoryType} from '../game-logic/store/territory/territory.selectors';
import {setPlayer} from '../game-logic/store/player/player.slice';
import {setTour} from '../game-logic/store/tour/tour.slice';
import {store} from '../game-logic/store/store';

@Injectable()
export class GameGeneratorService {
    @Inject(MapGeneratorService) private mapGeneratorService: MapGeneratorService;
    @Inject(PlayerGeneratorService) private playerGeneratorService: PlayerGeneratorService;
    @Inject(TourGeneratorService) private tourGeneratorService: TourGeneratorService;
    @Inject(BuildingGeneratorService) private buildingGeneratorService: BuildingGeneratorService;
    @Inject(TerritoryGeneratorService) private territoryGeneratorService: TerritoryGeneratorService;
    @Inject(ScoutShipGeneratorService) private scoutShipGeneratorService: ScoutShipGeneratorService;

    public generate(): void {
        store.dispatch(setMap(this.mapGeneratorService.generate()));
        store.dispatch(setPlayer(this.playerGeneratorService.generate()));
        store.dispatch(setTour(this.tourGeneratorService.generate()));

        this.createTerritories();
        this.colonizeFirstGreenPlanet();
    }

    private createTerritories(): void {
        this.territoryGeneratorService.generate().forEach((territoryState: TerritoryState) => {
            if (isPlanet(territoryState)) {
                const buildingState = this.buildingGeneratorService.generate();
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

        const unit = this.scoutShipGeneratorService.generate(selectPlayerId());
        store.dispatch(addUnit(unit));
        store.dispatch(setSquareUnitId({
            unitId: unit.id,
            squareId: square.id
        }));
    }
}
