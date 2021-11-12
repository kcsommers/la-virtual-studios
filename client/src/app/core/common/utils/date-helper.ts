export namespace DateHelper {
  export const getRandomDate = (): number => {
    return new Date(Math.random() * new Date().getTime()).getTime();
  };

  export const getRandomDateInRange = (
    startDate: Date,
    endDate: Date
  ): number => {
    const _diff: number = endDate.getTime() - startDate.getTime();
    return new Date(Math.random() * _diff + startDate.getTime()).getTime();
  };

  export const MONTHS: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  export const MONTHS_ABREVIATED: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  export const DAYS: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  export const DAYS_ABREVIATED: string[] = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ];
}
