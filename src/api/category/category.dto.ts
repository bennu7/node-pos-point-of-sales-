import {
    IsString,
    IsNotEmpty,
    ValidateNested,
    IsArray,
} from "class-validator";
import { Type } from "class-transformer";
import 'reflect-metadata'; //!required for class-transformer

export interface ICreateCategory {
    name: string;
}
export interface ICreateCategories {
    names: string[];
}
export interface IUpdateCategory {
    name: string;
}
export interface IDeleteCategories {
    ids: string[];
}

export class CreateCategoryDTO {
    @IsString() @IsNotEmpty()
    public name: string;
}

export class CreateCategoriesDTO {
    @IsNotEmpty() @ValidateNested({ each: true })
    @Type(() => CreateCategoryDTO)
    public names: CreateCategoryDTO[];
}

export class UpdateCategoryDTO {
    @IsString() @IsNotEmpty()
    public name: string;
}

export class DeleteCategories {
    @IsArray() @IsNotEmpty()
    public ids: string;
}

