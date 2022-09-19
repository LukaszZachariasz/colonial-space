import {ModelManager} from '@colonial-space/core/module/scene/model/model-manager';
import * as BABYLON from 'babylonjs';
import {AddTourEffect} from '../../../../game-logic/tour/tour-effect/add-tour-effect';
import {HasTourEffects} from '../../../../game-logic/tour/tour-effect/has-tour-effects';
import {Inject} from '@colonial-space/core/injector/inject';
import {Observable, Subscriber, filter, merge, switchMap, take, tap} from 'rxjs';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {SelectionUnitService} from '../../../../game-logic/selection/unit/selection-unit.service';
import {TourEffectPriorityEnum} from '../../../../game-logic/tour/tour-effect/tour-effect-priority.enum';
import {TourService} from '../../../../game-logic/tour/tour.service';
import {UnitMovementPathModel} from './unit-movement-path/unit-movement-path.model';
import {UnitMovementService} from '../../../../game-logic/unit/unit-movement.service';

@HasTourEffects()
export class UnitMovement implements OnDestroy {
    @Inject(TourService) private tourService: TourService;
    @Inject(UnitMovementService) private unitMovementService: UnitMovementService;
    @Inject(SelectionUnitService) private selectionUnitService: SelectionUnitService;

    public unitMovementPathModel: UnitMovementPathModel;

    private position: BABYLON.Vector2;
    private unitRotate = (): void => this.lerpUnitRotate();
    private unitRotationSubscriber: Subscriber<any>;

    constructor(private modelManager: ModelManager,
                private scene: BABYLON.Scene,
                private id: string,
                private transformMesh: BABYLON.AbstractMesh) {
        this.selectionUnitService.selectedUnitId$.pipe(
            tap(() => this.unitMovementPathModel?.mesh?.dispose()),
            filter((id: string) => this.id === id),
            tap(() => this.unitMovementPathModel = this.modelManager.create(UnitMovementPathModel, this.id)),
        ).subscribe();

        merge(
            this.unitMovementService.addedPlanMovement$.pipe(filter((id: string) => this.id === id)),
            this.tourService.completeTour$
        ).pipe(
            filter(() => !!this.unitMovementPathModel && !this.unitMovementPathModel.mesh.isDisposed()),
            tap(() => this.unitMovementPathModel.recalculate())
        ).subscribe();

        this.unitMovementService.moveUnit$.pipe(
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
            this.position = this.unitMovementService.moveUnit(this.id);
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
            this.scene.registerBeforeRender(this.unitRotate);
        });
    }

    @AddTourEffect({
        name: 'unit movement',
        priority: TourEffectPriorityEnum.UNIT_MOVE_TOUR_EFFECT_PRIORITY
    })
    public move(): Observable<any> {
        return new Observable<any>((subscriber: Subscriber<any>) => {
            if (this.unitMovementPathModel?.mesh?.isDisposed() === false) {
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
            this.scene.unregisterBeforeRender(this.unitRotate);
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
            this.scene.unregisterBeforeRender(this.unitRotate);
            this.unitRotationSubscriber.next();
            this.unitRotationSubscriber.complete();
        }
    }

    public gameOnDestroy(): void {
        (this as any).clearTourEffects();
    }
}
