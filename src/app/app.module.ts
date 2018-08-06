import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GoatInformationComponent } from './goat-information/goat-information.component';
import { GoatComponent } from './goat/goat.component';


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
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
