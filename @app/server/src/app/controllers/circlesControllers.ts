import {Request, Response} from 'express';
import sanitizeHtml from 'sanitize-html';
import {wrapMethodsInTryCatch} from '../../utils/tryCatch';
import circlesDataMapperInstance from '../datamapper/circlesDatamapper';
import AppError from '../../utils/AppError';
import { ErrorCode } from '@circles-self/circles/enums';
import {CirclesInputDatas} from '@circles-self/circles/interfaces';
import { sendMail } from '../../services/email';

const circlesDatamapper = circlesDataMapperInstance.main;
const circleController = {
  async getCircle(req: Request, res: Response) {
    const {user} = req;
    const {circle_id} = req.params;
  
    const circle = await circlesDatamapper.getCircle(+circle_id);
  
    // Update the condition to use circle_id instead of id
    if (!user.circles.find((circle: any) => +circle.circle_id === +circle_id)) {
      throw new AppError(ErrorCode.CIRCLE, 'circle.noAccess', 401);
    }
  
    res.status(200).json(circle);
  },

  async createCircle(req: Request, res: Response) {
    const {user} = req;

    const {name, description, img} = req.body;

    const circleData: CirclesInputDatas = {
      name: sanitizeHtml(name),
      description: sanitizeHtml(description),
      img: sanitizeHtml(img)
    };

    const circle = await circlesDatamapper.createCircle(user.customer_id, circleData);

    if (!circle) {
      throw new AppError(ErrorCode.CIRCLE, 'circle.cantCreated', 400);
    }

    res.status(201).json({message: 'circles.created'});
  },

  async updateCircle(req: Request, res: Response) {
    const {circle_id} = req.params;

    const {name, description, img} = req.body;

    const circleData: CirclesInputDatas = {
      name: sanitizeHtml(name),
      description: sanitizeHtml(description),
      img: sanitizeHtml(img)
    };

    const patchCircle = await circlesDatamapper.updateCircle(
      +circle_id,
      circleData
    );

    if (patchCircle) {
      res
        .status(200)
        .json({message: 'Circle successfully patch.', patchCircle});
    } else {
      throw new AppError(ErrorCode.CIRCLE, 'circle.cantUpdated', 400);
    }
  },

  async deleteCircle(req: Request, res: Response) {
    const {circle_id} = req.params;

    await circlesDatamapper.deleteCircle(+circle_id);

    const checkCircleAfterDelete = await circlesDatamapper.getCircle(+circle_id);

    if (!checkCircleAfterDelete) {
      res.status(200).json({message: 'Circle successfully deleted.'});
    } else {
      throw new AppError(ErrorCode.CIRCLE, 'circle.cantDeleted', 400);
    }
  },

  async inviteToCircle(req: Request, res: Response) {
    const {user} = req;
    const {invite} = req.body;
    const {circle_id} = req.params;

    const circle = await circlesDatamapper.getCircle(+circle_id);

    if (!circle) {
      throw new AppError(ErrorCode.CIRCLE, 'circle.notFound', 404);
    }

    if (!user.circles.find((circle: any) => +circle.circle_id === +circle_id)) {
      throw new AppError(ErrorCode.CIRCLE, 'circle.noAccess', 401);
    }

    const invitationData = {
      inviteeEmail: sanitizeHtml(invite), // sanitize the input
      circleName: circle.name
    };

    sendMail({
      to: invitationData.inviteeEmail,
      subject: 'Invitation à rejoindre un nouveau cercle sur Circles',
      template: 'inviteCircle',
      context: {
        linkEmail: `http://127.0.0.1:5173/invite/circle/${circle_id}`,
        circleName: invitationData.circleName,
      }
    });

    res.status(200).json({message: 'Invitation sent.'});
  }
  }
  

export default wrapMethodsInTryCatch(circleController);
