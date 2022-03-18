export const SpaceSkyboxConst = ['space-skybox-01', 'space-skybox-02'];

export function randomSpaceSkybox(): string {
    return SpaceSkyboxConst[Math.floor(Math.random() * SpaceSkyboxConst.length)];
}
