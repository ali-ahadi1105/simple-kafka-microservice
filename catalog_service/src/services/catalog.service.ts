import { ICatalogRepositoryInterface } from "../interfaces/catalogRepository.interface"

export class CatalogService {

    private _repository: ICatalogRepositoryInterface;

    constructor(readonly repository: ICatalogRepositoryInterface) {
        this._repository = repository;
    }
    async createProduct(content: any) {
        const data = await this._repository.create(content);
        if(!data.id) {
            throw new Error("unable to create product");
        }
        return data;
    }
    async updateProduct(content: any) {
        return await this._repository.update(content);
    }
    getProduct(content: any) {}
    getAllProduct(content: any) {}
    deleteProduct(content: any) {}
}