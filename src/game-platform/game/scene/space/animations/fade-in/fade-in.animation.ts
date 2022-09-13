import * as BABYLON from 'babylonjs';

export class FadeInAnimation {
    public static run(mesh: BABYLON.AbstractMesh, delayMs?: number): void {
        mesh.isVisible = false;
        mesh.visibility = 0;

        setTimeout(() => {
            mesh.isVisible = true;

            BABYLON.Animation.CreateAndStartAnimation(
                'FadeInAnimation',
                mesh,
                'visibility',
                30,
                60,
                0.00,
                1,
                BABYLON.Animation.ANIMATIONTYPE_FLOAT
            );
        }, delayMs || 0);
    }
}
