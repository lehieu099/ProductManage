import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgZorroAntdModule} from '../ng-zorro-antd/ng-zorro-antd.module'
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    LayoutComponent
  ],
  exports:[
    NgZorroAntdModule,
    LayoutComponent
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class LayoutModule { }
