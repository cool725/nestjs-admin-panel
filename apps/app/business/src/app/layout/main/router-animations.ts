import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild,
} from '@angular/animations';

export const slideFadeinUp = trigger('slideFadeinUp', [
  transition(':enter', []),
  transition('* => *', [
    style({ position: 'relative' }),
    query(
      ':enter',
      [
        style({
          display: 'block',
          opacity: '0',
          transform: 'translateY(20px)',
        }),
      ],
      { optional: true }
    ),
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
      query(
        ':leave',
        [
          animate(
            '300ms ease-in-out',
            style({ opacity: '0', transform: 'translateY(-20px)' })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          animate(
            '300ms ease-in-out',
            style({ opacity: '1', transform: 'translateY(0px)' })
          ),
        ],
        { delay: 400, optional: true }
      ),
    ]),
    query(':enter', animateChild(), { optional: true }),
  ]),
]);

export const slideFadeinRight = trigger('slideFadeinRight', [
  transition(':enter', []),
  transition('* => *', [
    style({ position: 'relative' }),
    query(':enter', [
      style({ display: 'block', opacity: '0', transform: 'translateX(-20px)' }),
    ]),
    query(':leave', [
      style({
        display: 'block',
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
      }),
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate(
          '300ms ease-in-out',
          style({ opacity: '0', transform: 'translateX(20px)' })
        ),
      ]),
      query(
        ':enter',
        [
          animate(
            '300ms ease-in-out',
            style({ opacity: '1', transform: 'translateX(0px)' })
          ),
        ],
        { delay: 400 }
      ),
    ]),
    query(':enter', animateChild()),
  ]),
]);

export const zoomFadein = trigger('zoomFadein', [
  transition(':enter', []),
  transition('* => *', [
    style({ position: 'relative' }),
    query(':enter', [
      style({ display: 'block', opacity: '0', transform: 'scale(0.99)' }),
    ]),
    query(':leave', [
      style({
        display: 'block',
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
      }),
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate(
          '300ms ease-in-out',
          style({ opacity: '0', transform: 'scale(1.01' })
        ),
      ]),
      query(
        ':enter',
        [
          animate(
            '300ms ease-in-out',
            style({ opacity: '1', transform: 'scale(1)' })
          ),
        ],
        { delay: 400 }
      ),
    ]),
    query(':enter', animateChild()),
  ]),
]);

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
