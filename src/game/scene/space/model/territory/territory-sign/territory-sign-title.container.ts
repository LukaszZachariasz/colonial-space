import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../engine/gui-manager/gui-elements/container';
import {IconControl} from '../../../gui/shared/icon/icon.control';
import {Subject} from 'rxjs';
import {TerritoryState} from '../../../../../logic/store/territory/territory.state';
import {TextControl} from '../../../gui/shared/text/text.control';

export class TerritorySignTitleContainer extends Container {
    public text: TextControl;
    public icon: IconControl;
    public clicked$ = new Subject<void>();

    private readonly WIDTH = 10;
    private readonly HEIGHT = 2;
    private readonly GUI_SIZE = 512;
    private readonly TEXT_PADDING = 100;

    constructor(private territoryState: TerritoryState) {
        super('TerritorySignTitle');
    }
    
    public onCreate(): void {
        super.onCreate();
        this.text = new TextControl(this.territoryState.name);
        this.icon = new IconControl(this.territoryState.icon);
    }
    
    public onBuild(): void {
        this.addControlToContainer(this.icon);
        this.addControlToContainer(this.text);
    }
    
    public onRegisterListeners(): void {
        this.control.onPointerDownObservable.add(() => {
            this.clicked$.next();
        });
    }

    public onApplyStyles(): void {
        this.control.widthInPixels = this.GUI_SIZE * this.WIDTH;
        this.control.heightInPixels = this.GUI_SIZE * this.HEIGHT;
        this.control.background = 'rgba(0, 0, 0, 0.2)';

        this.icon.control.widthInPixels = this.GUI_SIZE * this.HEIGHT;
        this.icon.control.heightInPixels = this.GUI_SIZE * this.HEIGHT;

        this.text.control.fontSize = this.GUI_SIZE + 'px';
        this.text.control.left = (this.GUI_SIZE * this.HEIGHT) + this.TEXT_PADDING + 'px';
        this.text.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.text.control.widthInPixels = (this.GUI_SIZE * this.WIDTH) - (this.GUI_SIZE * this.HEIGHT) - this.TEXT_PADDING;
    }
}



