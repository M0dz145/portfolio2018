<script lang="ts">
    import VImage from '@components/common/image/VImage';
    import VWork from '@components/works/VWork';
    import Component from "vue-class-component";
    import Vue from 'vue';
    import Collection from '@modules/collection/Collection';
    import Work from '@modules/work/Work';
    // noinspection TypeScriptCheckImport
    import backspaceImage from '@img/backspace.svg';
    // noinspection TypeScriptCheckImport
    import dragImage from '@img/drag.svg';
    import {scrollBoosterUpdate} from 'scrollbooster'
    import WorksList from './WorksList';
    import HorizontalDraggable from '@modules/view/HorizontalDraggable';

    @Component({
        components: {
            VImage,
            VWork,
            backspaceImage,
            dragImage
        },
        mounted(): void {
            this.horizontalDraggable = new HorizontalDraggable(document.getElementById('works'), this.$refs.draggableContainer.$el);
            this.horizontalDraggable.onUpdate((data: scrollBoosterUpdate) => {
                if (this.$refs.activeWorkDescription) {
                    if (data.position.x < -40 || data.position.x > 60) {
                        this.$refs.activeWorkDescription.classList.add('hide');
                        this.showHandDragHelper = false;
                    } else {
                        this.$refs.activeWorkDescription.classList.remove('hide');
                    }
                }
            });
        },
        beforeDestroy(): void {
            this.horizontalDraggable.destroy();
        }
    })
    export default class VWorks extends Vue {
        public works: Array<Work> = WorksList;
        public workActive: Work = new Collection(this.works).first();
        private removedWorks: Array<Work> = [];
        private horizontalDraggable: HorizontalDraggable;
        private aWorkIsOnFullscreen: boolean = false;
        public showHandDragHelper: boolean = true;

        public selectActiveWork(work: Work): void {
            this.workActive = work;
            this.horizontalDraggable.goToStart();
        }

        public onWorkClick(work: Work): void {
            if (this.horizontalDraggable.getUpdate().dragOffsetPosition.x !== 0) {
                return;
            }

            if (work.id === this.workActive.id || this.workActive.fullscreen) {
                this.aWorkIsOnFullscreen = work.fullscreen = !work.fullscreen;

                const activeWorkDescription = this.$refs.activeWorkDescription as HTMLElement;
                if (this.aWorkIsOnFullscreen) {
                    activeWorkDescription.classList.add('hide');
                    this.horizontalDraggable.pause();
                } else {
                    activeWorkDescription.classList.remove('hide');
                    this.horizontalDraggable.goToStart();
                    this.horizontalDraggable.resume();
                }

                return;
            }

            this.selectActiveWork(work);
            const worksCollection = new Collection(this.works);
            this.removedWorks = worksCollection.getAllBefore(work);
            // Delete all works before the clicked work
            this.works = worksCollection.removeAllBefore(work).toArray();
        }

        public onWorkAfterLeave(): void {
            const worksCollection = new Collection(this.works);
            // Push all deleted works to works array
            this.works = worksCollection.addElements(this.removedWorks).toArray();
            this.removedWorks = [];
        }
    }
</script>

<template>
    <div id="works">
        <div class="activeWorkDescription" ref="activeWorkDescription">
            <h2 class="activeWorkDescription__title">{{ workActive.title }}</h2>
            <span class="activeWorkDescription__text">{{ workActive.description }}</span>

            <div class="activeWorkDescription__iconContainer" :class="{'hide': !showHandDragHelper}">
                <backspaceImage class="activeWorkDescription__icon leftArrow"/>
                <dragImage class="activeWorkDescription__icon hand"/>
                <backspaceImage class="activeWorkDescription__icon rightArrow"/>
            </div>
        </div>

        <transition-group name="work"
                          tag="div"
                          ref="draggableContainer"
                          class="worksContainer"
                          @after-leave="onWorkAfterLeave">
            <VWork v-for="work in works"
                   data-clickable
                   data-draggable
                   :data-index="work.id"
                   @click.native="onWorkClick(work)"
                   :class="{
                       'work--active': workActive.id === work.id
                   }"
                   :fullscreen="work.fullscreen"
                   :key="work.id"
                   :title="work.title"
                   :category="work.category"
                   :description="work.description"
                   :image="work.image"/>
        </transition-group>


        <router-link tag="div"
                     :to="{name: 'home'}"
                     data-clickable
                     class="backspace__button">
            <backspaceImage class="backspace__arrow"/>
            Back
        </router-link>
    </div>
</template>

<style lang="scss">
    @import "Works";
</style>