import * as BABYLON from 'babylonjs';
import {ENGINE} from '@colonial-space/core/injector/tokens/engine/engine.token';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';

@Injectable()
export class FpsCounterService implements OnInit {
    private div: HTMLDivElement;
    
    @Inject(ENGINE) private engine: BABYLON.Engine;
    
    public gameOnInit(): void {
        this.createDivElement();

        this.engine.runRenderLoop(() => {
            this.div.innerHTML = this.engine.getFps().toFixed() + ' fps';
        });
    }

    private createDivElement(): void {
        this.div = document.createElement('div');
        this.div.style.position = 'absolute';
        this.div.style.fontSize = '12px';
        this.div.style.color = 'white';
        this.div.style.top = '15px';
        this.div.style.right = '10px';
        document.body.append(this.div);
    }
}
