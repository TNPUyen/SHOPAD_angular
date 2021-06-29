import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
// import { SortDirective } from './directive/sort.directive';
// import { ModalModule } from 'ngx-bootstrap/modal';
// import { ShareModule } from './modules/share.module';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    // SortDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    // ModalModule.forRoot(),
    // ShareModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
