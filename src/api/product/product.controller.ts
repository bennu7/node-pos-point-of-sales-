import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes as STATUS } from "http-status-codes";
import ProductService from "./product.service";
import { apiResponse } from "@/utils/apiResponse.utils";
import { ICreateProduct } from "./product.dto";

class ProductController {
    private productService = new ProductService();

    public getProducts = expressAsyncHandler(async (req: Request, res: Response) => {
        const data = await this.productService.getProducts();

        res.status(STATUS.OK).json(apiResponse(STATUS.OK, "Success get all products", data));
    });

    public getProductById = expressAsyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;

        const data = await this.productService.getProductById(id);

        res.status(STATUS.OK).json(apiResponse(STATUS.OK, "Success get product by id", data));
    });

    public createProduct = expressAsyncHandler(async (req: Request, res: Response) => {
        const data = req.body as ICreateProduct;

        const created = await this.productService.createProduct(data);

        res.status(STATUS.CREATED).json(apiResponse(STATUS.CREATED, "Success create product", created));
    });
}

export default ProductController;