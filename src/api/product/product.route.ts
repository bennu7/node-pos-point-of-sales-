import { Routes } from "@/interfaces/routes.interface";
import ProductController from "./product.controller";
import { Router } from "express";

class ProductRoute implements Routes {
    public path = "/product";
    public router = Router();
    private productController = new ProductController();

    constructor() {
        this.initializedRoutes();
    }

    private initializedRoutes(): void {
        this.router.get(`${this.path}`, this.productController.getProducts);
    }
}

export default ProductRoute;