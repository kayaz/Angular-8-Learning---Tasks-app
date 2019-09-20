import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';

import { NgxIndexedDB } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient, private router: Router) { }

  addTask(Nazwa, Ilosc) {
    const db = new NgxIndexedDB('Tasks', 1);
    const obj = {
      Nazwa,
      Ilosc
    };
    console.log(obj);

    db.openDatabase(1, evt => {
      const objectStore = evt.currentTarget.result.createObjectStore('tasklist', { keyPath: 'id', autoIncrement: true });

      objectStore.createIndex('nazwa', 'nazwa', { unique: false });
      objectStore.createIndex('ilosc', 'ilosc', { unique: false });
    });

    db.openDatabase(1).then(function() {
      db.add('tasklist', { nazwa: Nazwa, ilosc: Ilosc }).then(
        () => {
          this.router.navigate(['task']);
        },
        error => {
          console.log(error);
        }
      );
    });
  }
  getTask() {
    const db = new NgxIndexedDB('Tasks', 1);

    db.openDatabase(1, evt => {
      const objectStore = evt.currentTarget.result.createObjectStore('tasklist', { keyPath: 'id', autoIncrement: true });

      objectStore.createIndex('nazwa', 'nazwa', { unique: false });
      objectStore.createIndex('ilosc', 'ilosc', { unique: false });
    });

    db.openDatabase(1).then(function() {
      db.getAll('tasklist').then(
        tasks => {
          return tasks;
        },
        error => {
          console.log(error);
        }
      );
    });
  }
}
