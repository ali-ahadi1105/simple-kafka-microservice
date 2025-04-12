import { ICatalogRepositoryInterface } from "../interfaces/catalogRepository.interface";
import { Product } from "../models/product.model";

export class CatalogRepository implements ICatalogRepositoryInterface {
    create(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    update(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    delete(id: any) {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    find(id: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    
}