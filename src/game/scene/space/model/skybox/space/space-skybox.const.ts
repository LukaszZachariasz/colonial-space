export const SpaceSkyboxConst = ['01', '02', '03', '04'];

export function randomSpaceSkybox(): string {
    return SpaceSkyboxConst[Math.floor(BABYLON.Scalar.RandomRange(0, SpaceSkyboxConst.length))];
}
