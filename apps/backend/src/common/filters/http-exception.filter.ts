import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalHttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Law-Enforcement Gateway Error';

    this.logger.error(`HTTP ${status} on ${request.method} ${request.url}`, exception instanceof Error ? exception.stack : '');

    response.status(status).json({
      success: false,
      error: {
        code: `ERR_${status}`,
        message: typeof message === 'object' && (message as any).message ? (message as any).message : message,
      },
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
