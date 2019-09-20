import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-get',
  templateUrl: './task-get.component.html',
  styleUrls: ['./task-get.component.css']
})
export class TaskGetComponent implements OnInit {

  constructor(private ps: TasksService) {}

  ngOnInit() {
    const data = this.ps.getTask();
    //console.log(data);
  }
}
