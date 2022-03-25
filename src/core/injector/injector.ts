import {ResolveInjections} from './resolve-injections';

export class Injector {
    public static instances: Map<string, any> = new Map<string, any>();

    public static reset(): void {
        Injector.instances.clear();
        ResolveInjections.resolve$.next(false);
    }

    public static create(Class: any): void {
        Injector.instances.set(Class.name, new Class);
    }

    public static get(Class: any): any {
        return Injector.instances.get(Class.name);
    }
}
