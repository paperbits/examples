import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { ClickCounterViewModel } from "./design/clickCounterViewModel";
import { ClickCounterModelBinder } from "./clickCounterModelBinder";
import { ClickCounterViewModelBinder } from "./design/clickCounterViewModelBinder";


export class ClickCounterModule implements IInjectorModule {
    public register(injector: IInjector): void {        
        injector.bind("clickCounter", ClickCounterViewModel);
        injector.bindToCollection("modelBinders", ClickCounterModelBinder);
        injector.bindToCollection("viewModelBinders", ClickCounterViewModelBinder);
    }
}