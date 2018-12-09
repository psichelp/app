import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Base64 } from 'js-base64';


@Injectable({
  providedIn: 'root'
})
export class GithubService {
  constructor(private http: HttpClient) { }

  token(): String {
    let encToken = "ZTIyODhkYTJlY2VhNjE0NjM4NjYyMWRiNjllYzQzYzAyN2RkMzg1YQ==";
    return Base64.decode(encToken);
  }

  apiRoot = 'https://api.github.com/repos/psichelp/app/contents'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token ' + this.token()
    })
  };


  get(filePath): Observable<any> {
    let apiUrl = `${this.apiRoot}${filePath}`;
    return this.http.get(apiUrl)
      .pipe(
        retry(3),
        (results => {
          if (!results) {
            throw new Error("Não foi possível obter os dados")
          }
          return results;
        })
      )

  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  raw(filePath): Observable<any> {
    let apiUrl = `https://raw.githubusercontent.com/psichelp/app/master/src/assets/data/${filePath}.json`;
    return this.http.get(apiUrl)
      .pipe(map(res => {
        let results = res;
        return results;
      }));
  }

  b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        // @ts-ignore
        return String.fromCharCode('0x' + p1);
      }));
  }

  b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.

    return decodeURIComponent(atob(str).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  create(filePath, contents) {
    let apiUrl = `${this.apiRoot}${filePath}`;
    contents = this.b64EncodeUnicode(contents)
    let body = {
      "message": "Automatic create commit",
      "content": contents
    }
    this.http.put(apiUrl, body, this.httpOptions)
      .pipe(map(res => {
        let results = res;
        return results;
      }))
      .subscribe((data) => {
        console.log(data);
      });
  }

  update(filePath, contents, sha) {
    let apiUrl = `${this.apiRoot}${filePath}`;
    contents = this.b64EncodeUnicode(contents)
    let body = {
      "message": "Automatic update commit",
      "content": contents,
      "sha": sha
    }
    this.http.put(apiUrl, body, this.httpOptions)
      .pipe(retry(3),
        results => {
          return results;
        })
      .subscribe((data) => {
        console.log(data);
      }, error => {
        console.error(error);
        throwError("Não foi possível inserir " + error);
      }); 
  }

  set(filePath, contents) {
    this.get(filePath).subscribe((data) => {
      this.update(filePath, contents, data.sha)
    },
      error => {
        this.create(filePath, contents)
      }
    );
  }

}


