export declare interface Type<T> extends Function {
    name: string;

    new (...args: unknown[]): T;
}
