# Click counter widget example in React

### How to add widget to the project

#### 1. Copy widget to project
Copy entire *Click Counter* folder to *paperbits-demo* project, into `src/components` folder.

#### 2. Install React packages
In the *paperbits-demo* project, install React packages:
```
> npm i react react-dom --save
> npm i @types/react --save-dev
```
Plus that, install Paperbits React integration library:
```
> npm i @paperbits/react --save
```

#### 3. Register modules
Register *Click Counter* widget modules in respective module files of *paperbits-demo* project:

**demo.design.module.ts**

```
import { ReactModule } from "@paperbits/react/react.module";
import { ClickCounterDesignModule } from "../components/click-counter/clickCounter.design.module";
...
injector.bindModule(new ReactModule());
injector.bindModule(new ClickCounterDesignModule());
```

**demo.publish.module.ts**
```
import { ReactModule } from "@paperbits/react/react.module";
import { ClickCounterDesignModule } from "../components/click-counter/clickCounter.publish.module";
...
injector.bindModule(new ReactModule());
injector.bindModule(new ClickCounterPublishModule());
```

**demo.runtime.module.ts**
```
import { ReactModule } from "@paperbits/react/react.module";
import { ClickCounterRuntimeModule } from "../components/click-counter/clickCounter.runtime.module";
...
injector.bindModule(new ReactModule());
injector.bindModule(new ClickCounterRuntimeModule());
```

#### 4. Run designer locally
```
npm start
```

When the designer starts, you should be able to see the *Click counter* widget in "Add widget" dialog.
