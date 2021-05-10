export interface ConfigModel{
    iva?:number,
    decimals?:number,
    cfdi_env?: string,
    cdfi_wait_time?: string,
    cdfi_password?: string,
    cdfi_signature?: File,
    cdfi_bussiness_key?: string,
    cdfi_cert_entity?: string,
    cdfi_expiration?: string,
}