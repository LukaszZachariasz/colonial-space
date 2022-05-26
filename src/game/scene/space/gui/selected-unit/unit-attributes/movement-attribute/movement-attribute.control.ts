import * as GUI from 'babylonjs-gui';
import {AttributeControl} from '../../../shared/attribute/attribute.control';
import {Control} from '../../../../../../../engine/gui-manager/control';
import {IconControl} from '../../../shared/icon/icon.control';
import {Subscription, filter, map, merge, tap} from 'rxjs';
import {TextControl} from '../../../shared/text/text.control';
import {UnitState} from '../../../../../../logic/store/unit/unit.state';
import {logic} from '../../../../../../game';
import {selectUnitById} from '../../../../../../logic/store/unit/unit.selectors';

export class MovementAttributeControl extends Control {
    public attributeControl: AttributeControl;
    public textControl: TextControl;

    private refreshUnitPointsSubscription: Subscription;

    constructor(private unitState: UnitState) {
        super();
    }

    public render(): GUI.Control {
        this.textControl = new TextControl(`This unit has ${this.unitState.movementPointsLeft} / ${this.unitState.movementPoints} movement.`);

        this.attributeControl = new AttributeControl(
            new IconControl('move'),
            this.textControl.render()
        );

        this.attributeControl.render();

        this.refreshUnitPointsSubscription = merge(
            logic().tourService.completeTour$,
            logic().unitMovementService.moveUnit$.pipe(
                filter((id: string) => this.unitState.id === id)
            )
        ).pipe(
            map(() => selectUnitById(this.unitState.id)),
            tap((state: UnitState) => this.textControl.textBlock.text = `This unit has ${state.movementPointsLeft} / ${state.movementPoints} movement.`)
        ).subscribe();

        this.attributeControl.iconControl.icon.onDisposeObservable.add(() => {
            this.refreshUnitPointsSubscription?.unsubscribe();
        });

        return this.attributeControl.iconControl.icon;
    }
}