import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {
    AppendGuiControl
} from '../../../../../../engine/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {MinimapFogOfWarGuiElement} from './minimap-fog-of-war/minimap-fog-of-war.gui-element';
import {MinimapTerritoryGuiElement} from './minimap-territory/minimap-territory.gui-element';
import {MinimapUnitGuiElement} from './minimap-units/minimap-unit.gui-element';
import {OnDestroy} from '../../../../../../engine/lifecycle/on-destroy/on-destroy';
import {SquareState} from '../../../../../logic/store/map/square/square.state';
import {Subscription, delay, tap} from 'rxjs';
import {logic} from '../../../../../game';
import {
    selectSquareById,
    selectSquareByUnitId,
    selectSquares
} from '../../../../../logic/store/map/square/square.selectors';

@GuiElement()
export class MinimapObjectsGuiElement implements GuiControl<GUI.Container>, AfterCreated, OnDestroy {
    public control: GUI.Container = new GUI.Container('minimapObjects');

    @AppendGuiControl() public fogOfWarGuiElements: MinimapFogOfWarGuiElement[] = [];
    @AppendGuiControl() public territoryGuiElements: MinimapTerritoryGuiElement[] = [];
    @AppendGuiControl() public unitGuiElements: MinimapUnitGuiElement[] = [];

    public removeFogOfWarSubscription: Subscription;
    public unitAddSubscription: Subscription;
    public unitRemoveSubscription: Subscription;

    public gameAfterCreated(): void {
        selectSquares().flat().filter((el: SquareState) => el.fogOfWar).forEach((squareState: SquareState) => {
            this.fogOfWarGuiElements.push(new MinimapFogOfWarGuiElement(squareState));
        });

        selectSquares().flat().filter((el: SquareState) => !el.fogOfWar).forEach((squareState: SquareState) => {
            this.createSquareTerritoryObject(squareState);
        });

        selectSquares().flat().filter((el: SquareState) => el.unitId).forEach((squareState: SquareState) => {
            this.createSquareUnitObject(squareState);
        });

        this.unitAddSubscription = logic().unitService.addUnit$.pipe(
            tap((id: string) => this.createSquareUnitObject(selectSquareByUnitId(id)))
        ).subscribe();

        this.removeFogOfWarSubscription = logic().fogOfWarService.removeFogOfWar$.pipe(
            tap((id: string) => this.fogOfWarGuiElements = this.fogOfWarGuiElements.filter((el: MinimapFogOfWarGuiElement) => el.squareId !== id)),
            delay(300),
            tap((id: string) => this.createSquareTerritoryObject(selectSquareById(id)))
        ).subscribe();

        this.unitRemoveSubscription = logic().unitService.removeUnitId$.pipe(
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
