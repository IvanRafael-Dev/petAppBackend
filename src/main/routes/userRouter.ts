import { type Router } from 'express';
import { expressRouteAdapter } from '../frameworks/express-route-adapter';
import { makeSignUpController } from '../factorys/makeSignUpController';

const setupUserRouter = (router: Router): void => {
  router.post('/signup', expressRouteAdapter(makeSignUpController()));
};
export { setupUserRouter };
