import RoundCursor from "@modules/animation/cursor/RoundCursor";

export default {
    // When the bound element is inserted into the DOM...
    inserted(el) {
        new RoundCursor().addEventsClickableElements(el);
    },
    unbind() {
        new RoundCursor().destroyEvents();
    }
}