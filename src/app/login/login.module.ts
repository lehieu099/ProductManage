import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroAntdModule } from '../ng-zorro-antd/ng-zorro-antd.module'
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';


const routes: Routes = [{
  path: '',
  component: LoginComponent
}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    NgZorroAntdModule
  ]
})
export class LoginModule { }

