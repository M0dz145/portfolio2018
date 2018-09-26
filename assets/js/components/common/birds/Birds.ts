import Vue from "vue";
import BirdsProvider from "@modules/bird/BirdsProvider";
import Component from "vue-class-component";
import './Birds.scss'
import MobileDetect from "@modules/responsive/MobileDetect";

@Component({
    template: `<div id="birds" ref="birds"></div>`,
    mounted() {
        new BirdsProvider(this.$refs.birds, this.getBirdsNumber());
    }
})
export default class Birds extends Vue {
    public getBirdsNumber(): number {
        return MobileDetect.phone() ? 3 : 9;
    }
}