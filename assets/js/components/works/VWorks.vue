<script lang="ts">
    import VImage from '@components/common/image/VImage';
    import VWork from '@components/works/VWork';
    import Component from "vue-class-component";
    import Vue from 'vue';
    import Collection from '@modules/collection/Collection';
    import Work from '@modules/work/Work';
    // noinspection TypeScriptCheckImport
    import backspaceImage from '@img/backspace.svg';

    @Component({
        components: {
            VImage,
            VWork,
            backspaceImage
        }
    })
    export default class VWorks extends Vue {
        public works: Array<Work> = [
            new Work(1,
                'Elkyos',
                'Visual redesign',
                `Elkyos is an MMORPG project based on a fantastic medieval universe with a slight touch of steampunk. Formerly in charge of all the graphic aspect of the site, I had to leave the project early after my 11th version.`,
                require('@img/works/elkyos.jpg')
            ),
            new Work(2,
                'Nicolas Chevalier',
                'Portfolio',
                `Portfolio of Nicolas Chevalier, a young application developer, but also my older brother. With his ideas, and my desire for a clear/pure design, I was able to develop the graphic aspect of the site.`,
                require('@img/works/nicolasChevalier.jpg')
            ),
            new Work(3,
                'Immobilis',
                'Commercial website',
                `Immobilis is a project designed by 3 people in the school year of high school. This site lists all real estate ads previously created by apartment / house owners... I developed the whole graphic aspect of the site and a very large part of its functionalities.`,
                require('@img/works/immobilis.jpg')
            ),
            new Work(4,
                'Lowpoly Portrait',
                'Paint',
                `My personal portrait in lowpoly created in Photoshop.`,
                require('@img/works/paint/lowpoly_me.jpg')
            ),
            new Work(5,
                'Lowpoly Lion',
                'Paint',
                `A lion in lowpoly created in Photoshop.`,
                require('@img/works/paint/lowpoly_lion.jpg')
            ),
            new Work(6,
                'Deer',
                'Paint',
                `Unfinished drawing of a deer on a hill, hand drawn.`,
                require('@img/works/paint/cerf1.jpg')
            ),
            new Work(7,
                'Deer',
                'Paint',
                `Drawing of a deer, hand drawn.`,
                require('@img/works/paint/cerf2.jpg')
            ),
            new Work(8,
                'Eye',
                'Paint',
                `Unfinished drawing of a deer on a hill, hand drawn.`,
                require('@img/works/paint/eye.jpg')
            ),
        ];
        public workActive: Work = new Collection(this.works).first();
        private removedWorks: Array<Work> = [];

        public onWorkClick(work: Work): void {
            if (work.id === this.workActive.id || this.workActive.fullscreen) {
                work.fullscreen = !work.fullscreen;
                return;
            }

            this.workActive = work;
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
        <div class="activeWorkDescription">
            <h2 class="activeWorkDescription__title">{{ workActive.title }}</h2>
            <span class="activeWorkDescription__text">{{ workActive.description }}</span>
        </div>

        <transition-group name="work"
                          tag="div"
                          @after-leave="onWorkAfterLeave">
            <VWork v-for="work in works"
                   data-clickable
                   :data-index="work.id"
                   @click.native="onWorkClick(work)"
                   :class="{
                       'work--active': workActive.id === work.id,
                       'work--fullscreen': workActive.fullscreen
                   }"
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