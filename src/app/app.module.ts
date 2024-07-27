import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicComponent } from './components/public/public.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    ProtectedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
