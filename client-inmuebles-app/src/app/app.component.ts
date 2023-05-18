import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { NotificationService } from '@app/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showSpinner = false;
  title = 'client-inmuebles-app';
  // inicializamos el objeto de Firestore
  constructor(
    private fs: AngularFirestore,
    private notification: NotificationService
    ) {}

  ngOnInit() {
    // mostarmos los datos de la colección(tabla) 'test'
    this.fs.collection('test').stateChanges().subscribe(personas => {
      console.log(personas.map(x => x.payload.doc.data()));
    })
  }

  onToggleSpinner(){
    //cambia el estado del spinner
    this.showSpinner =!this.showSpinner;
  }

  onFilesChanged(urls: string | string[]) : void {
    console.log('urls', urls);

  }

  onSuccess() : void {
    this.notification.success("El procedimiento fue exitoso");
  }
  onError() : void {
    this.notification.error("Se encontraron errores en el proceso");
  }

}
