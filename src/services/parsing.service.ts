import { /* inject, */ BindingScope, injectable} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class ParsingService {
  constructor(/* Add @inject to inject parameters */) {}

   exec(url: string) {
     console.log("Hola " + url);
  }
}
