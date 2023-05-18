// Los pipes son tuberías o canales los cuales son denotados con el carácter |,
// una de las ventajas de utilizarlas es que se pueden usar en toda la aplicación.
// ESe utilizan en los html.
import { Pipe, PipeTransform } from '@angular/core';

const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const FILE_SIZE_UNITS_LONG = ['Bytes', 'Kilobytes', 'Megabytes','Gigabytes','Terabytes','Pettabytes','Exabytes','Zettabytes','Yottabytes']

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  transform(sizeInBytes: number, longForm?: boolean): string {
    const units = longForm
    ? FILE_SIZE_UNITS_LONG
    : FILE_SIZE_UNITS;

    let power = Math.round(Math.log(sizeInBytes)/Math.log(1024));
    power = Math.min(power, units.length - 1);

    const size = sizeInBytes / Math.pow(1024, power);
    const formattedSize = Math.round(size * 100) / 100;
    const unit = units[power];
    return size ? `${formattedSize} ${unit}` : '0';
  }

}
