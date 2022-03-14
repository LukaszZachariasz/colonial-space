export class SceneRoute {
    public static ROOT_ROUTE: SceneRoute = null;

    constructor(public route: string,
                public parent?: SceneRoute) {
        if (parent) {
            this.route = this.parent.route + '.' + this.route;
        }
    }
}
