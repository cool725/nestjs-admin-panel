import path from "path";
export const env = (() => {
    return {
        load: (pathName = null) => {
            if (!pathName) pathName = path.resolve(__dirname, '.env');
            pathName && require('fs').existsSync(pathName)
                ? require('dotenv').config({ path: path.resolve(pathName) })
                : require('dotenv').config({
                    path: path.resolve(__dirname, '..', '.env'),
                });
            if (!process.env.APP_ENV) process.env.APP_ENV = 'development';
        },
    };
})();
