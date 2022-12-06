import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '@colonial-space/core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {ButtonGuiComponent} from '../../shared/button/button.gui-component';
import {DialogService} from '../../../../game-logic/dialog/dialog.service';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '@colonial-space/core/module/scene/gui/gui-component/gui-control';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {TextGuiComponent} from '../../../../../shared/gui/text/text.gui-component';

@GuiComponent()
export class UnitOnSquareWarningGuiComponent implements GuiControl<GUI.StackPanel>, OnInit {
    @Inject(DialogService) private dialogService: DialogService;
    
    public control: GUI.StackPanel = new GUI.StackPanel('unitOnSquareWarning');

    @AppendGuiControl() public title: TextGuiComponent = new TextGuiComponent('Error', {uppercase: true});
    @AppendGuiControl() public body: TextGuiComponent = new TextGuiComponent('You cannot complete that building because you have unit on planet square.');
    @AppendGuiControl() public close: ButtonGuiComponent = new ButtonGuiComponent('Ok', () => {
        this.dialogService.close$.next();
    });

    public gameOnInit(): void {
        this.title.control.setPaddingInPixels(10, 10, 10, 10);

        this.body.control.setPaddingInPixels(10, 10, 10, 10);
        this.body.control.textWrapping = true;

        this.close.control.setPaddingInPixels(10, 10, 10, 10);
    }
}
