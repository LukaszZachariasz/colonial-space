import {gameEngine} from '../../game-platform';

export class FpsCounter {
    private div: HTMLDivElement;

    public start(): void {
        this.createDivElement();

        gameEngine().engine.runRenderLoop(() => {
            this.div.innerHTML = gameEngine().engine.getFps().toFixed() + ' fps';
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
