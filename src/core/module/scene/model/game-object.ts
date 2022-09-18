export interface GameObjectDefinition {
    name: string;
    meshUrl: string;
    meshName: string;
}

export const IMPORT_DEFINITION_METADATA_KEY = 'IMPORT_DEFINITION_METADATA_KEY';

export function GameObjectFromFile(definition: GameObjectDefinition): any {
    return function (constructor: any): any {
        Reflect.defineMetadata(IMPORT_DEFINITION_METADATA_KEY, definition, constructor);

        return constructor;
    };
}
