import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDto, FindInvoiceUseCaseOutputDto } from "./find-invoice.dto";

export default class FindInvoiceUseCase {
  private _invoiceRepository: InvoiceGateway;

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(input: FindInvoiceUseCaseInputDto): Promise<FindInvoiceUseCaseOutputDto> {
    const invoice = await this._invoiceRepository.find(input.id);

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zip,
      },
      items: invoice.items.map(item => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: invoice.total(),
      createdAt: invoice.createdAt,
    };
  }
}