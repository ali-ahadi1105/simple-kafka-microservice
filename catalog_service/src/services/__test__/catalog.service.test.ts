import { ICatalogRepositoryInterface } from "../../interfaces/catalogRepository.interface";
import { Product } from "../../models/product.model";
import { MockCatalogRepository } from '../../repository/mockRepository.repository';
import { CatalogService } from "../catalog.service";
import { faker } from '@faker-js/faker';

const mockProduct = (rest: any) => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({ min: 1, max: 100 }),
        ...rest
    }
}

describe("Catalog Service", () => {
    let repository: ICatalogRepositoryInterface

    beforeEach(() => {
        repository = new MockCatalogRepository();
    });

    afterEach(() => {
        repository = {} as MockCatalogRepository;
    });

    test("should create product", async () => {
        const service = new CatalogService(repository);
        const reqBody = mockProduct({ price: +faker.commerce.price() });
        const result = await service.createProduct(reqBody);
        expect(result).toMatchObject({
            id: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            stock: expect.any(Number),
            price: expect.any(Number)
        });
    });

    test("should throw error when create product", async () => {
        const service = new CatalogService(repository);
        const reqBody = mockProduct({ price: +faker.commerce.price() });
        const result = await service.createProduct(reqBody);

        jest.spyOn(repository, "create").mockImplementationOnce(() => Promise.resolve({} as Product));

        await expect(service.createProduct(reqBody)).rejects.toThrow("unable to create product");
    });
});