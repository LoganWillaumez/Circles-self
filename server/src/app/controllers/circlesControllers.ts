import { Request, Response } from 'express';
import sanitizeHtml from 'sanitize-html';
import { CircleDatas } from '../../ts/interfaces/circle.interfaces';
import circlesDatamapper from '../datamapper/circlesDatamapper';

const circleController = {

  async getCircle(req: Request, res: Response) {
    const { user } = req;
    const { circleId } = req.params;

    const circle = await circlesDatamapper.getCircle(circleId);

    if (!user.circles.find((circle: any) => +circle.id === +circleId)) {
      res.status(401);
      throw new Error('You dont have access to this circle');
    }

    res.status(200).json(circle);
  },

  async createCircle(req: Request, res: Response) {
    const { user } = req;

    const {
      name, description, img,
    } = req.body;

    const circleData: CircleDatas = {
      name: sanitizeHtml(name),
      description: sanitizeHtml(description),
      img: sanitizeHtml(img),
    };

    const circle = await circlesDatamapper.createCircle(user.id, circleData);

    if (!circle) {
      res.status(400);
      throw new Error('Circle cannot be created');
    }
    res.status(200).json({ message: 'successfully created !' });
  },

  async updateCircle(req: Request, res: Response) {
    const { circleId } = req.params;

    const {
      name, description, img,
    } = req.body;

    const circleData: CircleDatas = {
      name: sanitizeHtml(name),
      description: sanitizeHtml(description),
      img: sanitizeHtml(img),
    };

    const patchCircle = await circlesDatamapper.updateCircle(circleId, circleData);

    if (patchCircle) {
      res.status(200).json({ message: 'Circle successfully patch.', patchCircle });
    } else {
      res.status(400);
      throw new Error('Circle can\'t be updated');
    }
  },

  async deleteCircle(req: Request, res: Response) {
    const { circleId } = req.params;

    await circlesDatamapper.deleteCircle(circleId);

    const checkCircleAfterDelete = await circlesDatamapper.getCircle(circleId);

    if (!checkCircleAfterDelete) {
      res.status(200).json({ message: 'Circle successfully deleted.' });
    } else {
      res.status(400);
      throw new Error('Circle can\'t be deleted');
    }
  },
};

export default circleController;
