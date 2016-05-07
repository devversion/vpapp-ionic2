import {PipeTransform, Pipe} from "angular2/core";

@Pipe({
  name: 'toIcon'
})
export class ToIconPipe implements PipeTransform {

  transform(value: number, args: any[]): string {
    switch (value) {
      case 1: return "images/ic_find_replace_black_24px.svg";
      case 2: return "images/ic_block_black_24px.svg";
      case 3: return "images/ic_trending_flat_black_24px.svg";
      case 4: return "images/ic_call_merge_black_24px.svg";
      case 5: return "images/ic_timelapse_black_24px.svg";
      default: return "images/ic_help_outline_black_24px.svg";
    }
  }

}