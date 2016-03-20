export class URLEncoder {

  static encode(object: any): string {
    let items = [];

    for (let item in object) {
      if (object.hasOwnProperty(item)) {
        items.push(`${encodeURIComponent(item)}=${encodeURIComponent(object[item])}`);
      }
    }

    return items.join('&');
  }

}