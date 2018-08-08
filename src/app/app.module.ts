import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { DetalhePageModule } from '../pages/detalhe/detalhe.module';
import { HomePage } from '../pages/home/home';
import { LocaisPageModule } from '../pages/locais/locais.module';
import { SearchPageModule } from '../pages/search/search.module';
import { PipesModule } from '../pipes/pipes.module';
import { LocalServiceProvider } from '../providers/local-service/local-service';
import { MyApp } from './app.component';

@NgModule({
  declarations: [MyApp, HomePage],
  imports: [
    BrowserModule,
    LocaisPageModule,
    DetalhePageModule,
    SearchPageModule,
    PipesModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  exports: [],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LocalServiceProvider
  ]
})
export class AppModule {}
