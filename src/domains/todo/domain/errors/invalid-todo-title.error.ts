import { CoreError } from '../../../../shared/errors/core.error';

/**
 * Levée lorsqu'un titre de Todo est invalide (vide ou uniquement des espaces).
 */
export class InvalidTodoTitleError extends CoreError {
  constructor(metadata?: Record<string, unknown>) {
    super(
      'Un Todo doit avoir un titre valide.',
      'TODO_TITLE_INVALID',
      metadata,
    );
  }
}
