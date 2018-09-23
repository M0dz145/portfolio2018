import Vue from "vue";
import BirdsProvider from "@modules/bird/BirdsProvider";
import Component from "vue-class-component";
import './Birds.scss'

@Component({
    template: `<div id="birds" ref="birds"></div>`,
    mounted() {
        new BirdsProvider(this.$refs.birds);
    }
})
export default class Birds extends Vue {
}