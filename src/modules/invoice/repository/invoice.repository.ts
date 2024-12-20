import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/invoice-items.entity";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import Address from "../value-object/address";
import { InvoiceModel } from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
  async generate(invoice: Invoice): Promise<void> {
    await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zip,
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    }, {
      include: ['items']
    });
  }

  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: { id },
      include: ['items']
    });

    if (!invoice) {
      throw new Error(`Invoice not found`)
    }

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: new Address(
        invoice.street,
        invoice.number,
        invoice.zipCode,
        invoice.city,
        invoice.complement,
        invoice.state
      ),
      items: invoice.items.map((item) => {
        return new InvoiceItems({
          id: new Id(item.id),
          name: item.name,
          price: item.price
        })
      }),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    })
  }
}