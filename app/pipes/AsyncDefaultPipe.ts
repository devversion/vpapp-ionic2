import {PipeTransform, Pipe} from "angular2/core";

@Pipe({
  name: 'asyncDefault'
})
export class AsyncDefaultPipe implements PipeTransform {

  transform(value: any[], args: any[]): any {
    return value && value.length ? value : args[0];
  }

}