import { Category } from "./Category";

export class Product {
    id!: String | undefined;
    title!: String | undefined;
    description!: String | undefined;
    images: String[] | undefined;
    category: Category | undefined;
    creationAt!: String | undefined;
    updatedAt!: String | undefined;
}