import UsecaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface";

export interface UsecaseProps {
    findUsecase: UsecaseInterface;
    addUsecase: UsecaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
   
    private _findUsecase: UsecaseInterface;
    private _addUsecase: UsecaseInterface;

    constructor(usecaseProps: UsecaseProps) {
        this._findUsecase = usecaseProps.findUsecase;
        this._addUsecase = usecaseProps.addUsecase;
    }

    async add(input: AddClientFacadeInputDto): Promise<void> {
        await this._addUsecase.execute(input);
    }

    async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        return await this._findUsecase.execute(input)
    }
}