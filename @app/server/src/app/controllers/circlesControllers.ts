import {Request, Response} from 'express';
import sanitizeHtml from 'sanitize-html';
import {wrapMethodsInTryCatch} from '../../utils/tryCatch';
import circlesDataMapperInstance from '../datamapper/circlesDatamapper';
import AppError from '../../utils/AppError';
import { ErrorCode } from '@circles-self/circles/enums';
import {CirclesInputDatas} from '@circles-self/circles/interfaces';
import { sendMail } from '../../services/email';
import customerController from './customerController';
import customerDataMapperInstance from '../datamapper/customerDatamapper';

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


    if (user.email === invite) {
      throw new AppError(ErrorCode.CIRCLE, 'circleSelfInvite', 403);
  }

    const circle = await circlesDatamapper.getCircle(+circle_id);

    if (!circle) {
      throw new AppError(ErrorCode.CIRCLE, 'circle.notFound', 404);
    }

    const usersInCircle = await circlesDatamapper.getUsersInCircle(+circle_id);

  // vérifier si l'utilisateur est déjà dans le cercle
  const isUserInCircle = usersInCircle.some(user => user.email === invite);
  if (isUserInCircle) {
      throw new AppError(ErrorCode.CIRCLE, 'circleAlreadyInCircle', 400);
  }
    
    if (!user.circles.find((circle: any) => +circle.circle_id === +circle_id)) {
      throw new AppError(ErrorCode.CIRCLE, 'circle.noAccess', 401);
    }

    const invitationData = {
      inviteeEmail: invite,
      circleName: circle.name
    };

    const userCheck = await customerDataMapperInstance.main.getCustomerByEmail(invitationData.inviteeEmail);


    if(!userCheck) {
      return res.status(200).json({message: 'invite.send'});
    }

    sendMail({
      to: invitationData.inviteeEmail,
      subject: 'Invitation à rejoindre un nouveau cercle sur Circles',
      template: 'inviteCircle',
      context: {
        linkEmail: `http://127.0.0.1:5173/invite/circle/${circle.identifier}?invitee=${invitationData.inviteeEmail}`,
        circleName: invitationData.circleName,
      }
    });

    res.status(200).json({message: 'invite.send'});
  },
  async acceptInvitationToCircle(req: Request, res: Response) {
    const {identifier} = req.params;
    const {invitee} = req.body;
  
    const circle = await circlesDatamapper.getCircleByIdentifier(identifier);
    
    if (!circle) {
      throw new AppError(ErrorCode.CIRCLE, 'circle.notFound', 404);
    }
  
    const customer = await customerDataMapperInstance.main.getCustomerByEmail(invitee as string);
    if (!customer) {
      throw new AppError(ErrorCode.CUSTOMER, 'customer.notFound', 404);
    }
  
      const addCircle = await circlesDatamapper.addCustomerToCircle(circle.circle_id, customer.customer_id);
      
      if(addCircle) {
        res.status(204).json({message: 'circle.inviteSuccess', circle_id: circle.circle_id});
      } else {
        // throw new AppError(ErrorCode.CIRCLE, 'invite.alreadyMember', 400);
        res.status(200).json({message: 'circle.alreadyInvite'});
      }
  },
  }
  

export default wrapMethodsInTryCatch(circleController);
