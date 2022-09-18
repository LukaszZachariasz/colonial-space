import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '@colonial-space/core/module/scene/gui/gui-elements/append-gui-control/append-gui-control';
import {AttributeGuiElement} from '../../../shared/attribute/attribute.gui-element';
import {GameIcon} from '../../../shared/icon/game-icon';
import {GuiControl} from '@colonial-space/core/module/scene/gui/gui-elements/gui-control';
import {GuiElement} from '@colonial-space/core/module/scene/gui/gui-elements/gui-element';
import {IconGuiElement} from '../../../shared/icon/icon.gui-element';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {Subscription, filter, map, merge, tap} from 'rxjs';
import {TextGuiElement} from '../../../shared/text/text.gui-element';
import {TourService} from '../../../../../game-logic/tour/tour.service';
import {UnitMovementService} from '../../../../../game-logic/unit/unit-movement.service';
import {UnitState} from '../../../../../game-logic/store/unit/unit.state';
import {selectUnitById} from '../../../../../game-logic/store/unit/unit.selectors';

@GuiElement()
export class MovementAttributeGuiElement implements GuiControl<GUI.Container>, OnInit, OnLoad, OnDestroy {
    @Inject(TourService) private tourService: TourService;
    @Inject(UnitMovementService) private unitMovementService: UnitMovementService;
    
    public control: GUI.Container = new GUI.Container('movementAttribute');
    
    public textControl: TextGuiElement = new TextGuiElement(`This unit has ${this.unitState.movementPointsLeft} / ${this.unitState.movementPoints} movement.`);
    @AppendGuiControl() public attribute: AttributeGuiElement = new AttributeGuiElement(
        new IconGuiElement(GameIcon.MOVE),
        this.textControl
    );

    private refreshUnitPointsSubscription: Subscription;

    constructor(private unitState: UnitState) {
    }

    public gameOnInit(): void {
        this.control.left = '70px';
        this.control.adaptHeightToChildren = true;
        this.control.adaptWidthToChildren = true;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    }

    public gameOnLoad(): void {
        this.refreshUnitPointsSubscription = merge(
            this.tourService.completeTour$,
            this.unitMovementService.moveUnit$.pipe(
                filter((id: string) => this.unitState.id === id)
            )
        ).pipe(
            map(() => selectUnitById(this.unitState.id)),
            tap((state: UnitState) => {
                this.textControl.control.text = `This unit has ${state.movementPointsLeft} / ${state.movementPoints} movement.`;
            })
        ).subscribe();
    }

    public gameOnDestroy(): void {
        this.refreshUnitPointsSubscription?.unsubscribe();
    }
}
