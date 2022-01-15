# Click counter widget example in Vue

### How to add widget to the project

#### 1. Copy widget to project
Copy entire *Click Counter* folder to *paperbits-demo* project, into `src/components` folder.

#### 2. Install Vue packages
In the *paperbits-demo* project, install Vue packages:
```
> npm i vue --save
> npm i vue-loader --save-dev
```
Plus that, install Paperbits Vue integration library:
```
> npm i @paperbits/vue --save
```

#### 3. Register modules
Register *Click Counter* widget modules in respective module files of *paperbits-demo* project:

**demo.design.module.ts**

```
import { VueModule } from "@paperbits/vue/vue.module";
import { ClickCounterDesignModule } from "../components/click-counter/clickCounter.design.module";
...
injector.bindModule(new VueModule());
injector.bindModule(new ClickCounterDesignModule());
```

**demo.publish.module.ts**
```
import { VueModule } from "@paperbits/vue/vue.module";
import { ClickCounterDesignModule } from "../components/click-counter/clickCounter.publish.module";
...
injector.bindModule(new VueModule());
injector.bindModule(new ClickCounterPublishModule());
```

**demo.runtime.module.ts**
```
import { VueModule } from "@paperbits/vue/vue.module";
import { ClickCounterRuntimeModule } from "../components/click-counter/clickCounter.runtime.module";
...
injector.bindModule(new ClickCounterRuntimeModule());
```
#### 5. Adjust build configuration

Add `vue-loader` and `vue$` alias in `./webpack.runtime.js`, `./webpack.design.js` and `./webpack.publish.js` files:
```
const webpackConfig = {
    ...
    module: {
        rules: [
            ...
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
            ...
        ]
    },
    ...
    resolve: {
        ...
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        }
        ...
    }
}
```

#### 4. Run designer locally
```
npm start
```

When the designer starts, you should be able to see the *Click counter* widget in "Add widget" dialog.
