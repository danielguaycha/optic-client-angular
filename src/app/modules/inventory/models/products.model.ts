export interface Product{
    id?: number,
    code: number | string,
    name: string,
    description: string,
    pvp: number,
    price_purchase: number | string,
    type: string,
    ice_code?: number,
    iva: number,
    category_id: number,
    category?: string,
    stock?: number,
    office_id?: number,
    office?: string
}