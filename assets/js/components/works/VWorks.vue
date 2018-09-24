<script lang="ts">
    import VImage from '@components/common/image/VImage';
    import VWork from '@components/works/VWork';
    import Component from "vue-class-component";
    import Vue from 'vue';
    import Collection from '@modules/collection/Collection';
    import Work from '@modules/work/Work';
    // noinspection TypeScriptCheckImport
    import backspaceImage from '@img/backspace.svg';
    import {scrollBoosterUpdate} from 'scrollbooster'
    import WorksList from './WorksList';
    import HorizontalDraggable from '../../modules/view/HorizontalDraggable';

    @Component({
        components: {
            VImage,
            VWork,
            backspaceImage
        },
        mounted(): void {
            this.horizontalDraggable = new HorizontalDraggable(document.getElementById('works'), this.$refs.draggableContainer.$el);
            this.horizontalDraggable.onUpdate((data: scrollBoosterUpdate) => {
                if (data.position.x < -40 || data.position.x > 60) {
                    this.$refs.activeWorkDescription.classList.add('hide');
                } else {
                    this.$refs.activeWorkDescription.classList.remove('hide');
                }
            });

            this.$refs.draggableContainer.$el.style.width = `${this.$refs.draggableContainer.$el.children[this.$refs.draggableContainer.$el.children.length - 1].offsetLeft + window.innerWidth / 4}px`;
        }
    })
    export default class VWorks extends Vue {
        public works: Array<Work> = WorksList;
        public workActive: Work = new Collection(this.works).first();
        private removedWorks: Array<Work> = [];
        private horizontalDraggable: HorizontalDraggable;
        private aWorkIsOnFullscreen: boolean = false;

        public selectActiveWork(work: Work): void {
            this.workActive = work;
            this.horizontalDraggable.goToStart();
        }

        public unselectActiveWork(): void {
            this.workActive = {} as Work;
        }

        public onWorkClick(work: Work): void {
            if (this.horizontalDraggable.getUpdate().dragOffsetPosition.x !== 0) {
                return;
            }

            if (work.id === this.workActive.id || this.workActive.fullscreen) {
                this.aWorkIsOnFullscreen = work.fullscreen = !work.fullscreen;
                if (this.aWorkIsOnFullscreen) {
                    this.horizontalDraggable.pause();
                } else {
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