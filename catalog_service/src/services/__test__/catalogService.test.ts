import { ICatalogRepositoryInterface } from "../../interfaces/catalogRepository.interface";
import { MockCatalogRepository } from '../../repository/mockRepository.repository';
import { CatalogService } from "../catalog.service";

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
        const reqBody = {
            name: "iphone",
            description: "smart phone",
            stock: 12,
            price: 1200
        }
        const result = await service.createProduct(reqBody);
        expect(result).toMatchObject({
            id: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            stock: expect.any(Number),
            price: expect.any(Number)
        });
    });
});