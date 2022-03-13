import * as GUI from 'babylonjs-gui';
import {gamePlatform} from '../../../../core/game-platform';
import {ComingThreatsList} from './coming-threats-list/coming-threats-list';
import {CurrentThreatsList} from './current-threats-list/current-threats-list';
import {GalaxyOriginNameText} from './galaxy-origin-name-text/galaxy-origin-name-text';
import {
    GalaxyOriginState
} from '../../../../game-core/game-state/gameplay-state/galaxy-state/galaxy-origin-state/galaxy-origin-state';
import {GameObjectGui} from '../../../../game-objects-gui/game-object-gui';
import {RightContentBox} from '../../../../game-objects-gui/shared/right-content-box/right-content-box';

export class GalaxyOriginContent implements GameObjectGui {
    public rightContentBox: RightContentBox;

    private isCreated = false;

    constructor(private galaxyOriginState: GalaxyOriginState) {
    }

    public create(): GUI.Control {
        if (this.isCreated) {
            return;
        }

        this.rightContentBox = gamePlatform().engine.guiManager.create(new RightContentBox());
        this.rightContentBox.container.onDisposeObservable.addOnce(() => this.isCreated = false);

        gamePlatform().engine.guiManager.create(new GalaxyOriginNameText(this.galaxyOriginState), this.rightContentBox.container);
        gamePlatform().engine.guiManager.create(new CurrentThreatsList(this.galaxyOriginState), this.rightContentBox.container);
        gamePlatform().engine.guiManager.create(new ComingThreatsList(this.galaxyOriginState), this.rightContentBox.container);

        this.isCreated = true;

        return this.rightContentBox.container;
    }
}
