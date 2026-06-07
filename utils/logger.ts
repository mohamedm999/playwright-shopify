import pino from 'pino';
import path from 'path';
import fs from 'fs';

// Ensure the logs directory exists
const logsDir = path.resolve('logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

/**
 * Root Pino logger with two simultaneous transports:
 *  1. pino-pretty  → colored, human-readable output to the terminal
 *  2. file         → raw JSON written to logs/test-run.log for CI archiving
 */
const rootLogger = pino(
  { level: process.env.LOG_LEVEL || 'debug' },
  pino.transport({
    targets: [
      {
        // Terminal transport — pretty-printed with colors
        target: 'pino-pretty',
        level: process.env.LOG_LEVEL || 'debug',
        options: {
          colorize: true,
          translateTime: 'SYS:HH:MM:ss.l',
          ignore: 'pid,hostname',
          // Show: [HH:MM:ss] LEVEL [context] message
          messageFormat: '[{context}] {msg}',
        },
      },
      {
        // File transport — structured JSON for CI artifact archiving
        target: 'pino/file',
        level: 'debug',
        options: {
          destination: path.join(logsDir, 'test-run.log'),
          mkdir: true,
        },
      },
    ],
  })
);

// ─── Public API (same interface as before — no other files need to change) ───

export type { Logger };

class Logger {
  private child: pino.Logger;

  constructor(context: string) {
    this.child = rootLogger.child({ context });
  }

  debug(message: string, data?: unknown): void {
    data !== undefined ? this.child.debug(data, message) : this.child.debug(message);
  }

  info(message: string, data?: unknown): void {
    data !== undefined ? this.child.info(data, message) : this.child.info(message);
  }

  warn(message: string, data?: unknown): void {
    data !== undefined ? this.child.warn(data, message) : this.child.warn(message);
  }

  error(message: string, data?: unknown): void {
    data !== undefined ? this.child.error(data, message) : this.child.error(message);
  }
}

/** Factory function — same as before */
export function createLogger(context: string): Logger {
  return new Logger(context);
}