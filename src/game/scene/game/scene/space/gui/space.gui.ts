import * as GUI from 'babylonjs-gui';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {BuildingGuiElement} from './building/building.gui-element';
import {Container} from 'typedi';
import {CurrentTourContainer} from './current-tour/current-tour.container';
import {DialogOverlayGuiElement} from './dialog-overlay/dialog-overlay.gui-element';
import {DialogService} from '../../../logic/services/dialog/dialog.service';
import {GuiControl} from '../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiManagerService} from '../../../../../core/gui-manager/gui-manager.service';
import {GuiScene} from '../../../../../core/gui-manager/gui-scene/gui-scene';
import {MinimapGuiElement} from './minimap/minimap.gui-element';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnReady} from '@colonial-space/core/lifecycle/on-ready/on-ready';
import {SelectedBuildingService} from '../../../logic/services/building/selected-building.service';
import {SelectedTerritoryGuiElement} from './selected-territory/selected-territory.gui-element';
import {SelectedTerritoryService} from '../../../logic/services/territory/selected-territory.service';
import {SelectedUnitGuiElement} from './selected-unit/selected-unit.gui-element';
import {SelectedUnitService} from '../../../logic/services/unit/selected-unit.service';
import {Subscription, filter, tap} from 'rxjs';
import {ToolbarGuiElement} from './toolbar/toolbar.gui-element';

@GuiScene()
export class SpaceGui implements OnInit, OnReady, OnDestroy {
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
        Container.get(GuiManagerService).appendToRoot(new ToolbarGuiElement());
        Container.get(GuiManagerService).appendToRoot(new CurrentTourContainer());
        Container.get(GuiManagerService).appendToRoot(new MinimapGuiElement());
    }

    public gameOnReady(): void {
        this.selectedUnitSubscription = Container.get(SelectedUnitService).selectedUnitId$.pipe(
            tap(() => this.selectedUnitContainer?.control.dispose()),
            filter((id: string) => !!id),
            tap(() => this.selectedUnitContainer = Container.get(GuiManagerService).appendToRoot(new SelectedUnitGuiElement())),
        ).subscribe();

        this.selectedTerritorySubscription = Container.get(SelectedTerritoryService).selectedTerritoryId$.pipe(
            tap(() => this.selectedTerritoryContainer?.control.dispose()),
            filter((id: string) => !!id),
            tap(() => this.selectedTerritoryContainer = Container.get(GuiManagerService).appendToRoot(new SelectedTerritoryGuiElement()))
        ).subscribe();

        this.dialogServiceOpenedSubscription = Container.get(DialogService).open$.pipe(
            tap(() => this.dialogOverlayContainer?.control.dispose()),
            tap((body: GuiControl<GUI.Control>) => this.dialogOverlayContainer = Container.get(GuiManagerService).appendToRoot(new DialogOverlayGuiElement(body)))
        ).subscribe();

        this.dialogServiceClosedSubscription = Container.get(DialogService).close$.pipe(
            tap(() => this.dialogOverlayContainer?.control.dispose())
        ).subscribe();

        this.selectedBuildingSubscription = Container.get(SelectedBuildingService).selectedBuildingId$.pipe(
            tap(() => this.buildingContainer?.control.dispose()),
            filter((id: string) => !!id),
            tap(() => this.buildingContainer = Container.get(GuiManagerService).appendToRoot(new BuildingGuiElement()))
        ).subscribe();
    }

    public gameOnDestroy(): void {
        this.selectedUnitSubscription?.unsubscribe();
        this.selectedTerritorySubscription?.unsubscribe();
        this.dialogServiceOpenedSubscription?.unsubscribe();
        this.dialogServiceClosedSubscription?.unsubscribe();
        this.selectedBuildingSubscription?.unsubscribe();
    }
}
