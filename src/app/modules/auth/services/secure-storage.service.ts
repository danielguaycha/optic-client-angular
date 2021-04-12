import { Injectable } from '@angular/core';
import * as SecureLS from 'secure-ls';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SecureStorageService {
  secureStorage: any;
  constructor() {
    this.secureStorage = new SecureLS({
      encryptionSecret: environment.secretKey,
      encodingType: 'aes'
    });
  }

  set(key:string, data:string)  {
    this.secureStorage.set(key, data);
  }

  remove(key:string) {
    this.secureStorage.remove(key);
  }

  clear() {
    this.secureStorage.removeAll();
  }

  get(key:string) {
    return this.secureStorage.get(key);
  }
}
