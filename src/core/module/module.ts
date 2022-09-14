import {ModuleOptions} from './module-options';

export function Module(options: ModuleOptions): any {
    return function (constructor: any): any {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);

                if (options.imports) {
                    options.imports.forEach((module: any) => new module());
                }
            }
        };
    };
}
