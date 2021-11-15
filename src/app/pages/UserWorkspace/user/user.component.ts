import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

interface DataItem {
  id: number;
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
  constructor(private fb: FormBuilder, private router: Router, private modalService: NzModalService) { }

  ngOnInit(): void {
  }

  searchValue = '';
  visible = false;
  listUser: DataItem[] = [
    {
      id: 0,
      name: 'John Brown',
      email: 'John@gmail.com',
      pNumber: '0123456689'
    },
    {
      id: 1,
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

  showDelete(id: number): void {
    this.modalService.confirm({
      nzTitle: 'Do you want to delete these item?',
      nzContent: 'Delete?',
      nzOnOk: () => {
          console.log('test');
      }
    });
  }

  showEdit(id: number) {
    console.log(id)
    console.log(this.listOfUser[id])
    this.isVisible = true;
    this.addUserForm = this.fb.group({
      userName: [this.listOfUser[id].name],
      email: [this.listOfUser[id].email],
      pNumber: [this.listOfUser[id].pNumber]
    })
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

      if (this.listOfUser.length - count > 0) {
        this.isVisible = false
        window.alert("Tao thanh cong")
        console.log(this.listOfUser);
      }
      else {
        this.isVisible = true
        window.alert("Tao that bai")
      }
    }

  }

  handleCancel(): void {
    this.isVisible = false;
  }
}


