"use server"

import { CreateCategoryParams } from "@/types"
import { connectDatabase } from "../database"
import Category from "../database/models/category.model";
import { handleError } from "../utils";

export const createCategory = async ({ categoryName }: CreateCategoryParams) => {
    try {
        await connectDatabase();
        const newCategory = await Category.create({name: categoryName});
        return JSON.parse(JSON.stringify(newCategory));
    } catch (error) {
        handleError(error)
    }
}

export const fetchAllCategories = async () => {
    try {
        await connectDatabase();
        const category = await Category.find();
        return JSON.parse(JSON.stringify(category));
    } catch (error) {
        handleError(error)
    }
}