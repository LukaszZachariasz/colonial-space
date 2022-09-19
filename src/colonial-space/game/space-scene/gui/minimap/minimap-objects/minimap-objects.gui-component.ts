import * as GUI from 'babylonjs-gui';
import {
    AppendGuiControl
} from '@colonial-space/core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {FogOfWarService} from '../../../../game-logic/fog-of-war/fog-of-war.service';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '@colonial-space/core/module/scene/gui/gui-component/gui-control';
import {Inject} from '@colonial-space/core/injector/inject';
import {MinimapFogOfWarGuiComponent} from './minimap-fog-of-war/minimap-fog-of-war.gui-component';
import {MinimapTerritoryGuiComponent} from './minimap-territory/minimap-territory.gui-component';
import {MinimapUnitGuiComponent} from './minimap-units/minimap-unit.gui-component';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SquareState} from '../../../../game-logic/store/map/square/square.state';
import {Subscription, delay, tap} from 'rxjs';
import {UnitService} from '../../../../game-logic/unit/unit.service';
import {
    selectSquareById,
    selectSquareByUnitId,
    selectSquares
} from '../../../../game-logic/store/map/square/square.selectors';

@GuiComponent()
export class MinimapObjectsGuiComponent implements GuiControl<GUI.Container>, OnInit, OnDestroy {
    @Inject(UnitService) private unitService: UnitService;
    @Inject(FogOfWarService) private fogOfWarService: FogOfWarService;
    
    public control: GUI.Container = new GUI.Container('minimapObjects');

    @AppendGuiControl() public fogOfWarGuiComponents: MinimapFogOfWarGuiComponent[] = [];
    @AppendGuiControl() public territoryGuiComponents: MinimapTerritoryGuiComponent[] = [];
    @AppendGuiControl() public unitGuiComponents: MinimapUnitGuiComponent[] = [];

    public removeFogOfWarSubscription: Subscription;
    public unitAddSubscription: Subscription;
    public unitRemoveSubscription: Subscription;

    public gameOnInit(): void {
        selectSquares().flat().filter((el: SquareState) => el.fogOfWar).forEach((squareState: SquareState) => {
            this.fogOfWarGuiComponents.push(new MinimapFogOfWarGuiComponent(squareState));
        });

        selectSquares().flat().filter((el: SquareState) => !el.fogOfWar).forEach((squareState: SquareState) => {
            this.createSquareTerritoryObject(squareState);
        });

        selectSquares().flat().filter((el: SquareState) => el.unitId).forEach((squareState: SquareState) => {
            this.createSquareUnitObject(squareState);
        });

        this.unitAddSubscription = this.unitService.addUnit$.pipe(
            tap((id: string) => this.createSquareUnitObject(selectSquareByUnitId(id)))
        ).subscribe();

        this.removeFogOfWarSubscription = this.fogOfWarService.removeFogOfWar$.pipe(
            tap((id: string) => this.fogOfWarGuiComponents = this.fogOfWarGuiComponents.filter((el: MinimapFogOfWarGuiComponent) => el.squareId !== id)),
            delay(300),
            tap((id: string) => this.createSquareTerritoryObject(selectSquareById(id)))
        ).subscribe();

        this.unitRemoveSubscription = this.unitService.removeUnitId$.pipe(
            tap((id: string) => this.unitGuiComponents = this.unitGuiComponents.filter((el: MinimapUnitGuiComponent) => el.unitState.id !== id))
        ).subscribe();
    }

    private createSquareTerritoryObject(squareState: SquareState): void {
        if (squareState.territoryId) {
            const territoryGuiElement = new MinimapTerritoryGuiComponent(squareState);
            this.territoryGuiComponents.push(territoryGuiElement);
            this.control.addControl(territoryGuiElement.control); // TODO: change detection
        }
    }

    private createSquareUnitObject(squareState: SquareState): void {
        if (squareState.unitId) {
            const unitGuiElement = new MinimapUnitGuiComponent(squareState);
            this.unitGuiComponents.push(unitGuiElement);
            this.control.addControl(unitGuiElement.control); // TODO: change detection
        }
    }

    public gameOnDestroy(): void {
        this.removeFogOfWarSubscription?.unsubscribe();
        this.unitAddSubscription?.unsubscribe();
        this.unitRemoveSubscription?.unsubscribe();
    }
}
