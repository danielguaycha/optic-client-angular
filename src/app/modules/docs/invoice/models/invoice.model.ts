export interface InvoiceModel {
  subtotal?: number;
  base?: number;
  total?: number;
  iva_valor?: number;
  subtotal0: number;
  subtotalIva: number;
  discount: number;
  iva: number;
  id: number;
  number: string;
  client_id: number;
  details?: Array<InvoiceDetailModel>;
  client?: any;
  pays?: any;
  iva_percent?: number;
}

export interface InvoiceDetailModel {
  id?: number;
  article_id: number;
  description: string;
  discount: number;
  iva: number;
  qty: number;
  pvp: number;

  qty_note_credit?: number;
  subtotal?: number;
  base?: number;
  iva_value?: number;
  total?: number;
}
