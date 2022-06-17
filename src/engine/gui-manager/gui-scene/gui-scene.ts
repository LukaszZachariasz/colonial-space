export function GuiScene(): any {
    return function (constructor: any): any {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);
            }
        };
    };
}
