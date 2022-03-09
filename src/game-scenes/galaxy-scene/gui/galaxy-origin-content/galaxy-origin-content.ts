import * as GUI from 'babylonjs-gui';
import {GalaxyOrigin} from '../../../../game-objects/galaxy-origin/galaxy-origin';
import {GameObjectGui} from '../../../../game-objects-gui/game-object-gui';
import {RightContentBox} from '../../../../game-objects-gui/right-content-box/right-content-box';

export class GalaxyOriginContent implements GameObjectGui {
    public advanceTexture: GUI.AdvancedDynamicTexture;
    public rightContentBox: RightContentBox;
    public galaxyOriginNameTextBlock: GUI.TextBlock;

    private isCreated = false;

    constructor(private galaxyOrigin: GalaxyOrigin) {
    }

    public create(): void {
        if (this.isCreated) {
            return;
        }
        this.rightContentBox = new RightContentBox();
        this.rightContentBox.create();
        this.rightContentBox.container.onDisposeObservable.addOnce(() => this.isCreated = false);

        this.advanceTexture.addControl(this.rightContentBox.container);

        this.galaxyOriginNameTextBlock = new GUI.TextBlock('galaxyOriginName', this.galaxyOrigin.name);
        this.galaxyOriginNameTextBlock.color = 'white';
        this.galaxyOriginNameTextBlock.resizeToFit = true;
        this.galaxyOriginNameTextBlock.top = '20px';
        this.galaxyOriginNameTextBlock.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.galaxyOriginNameTextBlock.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.rightContentBox.container.addControl(this.galaxyOriginNameTextBlock);
        this.isCreated = true;
    }
}