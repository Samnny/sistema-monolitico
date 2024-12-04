import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/invoice-items.entity";
import Invoice from "../../domain/invoice.entity";
import Address from "../../value-object/address";
import FindInvoiceUseCase from "./find-invoice.usecase";

const invoiceItem = new InvoiceItems({
  id: new Id("1"),
  name: "Product 1",
  price: 100,
});

const invoice = new Invoice({
  id: new Id("1"),
  name: "Invoice 01",
  document: "Doc 01",
  address: new Address(
    "Street 1",
    "123",
    "12345-678",
    "City 1",
    "Complement 1",
    "State 1"
  ),
  items: [invoiceItem],
});

const MockInvoiceRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  }
}

describe('Find Invoice Use Case Unit Test', () => {
  it('should find an invoice', async () => {
    const invoiceRepository = MockInvoiceRepository();
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);

    const input = {
      id: "1",
    }

    const result = await findInvoiceUseCase.execute(input);

    expect(invoiceRepository.find).toHaveBeenCalled();
    expect(result.id).toBe("1");
    expect(result.name).toBe("Invoice 01");
    expect(result.document).toBe("Doc 01");
    expect(result.address.street).toBe("Street 1");
    expect(result.address.number).toBe("123");
    expect(result.address.complement).toBe("Complement 1");
    expect(result.address.city).toBe("City 1");
    expect(result.address.state).toBe("State 1");
    expect(result.address.zipCode).toBe("12345-678");
    expect(result.items[0].id).toBe("1");
    expect(result.items[0].name).toBe("Product 1");
    expect(result.items[0].price).toBe(100);
    expect(result.total).toBe(100);
    expect(result.createdAt).toEqual(expect.any(Date));
  });

  it('should throw an error when invoice is not found', async () => {
    const invoiceRepository = MockInvoiceRepository();
    invoiceRepository.find = jest.fn().mockReturnValue(null);

    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);

    await expect(findInvoiceUseCase.execute({ id: "non-existing-id" })).rejects.toThrow('Invoice not found');
  });
});