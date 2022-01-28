import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import '../../../../node_modules/rxjs/add/operator/map.d.ts'
@Injectable()
export class CategoryService {

  constructor(private _http:Http) {
  }


  public  getData = ():any => {
    return this._http.get('http://localhost:8080/categories').map(response=> response.json());

  }
}

