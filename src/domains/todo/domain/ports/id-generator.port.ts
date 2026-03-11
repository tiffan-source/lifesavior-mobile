/**
 * Port définissant la génération d'identifiants uniques.
 */
export interface IIdGenerator {
  /** Génère et retourne un nouvel identifiant unique. */
  generate(): string;
}
