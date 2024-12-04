import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../repository/invoice.model";
import { InvoiceItemModel } from "../repository/invoice-item.model";
import InvoiceFacadeFactory from "../factory/facade.factory";

const invoiceItem = {
  id: '1',
  name: 'Product 1',
  price: 50,
}

const invoice = {
  id: '1',
  name: 'Invoice 01',
  document: 'Document 01',
  street: 'Rua 2',
  number: '100',
  complement: 'Casa',
  city: 'Fortal',
  state: 'Lalala',
  zipCode: '68787222',
  items: [invoiceItem],
}

describe('Invoice Facade Test', () => {

  let sequelize: Sequelize

  beforeEach(async () => {

    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([InvoiceModel, InvoiceItemModel])
    await sequelize.sync()
  });

  afterEach(async () => {
    await sequelize.close()
  });

  it('should generate an invoice', async () => {
    const invoiceFacade = InvoiceFacadeFactory.create();

    const result = await invoiceFacade.generate(invoice);

    expect(result).toBeDefined();
    expect(result.id).toEqual(expect.any(String));
    expect(result.name).toEqual(invoice.name);
    expect(result.document).toEqual(invoice.document);
    expect(result.street).toEqual(invoice.street);
    expect(result.number).toEqual(invoice.number);
    expect(result.complement).toEqual(invoice.complement);
    expect(result.city).toEqual(invoice.city);
    expect(result.state).toEqual(invoice.state);
    expect(result.zipCode).toEqual(invoice.zipCode);
    expect(result.items[0].id).toEqual(invoice.items[0].id)
    expect(result.items[0].name).toEqual(invoice.items[0].name)
    expect(result.items[0].price).toEqual(invoice.items[0].price)
  });

  it('should find an invoice by id', async () => {
    const invoiceFacade = InvoiceFacadeFactory.create();
    const generatedInvoice = await invoiceFacade.generate(invoice);

    const result = await invoiceFacade.find({ id: generatedInvoice.id });

    expect(result.id).toEqual(generatedInvoice.id);
    expect(result.name).toEqual(invoice.name);
    expect(result.document).toEqual(invoice.document);
    expect(result.address.street).toEqual(invoice.street);
    expect(result.address.number).toEqual(invoice.number);
    expect(result.address.complement).toEqual(invoice.complement);
    expect(result.address.city).toEqual(invoice.city);
    expect(result.address.state).toEqual(invoice.state);
    expect(result.address.zipCode).toEqual(invoice.zipCode);
    expect(result.items.length).toEqual(invoice.items.length);
    expect(result.items[0].id).toEqual(invoice.items[0].id);
    expect(result.items[0].name).toEqual(invoice.items[0].name);
    expect(result.items[0].price).toEqual(invoice.items[0].price);
    expect(result.total).toEqual(invoice.items[0].price);
  });
});