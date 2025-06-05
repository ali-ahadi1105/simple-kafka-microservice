import { ICatalogRepositoryInterface } from "../../interfaces/catalogRepository.interface";
import { Product } from "../../models/product.model";
import { MockCatalogRepository } from '../../repository/mockRepository.repository';
import { CatalogService } from "../catalog.service";
import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';
import { ProductFactory } from "../../utils/mock";


const mockProduct = (rest: any) => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({ min: 1, max: 100 }),
        ...rest
    }
}

describe("Create Product", () => {
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

    test("should throw error when unable to create product", async () => {
        const service = new CatalogService(repository);
        const reqBody = mockProduct({ price: +faker.commerce.price() });

        jest.spyOn(repository, "create").mockImplementationOnce(() => Promise.resolve({} as Product));

        await expect(service.createProduct(reqBody)).rejects.toThrowError("unable to create product");
    });

    test("should throw error when product already exist", async () => {
        const service = new CatalogService(repository);
        const reqBody = mockProduct({ price: +faker.commerce.price() });

        jest.spyOn(repository, "create").mockImplementationOnce(() => Promise.reject(new Error("product already exist!")));

        await expect(service.createProduct(reqBody)).rejects.toThrowError("product already exist!");
    });
});

describe("Update Product", () => {
    let repository: ICatalogRepositoryInterface

    beforeEach(() => {
        repository = new MockCatalogRepository();
    });

    afterEach(() => {
        repository = {} as MockCatalogRepository;
    });

    test("should update product", async () => {
        const service = new CatalogService(repository);
        const reqBody = mockProduct({ 
            price: +faker.commerce.price(),
            id: faker.number.int({ min: 10, max: 1000 })
        });
        const result = await service.updateProduct(reqBody);
        expect(result).toMatchObject(reqBody);
    });

    test("should throw error when product does not exist", async () => {
        const service = new CatalogService(repository);

        jest.spyOn(repository, "create").mockImplementationOnce(() => Promise.reject(new Error("product does not exist!")));

        await expect(service.createProduct({})).rejects.toThrowError("product does not exist!");
    });
});

describe("Get Products", () => {
    let repository: ICatalogRepositoryInterface

    beforeEach(() => {
        repository = new MockCatalogRepository();
    });

    afterEach(() => {
        repository = {} as MockCatalogRepository;
    });

    test("should get products with limit and offset", async () => {
        const service = new CatalogService(repository);
        const randomLimit = faker.number.int({ min: 10, max: 50 });
        const products = ProductFactory.buildList(randomLimit);
        jest.spyOn(repository, "find").mockImplementationOnce(() => Promise.resolve(products));
        const result = await service.getProducts(randomLimit, 0);
        expect(result.length).toEqual(randomLimit);
        expect(result).toMatchObject(products);
    });

    test("should throw error when products does not exist", async () => {
        const service = new CatalogService(repository);

        jest.spyOn(repository, "find").mockImplementationOnce(() => Promise.reject(new Error("products does not exist!")));

        await expect(service.getProducts(0,0)).rejects.toThrowError("products does not exist!");
    });

});

describe("Get Product", () => {
    let repository: ICatalogRepositoryInterface

    beforeEach(() => {
        repository = new MockCatalogRepository();
    });

    afterEach(() => {
        repository = {} as MockCatalogRepository;
    });

    test("should get product with id", async () => {
        const service = new CatalogService(repository);
        const product = ProductFactory.build();
        jest.spyOn(repository, "findOne").mockImplementationOnce(() => Promise.resolve(product));
        const result = await service.getProduct(product.id!);
        expect(result).toMatchObject(product);
    });

    test("should throw error when product does not exist", async () => {
        const service = new CatalogService(repository);

        jest.spyOn(repository, "findOne").mockImplementationOnce(() => Promise.reject(new Error("product does not exist!")));

        await expect(service.getProduct(0)).rejects.toThrowError("product does not exist!");
    });

});

describe("Delete Product", () => {
    let repository: ICatalogRepositoryInterface

    beforeEach(() => {
        repository = new MockCatalogRepository();
    });

    afterEach(() => {
        repository = {} as MockCatalogRepository;
    });

    test("should delete product with id", async () => {
        const service = new CatalogService(repository);
        const product = ProductFactory.build();
        jest.spyOn(repository, "delete").mockImplementationOnce(() => Promise.resolve({ id: product.id }));
        const result = await service.deleteProduct(product.id!);
        expect(result).toMatchObject({
            id: product.id
        });
    });

    test("should throw error when product does not exist", async () => {
        const service = new CatalogService(repository);

        jest.spyOn(repository, "delete").mockImplementationOnce(() => Promise.reject(new Error("product does not exist!")));

        await expect(service.deleteProduct(0)).rejects.toThrowError("product does not exist!");
    });

});
