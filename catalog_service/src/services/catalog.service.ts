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
        // TODO: must emit event to update product in elastic search
        return await this._repository.update(content);
    }
    // TODO: must get product from elastic search
    getProducts(limit: number, offset: number) {
        const data = this._repository.find(limit, offset);
        return data;
    }
    async getProduct(id: number) {
        const data = await this._repository.findOne(id);
        return data;
    }
    async deleteProduct(id: number) {
        // TODO: delete record from elastic search
        return await this._repository.delete(id);
    }
}