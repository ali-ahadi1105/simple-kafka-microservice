import { Product } from "../models/product.model";

export interface ICatalogRepositoryInterface {
    create(data: Product): Promise<Product>;
    update(data: Product): Promise<Product>;
    delete(id: any): any;
    findAll(): Promise<Product[]>;
    find(id: number): Promise<Product>;
}