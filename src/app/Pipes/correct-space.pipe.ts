import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'CorrectSpace'})
export class CorrectSpace implements PipeTransform {
  transform(value: string | Array<string> ): string {
    if(Array.isArray(value)){
      return value.join(', ')
    }

    const transformed = value.split(',')
    if(!transformed.length){
      return value.split(/(\d+)/).join(' ')
    }
    
    return transformed.join(', ')
  }
}