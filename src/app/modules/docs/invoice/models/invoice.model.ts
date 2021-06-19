export interface InvoiceModel {
  subtotal0: number,
  subtotalIva: number,
  discount: number,
  iva: number,
  id: number,
  number: string,
  client_id: number,
  details?: Array<InvoiceDetailModel>,
  client?: any,
  pays?: any
}

export interface InvoiceDetailModel {
  id?: number,
  article_id: number,
  description: string,
  discount: number,
  iva: number,
  qty: number,
  pvp: number
}
