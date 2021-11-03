import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';

const routes: Routes = [{
  path: '',
  component: WelcomeComponent
}
]

@NgModule({
  imports: [
    CommonModule,
    // WelcomeRoutingModule, 
    RouterModule.forChild(routes)
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
