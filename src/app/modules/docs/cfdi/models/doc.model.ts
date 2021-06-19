import {DocState} from './doc_state.model';

export interface DocModel {
  id: number,
  number: string,
  date: string,
  key_access: string,
  date_auth?: string|null,
  send_sri: DocState,
  sri_status: string,
  annul: number,
  status: number,
  person_id: number,
  person_doc: string,
  person_name: string,
  office_id: number,
  total: number,
  type_: string
}
