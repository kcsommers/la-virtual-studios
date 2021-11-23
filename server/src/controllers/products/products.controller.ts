import { ILAEvent, IProduct, IProductCalendarDay } from '@la/core';
import {
  LAEventModel,
  ProductCalendarDayModel,
  ProductModel,
} from '@la/mongodb';
import { Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';
import { Document } from 'mongoose';

const router = Router();

router.post(
  '/create',
  async (
    _req: Request<any, any, IProduct>,
    _res: Response<string | Document<IProduct>>
  ) => {
    const _product: IProduct = _req.body;
    try {
      const _newProduct: Document<IProduct> = await ProductModel.create(
        _product
      );
      console.log('Successfully created new product:::: ', _newProduct._id);
      _res.status(HttpStatusCodes.OK).json(_newProduct);
    } catch (err: any) {
      console.error(err);
      _res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Unexpected error creating product');
    }
  }
);

router.get(
  '/',
  async (
    _req: Request<any, any, IProduct>,
    _res: Response<string | Document<IProduct>[]>
  ) => {
    try {
      const _products: Document<IProduct>[] = await ProductModel.find();
      console.log('Successfully retrieved products from DB');
      _res.status(HttpStatusCodes.OK).json(_products);
    } catch (err: any) {
      console.error(err);
      _res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Unexpected error getting products from DB');
    }
  }
);

router.get(
  '/:id',
  async (_req: Request, _res: Response<string | Document<IProduct>>) => {
    const _productId: string = _req.params.id;
    try {
      const _product: Document<IProduct> = await ProductModel.findOne({
        _id: _productId,
      });
      console.log(`Successfully created new product with id: ${_productId}`);
      _res.status(HttpStatusCodes.OK).json(_product);
    } catch (err: any) {
      console.error(err);
      _res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send(`Could not find product with id: ${_productId}`);
    }
  }
);

router.post(
  'calendar-days/create',
  async (
    _req: Request<any, any, IProductCalendarDay>,
    _res: Response<string | Document<IProductCalendarDay>>
  ) => {
    const _calendarDay: IProductCalendarDay = _req.body;
    const _events: ILAEvent[] = _calendarDay.events as ILAEvent[];
    try {
      if (_events && _events.length) {
        const _newEvents: Document<ILAEvent>[] = await LAEventModel.create(
          _events
        );
        _calendarDay.events = _newEvents.map((_e) => _e._id);
      }
      _calendarDay.product = (_calendarDay.product as IProduct)._id;
      const _newCalendarDay: Document<IProductCalendarDay> =
        await ProductCalendarDayModel.create(_calendarDay);
      console.log(
        'Successfully created new calendar day:::: ',
        _newCalendarDay._id
      );
      _res.status(HttpStatusCodes.OK).json(_newCalendarDay);
    } catch (err: any) {
      console.error(err);
      _res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Unexpected error creating calendar day');
    }
  }
);

router.get(
  'calendar-days/:productId',
  async (
    _req: Request,
    _res: Response<string | Document<IProductCalendarDay>>
  ) => {
    const _productId: string = _req.params.id;
    try {
      const _calendarDay: Document<IProductCalendarDay> =
        await ProductCalendarDayModel.find({
          product: _productId,
        })
          .populate('events')
          .populate('product');
      console.log(
        `Successfully retrieved new calendar days with product id: ${_productId}`
      );
      _res.status(HttpStatusCodes.OK).json(_calendarDay);
    } catch (err: any) {
      console.error(err);
      _res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send(
          `Unexpected error retrieving calendar day with id: ${_productId}`
        );
    }
  }
);

router.get(
  'calendar-days/day/:id',
  async (
    _req: Request,
    _res: Response<string | Document<IProductCalendarDay>>
  ) => {
    const _calendarDayId: string = _req.params.id;
    try {
      const _calendarDay: Document<IProductCalendarDay> =
        await ProductCalendarDayModel.findOne({
          _id: _calendarDayId,
        })
          .populate('events')
          .populate('product');
      console.log(
        `Successfully retrieved new calendar day with id: ${_calendarDayId}`
      );
      _res.status(HttpStatusCodes.OK).json(_calendarDay);
    } catch (err: any) {
      console.error(err);
      _res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send(
          `Unexpected error retrieving calendar day with id: ${_calendarDayId}`
        );
    }
  }
);

export const productsController = router;
