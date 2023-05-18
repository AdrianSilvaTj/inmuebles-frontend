import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilesUploadComponent } from './files-upload.component';

@Directive({
  selector: '[appFilesUpload]'
})
export class FilesUploadDirective {
  // indica si se permite subir varios archivos a la vez
  @Input() multiple!: boolean;
  // administrar la edición de la imagen
  @Input() crop!: boolean;
  // almacenamiento de las url de las imagenes
  @Output() changed = new EventEmitter<string | string[]>();

  constructor(private dialog: MatDialog) { }

  // HostListener: Decorador usado para escuchar y manejar eventos del DOM
  @HostListener('click', ['event']) onClick(){
    this.openDialog()
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(FilesUploadComponent, {
      width: '550px', height: '500px',
      data: {
        multiple: this.multiple,
        crop: this.crop
      }
    })
    // luego de cerrar la ventana pasara la url de las imagenes a subir
    dialogRef.afterClosed().subscribe((result) => {
          this.changed.emit(result || null);
    })
  }

}
