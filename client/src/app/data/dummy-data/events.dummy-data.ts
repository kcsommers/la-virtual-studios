import { DateHelper, IEvent } from '@la/core';

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
    _id: '38d1dce6-99fc-4c05-b1ce-372bb2ae088c',
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
    _id: '8289b59d-eb47-421e-a50f-92ef62abfddf',
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
    _id: 'e931fced-ef3d-4e6b-9407-05c441089637',
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
    _id: '97ce94b6-c95c-47b7-b191-7708f2db3b53',
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
    _id: '8e9f9f56-a8d2-4be4-875c-db651be295f7',
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
    _id: 'c08faa54-de5a-4112-a072-ff099b50f6a7',
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
    _id: '0b35cf1a-e085-4d64-b8ee-4cfba48a5564',
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
    _id: '24fe7247-37e3-4fc1-a741-d4a03c910dd0',
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
    _id: '8f5c14f0-c499-4a59-aed7-f1e226783630',
  },
];
