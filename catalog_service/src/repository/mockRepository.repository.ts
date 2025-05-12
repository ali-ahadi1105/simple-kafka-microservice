import { ICatalogRepositoryInterface } from "../interfaces/catalogRepository.interface";
import { Product } from "../models/product.model";

export class MockCatalogRepository implements ICatalogRepositoryInterface {
    create(data: Product): Promise<Product> {
        const mockProduct = {
            id: 123,
            ...data
        };
        return Promise.resolve(mockProduct);
    }
    update(data: Product): Promise<Product> {
        return Promise.resolve(data as unknown as Product);
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