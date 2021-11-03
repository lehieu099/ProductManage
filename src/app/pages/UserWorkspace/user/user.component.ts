import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  searchValue = '';
  visible = false;
  listUser: DataItem[] = [
    {
      name: 'John Brown',
      email: 'duyhieu099a2@gmail.com',
      pNumber: '093857214123'
    },
    {
      name: 'Duy Hieu',
      email: 'duyhieu099a2@gmail.com',
      pNumber: '093857214123'
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
  // validateForm: FormGroup;

  
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}


