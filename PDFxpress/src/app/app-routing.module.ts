// import { NgModule } from '@angular/core';
// import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// import { LoginComponent } from './sesion/login/login.component';
// import { RegisterComponent } from './sesion/register/register.component';
// import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
// import { TabsPage } from './tabs/tabs.page';

// const routes: Routes = [
//   // {
//   //   path: '',
//   //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule
//   //   )
//   // }
//   { path: '', pathMatch: 'full', redirectTo: '/main' },
//   {
//     path: 'main',
//     component: TabsPage,
//     ...canActivate(() => redirectUnauthorizedTo(['/register']))
//   },
//   { path: 'register', component: RegisterComponent },
//   { path: 'login', component: LoginComponent }
// ];
// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
//   ],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './sesion/login/login.component';
import { TabsPage } from './tabs/tabs.page';
import { RegisterComponent } from './sesion/register/register.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Tab1Page } from './tab1/tab1.page';
import { Tab2Page } from './tab2/tab2.page';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/tabs' },
  {
    path: 'tabs',
    component: TabsPage,
    ...canActivate(() => redirectUnauthorizedTo(['/register'])),
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule),
      },
      {
        path: 'tab2',
        loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule),
      }
    ]
  },
  // {
  //   path: 'tabs/tab1',
  //   component: Tab1Page,
  //   ...canActivate(() => redirectUnauthorizedTo(['/register']))
    
  // },
  // {
  //   path: 'tab2',
  //   component: Tab2Page,
  //   ...canActivate(() => redirectUnauthorizedTo(['/register']))
  // },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }