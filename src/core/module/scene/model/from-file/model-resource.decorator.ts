export interface ModelResourceOption {
    name: string;
    meshUrl: string;
    meshName: string;
}

export const MODEL_RESOURCE_METADATA_KEY = 'MODEL_RESOURCE_METADATA_KEY';

export function ModelResource(modelResourceOption: ModelResourceOption): any {
    return function (constructor: any): any {
        Reflect.defineMetadata(MODEL_RESOURCE_METADATA_KEY, modelResourceOption, constructor);

        return constructor;
    };
}
