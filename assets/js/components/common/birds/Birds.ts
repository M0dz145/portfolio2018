import Vue from "vue";
import BirdsProvider from "@modules/bird/BirdsProvider";
import Component from "vue-class-component";
import './Birds.scss'
import Responsive from "@modules/responsive/Responsive";

@Component({
    template: `<div id="birds" ref="birds"></div>`,
    mounted() {
        new BirdsProvider(this.$refs.birds, this.getBirdsNumber());
    }
})
export default class Birds extends Vue {
    public getBirdsNumber(): number {
        return Responsive.isPhone() ? 3 : 9;
    }
}