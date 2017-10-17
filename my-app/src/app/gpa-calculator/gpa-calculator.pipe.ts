import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'convert' })
export class ExponentialStrengthPipe implements PipeTransform {
    transform(value: any, exponent: string): string {
        switch (exponent) {
            case ("gpa"): {
                return ('DD/MMMM/YYYY');
            }
        }
    }
}