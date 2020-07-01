import * as morgan from "morgan";
import * as chalk from "chalk";

export const morganMiddleware = morgan(function (tokens: any, req: object, res: object) {
    return [
        chalk.hex('#ff4757').bold('🚀 '),
        chalk.hex('#CA85FA').bold(tokens.method(req, res)),
        chalk.hex('#ffb142').bold(tokens.status(req, res)),
        chalk.hex('#ff5252').bold(tokens.url(req, res)),
        chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
        chalk.hex('#F41FC4').bold(tokens['remote-addr'](req, res)),
        chalk.hex('#1F76F4')(tokens['user-agent'](req, res)),
        '\n',
    ].join(' ');
});