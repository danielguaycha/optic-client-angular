export interface NoteCreditModel {
  invoice_id: number;
  date: string;
  observation: string;
  subtotal0: number;
  subtotalIva: number;
  iva: number;
  discount: number;
  iva_percent: number;
  articles: Array<DetailNoteCreditModel>;
}

export interface DetailNoteCreditModel {
  article_id: number;
  qty: number;
  pvp: number;
}
