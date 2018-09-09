import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';



import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { LocalService } from './services/local/local.service';
import { PipesModule } from './pipes/pipes.module';


const appRoutes: Routes = [
  { path: 'inicio', component: HomePageComponent},
  { path: '',   redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'listar', component: ListPageComponent},
  { path: 'third-page', component: AppComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomePageComponent,
    ListPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    RouterModule.forRoot(appRoutes,
      { enableTracing: true } ),
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    PipesModule.forRoot(),
  ], providers: [LocalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
