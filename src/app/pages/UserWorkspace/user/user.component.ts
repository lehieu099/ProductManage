import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface DataItem {
  name: string;
  email: string;
  pNumber: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  addUserForm: FormGroup
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  searchValue = '';
  visible = false;
  listUser: DataItem[] = [
    {
      name: 'John Brown',
      email: 'duyhieu099a2@gmail.com',
      pNumber: '093857214'
    },
    {
      name: 'Duy Hieu',
      email: 'duyhieu099a2@gmail.com',
      pNumber: '093857214'
    }
  ];
  listOfUser = [...this.listUser];

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfUser = this.listUser.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }

  isVisible = false;
  isConfirmLoading = false;


  showModal(): void {
    this.isVisible = true;
    this.addUserForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      pNumber: ['', [Validators.required]]
    });

  }

  handleOk(): void {

    for (const i in this.addUserForm.controls) {
      if (this.addUserForm.controls.hasOwnProperty(i)) {
        this.addUserForm.controls[i].markAsDirty();
        this.addUserForm.controls[i].updateValueAndValidity();
      }
    }
    if (!this.addUserForm.valid) {
      this.isVisible = true;

    } else {
      let count = this.listOfUser.length
      this.listOfUser.push(this.addUserForm.value);

      if(this.listOfUser.length - count >0){
        this.isVisible = false
        window.alert("Tao thanh cong")
        console.log(this.listOfUser);
      }
      else{
        this.isVisible = true
        window.alert("Tao that bai")
      }
    }

  }

  handleCancel(): void {
    this.isVisible = false;
  }
}


