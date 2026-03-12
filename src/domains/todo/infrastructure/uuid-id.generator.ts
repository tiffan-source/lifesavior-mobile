import { IIdGenerator } from '../domain/ports/id-generator.port';

/**
 * Génère des identifiants uniques via crypto.randomUUID().
 */
export class UuidIdGenerator implements IIdGenerator {
  generate(): string {
    return crypto.randomUUID();
  }
}
