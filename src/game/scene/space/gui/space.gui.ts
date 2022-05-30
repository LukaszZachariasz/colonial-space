import * as GUI from 'babylonjs-gui';
import {BuildingContainer} from './building/building.container';
import {BuildingScopeState} from '../../../logic/store/territory/building/building-scope.state';
import {CurrentTourContainer} from './current-tour/current-tour.container';
import {DialogOverlayContainer} from './dialog-overlay/dialog-overlay.container';
import {Gui} from '../../../../engine/gui-manager/gui';
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
        this.guiManager.render(new ToolbarContainer());
        this.guiManager.render(new CurrentTourContainer());
        this.guiManager.render(new MinimapContainer());

        logic().selectedUnitService.selectedUnitId$.pipe(
            tap(() => this.selectedUnitContainer?.container.dispose()),
            filter((id: string) => !!id),
            tap(() => this.selectedUnitContainer = guiManager().render(new SelectedUnitContainer())),
        ).subscribe();

        logic().selectedTerritoryService.selectedTerritoryId$.pipe(
            tap(() => this.selectedTerritoryContainer?.stackPanel.dispose()),
            filter((id: string) => !!id),
            tap(() => this.selectedTerritoryContainer = guiManager().render(new SelectedTerritoryStackPanel()))
        ).subscribe();

        logic().dialogService.open$.pipe(
            tap(() => this.dialogOverlayContainer?.container.dispose()),
            tap((body: GUI.Control) => this.dialogOverlayContainer = guiManager().render(new DialogOverlayContainer(body)))
        ).subscribe();

        logic().dialogService.close$.pipe(
            tap(() => this.dialogOverlayContainer?.container.dispose())
        ).subscribe();

        logic().buildingService.openedBuildingScopeState$.pipe(
            tap(() => this.buildingContainer?.container.dispose()),
            filter((buildingScopeState: BuildingScopeState) => !!buildingScopeState),
            tap((buildingScopeState: BuildingScopeState) => this.buildingContainer = guiManager().render(new BuildingContainer(buildingScopeState)))
        ).subscribe();
    }
}
