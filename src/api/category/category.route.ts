import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";
import authentication from "@/middleware/authentication.middleware";

import { ADMIN_ROLE } from "@/utils/constant.utils";
import authorization from "@/middleware/authorization.middleware";
import validationMiddleware from "@/middleware/validation.middleware";
import CategoryController from "./category.controller";
import { CreateCategoriesDTO, DeleteCategories, UpdateCategoryDTO } from "./category.dto";

class CategoryRoute implements Routes {
    public path = "/category";
    public router = Router();

    private categoryController = new CategoryController();

    constructor() {
        this.initializedRoutes();
    }

    // TODO: handle by admin
    private initializedRoutes(): void {
        this.router.get(
            `${this.path}`,
            authentication,
            authorization(ADMIN_ROLE as string),
            this.categoryController.getAllCategories
        );
        this.router.post(
            `${this.path}/add`,
            authentication,
            authorization(ADMIN_ROLE as string),
            validationMiddleware(CreateCategoriesDTO, "body"),
            this.categoryController.createCategories
        );
        this.router.put(
            `${this.path}/update/:id`,
            authentication,
            authorization(ADMIN_ROLE as string),
            validationMiddleware(UpdateCategoryDTO, "body"),
            this.categoryController.updateCategory
        );
        this.router.delete(
            `${this.path}/deletes`,
            authentication,
            authorization(ADMIN_ROLE as string),
            validationMiddleware(DeleteCategories, "body"),
            this.categoryController.deleteCategories
        );
    }
}

export default CategoryRoute;