/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { IInjector, IInjectorModule } from "@paperbits/common/injection";
import { IWidgetService } from "@paperbits/common/widgets";
import { ReactComponentBinder } from "@paperbits/react/bindings";
import { ClickCounter } from "./clickCounter";
import { ClickCounterEditor } from "./clickCounterEditor";
import { ClickCounterHandlers } from "./clickCounterHandlers";
import { ClickCounterModel } from "./clickCounterModel";
import { ClickCounterModelBinder } from "./clickCounterModelBinder";
import { ClickCounterViewModelBinder } from "./clickCounterViewModelBinder";


export class ClickCounterDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("clickCounterEditor", ClickCounterEditor);
        injector.bindToCollection("widgetHandlers", ClickCounterHandlers);
        injector.bind("clickCounter", ClickCounter);
        injector.bindToCollection("modelBinders", ClickCounterModelBinder);
        injector.bindToCollection("viewModelBinders", ClickCounterViewModelBinder);

        const widgetService = injector.resolve<IWidgetService>("widgetService");

        widgetService.registerWidget("click-counter", {
            componentBinder: ReactComponentBinder,
            componentDefinition: ClickCounter,
            modelBinder: ClickCounterModelBinder,
            modelDefinition: ClickCounterModel,
            viewModelBinder: ClickCounterViewModelBinder
        });

        widgetService.registerWidgetEditor("click-counter", {
            displayName: "Click counter",
            componentBinder: ReactComponentBinder,
            componentDefinition: ClickCounterEditor,
            handlerComponent: ClickCounterHandlers,
            iconClass: "widget-icon widget-icon-component"
        });
    }
}