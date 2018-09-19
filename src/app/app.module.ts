import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatIconRegistry, MatInputModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';

import { SidebarComponent } from './sidebar/sidebar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { LocalService } from './services/local/local.service';
import { PipesModule } from './pipes/pipes.module';
import { DetailsPageComponent } from './details-page/details-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { WhatsAppService } from './services/whatsapp/whats-app.service';

const appRoutes: Routes = [
  { path: 'inicio', component: HomePageComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'listar', component: ListPageComponent },
  { path: 'detalhes', component: DetailsPageComponent },
  { path: 'buscar', component: SearchPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomePageComponent,
    ListPageComponent,
    DetailsPageComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    RouterModule.forRoot(appRoutes,
      {
        useHash: true,
        // enableTracing: true
      }),
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    HttpClientModule,
    PipesModule.forRoot(),
  ], providers: [
    LocalService,
    WhatsAppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')); // Or whatever path you placed mdi.svg at
  }

}
