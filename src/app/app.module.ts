import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, UntypedFormBuilder } from "@angular/forms";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {LogUpdateComponent} from "./log-update/log-update.component";
import { StoreModule } from '@ngrx/store';
import { counterReducer } from "./counter.reducer";
import { MyCounterComponent } from "./my-counter/my-counter.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {booksReducer} from "./state/books.reducer";
import {collectionReducer} from "./state/collection.reducer";
import {BookListComponent} from "./book-list/book-list.component";
import {BookCollectionComponent} from "./book-collection/book-collection.component";
import {HttpInterceptorService} from "./http-interceptor.service";


@NgModule({
  declarations: [
    AppComponent,
    MyCounterComponent,
    BookListComponent,
    BookCollectionComponent
  ],
  imports: [
    HttpClientModule,

    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    StoreModule.forRoot({count: counterReducer, books: booksReducer, collection: collectionReducer})
  ],
  providers: [UntypedFormBuilder, LogUpdateComponent, {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
