import ProductEntity from "../domain/product.entity";

export default interface ProductGateway {
    add(product: ProductEntity): Promise<void>;
    find(id: string): Promise<ProductEntity>;
}