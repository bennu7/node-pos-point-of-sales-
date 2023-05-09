import { Router } from "express";
import validationMiddleware from "@/middleware/validation.middleware";
import authentication from "@/middleware/authentication.middleware";
import authorization from "@/middleware/authorization.middleware";

import ProductController from "./product.controller";
import { Routes } from "@/interfaces/routes.interface";
import { CreateProductDTO, DeleteProductDTO, UpdateProductDTO } from "./product.dto";
import { ADMIN_ROLE } from "@/utils/constant.utils";

class ProductRoute implements Routes {
    public path = "/product";
    public router = Router();
    private productController = new ProductController();

    constructor() {
        this.initializedRoutes();
    }

    private initializedRoutes(): void {
        this.router.get(
            `${this.path}`,
            this.productController.getProducts
        );
        this.router.get(
            `${this.path}/:id`,
            this.productController.getProductById
        );
        this.router.post(
            `${this.path}`,
            authentication,
            authorization(ADMIN_ROLE as string),
            validationMiddleware(CreateProductDTO, "body"),
            this.productController.createProduct
        );
        this.router.put(
            `${this.path}/:id`,
            authentication,
            authorization(ADMIN_ROLE as string),
            validationMiddleware(UpdateProductDTO, "body"),
            this.productController.updateProduct
        );
        this.router.delete(
            `${this.path}/:id`,
            authentication,
            authorization(ADMIN_ROLE as string),
            validationMiddleware(DeleteProductDTO, "params"),
            this.productController.updateProduct
        );
    }
}

export default ProductRoute;