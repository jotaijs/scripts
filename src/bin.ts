import { main } from './cli';
import { handleError } from './errors';

main().catch(handleError);
