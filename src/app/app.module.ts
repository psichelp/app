import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatIconRegistry } from '@angular/material';
import { MatGridListModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { LocalService } from './services/local/local.service';
import { PipesModule } from './pipes/pipes.module';
import { DetailsPageComponent } from './details-page/details-page.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'inicio', component: HomePageComponent},
  { path: '',   redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'listar', component: ListPageComponent},
  { path: 'detalhes', component: DetailsPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomePageComponent,
    ListPageComponent,
    DetailsPageComponent
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
    HttpClientModule,
    PipesModule.forRoot(),
  ], providers: [LocalService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')); // Or whatever path you placed mdi.svg at
  }

 }
