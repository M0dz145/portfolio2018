import {createDecorator} from 'vue-class-component'

export const Render = createDecorator((options) => {
    // component options should be passed to the callback
    // and update for the options object affect the component
    console.warn(options.name);
    options.template = `${options.name}`;
});