import {BuildingGuiComponent} from './building/building.gui-component';
import {CurrentTourGuiComponent} from './current-tour/current-tour.gui-component';
import {DialogOverlayGuiComponent} from './dialog-overlay/dialog-overlay.gui-component';
import {DialogService} from '../../game-logic/dialog/dialog.service';
import {GuiControl} from '../../../../core/module/scene/gui/gui-component/gui-control';
import {Inject} from '@colonial-space/core/injector/inject';
import {MinimapGuiComponent} from './minimap/minimap.gui-component';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {OnUnload} from '@colonial-space/core/lifecycle/on-unload/on-unload';
import {SceneGuiManager} from '@colonial-space/core/module/scene/gui/scene-gui-manager';
import {SelectedTerritoryGuiComponent} from './selected-territory/selected-territory.gui-component';
import {SelectedUnitGuiComponent} from './selected-unit/selected-unit.gui-component';
import {SelectionBuildingService} from '../../game-logic/selection/building/selection-building.service';
import {SelectionTerritoryService} from '../../game-logic/selection/territory/selection-territory.service';
import {SelectionUnitService} from '../../game-logic/selection/unit/selection-unit.service';
import {Subscription, filter, tap} from 'rxjs';
import {ToolbarGuiComponent} from './toolbar/toolbar.gui-component';

export class SpaceGui implements OnLoad, OnUnload {
    @Inject(SceneGuiManager) private sceneGuiManager: SceneGuiManager;
    @Inject(SelectionUnitService) private selectionUnitService: SelectionUnitService;
    @Inject(SelectionTerritoryService) private selectionTerritoryService: SelectionTerritoryService;
    @Inject(SelectionBuildingService) private selectionBuildingService: SelectionBuildingService;
    @Inject(DialogService) private dialogService: DialogService;

    private buildingContainer: BuildingGuiComponent;
    private selectedUnitContainer: SelectedUnitGuiComponent;
    private selectedTerritoryContainer: SelectedTerritoryGuiComponent;
    private dialogOverlayContainer: DialogOverlayGuiComponent;
    
    private selectedUnitSubscription: Subscription;
    private selectedTerritorySubscription: Subscription;
    private dialogServiceOpenedSubscription: Subscription;
    private dialogServiceClosedSubscription: Subscription;
    private selectedBuildingSubscription: Subscription;

    public gameOnLoad(): void {
        this.sceneGuiManager.appendToRoot(new ToolbarGuiComponent());
        this.sceneGuiManager.appendToRoot(new CurrentTourGuiComponent());
        this.sceneGuiManager.appendToRoot(new MinimapGuiComponent());
        
        this.selectedUnitSubscription = this.selectionUnitService.selectedUnitId$.pipe(
            tap(() => this.selectedUnitContainer?.control.dispose()),
            filter((id: string) => !!id),
            tap(() => this.selectedUnitContainer = this.sceneGuiManager.appendToRoot(new SelectedUnitGuiComponent())),
        ).subscribe();

        this.selectedTerritorySubscription = this.selectionTerritoryService.selectedTerritoryId$.pipe(
            tap(() => this.selectedTerritoryContainer?.control.dispose()),
            filter((id: string) => !!id),
            tap(() => this.selectedTerritoryContainer = this.sceneGuiManager.appendToRoot(new SelectedTerritoryGuiComponent()))
        ).subscribe();

        this.dialogServiceOpenedSubscription = this.dialogService.open$.pipe(
            tap(() => this.dialogOverlayContainer?.control.dispose()),
            tap((body: GuiControl) => this.dialogOverlayContainer = this.sceneGuiManager.appendToRoot(new DialogOverlayGuiComponent(body)))
        ).subscribe();

        this.dialogServiceClosedSubscription = this.dialogService.close$.pipe(
            tap(() => this.dialogOverlayContainer?.control.dispose())
        ).subscribe();

        this.selectedBuildingSubscription = this.selectionBuildingService.selectedBuildingId$.pipe(
            tap(() => this.buildingContainer?.control.dispose()),
            filter((id: string) => !!id),
            tap(() => this.buildingContainer = this.sceneGuiManager.appendToRoot(new BuildingGuiComponent()))
        ).subscribe();
    }

    public gameOnUnload(): void {
        this.selectedUnitSubscription?.unsubscribe();
        this.selectedTerritorySubscription?.unsubscribe();
        this.dialogServiceOpenedSubscription?.unsubscribe();
        this.dialogServiceClosedSubscription?.unsubscribe();
        this.selectedBuildingSubscription?.unsubscribe();
    }
}
