import {Pipe, PipeTransform} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value:string, url:any = null) {

    if(url == 'style')
      return this.sanitized.bypassSecurityTrustStyle(value)

    return url ? this.sanitized.bypassSecurityTrustResourceUrl(value):this.sanitized.bypassSecurityTrustHtml(value);
  }
}
