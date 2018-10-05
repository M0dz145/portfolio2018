<script lang="ts">
    import Component from 'vue-class-component';
    import Vue from 'vue';
    import SwipeDetection from '../../modules/gesture/SwipeDetection';
    import CloseHandHelper from "./CloseHandHelper";

    @Component({
        components: {
            CloseHandHelper
        },
        data: () => ({
            active: null
        }),
        mounted(): void {
            const swipeDetection = this.swipeDetection as SwipeDetection;
            swipeDetection.onSwipeDown(() => this.active = null);
        },
        beforeDestroy(): void {
            const swipeDetection = this.swipeDetection as SwipeDetection;
            swipeDetection.destroyEvents();
        }
    })
    export default class VHomeMobile extends Vue {
        private swipeDetection: SwipeDetection = new SwipeDetection(document);
        public birth: number = Math.abs(new Date().getUTCFullYear() - 1996);
    }
</script>

<template>
    <ul id="mobileMenu"
        :class="{'itemActive': active !== null}">
        <li class="mobileMenu__item"
            @click="active = 'about'"
            :class="{'active': active === 'about'}">
            About

            <div class="section">
                <p>
                    My name is Xavier Chevalier, a young web developer of {{ birth }} years old.
                    I have been developing applications, interfaces and websites for several years now...
                </p>
                <p>
                    If you have any questions or suggestions about this site and its creation you can of course contact me :)
                </p>

                <CloseHandHelper/>
            </div>
        </li>
        <router-link tag="li"
                     class="mobileMenu__item"
                     @click="active = 'works'"
                     :to="{name: 'works'}">
            Works
        </router-link>
        <li class="mobileMenu__item"
            @click="active = 'contact'"
            :class="{'active': active === 'contact'}">
            Contact

            <div class="section">
                <p>A site project in mind, and you want to make it a reality?</p>
                <p>You can contact me at the following address</p>

                <a class="emailAddress" href="mailto:webmaster@chevalier-xavier.fr">webmaster@chevalier-xavier.fr</a>

                <CloseHandHelper/>
            </div>
        </li>
    </ul>
</template>

<style lang="scss">
    @import "HomeMobile";
</style>
