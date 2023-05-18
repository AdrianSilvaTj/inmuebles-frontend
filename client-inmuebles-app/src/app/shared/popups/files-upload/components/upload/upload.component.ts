import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { UploadTaskSnapshot } from 'firebase/storage';

import { Observable, Subject, lastValueFrom } from 'rxjs';

import { finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit, OnDestroy {
  // archivo que esta enviando el cliente
  @Input() file!: File;
  // se dispara cuando se complete la carga del archivo en el servidor
  @Output() completed = new EventEmitter<string>();
  // monitoriara la subida del archivo
  task!: AngularFireUploadTask;

  snapshot$ !: Observable<UploadTaskSnapshot | undefined>;
  // contendra en que porcentaje va la carga
  percentage$!: Observable<number | undefined>;
  // Url del objeto en firebase
  downloadUrl!: string;

  private destroy = new Subject<void>;

  constructor(private storage: AngularFireStorage) {}
  ngOnInit() {
    this.startUpload();
  }

  startUpload(): void {
    // se guardara de la siguiente manera: "image/20231121_mifoto.jpg", "docx/20230415_documento.docx"
    const path = `${this.file.type.split('/')[0]}/${Date.now()}_${this.file.name}`;

    const storageRef = this.storage.ref(path);
    // comienza la subida
    this.task = this.storage.upload(path, this.file);
    // saber el porcentaje en el que va la carga
    this.percentage$ = this.task.percentageChanges();
    // snapshot de la imagen cargandose
    this.snapshot$ = this.task.snapshotChanges() as Observable<UploadTaskSnapshot | undefined>;
    // el pipe estara evaluando la tarea de subida al servidor
    this.snapshot$.pipe(
      takeUntil(this.destroy),
      finalize(async () => {
        const storageRefObservable$ = storageRef.getDownloadURL();
        this.downloadUrl = await lastValueFrom(storageRefObservable$);
        this.completed.next(this.downloadUrl);
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete()
  }

}
