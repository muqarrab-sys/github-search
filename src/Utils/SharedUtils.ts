import { formatDistance } from 'date-fns';

export default class SharedUtils {
  static NumberFormat(number: number) {
    return Intl.NumberFormat('en', { notation: 'compact' }).format(number);
  }

  static elapsedTime(start: Date, end: Date) {
    return formatDistance(start, end);
  }
}
