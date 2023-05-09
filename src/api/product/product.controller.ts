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

    public updateProduct = expressAsyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const data = req.body as ICreateProduct;

        const updated = await this.productService.updateProduct(id, data);

        res.status(STATUS.OK).json(apiResponse(STATUS.OK, "Success update product", updated));
    });

    public deleteProduct = expressAsyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;

        const deleted = await this.productService.deleteProduct(id);

        res.status(STATUS.OK).json(apiResponse(STATUS.OK, `Success delete ${deleted} product`));
    });

    public deletesProduct = expressAsyncHandler(async (req: Request, res: Response) => {
        const { ids } = req.body;

        const deleted = await this.productService.deleteMultipleProduct(ids);

        res.status(STATUS.OK).json(apiResponse(STATUS.OK, `Success delete ${deleted} product`));
    });
}

export default ProductController;