import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private ps: TasksService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      Nazwa: ['', Validators.required ],
      Ilosc: ['', Validators.required ]
    });
  }

  addTask(Nazwa, Ilosc) {
    this.ps.addTask(Nazwa, Ilosc);
  }

  ngOnInit() {
  }

}
