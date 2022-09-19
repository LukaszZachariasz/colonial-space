import {Inject} from '@colonial-space/core/injector/inject';
import {ModelManager} from '@colonial-space/core/module/scene/model/model-manager';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SpaceSkyboxModel} from '../../../shared/skybox/space-skybox.model';

export class LoadingSkybox implements OnInit {
    @Inject(ModelManager) private modelManager: ModelManager;

    public gameOnInit(): void {
        this.modelManager.create(SpaceSkyboxModel);
    }
}
