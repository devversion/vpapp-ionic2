import {Injectable} from 'angular2/core';

@Injectable()
export class DateUtil {

  formatForBackend(date: Date): string {
    var month = (date.getMonth() + 1).toString();
    var day = date.getDate().toString();

    month = month[1] ? month : '0' + month;
    day = day[1] ? day : '0' + day;

    return `${day}-${month}`;
  }

   getTodayDate(): Date {
    let current = new Date();
    let dayOfWeek = current.getDay();
    let add = 0;

    if (dayOfWeek === 0) add = -2;
    else if (dayOfWeek === 6) add = -1;

    current.setDate(current.getDate() + add);

    return current;
  }

  getTomorrowDate(): Date {
    let current = new Date();
    let dayOfWeek = current.getDay();
    let add = 1;

    if (dayOfWeek === 5) add = 3;
    else if (dayOfWeek === 6) add = 2;

    current.setDate(current.getDate() + add);

    return current;
  }
}