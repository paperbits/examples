import * as React from "react";
import * as ko from "knockout";

export class Designer extends React.Component {
    private readonly ref = React.createRef<HTMLDivElement>();

    constructor(props) {
        super(props);
    }

    public async componentDidMount(): Promise<void> {
        ko.applyBindingsToNode(this.ref.current, { component: "app" }, null);
    }

    public render(): JSX.Element {
        return (
            <div className="fit" ref={this.ref}></div>
        );
    }
}