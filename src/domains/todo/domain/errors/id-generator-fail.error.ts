import { CoreError } from "@/src/shared/errors/core.error";

export class IdGeneratorFailError extends CoreError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(
      message,
      'ID_GENERATION_FAILED',
      metadata,
    );
  }
}