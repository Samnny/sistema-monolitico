import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemModel } from "./invoice-item.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import InvoiceRepository from "./invoice.repository";
import InvoiceItems from "../domain/invoice-items.entity";
import Address from "../value-object/address";

describe('Invoice Repository test', () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a new invoice', async () => {
    const inputInvoiceItemProps = {
      id: new Id("1"),
      name: "Invoice 1",
      price: 100,
    }

    const invoiceItem = new InvoiceItems(inputInvoiceItemProps);

    const inputInvoiceProps = {
      id: new Id('1'),
      name: 'John Doe',
      document: '1234567890',
      address: new Address(
        'Rua 2',
        '1280',
        '60875124',
        'City 1',
        'Complet',
        'State 1'
      ),
      items: [invoiceItem],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const invoice = new Invoice(inputInvoiceProps);
    const invoiceRepository = new InvoiceRepository();

    await invoiceRepository.generate(invoice);

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: invoice.id.id },
      include: ['items']
    });

    expect(invoiceDb).toBeDefined()
    expect(invoiceDb.id).toBe(invoice.id.id)
    expect(invoiceDb.name).toBe(invoice.name)
    expect(invoiceDb.document).toBe(invoice.document)
    expect(invoiceDb.street).toBe(invoice.address.street)
    expect(invoiceDb.number).toBe(invoice.address.number)
    expect(invoiceDb.complement).toBe(invoice.address.complement)
    expect(invoiceDb.city).toBe(invoice.address.city)
    expect(invoiceDb.state).toBe(invoice.address.state)
    expect(invoiceDb.zipCode).toBe(invoice.address.zip)
    expect(invoiceDb.items.length).toBe(1)
    expect(invoiceDb.items[0].name).toBe(invoice.items[0].name)
    expect(invoiceDb.items[0].price).toBe(invoice.items[0].price)
    expect(invoiceDb.createdAt).toBe(invoiceDb.createdAt)
    expect(invoiceDb.updatedAt).toBe(invoiceDb.updatedAt)
  });

  it('should find an invoice by id', async () => {
    const inputInvoiceItemProps = {
      id: new Id("1"),
      name: "Invoice 1",
      price: 100,
    }

    const invoiceItem = new InvoiceItems(inputInvoiceItemProps);

    const inputInvoiceProps = {
      id: new Id('1'),
      name: 'Invoice 1',
      document: 'Document 1',
      address: new Address(
        'Rua 2',
        '1280',
        '60875124',
        'City 1',
        'Complet',
        'State 1'
      ),
      items: [invoiceItem],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const invoice = new Invoice(inputInvoiceProps);
    const invoiceRepository = new InvoiceRepository();

    await invoiceRepository.generate(invoice);

    const invoiceFound = await invoiceRepository.find(invoice.id.id);

    expect(invoiceFound).toBeDefined()
    expect(invoiceFound.id.id).toBe(invoice.id.id)
    expect(invoiceFound.name).toBe(invoice.name)
    expect(invoiceFound.document).toBe(invoice.document)
    expect(invoiceFound.address.street).toBe(invoice.address.street)
    expect(invoiceFound.address.number).toBe(invoice.address.number)
    expect(invoiceFound.address.complement).toBe(invoice.address.complement)
    expect(invoiceFound.address.city).toBe(invoice.address.city)
    expect(invoiceFound.address.state).toBe(invoice.address.state)
    expect(invoiceFound.address.zip).toBe(invoice.address.zip)
    expect(invoiceFound.items.length).toBe(1)
    expect(invoiceFound.items[0].name).toBe(invoice.items[0].name)
    expect(invoiceFound.items[0].price).toBe(invoice.items[0].price)
    expect(invoiceFound.createdAt).toEqual(invoice.createdAt)
    expect(invoiceFound.updatedAt).toEqual(invoice.updatedAt)
  });
})