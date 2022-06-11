import * as GUI from 'babylonjs-gui';
import {BuildingContainer} from './building/building.container';
import {Control} from '../../../../engine/gui-manager/gui-elements/control';
import {CurrentTourContainer} from './current-tour/current-tour.container';
import {DialogOverlayContainer} from './dialog-overlay/dialog-overlay.container';
import {Gui} from '../../../../engine/gui-manager/gui-scene/gui';
import {MinimapContainer} from './minimap/minimap.container';
import {SelectedTerritoryStackPanel} from './selected-territory/selected-territory.stack-panel';
import {SelectedUnitContainer} from './selected-unit/selected-unit.container';
import {ToolbarContainer} from './toolbar/toolbar.container';
import {filter, tap} from 'rxjs';
import {guiManager} from 'engine';
import {logic} from '../../../game';

export class SpaceGui extends Gui {
    private buildingContainer: BuildingContainer;
    private selectedUnitContainer: SelectedUnitContainer;
    private selectedTerritoryContainer: SelectedTerritoryStackPanel;
    private dialogOverlayContainer: DialogOverlayContainer;

    constructor() {
        super();
    }

    public render(): void {
        this.guiManager.appendToRoot(new ToolbarContainer());
        this.guiManager.appendToRoot(new CurrentTourContainer());
        this.guiManager.appendToRoot(new MinimapContainer());

        logic().selectedUnitService.selectedUnitId$.pipe(
            tap(() => this.selectedUnitContainer?.control.dispose()),
            filter((id: string) => !!id),
            tap(() => this.selectedUnitContainer = guiManager().appendToRoot(new SelectedUnitContainer())),
        ).subscribe();

        logic().selectedTerritoryService.selectedTerritoryId$.pipe(
            tap(() => this.selectedTerritoryContainer?.control.dispose()),
            filter((id: string) => !!id),
            tap(() => this.selectedTerritoryContainer = guiManager().appendToRoot(new SelectedTerritoryStackPanel()))
        ).subscribe();

        logic().dialogService.open$.pipe(
            tap(() => this.dialogOverlayContainer?.control.dispose()),
            tap((body: Control<GUI.Control>) => this.dialogOverlayContainer = guiManager().appendToRoot(new DialogOverlayContainer(body)))
        ).subscribe();

        logic().dialogService.close$.pipe(
            tap(() => this.dialogOverlayContainer?.control.dispose())
        ).subscribe();

        logic().selectedBuildingService.selectedBuildingId$.pipe(
            tap(() => this.buildingContainer?.control.dispose()),
            filter((id: string) => !!id),
            tap(() => this.buildingContainer = guiManager().appendToRoot(new BuildingContainer()))
        ).subscribe();
    }
}
