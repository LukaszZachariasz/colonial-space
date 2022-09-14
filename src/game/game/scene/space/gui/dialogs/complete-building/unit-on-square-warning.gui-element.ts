import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../core/lifecycle/after-created/after-created';
import {AppendGuiControl} from '../../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {ButtonGuiElement} from '../../shared/button/button.gui-element';
import {Container} from 'typedi';
import {DialogService} from '../../../../../logic/services/dialog/dialog.service';
import {GuiControl} from '../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../core/gui-manager/gui-elements/gui-element';
import {TextGuiElement} from '../../shared/text/text.gui-element';

@GuiElement()
export class UnitOnSquareWarningGuiElement implements GuiControl<GUI.StackPanel>, AfterCreated {
    public control: GUI.StackPanel = new GUI.StackPanel('unitOnSquareWarning');

    @AppendGuiControl() public title: TextGuiElement = new TextGuiElement('Error', {uppercase: true});
    @AppendGuiControl() public body: TextGuiElement = new TextGuiElement('You cannot complete that building because you have unit on planet square.');
    @AppendGuiControl() public close: ButtonGuiElement = new ButtonGuiElement('Ok', () => {
        Container.get(DialogService).close$.next();
    });

    public gameAfterCreated(): void {
        this.title.control.setPaddingInPixels(10, 10, 10, 10);

        this.body.control.setPaddingInPixels(10, 10, 10, 10);
        this.body.control.textWrapping = true;

        this.close.control.setPaddingInPixels(10, 10, 10, 10);
    }
}
