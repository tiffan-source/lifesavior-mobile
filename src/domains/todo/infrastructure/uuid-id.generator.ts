import 'react-native-get-random-values';
import { IdGeneratorFailError } from '../domain/errors/id-generator-fail.error';
import { IIdGenerator } from '../domain/ports/id-generator.port';
import { v4 as uuidv4 } from 'uuid';

/**
 * Génère des identifiants uniques via crypto.randomUUID().
 */
export class UuidIdGenerator implements IIdGenerator {
  generate(): string {
    try {
    return uuidv4();
    } catch (error) {
        console.error("Error generating UUID:", error);
        throw new IdGeneratorFailError("Échec de la génération d'ID.", { cause: error });
    }

  }
}
