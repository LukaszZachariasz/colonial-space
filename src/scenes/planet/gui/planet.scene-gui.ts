import {FooterBackground} from '../../../gui-objects/shared/footer/footer-background/footer-background';
import {LeftSectionGuiContainer} from './left-section/left-section.gui-container';
import {
    NavigateBackButtonGuiObject
} from '../../../gui-objects/shared/navigate-back-button/navigate-back-button.gui-object';
import {
    PlanetState
} from '../../../engine/game-state/gameplay-state/galaxy-state/orbit-state/planet-state/planet-state';
import {RightSectionGuiContainer} from './right-section/right-section.gui-container';
import {SceneGui} from '../../scene-gui';
import {SectorListGuiContainer} from './sector-list/sector-list.gui-container';
import {ToolbarGuiContainer} from '../../../gui-objects/shared/toolbar/toolbar.gui-container';

export class PlanetSceneGui extends SceneGui {
    public leftSection: LeftSectionGuiContainer;
    public rightSection: RightSectionGuiContainer;

    constructor(private planetState: PlanetState) {
        super();
    }

    public render(): void {
        this.guiManager.render(new ToolbarGuiContainer());
        this.guiManager.render(new FooterBackground());

        this.leftSection = new LeftSectionGuiContainer();
        this.rightSection = new RightSectionGuiContainer();

        this.guiManager.render(this.leftSection);
        this.guiManager.render(this.rightSection);

        this.rightSection.container.addControl(new SectorListGuiContainer(this.planetState).render());

        this.guiManager.render(new NavigateBackButtonGuiObject('Galaxy view'));
    }
}
