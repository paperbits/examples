import * as ko from "knockout";
import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";

@Component({
    selector: "paperbits",
    template: `<div class="fit" #ref></div>`
})
export class PaperbitsDesignerComponent implements OnInit {
    @ViewChild("ref", { static: true })
    public ref: ElementRef;

    public async ngOnInit(): Promise<void> {
        setImmediate(() => {
            ko.applyBindingsToNode(this.ref.nativeElement, { component: "app" }, null);
        });
    }
}
