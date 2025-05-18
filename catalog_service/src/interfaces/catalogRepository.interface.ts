import { Product } from "../models/product.model";

export interface ICatalogRepositoryInterface {
    create(data: Product): Promise<Product>;
    update(data: Product): Promise<Product>;
    delete(id: number): any;
    findOne(id: number): Promise<Product>;
    find(limit: number, offset: number): Promise<Product[]>;
}