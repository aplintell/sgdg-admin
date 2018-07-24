import { MenuService } from './../service/menu.service';
import { CategoryService } from './../service/category.service';
import { PagingService } from './../service/paging.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { HeaderAreaComponent } from './header-area/header-area.component';
import { PagingComponent } from './paging/paging.component';
import { LoginComponent } from './login/login.component';
import { GlobalErrorHandler } from '../error/global-error-handler';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MeService } from '../service/me.service';
import { GlobalService } from '../service/global.service';
import { LoginService } from '../service/login.service';
import { HttpModule } from '@angular/http';
import { UserService } from '../service/user.service';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { BrandManagementComponent } from './brand-management/brand-management.component';
import { PermissionService } from '../service/permission.service';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { BrandService } from '../service/brand.service';
import { CustomerService } from '../service/customer.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    UserManagementComponent,
    HeaderAreaComponent,
    PagingComponent,
    LoginComponent,
    CategoryManagementComponent,
    BrandManagementComponent,
    CustomerManagementComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot([
      {
        path: '',
        component: UserManagementComponent
      },
      {
        path: 'user',
        component: UserManagementComponent
      },
      {
        path: 'customer',
        component: CustomerManagementComponent
      },
      {
        path: 'category',
        component: CategoryManagementComponent
      },
      {
        path: 'brand',
        component: BrandManagementComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
    ])
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: GlobalErrorHandler
  },
    GlobalService,
    LoginService,
    UserService,
    CategoryService,
    PagingService,
    PermissionService,
    CustomerService,
    BrandService,
    MenuService,
    MeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
