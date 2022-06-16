import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../engine/lifecycle/after-created/after-created';
import {AppendControl} from '../../../../../../../engine/gui-manager/gui-elements/append-control/append-control';
import {AttributeContainer} from '../../../shared/attribute/attribute.container';
import {GameIcon} from '../../../shared/icon/game-icon';
import {GuiControl} from '../../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {IconControl} from '../../../shared/icon/icon.control';
import {OnDestroy} from '../../../../../../../engine/lifecycle/on-destroy/on-destroy';
import {OnReady} from '../../../../../../../engine/lifecycle/on-ready/on-ready';
import {Subscription, filter, map, merge, tap} from 'rxjs';
import {TextControl} from '../../../shared/text/text.control';
import {UnitState} from '../../../../../../logic/store/unit/unit.state';
import {logic} from '../../../../../../game';
import {selectUnitById} from '../../../../../../logic/store/unit/unit.selectors';

@GuiElement()
export class MovementAttributeContainer implements GuiControl<GUI.Container>, AfterCreated, OnReady, OnDestroy {
    public control: GUI.Container = new GUI.Container('movementAttribute');
    
    public textControl: TextControl = new TextControl(`This unit has ${this.unitState.movementPointsLeft} / ${this.unitState.movementPoints} movement.`);
    @AppendControl() public attributeControl: AttributeContainer = new AttributeContainer(new IconControl(GameIcon.MOVE), this.textControl);

    private refreshUnitPointsSubscription: Subscription;

    constructor(private unitState: UnitState) {
    }

    public gameAfterCreated(): void {
        this.control.left = '70px';
        this.control.adaptHeightToChildren = true;
        this.control.adaptWidthToChildren = true;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    }

    public gameOnReady(): void {
        this.refreshUnitPointsSubscription = merge(
            logic().tourService.completeTour$,
            logic().unitMovementService.moveUnit$.pipe(
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
