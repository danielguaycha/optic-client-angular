interface InvoiceXmlDetail {
  cantidad: number,
  codigoAuxiliar: string,
  codigoPrincipal: string,
  descripcion: string,
  descuento: number,
  precioTotalSinImpuesto: number,
  precioUnitario: number
  impuestos: Array<InvoiceTax>;
}

interface InvoiceTax {
  codigo: number,
  codigoPorcentaje: number,
  baseImponible: number,
  tarifa: number,
  valor: number
}

export interface InvoiceXml {
  infoTributaria: {
    claveAcceso: string,
    nombreComercial: string,
    razonSocial: string,
    ruc: string,
    secuencial: string,
    estab: string,
    ptoEmi: string,
  },
  infoFactura: {
    fechaEmision: string,
    dirEstablecimiento: string,
  },
  detalles: any
}
