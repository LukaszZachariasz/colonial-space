import {GameService} from '../../game.service';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {OnReady} from '@colonial-space/core/lifecycle/on-ready/on-ready';

@Injectable()
export class FpsCounterService implements OnReady {
    private div: HTMLDivElement;
    
    @Inject(GameService) private gameService: GameService;
    
    public gameOnReady(): void {
        this.createDivElement();

        this.gameService.engine.runRenderLoop(() => {
            this.div.innerHTML = this.gameService.engine.getFps().toFixed() + ' fps';
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
