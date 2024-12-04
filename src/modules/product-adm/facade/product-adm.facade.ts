import UsecaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.interface";

export interface UsecaseProps {
    addUsecase: UsecaseInterface;
    stockUsecase: UsecaseInterface
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {

    private _addUsecase: UsecaseInterface;
    private _checkStockUsecase: UsecaseInterface;

    constructor(usecaseProps: UsecaseProps) {
        this._addUsecase = usecaseProps.addUsecase;
        this._checkStockUsecase = usecaseProps.stockUsecase
    }

    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        return this._addUsecase.execute(input);
    }
    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockUsecase.execute(input);
    }

}