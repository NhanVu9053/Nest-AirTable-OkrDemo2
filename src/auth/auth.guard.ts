import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { expressJwtSecret } from 'jwks-rsa';
import {promisify} from 'util';
import * as jwt from 'express-jwt';
import * as dotenv from 'dotenv';

dotenv.config();


@Injectable()
export class AuthorizationGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const req = context.getArgByIndex(0);
    const res = context.getArgByIndex(1);
    console.log('check1');
    const checkJwt = promisify(
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
        }),
        audience: `${process.env.AUTH0_AUDIENCE}`,
        issuer: process.env.AUTH0_ISSUER_URL,
        algorithms: ['RS256']
      })
    )
    console.log(jwt);

    try{
      await checkJwt(req, res);
      console.log('check2');
      return true;
    } catch(error) {
      console.log('check3');
      throw new UnauthorizedException(error);
    }
  }
}
