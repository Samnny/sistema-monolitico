import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInterfaceInputDto, FindInvoiceFacadeInterfaceOutputDto, GenerateInvoiceFacadeInterfaceInputDto, GenerateInvoiceFacadeInterfaceOutputDto } from "./invoice.facade.interface";

export interface UseCaseProps {
  generateInvoiceUseCase: UseCaseInterface;
  findInvoiceUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {

  private _generateInvoiceUseCase: UseCaseInterface;
  private _findInvoiceUseCase: UseCaseInterface;

  constructor({ generateInvoiceUseCase, findInvoiceUseCase }: UseCaseProps) {
    this._generateInvoiceUseCase = generateInvoiceUseCase;
    this._findInvoiceUseCase = findInvoiceUseCase;
  }

  async generate(input: GenerateInvoiceFacadeInterfaceInputDto): Promise<GenerateInvoiceFacadeInterfaceOutputDto> {
    return await this._generateInvoiceUseCase.execute(input);
  }

  async find(input: FindInvoiceFacadeInterfaceInputDto): Promise<FindInvoiceFacadeInterfaceOutputDto> {
    return await this._findInvoiceUseCase.execute(input);
  }
}