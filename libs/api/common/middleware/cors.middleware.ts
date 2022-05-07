import { Request, Response, NextFunction } from 'express';

const ConfigCors = {
  allowedMethods: <string[]>[
    'OPTIONS',
    'POST',
    'GET',
    'PUT',
    'DELETE',
    'PATCH',
  ],

  allowedFields: <string[]>['Authorization', 'Content-Type', 'Company'],

  allowedOrigin: <string>process.env.API_ACCESS_CONTROL_ORIGIN || '*',

  customHeaders: <{ key: string; value: string }[]>[
    {
      // Allow-Credentials is set to true because we want to use cookies
      key: 'Access-Control-Allow-Credentials',
      value: 'true',
    },
  ],
};

export const CorsMiddleware =
  (configCors = ConfigCors) =>
  (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', configCors.allowedOrigin);

    res.setHeader(
      'Access-Control-Allow-Methods',
      configCors.allowedMethods.join(',')
    );

    res.setHeader(
      'Access-Control-Allow-Headers',
      configCors.allowedFields.join(',')
    );

    res.setHeader('Referrer-Policy', 'same-origin');

    configCors.customHeaders.map((header) =>
      res.setHeader(header.key, header.value)
    );

    if (req.method == 'OPTIONS') return res.sendStatus(200);

    next();
  };
