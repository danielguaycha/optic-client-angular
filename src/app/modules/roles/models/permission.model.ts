export interface PermissionModel{
    id: number,
    code: number,
    name: string,
    description: string,
    parent?:     any,
    deleted_at?: any,
    created_at?: any,
    updated_at?: any
}