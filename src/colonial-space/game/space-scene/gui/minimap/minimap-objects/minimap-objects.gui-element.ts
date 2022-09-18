import * as GUI from 'babylonjs-gui';
import {
    AppendGuiControl
} from '@colonial-space/core/module/scene/gui/gui-elements/append-gui-control/append-gui-control';
import {FogOfWarService} from '../../../../game-logic/fog-of-war/fog-of-war.service';
import {GuiControl} from '@colonial-space/core/module/scene/gui/gui-elements/gui-control';
import {GuiElement} from '@colonial-space/core/module/scene/gui/gui-elements/gui-element';
import {Inject} from '@colonial-space/core/injector/inject';
import {MinimapFogOfWarGuiElement} from './minimap-fog-of-war/minimap-fog-of-war.gui-element';
import {MinimapTerritoryGuiElement} from './minimap-territory/minimap-territory.gui-element';
import {MinimapUnitGuiElement} from './minimap-units/minimap-unit.gui-element';
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

@GuiElement()
export class MinimapObjectsGuiElement implements GuiControl<GUI.Container>, OnInit, OnDestroy {
    @Inject(UnitService) private unitService: UnitService;
    @Inject(FogOfWarService) private fogOfWarService: FogOfWarService;
    
    public control: GUI.Container = new GUI.Container('minimapObjects');

    @AppendGuiControl() public fogOfWarGuiElements: MinimapFogOfWarGuiElement[] = [];
    @AppendGuiControl() public territoryGuiElements: MinimapTerritoryGuiElement[] = [];
    @AppendGuiControl() public unitGuiElements: MinimapUnitGuiElement[] = [];

    public removeFogOfWarSubscription: Subscription;
    public unitAddSubscription: Subscription;
    public unitRemoveSubscription: Subscription;

    public gameOnInit(): void {
        selectSquares().flat().filter((el: SquareState) => el.fogOfWar).forEach((squareState: SquareState) => {
            this.fogOfWarGuiElements.push(new MinimapFogOfWarGuiElement(squareState));
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
            tap((id: string) => this.fogOfWarGuiElements = this.fogOfWarGuiElements.filter((el: MinimapFogOfWarGuiElement) => el.squareId !== id)),
            delay(300),
            tap((id: string) => this.createSquareTerritoryObject(selectSquareById(id)))
        ).subscribe();

        this.unitRemoveSubscription = this.unitService.removeUnitId$.pipe(
            tap((id: string) => this.unitGuiElements = this.unitGuiElements.filter((el: MinimapUnitGuiElement) => el.unitState.id !== id))
        ).subscribe();
    }

    private createSquareTerritoryObject(squareState: SquareState): void {
        if (squareState.territoryId) {
            const territoryGuiElement = new MinimapTerritoryGuiElement(squareState);
            this.territoryGuiElements.push(territoryGuiElement);
            this.control.addControl(territoryGuiElement.control); // TODO: change detection
        }
    }

    private createSquareUnitObject(squareState: SquareState): void {
        if (squareState.unitId) {
            const unitGuiElement = new MinimapUnitGuiElement(squareState);
            this.unitGuiElements.push(unitGuiElement);
            this.control.addControl(unitGuiElement.control); // TODO: change detection
        }
    }

    public gameOnDestroy(): void {
        this.removeFogOfWarSubscription?.unsubscribe();
        this.unitAddSubscription?.unsubscribe();
        this.unitRemoveSubscription?.unsubscribe();
    }
}
