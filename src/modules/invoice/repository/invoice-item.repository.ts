import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/invoice-items.entity";
import InvoiceItemsGateway from "../gateway/invoice-item.gateway";
import { InvoiceItemModel } from "./invoice-item.model";

export default class InvoiceItemRepository implements InvoiceItemsGateway {
  async generate(invoiceItem: InvoiceItems): Promise<void> {
    await InvoiceItemModel.create({
      id: invoiceItem.id.id,
      name: invoiceItem.name,
      price: invoiceItem.price,
    });
  }

  async find(id: string): Promise<InvoiceItems> {
    const invoiceItem = await InvoiceItemModel.findOne({
      where: { id },
    })

    if (!invoiceItem) {
      throw new Error(`Invoice Item with id ${id} not found`)
    }

    return new InvoiceItems({
      id: new Id(invoiceItem.id),
      name: invoiceItem.name,
      price: invoiceItem.price
    })
  }
}