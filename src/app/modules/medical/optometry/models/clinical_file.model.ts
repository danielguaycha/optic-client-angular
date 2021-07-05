export interface ClinicalFileModel {
  id: number;
  date: string;
  number: number;
  description: string;
  client_id: number;
  created_at: string;
  client: {
    business_name: string;
    doc: string;
  };
  integral_rxs: {
    id: number;
    od_esfera: string;
    od_cilindro: string;
    od_eje: string;
    od_dne: string;
    oi_esfera: string;
    oi_cilindro: string;
    oi_eje: string;
    oi_dne: string;
    add: string;
    tipo_lente: string;
    alt: string;
    observacion: string;
    cli_file_id: number;
    created_at: string;
  }
}
