export interface InvoiceBuy {
  date_emit: string,
  date_end: string,
  number: string,
  key_access: string,
  provider: {
    id: number,
    business_name: string,
    email: string,
    address: string,
    ruc: string
  },
  subtotal0: number,
  subtotal12: number,
  ice: 0,
  iva: 0,
  irbp: 0,
  discount: 0,
  total: 0
}
