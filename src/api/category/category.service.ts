import { HttpExceptionNotFound } from "@/exceptions/HttpException";
import Category from "@/models/category.model";
import Product from "@/models/product.model";
import TRANSACTION from "@/utils/transaction.utils";

interface IResponseDeleteCategories {
    categoryDeleted?: number;
    productDeleted?: number;
}

class CategoryService {
    public async findAllCategories(): Promise<Category[]> {
        const categories = await Category.findAll({
            include: {
                model: Product,
                as: "products"
            }
        });
        return categories;
    }

    public async createCategory(name: string): Promise<Category> {
        const category = await Category.create({ name });
        return category;
    }

    public async createCategories(data: any): Promise<Category[]> {
        const categories = await Category.bulkCreate(data);
        return categories;
    }

    public async updateCategory(id: string, name: string): Promise<Category | null> {
        const category = await Category.update({ name }, {
            where: {
                id
            }
        });
        if (!category) throw new HttpExceptionNotFound("Category not found");

        const data = await Category.findOne({
            where: {
                id
            }
        });
        return data;
    }

    public async deleteCategories(id: string[]): Promise<IResponseDeleteCategories> {
        const t = await TRANSACTION();

        const productDeleted = await Product.destroy({
            where: {
                category_id: id
            },
            transaction: t
        });

        const categoryDeleted = await Category.destroy({
            where: {
                id: id
            },
            transaction: t
        });

        if (categoryDeleted === 0) throw new HttpExceptionNotFound("Data category not found");
        t.commit();
        return {
            categoryDeleted,
            productDeleted
        };
    }
}

export default CategoryService;