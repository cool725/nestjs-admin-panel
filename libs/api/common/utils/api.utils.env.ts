export const env = (() => {
  return {
    load: (path = null) => {
      if (!path) path = require('path').resolve(__dirname, '.env');
      path && require('fs').existsSync(path)
        ? require('dotenv').config({ path: require('path').resolve(path) })
        : require('dotenv').config({
            path: require('path').resolve(__dirname, '..', '.env'),
          });

      if (!process.env.APP_ENV) process.env.APP_ENV = 'development';
    },
  };
})();
