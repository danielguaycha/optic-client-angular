export interface ConfigModel{
    iva?:number,
    decimals?:number,
    cfdi_sign?: File,
    cfdi_sign_pw?: string,
    cfdi_sign_expire?: string,
    cfdi_business_key?: string,
    cfdi_env?: number,
    cfdi_send_mail?: number,
    cdfi_wait?: number,
    cfdi_sign_entity?: string
}