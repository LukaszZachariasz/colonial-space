import {AttributeContainer} from '../../../shared/attribute/attribute.container';
import {Container} from '../../../../../../../engine/gui-manager/gui-elements/container';
import {GameIcon} from '../../../shared/icon/game-icon';
import {IconControl} from '../../../shared/icon/icon.control';
import {Subscription, filter, map, merge, tap} from 'rxjs';
import {TextControl} from '../../../shared/text/text.control';
import {UnitState} from '../../../../../../logic/store/unit/unit.state';
import {logic} from '../../../../../../game';
import {selectUnitById} from '../../../../../../logic/store/unit/unit.selectors';

export class MovementAttributeContainer extends Container {
    public attributeControl: AttributeContainer;
    public textControl: TextControl;

    private refreshUnitPointsSubscription: Subscription;

    constructor(private unitState: UnitState) {
        super('movementAttribute');
    }

    public onCreate(): void {
        super.onCreate();
        this.textControl = new TextControl(`This unit has ${this.unitState.movementPointsLeft} / ${this.unitState.movementPoints} movement.`);
        this.attributeControl = new AttributeContainer(new IconControl(GameIcon.MOVE), this.textControl);
    }

    public onBuild(): void {
        this.addControlToContainer(this.attributeControl);
    }

    public onRegisterListeners(): void {
        this.refreshUnitPointsSubscription = merge(
            logic().tourService.completeTour$,
            logic().unitMovementService.moveUnit$.pipe(
                filter((id: string) => this.unitState.id === id)
            )
        ).pipe(
            map(() => selectUnitById(this.unitState.id)),
            tap((state: UnitState) => {
                this.textControl.text = `This unit has ${state.movementPointsLeft} / ${state.movementPoints} movement.`;
            })
        ).subscribe();
    }

    public onApplyStyles(): void {
        this.control.left = '70px';
    }

    public onDestroy(): void {
        this.refreshUnitPointsSubscription?.unsubscribe();
    }
}
