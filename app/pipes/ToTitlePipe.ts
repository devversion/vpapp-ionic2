import {PipeTransform, Pipe} from "angular2/core";

@Pipe({
  name: 'toTitle'
})
export class ToTitlePipe implements PipeTransform {

  transform(value: boolean, args: any[]): string {
    switch (value) {
      case 1: return "Vertreten";
      case 2: return "Entfällt";
      case 3: return "Raumänderung";
      case 4: return "Zusammenführung";
      case 5: return "Verschiebung";
      default: return 'Sonstiges'
    }
  }

}