import * as BABYLON from 'babylonjs';
import {AddTourEffect} from '../../../../../logic/services/tour/tour-effect/add-tour-effect';
import {Container} from 'typedi';
import {HasTourEffects} from '../../../../../logic/services/tour/tour-effect/has-tour-effects';
import {Observable, Subscriber, filter, merge, switchMap, take, tap} from 'rxjs';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {SceneManagerService} from '../../../../../../../core/scene-manager/scene-manager.service';
import {SelectedUnitService} from '../../../../../logic/services/unit/selected-unit.service';
import {TourEffectPriorityEnum} from '../../../../../logic/services/tour/tour-effect/tour-effect-priority.enum';
import {TourService} from '../../../../../logic/services/tour/tour.service';
import {UnitMovementPathModel} from './unit-movement-path/unit-movement-path.model';
import {UnitMovementService} from '../../../../../logic/services/unit/unit-movement.service';

@HasTourEffects()
export class UnitMovement implements OnDestroy {
    public unitMovementPathModel: UnitMovementPathModel;

    private position: BABYLON.Vector2;
    private unitRotate = (): void => this.lerpUnitRotate();
    private unitRotationSubscriber: Subscriber<any>;

    constructor(private scene: BABYLON.Scene,
                private id: string,
                private transformMesh: BABYLON.AbstractMesh) {
        Container.get(SelectedUnitService).selectedUnitId$.pipe(
            tap(() => this.unitMovementPathModel?.lines?.dispose()),
            filter((id: string) => this.id === id),
            tap(() => this.unitMovementPathModel = new UnitMovementPathModel(this.scene, this.id)),
        ).subscribe();

        merge(
            Container.get(UnitMovementService).addedPlanMovement$.pipe(filter((id: string) => this.id === id)),
            Container.get(TourService).completeTour$
        ).pipe(
            filter(() => !!this.unitMovementPathModel && !this.unitMovementPathModel.lines.isDisposed()),
            tap(() => this.unitMovementPathModel.recalculate())
        ).subscribe();

        Container.get(UnitMovementService).moveUnit$.pipe(
            filter((id: string) => this.id === id),
            switchMap(() => this.initMove().pipe(take(1))),
            switchMap(() => this.rotation().pipe(take(1))),
            switchMap(() => this.move().pipe(take(1)))
        ).subscribe();
    }

    @AddTourEffect({
        name: 'unit init move',
        priority: TourEffectPriorityEnum.UNIT_INIT_MOVE_TOUR_EFFECT_PRIORITY
    })
    public initMove(): Observable<any> {
        return new Observable<any>((subscriber: Subscriber<any>) => {
            this.position = Container.get(UnitMovementService).moveUnit(this.id);
            subscriber.next();
            subscriber.complete();
        });
    }

    @AddTourEffect({
        name: 'unit rotation',
        priority: TourEffectPriorityEnum.UNIT_ROTATE_TOUR_EFFECT_PRIORITY
    })
    public rotation(): Observable<any> {
        return new Observable<any>((subscriber: Subscriber<any>) => {
            if (this.position === undefined) {
                subscriber.next();
                subscriber.complete();
                return;
            }
            this.unitRotationSubscriber = subscriber;
            Container.get(SceneManagerService).currentScene.scene.registerBeforeRender(this.unitRotate);
        });
    }

    @AddTourEffect({
        name: 'unit movement',
        priority: TourEffectPriorityEnum.UNIT_MOVE_TOUR_EFFECT_PRIORITY
    })
    public move(): Observable<any> {
        return new Observable<any>((subscriber: Subscriber<any>) => {
            if (this.unitMovementPathModel?.lines?.isDisposed() === false) {
                this.unitMovementPathModel.recalculate();
            }
            if (this.position === undefined) {
                subscriber.next();
                subscriber.complete();
                return;
            }

            BABYLON.Animation.CreateAndStartAnimation(
                'anim',
                this.transformMesh,
                'position',
                30,
                60,
                this.transformMesh.position,
                new BABYLON.Vector3(this.position.x, this.transformMesh.position.y, this.position.y),
                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
                new BABYLON.BezierCurveEase(0.60, 0, 0.50, 1),
                () => this.onAnimationEnd(subscriber)
            );
        });
    }

    private onAnimationEnd(subscriber: Subscriber<void>): void {
        subscriber.next();
        subscriber.complete();
    }

    private lerpUnitRotate(): void {
        if (this.position === undefined) {
            Container.get(SceneManagerService).currentScene.scene.unregisterBeforeRender(this.unitRotate);
            this.unitRotationSubscriber.next();
            this.unitRotationSubscriber.complete();
            return;
        }
        const tempQuat = BABYLON.Quaternion.Identity();
        const slerpAmount = .1;
        tempQuat.copyFrom(this.transformMesh.rotationQuaternion);
        this.transformMesh.lookAt(new BABYLON.Vector3(this.position.x, this.transformMesh.position.y, this.position.y));

        BABYLON.Quaternion.SlerpToRef(tempQuat, this.transformMesh.rotationQuaternion, slerpAmount, this.transformMesh.rotationQuaternion);

        if (this.transformMesh.rotationQuaternion.equalsWithEpsilon(tempQuat)) {
            Container.get(SceneManagerService).currentScene.scene.unregisterBeforeRender(this.unitRotate);
            this.unitRotationSubscriber.next();
            this.unitRotationSubscriber.complete();
        }
    }

    public gameOnDestroy(): void {
        (this as any).clearTourEffects();
    }
}