import { CoreError } from '../../../../shared/errors/core.error';

/**
 * Levée lorsqu'une opération de persistance échoue (sauvegarde, lecture).
 */
export class StorageFailureError extends CoreError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(
      message,
      'TODO_STORAGE_FAILURE',
      metadata,
    );
  }
}
