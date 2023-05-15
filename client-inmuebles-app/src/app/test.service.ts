import {
  CollectionReference,
  DocumentData,
  collection,
} from '@firebase/firestore';

import { Firestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokedexFirestoreService {
  private pokemonCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.pokemonCollection = collection(this.firestore, 'pokemon');
  }
}
