import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GoatInformationComponent } from './goat-information/goat-information.component';
import { GoatComponent } from './goat/goat.component';
import { ChartsModule } from 'ng2-charts';
import {GoatService} from './goat.service';
import {HttpClientModule} from '@angular/common/http';


const appRoutes: Routes = [
  {path: '', component: GoatComponent},
  {path: 'info', component: GoatInformationComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    GoatInformationComponent,
    GoatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    ),
    ChartsModule
  ],
  providers: [GoatService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
