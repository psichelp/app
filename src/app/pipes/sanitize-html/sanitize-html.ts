import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Generated class for the SanitizeHtmlPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'sanitizeHtml',
})
export class SanitizeHtmlPipe implements PipeTransform {
  constructor(private _sanitizer:DomSanitizer) {
  }

  transform(v:string):SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }
}
