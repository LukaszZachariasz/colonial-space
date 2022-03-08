import * as BABYLON from 'babylonjs';

export class FromAboveCamera extends BABYLON.ArcRotateCamera {
    public boundary = 50;

    public maxLeft = -50;
    public maxRight = 50;
    public maxTop = 50;
    public maxBottom = -50;

    public movingSpeed = 0.5;

    private shouldMoveTop = false;
    private shouldMoveRight = false;
    private shouldMoveBottom = false;
    private shouldMoveLeft = false;

    constructor(name: string, alpha: number, beta: number, radius: number, position: BABYLON.Vector3, scene: BABYLON.Scene) {
        super(name, alpha, beta, radius, position, scene);

        this.listenOnBoundaries();
        this.lowerRadiusLimit = 40;
        this.upperRadiusLimit = 200;
        this.upperBetaLimit = Math.PI / 4;
        this.lowerAlphaLimit = -Math.PI / 2;
        this.upperAlphaLimit = -Math.PI / 2;
        this.panningSensibility = 0;
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
}