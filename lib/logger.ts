import chalk from 'chalk';
import { AppError, SuccessDataAny } from './errors';

export type LogLevel = 'info' | 'error' | 'warn';

export class Logger {
  public static log(level: LogLevel, message: string): void {
    switch (level) {
      case 'info':
        console.log(chalk.blue.bold(`\nApp Info: ${message}\n`));
        break;
      case 'error':
        console.log(chalk.red.bold(`\nApp Error: ${message}\n`));
        break;
      case 'warn':
        console.log(chalk.yellow.bold(`\nApp Warning: ${message}\n`));
        break;
      default:
        const check: never = level;
        throw new Error(`\nUnknown log level: ${check}\n`);
    }
  }

  public static error(message: string): void {
    const level: LogLevel = 'error';
    this.log(level, message);
  }

  public static info(message: string): void {
    const level: LogLevel = 'info';
    this.log(level, message);
  }

  public static warn(message: string): void {
    const level: LogLevel = 'warn';
    this.log(level, message);
  }

  public static report(context: string, data: SuccessDataAny): void {
    if (data.success) {
      this.info(`Operation successful: ${context}`);
    } else {
      let errorLog: string = '';
      data.errors.forEach((error: AppError) => {
        errorLog += `\n- ${error.status || ''}: ${error.message}`;
      });
      this.error(`Operation failed: ${context}, \nErrors: ${errorLog}`);
    }
  }
}
