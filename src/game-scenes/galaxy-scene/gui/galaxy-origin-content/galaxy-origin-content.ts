import * as GUI from 'babylonjs-gui';
import {GameObjectGui} from '../../../../game-objects-gui/game-object-gui';
import {GeneratedGalaxyOrigin} from '../../../../game-objects/galaxy/generated-galaxy-origin';
import {RightContentBox} from '../../../../game-objects-gui/right-content-box/right-content-box';
import gameState from '../../../../game-core/game-state/game-state';

export class GalaxyOriginContent implements GameObjectGui {
    public advanceTexture: GUI.AdvancedDynamicTexture;
    public rightContentBox: RightContentBox;
    public galaxyOriginNameTextBlock: GUI.TextBlock;

    private isCreated = false;

    constructor(private generatedGalaxyOrigin: GeneratedGalaxyOrigin) {
    }

    public create(): void {
        if (this.isCreated) {
            return;
        }
        this.rightContentBox = new RightContentBox();
        this.rightContentBox.create();
        this.rightContentBox.container.onDisposeObservable.addOnce(() => this.isCreated = false);

        this.advanceTexture.addControl(this.rightContentBox.container);

        this.galaxyOriginNameTextBlock = new GUI.TextBlock('galaxyOriginName', gameState.gameplayState.galaxyState.galaxyOriginState.name);
        this.galaxyOriginNameTextBlock.color = 'white';
        this.galaxyOriginNameTextBlock.resizeToFit = true;
        this.galaxyOriginNameTextBlock.top = '20px';
        this.galaxyOriginNameTextBlock.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.galaxyOriginNameTextBlock.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.rightContentBox.container.addControl(this.galaxyOriginNameTextBlock);


        console.log('planet temp: ' +gameState.gameplayState.galaxyState.galaxyAreaStates[0].planetStates[0].temperature);
        console.log('threats:' + gameState.gameplayState.galaxyState.galaxyOriginState.threats);

        this.isCreated = true;
    }
}
