import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Sequence} from '../models/sequence.model';

@Injectable({
  providedIn: 'root'
})
export class SequencesService {

  constructor(private http:HttpClient) { }

  public getSequences() : Observable<any> {
      return this.http.get('sequences');
  }

  public getByType(type: Sequence) : Observable<any> {
    return this.http.get(`sequences/${type}`);
  }

  public updateSeq(data: {}) : Observable<any> {
    return this.http.put(`sequences/update`, data);
  }

  public resetSeq(serie) : Observable<any> {
    return this.http.put(`sequences/reset`, {serie});
  }
}
