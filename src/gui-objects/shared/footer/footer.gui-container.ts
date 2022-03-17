import * as GUI from 'babylonjs-gui';
import {FooterBackground} from './footer-background/footer-background';
import {GuiContainer} from '../../gui-container';

export class FooterGuiContainer extends GuiContainer {
    public footerBackground: FooterBackground;

    public static FOOTER_OPACITY = 0.4;


    public render(): GUI.Control {
        this.container = new GUI.Container('footer');
        this.container.height = '130px';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

        this.footerBackground = new FooterBackground();
        this.container.addControl(this.footerBackground.render());

        return this.container;
    }
}