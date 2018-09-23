import VueRouter, {RouteConfig} from "vue-router";
import Routes from "@modules/routing/Routes";
import {VueConstructor} from "vue";

export default class RoutesRegister {
    private readonly router: VueRouter;

    constructor(vueInstance: VueConstructor) {
        vueInstance.use(VueRouter);

        this.router = new VueRouter({
            mode: 'history'
        });

        Routes.forEach(route => this.addRoutes([route]));
    }

    addRoutes(routes: RouteConfig[]): RoutesRegister {
        this.router.addRoutes(routes);

        return this;
    }

    getRouter(): VueRouter {
        return this.router;
    }
}