import {GameScene} from '../game-scene';
import * as BABYLON from 'babylonjs';
import engine from '../../engine/engine';

export class MainMenuScene implements GameScene {

    create() {
        // This creates and positions a free camera (non-mesh)
        const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), engine._scene);

        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(engine._canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), engine._scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        const sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, engine._scene);

        // Move the sphere upward 1/2 its height
        sphere.position.y = -0.2;

        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        const ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, engine._scene);
    }
}
