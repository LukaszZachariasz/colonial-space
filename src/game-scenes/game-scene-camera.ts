export interface GameSceneCamera<T extends {}> {
    camera: T;

    createCamera: () => void;
}