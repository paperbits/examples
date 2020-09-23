import * as ReactDOM from "react-dom";
import { createElement } from "react";

export interface ComponentConfig {
    selector: string;
}

export function RuntimeComponent(config: ComponentConfig): (target: any) => void {
    return (target) => {
        class RuntimeComponentProxy extends HTMLElement {
            constructor() {
                super();
            }

            public connectedCallback(): void {
                const element = <HTMLElement>this;
                const reactElement = createElement(target);

                ReactDOM.render(reactElement, element);
            }

            public disconnectedCallback(): void {
                // Not implemented
            }
        }

        customElements.define(config.selector, RuntimeComponentProxy);
    };
}