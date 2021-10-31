import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgZorroAntdModule} from '../ng-zorro-antd/ng-zorro-antd.module'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgZorroAntdModule
  ],
  exports:[
    NgZorroAntdModule
  ]
})
export class LoginModule { }

