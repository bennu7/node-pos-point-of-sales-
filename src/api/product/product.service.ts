import Product from "@/models/product.model";
import { ICreateProduct } from "./product.dto";
import Order from "@/models/order.model";
import Category from "@/models/category.model";

class ProductService {
    public async getProducts(): Promise<Product[]> {
        const data = await Product.findAll({
            include: [
                {
                    model: Category,
                    as: 'category'
                },
                {
                    model: Order,
                    as: "ordered",
                },
            ],
            attributes: {
                exclude: ['category_id']
            }
        });

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

    public async updateProduct(id: string, product: ICreateProduct): Promise<Product | null> {
        const { name, sku, price, stock, category_id, image } = product;

        await Product.update({
            name,
            sku,
            price,
            stock,
            category_id,
            image
        }, {
            where: {
                id
            }
        });

        const show = await Product.findOne({
            where: {
                id
            }
        });

        return show;

    }

    public async deleteProduct(id: string): Promise<number> {
        const deleted = await Product.destroy({
            where: {
                id
            }
        });

        return deleted;
    }

    public async deleteMultipleProduct(ids: string[]): Promise<number> {
        const deleted = await Product.destroy({
            where: {
                id: ids
            }
        });

        return deleted;
    }
}

export default ProductService;