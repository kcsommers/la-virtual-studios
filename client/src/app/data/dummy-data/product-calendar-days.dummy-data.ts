import { DateHelper, IProductCalendarDay } from '@la/core';
import { dummyClasses, dummyLocations } from '.';
import { dummyCoaches } from './coaches.dummy-data';
import { dummyProducts } from './products.dummy-data';

const _dateModel = new Date();
const _currentYear: number = _dateModel.getFullYear();
const _currentMonth: number = _dateModel.getMonth();
_dateModel.setDate(1);
const _firstDayOfMonth: number = _dateModel.getDate();
_dateModel.setMonth(_currentMonth + 1);
_dateModel.setDate(0);
const _lastDayOfMonth: number = _dateModel.getDate();

const getDate = (): number => {
  const _randomDate: number = DateHelper.getRandomDateInRange(
    new Date(_currentYear, _currentMonth, _firstDayOfMonth),
    new Date(_currentYear, _currentMonth, _lastDayOfMonth)
  );
  return _randomDate;
};

const _dummies = (_map) => [
  {
    product: _map[Math.floor(Math.random() * _map.length)],
    date: getDate(),
    events: [
      {
        totalSlots: 10,
        coaches: [dummyCoaches[0]],
        attendees: [],
        startTime: 1400,
        endTime: 1700,
        location: dummyLocations[0],
        _id: 'aas90d8fysad67fgsadf88c',
      },
    ],
    _id: '38sa98dfusa87hsdu088c',
  },
  {
    product: _map[Math.floor(Math.random() * _map.length)],
    date: getDate(),
    events: [
      {
        totalSlots: 10,
        coaches: [dummyCoaches[0]],
        attendees: [],
        startTime: 1400,
        endTime: 1700,
        location: dummyLocations[0],
        _id: 'as88sf980asdyf978sd6988c',
      },
    ],
    _id: '38aslkfjhsa87f688c',
  },
  {
    product: _map[Math.floor(Math.random() * _map.length)],
    date: getDate(),
    events: [
      {
        totalSlots: 10,
        coaches: [dummyCoaches[0]],
        attendees: [],
        startTime: 1400,
        endTime: 1700,
        location: dummyLocations[0],
        _id: 'assadasdj0op92834h34ughae088c',
      },
    ],
    _id: '38d1dasd786gsad987h2ae088c',
  },
  {
    product: _map[Math.floor(Math.random() * _map.length)],
    date: getDate(),
    events: [
      {
        totalSlots: 10,
        coaches: [dummyCoaches[0]],
        attendees: [],
        startTime: 1400,
        endTime: 1700,
        location: dummyLocations[0],
        _id: 'assadfsa890d7fyasyudbo2ae088c',
      },
    ],
    _id: '38d1dasfgasdfysade088c',
  },
  {
    product: _map[Math.floor(Math.random() * _map.length)],
    date: getDate(),
    events: [
      {
        totalSlots: 10,
        coaches: [dummyCoaches[0]],
        attendees: [],
        startTime: 1400,
        endTime: 1700,
        location: dummyLocations[0],
        _id: 'asas98egn34734gb2ae088c',
      },
    ],
    _id: '38d1dcea987asd7hb2ae088c',
  },
  {
    product: _map[Math.floor(Math.random() * _map.length)],
    date: getDate(),
    events: [
      {
        totalSlots: 10,
        coaches: [dummyCoaches[0]],
        attendees: [],
        startTime: 1400,
        endTime: 1700,
        location: dummyLocations[0],
        _id: 'assadf88-asdkjhalsk-sadfasa-372bb2ae088c',
      },
    ],
    _id: '38askdjhfasklj-sadfkjh-sadfsa-372bb2ae088c',
  },
  {
    product: _map[Math.floor(Math.random() * _map.length)],
    date: getDate(),
    events: [
      {
        totalSlots: 10,
        coaches: [dummyCoaches[0]],
        attendees: [],
        startTime: 1400,
        endTime: 1700,
        location: dummyLocations[0],
        _id: 'assadf88-99fc-4ffff-b1ce-372bb2ae088c',
      },
    ],
    _id: '38d1dce6-99fc-suhsed-dhdf-372bb2ae088c',
  },
  {
    product: _map[Math.floor(Math.random() * _map.length)],
    date: getDate(),
    events: [
      {
        totalSlots: 10,
        coaches: [dummyCoaches[0]],
        attendees: [],
        startTime: 1400,
        endTime: 1700,
        location: dummyLocations[0],
        _id: 'assadf88-99fc-4ffff-b1ce-as897df9e',
      },
    ],
    _id: '38d1dce6-99fc-4c05-b1ce-2345jkh3l45',
  },
  {
    product: _map[Math.floor(Math.random() * _map.length)],
    date: getDate(),
    events: [
      {
        totalSlots: 10,
        coaches: [dummyCoaches[0]],
        attendees: [],
        startTime: 1400,
        endTime: 1700,
        location: dummyLocations[0],
        _id: 'assadf88-99fc-4ffff-b1ce-372bb2ae088c',
      },
    ],
    _id: '38d1dce6-99fc-4c05-asoi-372bb2ae088c',
  },
  {
    product: _map[Math.floor(Math.random() * _map.length)],
    date: getDate(),
    events: [
      {
        totalSlots: 10,
        coaches: [dummyCoaches[0]],
        attendees: [],
        startTime: 1400,
        endTime: 1700,
        location: dummyLocations[0],
        _id: 'assadf88-99fc-4ffff-b1ce-372bb2ae088c',
      },
    ],
    _id: '38d1dce6-99fc-as87-b1ce-372bb2ae088c',
  },
];

export const dummyProductCalendarDays = (
  _productId: string
): IProductCalendarDay[] => {
  if (!_productId) {
    return _dummies(dummyClasses);
  }
  const _products: { [id: string]: IProductCalendarDay[] } = {
    'e19d2003-7c53-4f79-9844-d2ffc5fe5766': _dummies(dummyProducts),
    '5e98b45e-d0ee-4e24-9f2d-28901d00be0e': _dummies(dummyProducts),
    '39cad259-289a-4614-998c-c6db9854aaae': _dummies(dummyProducts),
    '66bef811-e2b5-41c7-b502-a8dc4b7aba58': _dummies(dummyProducts),
    'c7260689-e62e-4321-a54c-4a9139d0dd7c': _dummies(dummyProducts),
  };
  return _products[_productId];
};
