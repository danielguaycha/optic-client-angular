export enum INotifyType {
  ERROR=0
}

export interface NotifyModel {
  id: number,
  type: INotifyType,
  module: string,
  content: string,
  created_at: string,
  office_id: number,
  user_id: number,
  user: {
    id: number,
    username: string
  }
}
