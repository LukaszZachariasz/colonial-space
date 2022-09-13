import * as BABYLON from 'babylonjs';

export class FadeOutAnimation {
    public static run(mesh: BABYLON.AbstractMesh, delayMs?: number): void {
        setTimeout(() => {
            BABYLON.Animation.CreateAndStartAnimation(
                'FadeOutAnimation',
                mesh,
                'visibility',
                30,
                30,
                mesh.visibility,
                0.00,
                BABYLON.Animation.ANIMATIONTYPE_FLOAT
            );
        }, delayMs || 0);
    }
}
