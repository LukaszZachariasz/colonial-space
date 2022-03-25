import * as BABYLON from 'babylonjs';
import {MapGenerator} from '../../../store/store-generator/map-generator/map.generator';
import {SquareModel} from '../model/square/square.model';

export class FromAboveCamera extends BABYLON.ArcRotateCamera {
    public static readonly CameraUnitPerPixel = 30;

    public boundary = 5;

    public maxLeft = 0;
    public maxRight = MapGenerator.MapWidth * SquareModel.SquareEdgeWidth;
    public maxTop = 0;
    public maxBottom = -MapGenerator.MapHeight * SquareModel.SquareEdgeWidth;

    public movingSpeed = 0.4;

    public widthInPixels = 0;
    public heightInPixels = 0;

    private shouldMoveTop = false;
    private shouldMoveRight = false;
    private shouldMoveBottom = false;
    private shouldMoveLeft = false;


    constructor(name: string, alpha: number, beta: number, radius: number, position: BABYLON.Vector3, scene: BABYLON.Scene) {
        super(name, alpha, beta, radius, position, scene);

        this.listenOnBoundaries();
        this.lowerRadiusLimit = 40;
        this.upperRadiusLimit = 90;
        this.upperBetaLimit = Math.PI / 4;
        this.lowerAlphaLimit = -Math.PI / 2;
        this.upperAlphaLimit = -Math.PI / 2;

        this.panningSensibility = 0;

        this.calculateInPixels();
    }

    public getProportion(): number {
        return (this.maxRight - this.maxLeft) / (this.maxTop - this.maxBottom);
    }

    public getXPositionPercentage(): number {
        return (this.target.x - this.maxLeft) / (this.maxRight - this.maxLeft) * 100;
    }

    public getZPositionPercentage(): number {
        return (this.target.z - this.maxTop) / (this.maxBottom - this.maxTop) * 100;
    }

    public navigateToPercentage(xPercentage: number, yPercentage: number): void {
        this.target.x = (xPercentage * (this.maxRight - this.maxLeft)) / 100;
        this.target.z = (yPercentage * (this.maxTop - this.maxBottom)) / -100;
    }

    private listenOnBoundaries(): void {
        this._scene.onPointerObservable.add((pointer: BABYLON.PointerInfo) => {
            this.shouldMoveTop = pointer.event.y < this.boundary;
            this.shouldMoveRight = pointer.event.x > document.body.clientWidth - this.boundary;
            this.shouldMoveBottom = pointer.event.y > document.body.clientHeight - this.boundary;
            this.shouldMoveLeft = pointer.event.x < this.boundary;
        });

        this._scene.registerBeforeRender(() => {
            this.move();
            this.checkMaximum();
        });
    }

    private move(): void {
        if (this.shouldMoveTop) {
            this.target.z += this.movingSpeed;
        }
        if (this.shouldMoveRight) {
            this.target.x += this.movingSpeed;
        }
        if (this.shouldMoveBottom) {
            this.target.z -= this.movingSpeed;
        }
        if (this.shouldMoveLeft) {
            this.target.x -= this.movingSpeed;
        }
    }

    private checkMaximum(): void {
        if (this.target.z > this.maxTop) {
            this.target.z = this.maxTop;
        }
        if (this.target.x > this.maxRight) {
            this.target.x = this.maxRight;
        }
        if (this.target.x < this.maxLeft) {
            this.target.x = this.maxLeft;
        }
        if (this.target.z < this.maxBottom) {
            this.target.z = this.maxBottom;
        }
    }

    private calculateInPixels(): void {
        this.widthInPixels = (Math.abs(this.maxLeft) + Math.abs(this.maxRight)) * FromAboveCamera.CameraUnitPerPixel;
        this.heightInPixels = (Math.abs(this.maxTop) + Math.abs(this.maxBottom)) * FromAboveCamera.CameraUnitPerPixel;
    }
}
