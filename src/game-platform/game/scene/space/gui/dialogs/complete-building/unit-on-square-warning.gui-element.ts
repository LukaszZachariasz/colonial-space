import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {AppendGuiControl} from '../../../../../../engine/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {ButtonGuiElement} from '../../shared/button/button.gui-element';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {TextGuiElement} from '../../shared/text/text.gui-element';
import {logic} from '../../../../../game';

@GuiElement()
export class UnitOnSquareWarningGuiElement implements GuiControl<GUI.StackPanel>, AfterCreated {
    public control: GUI.StackPanel = new GUI.StackPanel('unitOnSquareWarning');

    @AppendGuiControl() public title: TextGuiElement = new TextGuiElement('Error', {uppercase: true});
    @AppendGuiControl() public body: TextGuiElement = new TextGuiElement('You cannot complete that building because you have unit on planet square.');
    @AppendGuiControl() public close: ButtonGuiElement = new ButtonGuiElement('Ok', () => {
        logic().dialogService.close$.next();
    });

    public gameAfterCreated(): void {
        this.title.control.setPaddingInPixels(10, 10, 10, 10);

        this.body.control.setPaddingInPixels(10, 10, 10, 10);
        this.body.control.textWrapping = true;

        this.close.control.setPaddingInPixels(10, 10, 10, 10);
    }
}
