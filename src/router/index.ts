import { Router } from "express";
import { Routes } from "@/interfaces/routes.interface";
import AuthRoute from "@/api/auth/auth.route";
import UserRoute from "@/api/user/user.route";
import CategoryRoute from "@/api/category/category.route";
import ProductRoute from "@/api/product/product.route";

class Routers {
    public router = Router();

    private routing: Routes[] = [
        new AuthRoute(),
        new UserRoute(),
        new CategoryRoute(),
        new ProductRoute()
    ];

    constructor() {
        this.initializedRoutes();
    }

    private initializedRoutes(): void {
        this.registerRoutesV1(this.routing);
    }

    // API versioning 1
    private registerRoutesV1(routes: Routes[]): void {
        routes.forEach((route: Routes) => {
            this.router.use("/api/v1", route.router);
        });
    }
}

export default Routers;