import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDropZone]'
})
// ¿Qué es una directiva angular?
// Las directivas son las funciones que se ejecutarán cada vez que el compilador Angular las encuentre.
// Las directivas angulares mejoran la capacidad de los elementos HTML al adjuntar comportamientos personalizados al DOM.

export class DropZoneDirective {
  // elementos soltados en la zona
  @Output() dropped = new EventEmitter<FileList>();
  // detecta cuando el puntero esta encima de la zona
  @Output() hovered = new EventEmitter<boolean>();

  constructor() { }

  // evento dejar caer
  @HostListener('drop', ['$event'])
  onDrop($event:any){
    // $event.preventDefault(); evita que se refresque la pagina
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
  }

  // evento arrastrar a traves de la pantalla
  @HostListener('dragover', ['$event'])
  onDragOver($event:any){
    $event.preventDefault();
    this.hovered.emit(true);
  }

  // evento soltar el arrastre
  @HostListener('dragleave', ['$event'])
  onDragLeave($event:any){
    $event.preventDefault();
    this.hovered.emit(false);
  }

}
