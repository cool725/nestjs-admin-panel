import { Component, Input } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'lib-header-clock-ui',
  templateUrl: './header.clock.component.html',
  styleUrls: ['./header.clock.component.scss'],
})
export class HeaderClockUIComponent {
  @Input() dark = true;
  time = HeaderClockUIComponent.getTime();
  time$ = interval(30000).pipe(map(HeaderClockUIComponent.getTime));
  static getTime(): string {
    const times = new Date().toTimeString().split(' ')[0].split(':');
    times.pop(); // remove seconds
    return times.join(':');
  }
}
