import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { PaperbitsDesignerComponent } from "src/paperbits/designer";

@NgModule({
  declarations: [
    AppComponent,
    PaperbitsDesignerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
