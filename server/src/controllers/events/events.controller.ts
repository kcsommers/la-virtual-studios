import { ILAEvent, ILocation } from '@la/core';
import { LAEventModel, LocationModel } from '@la/mongodb';
import { Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';
import { Document } from 'mongoose';

const router = Router();

router.get('/', async (_req: Request, _res: Response<Document<ILAEvent>[]>) => {
  try {
    const _events: Document<ILAEvent>[] = await LAEventModel.find();
    console.log('Successfully retrieved dates from db');
    _res.status(HttpStatusCodes.OK).json(_events);
  } catch (_error: any) {
    console.error(_error);
    _res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
});

router.post(
  '/locations/create',
  async (
    _req: Request<any, any, ILocation>,
    _res: Response<Document<ILocation>>
  ) => {
    try {
      const _location: ILocation = _req.body;
      const _newLocation: Document<ILocation> = await LocationModel.create(
        _location
      );
      console.log(`Successfully created location: ${_location.name}`);
      _res.status(HttpStatusCodes.OK).json(_newLocation);
    } catch (_error: any) {
      console.error(_error);
      _res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

router.get(
  '/locations',
  async (_req: Request, _res: Response<Document<ILocation>[]>) => {
    try {
      const _locations: Document<ILocation>[] = await LocationModel.find();
      console.log('Successfully retrieved locations from db', _locations);
      _res.status(HttpStatusCodes.OK).json(_locations);
    } catch (_error: any) {
      console.error(_error);
      _res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

export const eventsController = router;
