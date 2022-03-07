import engine from 'engine';

export class FpsCounter {
    public div: HTMLDivElement;

    constructor() {
        this.div = document.createElement('div');
        this.div.style.position = 'absolute';
        this.div.style.fontSize = '12px';
        this.div.style.color = 'white';
        this.div.style.top = '15px';
        this.div.style.right = '10px';
        document.body.append(this.div);
    }

    public startRendering(): void {
        engine.engine.runRenderLoop(() => {
            this.div.innerHTML = engine.engine.getFps().toFixed() + ' fps';
        });
    }
}