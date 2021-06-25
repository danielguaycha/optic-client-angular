export interface NoteCreditModel {
  invoice_id: number;
  date: number;
  observation: string;
  subtotal0: number;
  subtotalIva: number;
  iva: number;
  discount: number;
  iva_percent: number;
  articles: DetailNoteCreditModel;
}

export interface DetailNoteCreditModel {
  article_id: number;
  qty: number;
  pvp: number;
}
