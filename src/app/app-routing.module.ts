import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';


const routes: Routes = [

  { path: '',
    component: BaseComponent,
    children:[
      {
        path: '',
        loadChildren: () => import('./views/pages/public/public.module').then(m => m.PublicModule)
      },
      {
        path:'auth',
        loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'apps',
        loadChildren: () => import('./views/pages/apps/apps.module').then(m => m.AppsModule)
      },
      {
        path: 'general',
        loadChildren: () => import('./views/pages/general/general.module').then(m => m.GeneralModule)
      },
    ]
  },

  { path: 'error',
    component: ErrorPageComponent,
    data: {
      type: 404,
      title: 'Page Not Found',
      desc: 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },

  { path: 'error/:type',
    component: ErrorPageComponent
  },

  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule, ]
})
export class AppRoutingModule { }
