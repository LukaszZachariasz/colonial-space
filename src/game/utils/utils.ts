

export function findIndex2D<T>(array2D: T[][], searchEl: T, compareField: string): [number, number] | undefined {
    let indexes: [number, number] | undefined = undefined;
    array2D.forEach((row: T[], i: number) => {
        if (indexes) {
            return;
        }
        row.forEach((el: T, j: number) => {
            if ((el as any)[compareField] === (searchEl as any)[compareField]) {
                indexes = [i, j];
                return;
            }
        });
    });
    return indexes;
}
