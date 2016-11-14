import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {
  private url = '../vehicleInfo.json';

  constructor(private http: Http) { }

  getVehicles(): Observable<any> {
    return this.http.get(this.url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let d = res.json();
    return d;
  }

  private handleError(error: Response | any){
    let msg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      msg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      msg = error.message ? error.message : error.toString();
    }
    return Observable.throw(msg);
  }
}
