import * as GUI from 'babylonjs-gui';
import {BuildingContainer} from './building/building.container';
import {Control} from '../../../../engine/gui-manager/gui-elements/elements/control';
import {CurrentTourContainer} from './current-tour/current-tour.container';
import {DialogOverlayContainer} from './dialog-overlay/dialog-overlay.container';
import {Gui} from '../../../../engine/gui-manager/gui-scene/gui';
import {MinimapContainer} from './minimap/minimap.container';
import {SelectedTerritoryStackPanel} from './selected-territory/selected-territory.stack-panel';
import {SelectedUnitContainer} from './selected-unit/selected-unit.container';
import {Subscription, filter, tap} from 'rxjs';
import {ToolbarContainer} from './toolbar/toolbar.container';
import {guiManager} from 'engine';
import {logic} from '../../../game';

export class SpaceGui extends Gui {
    private buildingContainer: BuildingContainer;
    private selectedUnitContainer: SelectedUnitContainer;
    private selectedTerritoryContainer: SelectedTerritoryStackPanel;
    private dialogOverlayContainer: DialogOverlayContainer;
    
    private selectedUnitSubscription: Subscription;
    private selectedTerritorySubscription: Subscription;
    private dialogServiceOpenedSubscription: Subscription;
    private dialogServiceClosedSubscription: Subscription;
    private selectedBuildingSubscription: Subscription;

    constructor() {
        super();
    }

    public onCreate(): void {
        guiManager().appendToRoot(new ToolbarContainer());
        guiManager().appendToRoot(new CurrentTourContainer());
        guiManager().appendToRoot(new MinimapContainer());
    }

    public onRegisterListeners(): void {
        this.selectedUnitSubscription = logic().selectedUnitService.selectedUnitId$.pipe(
            tap(() => this.selectedUnitContainer?.control.dispose()),
            filter((id: string) => !!id),
            tap(() => this.selectedUnitContainer = guiManager().appendToRoot(new SelectedUnitContainer())),
        ).subscribe();

        this.selectedTerritorySubscription = logic().selectedTerritoryService.selectedTerritoryId$.pipe(
            tap(() => this.selectedTerritoryContainer?.control.dispose()),
            filter((id: string) => !!id),
            tap(() => this.selectedTerritoryContainer = guiManager().appendToRoot(new SelectedTerritoryStackPanel()))
        ).subscribe();

        this.dialogServiceOpenedSubscription = logic().dialogService.open$.pipe(
            tap(() => this.dialogOverlayContainer?.control.dispose()),
            tap((body: Control<GUI.Control>) => this.dialogOverlayContainer = guiManager().appendToRoot(new DialogOverlayContainer(body)))
        ).subscribe();

        this.dialogServiceClosedSubscription = logic().dialogService.close$.pipe(
            tap(() => this.dialogOverlayContainer?.control.dispose())
        ).subscribe();

        this.selectedBuildingSubscription = logic().selectedBuildingService.selectedBuildingId$.pipe(
            tap(() => this.buildingContainer?.control.dispose()),
            filter((id: string) => !!id),
            tap(() => this.buildingContainer = guiManager().appendToRoot(new BuildingContainer()))
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
