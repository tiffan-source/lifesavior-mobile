import { IIdGenerator } from '../../ports/id-generator.port';

/**
 * Fake déterministe du IIdGenerator.
 * Retourne toujours la valeur fixe passée en constructeur.
 * Utilisé uniquement en tests unitaires.
 */
export class FixedIdGenerator implements IIdGenerator {
  constructor(private readonly fixedId: string) {}

  generate(): string {
    return this.fixedId;
  }
}
