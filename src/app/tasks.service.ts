import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';

import { NgxIndexedDB } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  db = new NgxIndexedDB('Tasks', 1);
  taskslist;

  constructor(private http: HttpClient, private router: Router) {
    this.db.openDatabase(1, evt => {
      const objectStore = evt.currentTarget.result.createObjectStore('tasklist', {
        keyPath: 'id',
        autoIncrement: true
      });

      objectStore.createIndex('nazwa', 'nazwa', { unique: false });
      objectStore.createIndex('ilosc', 'ilosc', { unique: false });
    });
  }

  addTask(Nazwa, Ilosc) {
    this.db.openDatabase(1).then(() => {
      this.db.add('tasklist', { nazwa: Nazwa, ilosc: Ilosc }).then(
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
    this.db.openDatabase(1).then(() => {
      this.db.getAll('tasklist').then(
        (tasks) => {
          this.taskslist = tasks;
        },
        error => {
          console.log(error);
        }
      );
    });
    return this.taskslist;
  }
  removeTask(id) {
    this.db.openDatabase(1).then(() => {
      this.db.delete('tasklist', id).then(
        () => {
          console.log(id);
          this.router.navigateByUrl('/refresh', {skipLocationChange: true}).then(() => this.router.navigate(['/task']));
        },
        error => {
          console.log(error);
        }
      );
    });
  }
}
