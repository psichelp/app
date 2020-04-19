import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatIconRegistry, MatInputModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';

// Pages
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

// Pipes
import { PipesModule } from './pipes/pipes.module';

// Services
import { WhatsAppService } from './services/whatsapp/whats-app.service';
import { LocalService } from './services/local/local.service';
import { CadastroEntidadeComponent } from './pages/cadastro-entidade/cadastro-entidade.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialShareComponent } from './src/app/components/social-share/social-share.component';

const appRoutes: Routes = [
  { path: 'inicio', component: HomePageComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'listar', component: ListPageComponent },
  { path: 'detalhes', component: DetailsPageComponent },
  { path: 'buscar', component: SearchPageComponent },
  { path: 'cadastrar', component: CadastroEntidadeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomePageComponent,
    ListPageComponent,
    DetailsPageComponent,
    SearchPageComponent,
    CadastroEntidadeComponent,
    SocialShareComponent
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
    MatOptionModule,
    MatSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    PipesModule.forRoot(),
  ], providers: [
    LocalService,
    WhatsAppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer, localservice: LocalService) {
    localservice.loadEstabelecimentos();
    // tslint:disable-next-line:max-line-length
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')); // Or whatever path you placed mdi.svg at
  }

}
