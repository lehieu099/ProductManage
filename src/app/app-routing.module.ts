import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
      { path: 'user', loadChildren: () => import('./pages/UserWorkspace/user.module').then(m => m.UserModule) },
      { path: 'product', loadChildren: () => import('./ProductWorkSpace/product.module').then(m => m.ProductModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
