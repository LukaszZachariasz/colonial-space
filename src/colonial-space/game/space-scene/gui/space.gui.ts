import * as GUI from 'babylonjs-gui';
import {BuildingGuiElement} from './building/building.gui-element';
import {DialogOverlayGuiElement} from './dialog-overlay/dialog-overlay.gui-element';
import {DialogService} from '../../game-logic/dialog/dialog.service';
import {GuiControl} from '../../../core/gui-manager/gui-elements/gui-control';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injector} from '@colonial-space/core/injector/injector';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {OnUnload} from '@colonial-space/core/lifecycle/on-unload/on-unload';
import {SceneGuiManager} from '@colonial-space/core/scene-manager/gui/scene-gui-manager';
import {SelectedBuildingService} from '../../game-logic/building/selected-building.service';
import {SelectedTerritoryGuiElement} from './selected-territory/selected-territory.gui-element';
import {SelectedUnitGuiElement} from './selected-unit/selected-unit.gui-element';
import {SelectionTerritoryService} from '../../game-logic/territory/selection-territory.service';
import {SelectionUnitService} from '../../game-logic/unit/selection-unit.service';
import {Subscription, filter, tap} from 'rxjs';

export class SpaceGui implements OnInit, OnLoad, OnUnload {
    @Inject(SceneGuiManager) private guiManager: SceneGuiManager;

    private buildingContainer: BuildingGuiElement;
    private selectedUnitContainer: SelectedUnitGuiElement;
    private selectedTerritoryContainer: SelectedTerritoryGuiElement;
    private dialogOverlayContainer: DialogOverlayGuiElement;
    
    private selectedUnitSubscription: Subscription;
    private selectedTerritorySubscription: Subscription;
    private dialogServiceOpenedSubscription: Subscription;
    private dialogServiceClosedSubscription: Subscription;
    private selectedBuildingSubscription: Subscription;

    public gameOnInit(): void {
/*        this.guiManager.appendToRoot(new ToolbarGuiElement());
        this.guiManager.appendToRoot(new CurrentTourContainer());
        this.guiManager.appendToRoot(new MinimapGuiElement());*/
    }

    public gameOnLoad(): void {
        this.selectedUnitSubscription = Injector.inject(SelectionUnitService).selectedUnitId$.pipe(
            tap(() => this.selectedUnitContainer?.control.dispose()),
            filter((id: string) => !!id),
            tap(() => this.selectedUnitContainer = this.guiManager.appendToRoot(new SelectedUnitGuiElement())),
        ).subscribe();

        this.selectedTerritorySubscription = Injector.inject(SelectionTerritoryService).selectedTerritoryId$.pipe(
            tap(() => this.selectedTerritoryContainer?.control.dispose()),
            filter((id: string) => !!id),
            tap(() => this.selectedTerritoryContainer = this.guiManager.appendToRoot(new SelectedTerritoryGuiElement()))
        ).subscribe();

        this.dialogServiceOpenedSubscription = Injector.inject(DialogService).open$.pipe(
            tap(() => this.dialogOverlayContainer?.control.dispose()),
            tap((body: GuiControl<GUI.Control>) => this.dialogOverlayContainer = this.guiManager.appendToRoot(new DialogOverlayGuiElement(body)))
        ).subscribe();

        this.dialogServiceClosedSubscription = Injector.inject(DialogService).close$.pipe(
            tap(() => this.dialogOverlayContainer?.control.dispose())
        ).subscribe();

        this.selectedBuildingSubscription = Injector.inject(SelectedBuildingService).selectedBuildingId$.pipe(
            tap(() => this.buildingContainer?.control.dispose()),
            filter((id: string) => !!id),
            tap(() => this.buildingContainer = this.guiManager.appendToRoot(new BuildingGuiElement()))
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