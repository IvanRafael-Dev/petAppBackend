import { type RequestHandler } from 'express';
import { type Controller } from '../../presentation/controllers/interfaces/Controller';
import { type HttpRequest } from '../../presentation/controllers/interfaces/Http';

export const expressRouteAdapter = (controller: Controller): RequestHandler => {
  return async (req, res) => {
    try {
      const httpRequest: HttpRequest = {
        body: req.body,
        headers: req.headers,
        params: req.params
      };

      const httpResponse = await controller.handle(httpRequest);
      return res.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: error.message,
          stack: error.stack
        });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
};
