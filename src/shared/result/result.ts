/**
 * Représente le résultat d'une opération métier.
 * Succès : contient la donnée associée.
 * Échec : contient un code d'erreur et un message interprétable par la présentation.
 */
export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: { code: string; message: string } };

/**
 * Crée un Result de succès.
 */
export const success = <T>(data: T): Result<T> => ({
  success: true,
  data,
});

/**
 * Crée un Result d'échec.
 */
export const failure = <T>(code: string, message: string): Result<T> => ({
  success: false,
  error: { code, message },
});
