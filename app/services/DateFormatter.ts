export class DateFormatter {

  static formatForBackend(date: Date): string {
    var month = (date.getMonth() + 1).toString();
    var day = date.getDate().toString();

    month = month[1] ? month : '0' + month;
    day = day[1] ? day : '0' + day;

    return `${day}-${month}`;
  }

}