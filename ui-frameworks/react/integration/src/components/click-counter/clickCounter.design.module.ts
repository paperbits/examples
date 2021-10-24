import { IInjector, IInjectorModule } from "@paperbits/common/injection";
import { ClickCounterHandlers } from "../clickCounterHandlers";
import { ClickCounterModule } from "./clickCounter.module";
import { ClickCounterEditor } from "./clickCounterEditor";

export class ClickCounterDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindModule(new ClickCounterModule());
        injector.bind("clickCounterEditor", ClickCounterEditor);
        injector.bindToCollection("widgetHandlers", ClickCounterHandlers);
    }
}