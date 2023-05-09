import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes as STATUS } from "http-status-codes";

import CategoryService from "./category.service";
import { ICreateCategories, IDeleteCategories, IUpdateCategory } from "./category.dto";
import { apiResponse } from "@/utils/apiResponse.utils";

class CategoryController {
    private categoryService = new CategoryService();

    public getAllCategories = expressAsyncHandler(async (req: Request, res: Response) => {
        const data = await this.categoryService.findAllCategories();

        res.status(STATUS.OK).json(apiResponse(STATUS.OK, "Success get all categories", data));
    });

    public createCategory = expressAsyncHandler(async (req: Request, res: Response) => {
        const { name } = req.body;
        const data = await this.categoryService.createCategory(name);

        res.status(STATUS.CREATED).json(apiResponse(STATUS.CREATED, "Success create category", data));
    });

    public createCategories = expressAsyncHandler(async (req: Request, res: Response) => {
        const { names } = req.body as ICreateCategories;
        // const data = names.map((item) => {
        //     return {
        //         name: item
        //     };
        // });

        const categories = await this.categoryService.createCategories(names);

        res.status(STATUS.CREATED).json(apiResponse(STATUS.CREATED, "Success create categories", categories));
    });

    public updateCategory = expressAsyncHandler(async (req: Request, res: Response) => {
        const { name } = req.body as IUpdateCategory;
        const { id } = req.params;

        const data = await this.categoryService.updateCategory(id, name);

        res.status(STATUS.OK).json(apiResponse(STATUS.OK, "Success update category", data));
    });

    public deleteCategories = expressAsyncHandler(async (req: Request, res: Response) => {
        const { ids } = req.body as IDeleteCategories;

        const deleted = await this.categoryService.deleteCategories(ids);
        const { categoryDeleted, productDeleted } = deleted;

        res.status(STATUS.OK).json(apiResponse(STATUS.OK, `Success delete ${categoryDeleted} category and ${productDeleted} product`));
    });
}

export default CategoryController;