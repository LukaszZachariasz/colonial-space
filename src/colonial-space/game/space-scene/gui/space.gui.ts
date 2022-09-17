import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {BuildingGuiElement} from './building/building.gui-element';
import {CurrentTourContainer} from './current-tour/current-tour.container';
import {DialogOverlayGuiElement} from './dialog-overlay/dialog-overlay.gui-element';
import {DialogService} from '../../game-logic/dialog/dialog.service';
import {GuiControl} from '../../../../core/scene-manager/gui/gui-elements/gui-control';
import {Inject} from '@colonial-space/core/injector/inject';
import {MinimapGuiElement} from './minimap/minimap.gui-element';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {OnUnload} from '@colonial-space/core/lifecycle/on-unload/on-unload';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {SceneGuiManager} from '@colonial-space/core/scene-manager/gui/scene-gui-manager';
import {SelectedTerritoryGuiElement} from './selected-territory/selected-territory.gui-element';
import {SelectedUnitGuiElement} from './selected-unit/selected-unit.gui-element';
import {SelectionBuildingService} from '../../game-logic/selection/building/selection-building.service';
import {SelectionTerritoryService} from '../../game-logic/selection/territory/selection-territory.service';
import {SelectionUnitService} from '../../game-logic/selection/unit/selection-unit.service';
import {Subscription, filter, tap} from 'rxjs';
import {ToolbarGuiElement} from './toolbar/toolbar.gui-element';

export class SpaceGui implements OnLoad, OnUnload {
    @Inject(SceneGuiManager) private sceneGuiManager: SceneGuiManager;
    @Inject(SelectionUnitService) private selectionUnitService: SelectionUnitService;
    @Inject(SelectionTerritoryService) private selectionTerritoryService: SelectionTerritoryService;
    @Inject(SelectionBuildingService) private selectionBuildingService: SelectionBuildingService;
    @Inject(DialogService) private dialogService: DialogService;
    @Inject(SCENE) private scene: BABYLON.Scene;

    private buildingContainer: BuildingGuiElement;
    private selectedUnitContainer: SelectedUnitGuiElement;
    private selectedTerritoryContainer: SelectedTerritoryGuiElement;
    private dialogOverlayContainer: DialogOverlayGuiElement;
    
    private selectedUnitSubscription: Subscription;
    private selectedTerritorySubscription: Subscription;
    private dialogServiceOpenedSubscription: Subscription;
    private dialogServiceClosedSubscription: Subscription;
    private selectedBuildingSubscription: Subscription;

    public gameOnLoad(): void {
        this.sceneGuiManager.appendToRoot(new ToolbarGuiElement());
        this.sceneGuiManager.appendToRoot(new CurrentTourContainer());
        this.sceneGuiManager.appendToRoot(new MinimapGuiElement());
        
        this.selectedUnitSubscription = this.selectionUnitService.selectedUnitId$.pipe(
            tap(() => this.selectedUnitContainer?.control.dispose()),
            filter((id: string) => !!id),
            tap(() => this.selectedUnitContainer = this.sceneGuiManager.appendToRoot(new SelectedUnitGuiElement())),
        ).subscribe();

        this.selectedTerritorySubscription = this.selectionTerritoryService.selectedTerritoryId$.pipe(
            tap(() => this.selectedTerritoryContainer?.control.dispose()),
            filter((id: string) => !!id),
            tap(() => this.selectedTerritoryContainer = this.sceneGuiManager.appendToRoot(new SelectedTerritoryGuiElement()))
        ).subscribe();

        this.dialogServiceOpenedSubscription = this.dialogService.open$.pipe(
            tap(() => this.dialogOverlayContainer?.control.dispose()),
            tap((body: GuiControl<GUI.Control>) => this.dialogOverlayContainer = this.sceneGuiManager.appendToRoot(new DialogOverlayGuiElement(body)))
        ).subscribe();

        this.dialogServiceClosedSubscription = this.dialogService.close$.pipe(
            tap(() => this.dialogOverlayContainer?.control.dispose())
        ).subscribe();

        this.selectedBuildingSubscription = this.selectionBuildingService.selectedBuildingId$.pipe(
            tap(() => this.buildingContainer?.control.dispose()),
            filter((id: string) => !!id),
            tap(() => this.buildingContainer = this.sceneGuiManager.appendToRoot(new BuildingGuiElement()))
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
