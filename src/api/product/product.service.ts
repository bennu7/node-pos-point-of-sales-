import Product from "@/models/product.model";
import { ICreateProduct } from "./product.dto";

class ProductService {
    public async getProducts(): Promise<Product[]> {
        const data = await Product.findAll();

        return data;
    }

    public async getProductById(id: string): Promise<Product | null> {
        const data = await Product.findOne({
            where: {
                id
            }
        });

        return data;
    }

    public async createProduct(product: ICreateProduct): Promise<Product> {
        const { name, sku, price, stock, category_id, image } = product;

        const created = await Product.create({
            name,
            sku,
            price,
            stock,
            category_id,
            image
        });

        return created;
    }
}

export default ProductService;