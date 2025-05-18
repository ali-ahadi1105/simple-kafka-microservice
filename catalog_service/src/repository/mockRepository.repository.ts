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
        return Promise.resolve(id);
    }
    findOne(id: number): Promise<Product> {
        return Promise.resolve({} as unknown as Product);
    }
    find(limit: number, offset: number): Promise<Product[]> {
        return Promise.resolve([]);
    }
    
}