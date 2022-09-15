import * as GUI from 'babylonjs-gui';
import {BuildingGuiElement} from './building/building.gui-element';
import {CurrentTourContainer} from './current-tour/current-tour.container';
import {DialogOverlayGuiElement} from './dialog-overlay/dialog-overlay.gui-element';
import {DialogService} from '../../game-logic/dialog/dialog.service';
import {GuiControl} from '../../../core/gui-manager/gui-elements/gui-control';
import {GuiManager} from '@colonial-space/core/gui-manager/gui-manager';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injector} from '@colonial-space/core/injector/injector';
import {MinimapGuiElement} from './minimap/minimap.gui-element';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {OnUnload} from '@colonial-space/core/lifecycle/on-unload/on-unload';
import {SelectedBuildingService} from '../../game-logic/building/selected-building.service';
import {SelectedTerritoryGuiElement} from './selected-territory/selected-territory.gui-element';
import {SelectedTerritoryService} from '../../game-logic/territory/selected-territory.service';
import {SelectedUnitGuiElement} from './selected-unit/selected-unit.gui-element';
import {SelectedUnitService} from '../../game-logic/unit/selected-unit.service';
import {Subscription, filter, tap} from 'rxjs';
import {ToolbarGuiElement} from './toolbar/toolbar.gui-element';

export class SpaceGui implements OnInit, OnLoad, OnUnload {
    @Inject(GuiManager) private guiManager: GuiManager;

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
        this.selectedUnitSubscription = Injector.inject(SelectedUnitService).selectedUnitId$.pipe(
            tap(() => this.selectedUnitContainer?.control.dispose()),
            filter((id: string) => !!id),
            tap(() => this.selectedUnitContainer = this.guiManager.appendToRoot(new SelectedUnitGuiElement())),
        ).subscribe();

        this.selectedTerritorySubscription = Injector.inject(SelectedTerritoryService).selectedTerritoryId$.pipe(
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
