import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn(),
  };
};

describe('Generate Invoice Use Case Unit Test', () => {
  it('should generate an invoice', async () => {
    const invoiceRepository = MockRepository();
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository);

    const inputInvoice = {
      name: 'Invoice 1',
      document: 'Document 1',
      street: 'Street 1',
      number: '123',
      complement: 'Casa',
      city: 'City 1',
      state: 'State 1',
      zipCode: '12345678',
      items: [
        { id: '1', name: 'Item 01', price: 100 },
      ],
    };

    const result = await generateInvoiceUseCase.execute(inputInvoice);

    expect(invoiceRepository.generate).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(inputInvoice.name);
    expect(result.document).toBe(inputInvoice.document);
    expect(result.street).toBe(inputInvoice.street);
    expect(result.number).toBe(inputInvoice.number);
    expect(result.complement).toBe(inputInvoice.complement);
    expect(result.city).toBe(inputInvoice.city);
    expect(result.state).toBe(inputInvoice.state);
    expect(result.zipCode).toBe(inputInvoice.zipCode);
    expect(result.items[0].id).toBe(inputInvoice.items[0].id);
    expect(result.items[0].name).toBe(inputInvoice.items[0].name);
    expect(result.items[0].price).toBe(inputInvoice.items[0].price);
  });
});