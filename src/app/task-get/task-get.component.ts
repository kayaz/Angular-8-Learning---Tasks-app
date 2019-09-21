import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import {NgxIndexedDB} from 'ngx-indexed-db';


@Component({
  selector: 'app-task-get',
  templateUrl: './task-get.component.html',
  styleUrls: ['./task-get.component.css']
})
export class TaskGetComponent implements OnInit {

  db = new NgxIndexedDB('Tasks', 1);
  taskslist;

  constructor(private ps: TasksService) {
  }

  removeTask(id) {
    this.ps.removeTask(id);
  }

  ngOnInit() {
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
  }
}
