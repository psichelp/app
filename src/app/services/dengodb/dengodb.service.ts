import { Injectable } from '@angular/core';
import { Base64 } from 'js-base64';
import { GithubService } from '../github/github.service';

@Injectable({
  providedIn: 'root'
})
export class DengodbService {

  constructor(private github: GithubService) { }

  public insert(value, file) {
    this.github.get(`/src/assets/data/${file}.json`).subscribe(
      data => {
        console.log('rawData', data);
        console.log("Conteúdo antes", Base64.decode((data.content)));
        let contents = JSON.parse(Base64.decode((data.content)));
        contents.push(value);
        console.log("Conteúdo depois", contents);
        this.github.update(`/src/assets/data/${file}.json`, JSON.stringify(contents, null, "  "), data.sha)
      }, error => {
        console.error(error);
        throw new Error('Não foi possível ler o arquivo ' + file + ".json");
      }
    );
  }
}
