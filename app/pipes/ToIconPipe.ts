import {PipeTransform, Pipe} from "angular2/core";

@Pipe({
  name: 'toIcon'
})
export class ToIconPipe implements PipeTransform {

  transform(value: number, args: any[]): string {
    switch (value) {
      case 1: return "images/ic_find_replace_black_24px.svg";
      case 2: return "images/ic_do_not_disturb_alt_black_24px.svg";
      case 3: return "images/ic_arrow_forward_black_24px.svg";
      case 4: return "images/ic_call_merge_black_24px.svg";
      case 5: return "images/ic_timelapse_black_24px.svg";
      default: return "images/ic_help_outline_black_24px.svg";
    }
  }

}