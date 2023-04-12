import {Request, Response, NextFunction} from 'express';

// eslint-disable-next-line no-unused-vars
type ControllerFunction = (req: Request, res: Response) => Promise<unknown>;

const tryCatch =
  (controller: ControllerFunction) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await controller(req, res);
    } catch (error) {
      return next(error);
    }

    return Promise.resolve();
  };

// eslint-disable-next-line max-len
const wrapMethodsInTryCatch = (
  controller: Record<string, ControllerFunction>
): Record<string, ControllerFunction> =>
  Object.entries(controller).reduce(
    (wrappedMethods, [methodName, method]) => ({
      ...wrappedMethods,
      [methodName]: tryCatch(method)
    }),
    {}
  );

export {tryCatch, wrapMethodsInTryCatch};
