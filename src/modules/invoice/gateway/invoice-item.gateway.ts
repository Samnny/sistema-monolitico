import InvoiceItems from "../domain/invoice-items.entity";

export default interface InvoiceItemsGateway {
  generate(invoiceItem: InvoiceItems): Promise<void>;
  find(id: string): Promise<InvoiceItems>;
}