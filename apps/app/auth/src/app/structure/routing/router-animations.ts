import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild,
} from '@angular/animations';

export const fadein = trigger('fadein', [
  transition(':enter', []),
  transition('* => *', [
    style({ position: 'relative' }),
    query(':enter', [style({ display: 'block', opacity: '0' })], {
      optional: true,
    }),
    query(
      ':leave',
      [
        style({
          display: 'block',
          position: 'absolute',
          width: '100%',
          top: 0,
          left: 0,
        }),
      ],
      { optional: true }
    ),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [animate('300ms ease-in-out', style({ opacity: '0' }))], {
        optional: true,
      }),
      query(':enter', [animate('300ms ease-in-out', style({ opacity: '1' }))], {
        delay: 400,
        optional: true,
      }),
    ]),
    query(':enter', animateChild(), { optional: true }),
  ]),
]);
