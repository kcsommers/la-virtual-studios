import { DateHelper, IEvent } from '@la/core';
import { v4 as uuidv4 } from 'uuid';

const _dateModel = new Date();
const _currentYear: number = _dateModel.getFullYear();
const _currentMonth: number = _dateModel.getMonth();
_dateModel.setDate(1);
const _firstDayOfMonth: number = _dateModel.getDate();
_dateModel.setMonth(_currentMonth + 1);
_dateModel.setDate(0);
const _lastDayOfMonth: number = _dateModel.getDate();

const getDates = (): number[] => {
  const _randomDate: number = DateHelper.getRandomDateInRange(
    new Date(_currentYear, _currentMonth, _firstDayOfMonth),
    new Date(_currentYear, _currentMonth, _lastDayOfMonth)
  );
  return [_randomDate];
};

export const dummyEvents: IEvent[] = [
  {
    name: 'Acting class 1',
    blurb: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    description: '',
    coverImage:
      'https://res.cloudinary.com/kcsommers/image/upload/v1636090931/LA%20Virtual%20Studios/acting-coach-2.jpg',
    images: [],
    slots: 1,
    coach: null,
    price: 10000,
    dates: getDates(),
    attendees: [],
    startTime: 1400,
    endTime: 1700,
    _id: uuidv4(),
  },
  {
    name: 'Acting class 2',
    blurb: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    description: '',
    coverImage:
      'https://res.cloudinary.com/kcsommers/image/upload/v1636090931/LA%20Virtual%20Studios/acting-coach-1.jpg',
    images: [],
    slots: 3,
    coach: null,
    price: 10000,
    dates: getDates(),
    attendees: [],
    startTime: 1400,
    endTime: 1700,
    _id: uuidv4(),
  },
  {
    name: 'Acting class 3',
    blurb: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    description: '',
    coverImage:
      'https://res.cloudinary.com/kcsommers/image/upload/v1636090931/LA%20Virtual%20Studios/acting-2.jpg',
    images: [],
    slots: 10,
    coach: null,
    price: 10000,
    dates: getDates(),
    attendees: [],
    startTime: 1400,
    endTime: 1700,
    _id: uuidv4(),
  },
  {
    name: 'Acting class 4',
    blurb: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    description: '',
    coverImage:
      'https://res.cloudinary.com/kcsommers/image/upload/v1636090931/LA%20Virtual%20Studios/acting-4.jpg',
    images: [],
    slots: 10,
    coach: null,
    price: 10000,
    dates: getDates(),
    attendees: [],
    startTime: 1400,
    endTime: 1700,
    _id: uuidv4(),
  },
  {
    name: 'Acting class 5',
    blurb:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum suscipit.',
    description: '',
    coverImage:
      'https://res.cloudinary.com/kcsommers/image/upload/v1636090931/LA%20Virtual%20Studios/acting-5.jpg',
    images: [],
    slots: 10,
    coach: null,
    price: 10000,
    dates: getDates(),
    attendees: [],
    startTime: 1400,
    endTime: 1700,
    _id: uuidv4(),
  },
  {
    name: 'Acting class 6',
    blurb:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum suscipit dolorem aliquid quidem fugiat.',
    description: '',
    coverImage:
      'https://res.cloudinary.com/kcsommers/image/upload/v1636090931/LA%20Virtual%20Studios/acting-3.jpg',
    images: [],
    slots: 10,
    coach: null,
    price: 10000,
    dates: getDates(),
    attendees: [],
    startTime: 1400,
    endTime: 1700,
    _id: uuidv4(),
  },
  {
    name: 'Acting class 4',
    blurb: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    description: '',
    coverImage:
      'https://res.cloudinary.com/kcsommers/image/upload/v1636090931/LA%20Virtual%20Studios/acting-4.jpg',
    images: [],
    slots: 10,
    coach: null,
    price: 10000,
    dates: getDates(),
    attendees: [],
    startTime: 1400,
    endTime: 1700,
    _id: uuidv4(),
  },
  {
    name: 'Acting class 5',
    blurb:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum suscipit.',
    description: '',
    coverImage:
      'https://res.cloudinary.com/kcsommers/image/upload/v1636090931/LA%20Virtual%20Studios/acting-5.jpg',
    images: [],
    slots: 10,
    coach: null,
    price: 10000,
    dates: getDates(),
    attendees: [],
    startTime: 1400,
    endTime: 1700,
    _id: uuidv4(),
  },
  {
    name: 'Acting class 6',
    blurb:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum suscipit dolorem aliquid quidem fugiat.',
    description: '',
    coverImage:
      'https://res.cloudinary.com/kcsommers/image/upload/v1636090931/LA%20Virtual%20Studios/acting-3.jpg',
    images: [],
    slots: 10,
    coach: null,
    price: 10000,
    dates: getDates(),
    attendees: [],
    startTime: 1400,
    endTime: 1700,
    _id: uuidv4(),
  },
];
