import * as GUI from 'babylonjs-gui';
import {BuildingGuiElement} from './building/building.gui-element';
import {CurrentTourContainer} from './current-tour/current-tour.container';
import {DialogOverlayGuiElement} from './dialog-overlay/dialog-overlay.gui-element';
import {Gui} from '../../../../engine/gui-manager/gui-scene/gui';
import {GuiControl} from '../../../../engine/gui-manager/gui-elements/gui-control';
import {MinimapGuiElement} from './minimap/minimap.gui-element';
import {SelectedTerritoryGuiElement} from './selected-territory/selected-territory.gui-element';
import {SelectedUnitGuiElement} from './selected-unit/selected-unit.gui-element';
import {Subscription, filter, tap} from 'rxjs';
import {ToolbarGuiElement} from './toolbar/toolbar.gui-element';
import {guiManager} from 'engine';
import {logic} from '../../../game';

export class SpaceGui extends Gui {
    private buildingContainer: BuildingGuiElement;
    private selectedUnitContainer: SelectedUnitGuiElement;
    private selectedTerritoryContainer: SelectedTerritoryGuiElement;
    private dialogOverlayContainer: DialogOverlayGuiElement;
    
    private selectedUnitSubscription: Subscription;
    private selectedTerritorySubscription: Subscription;
    private dialogServiceOpenedSubscription: Subscription;
    private dialogServiceClosedSubscription: Subscription;
    private selectedBuildingSubscription: Subscription;

    constructor() {
        super();
    }

    public onCreate(): void {
        guiManager().appendToRoot(new ToolbarGuiElement());
        guiManager().appendToRoot(new CurrentTourContainer());
        guiManager().appendToRoot(new MinimapGuiElement());
    }

    public onRegisterListeners(): void {
        this.selectedUnitSubscription = logic().selectedUnitService.selectedUnitId$.pipe(
            tap(() => this.selectedUnitContainer?.control.dispose()),
            filter((id: string) => !!id),
            tap(() => this.selectedUnitContainer = guiManager().appendToRoot(new SelectedUnitGuiElement())),
        ).subscribe();

        this.selectedTerritorySubscription = logic().selectedTerritoryService.selectedTerritoryId$.pipe(
            tap(() => this.selectedTerritoryContainer?.control.dispose()),
            filter((id: string) => !!id),
            tap(() => this.selectedTerritoryContainer = guiManager().appendToRoot(new SelectedTerritoryGuiElement()))
        ).subscribe();

        this.dialogServiceOpenedSubscription = logic().dialogService.open$.pipe(
            tap(() => this.dialogOverlayContainer?.control.dispose()),
            tap((body: GuiControl<GUI.Control>) => this.dialogOverlayContainer = guiManager().appendToRoot(new DialogOverlayGuiElement(body)))
        ).subscribe();

        this.dialogServiceClosedSubscription = logic().dialogService.close$.pipe(
            tap(() => this.dialogOverlayContainer?.control.dispose())
        ).subscribe();

        this.selectedBuildingSubscription = logic().selectedBuildingService.selectedBuildingId$.pipe(
            tap(() => this.buildingContainer?.control.dispose()),
            filter((id: string) => !!id),
            tap(() => this.buildingContainer = guiManager().appendToRoot(new BuildingGuiElement()))
        ).subscribe();
    }

    public onDestroy(): void {
        this.selectedUnitSubscription?.unsubscribe();
        this.selectedTerritorySubscription?.unsubscribe();
        this.dialogServiceOpenedSubscription?.unsubscribe();
        this.dialogServiceClosedSubscription?.unsubscribe();
        this.selectedBuildingSubscription?.unsubscribe();
    }
}
