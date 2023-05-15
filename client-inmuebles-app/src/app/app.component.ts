import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client-inmuebles-app';
  // inicializamos el objeto de Firestore
  constructor(private fs: AngularFirestore) {}

  ngOnInit() {
    // mostarmos los datos de la colección(tabla) 'test'
    this.fs.collection('test').stateChanges().subscribe(personas => {
      console.log(personas.map(x => x.payload.doc.data()));
    })
  }
}
