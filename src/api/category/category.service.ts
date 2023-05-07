import { HttpExceptionNotFound } from "@/exceptions/HttpException";
import Category from "@/models/category.model";

class CategoryService {
    public async findAllCategories(): Promise<Category[]> {
        const categories = await Category.findAll();
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

    public async deleteCategories(id: string[]): Promise<number> {
        console.log("id services => ", id);
        const deleted = await Category.destroy({
            where: {
                id
            }
        });

        if (deleted === 0) throw new HttpExceptionNotFound("Data category not found");
        return deleted;
    }
}

export default CategoryService;