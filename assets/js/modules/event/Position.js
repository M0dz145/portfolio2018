export default class Position {
    static elementIsInEvent(event, item) {
        const element = {
            x: item.x,
            y: item.y,
            width: item.width || item.w,
            height: item.height || item.h
        };

        return event.clientX >= element.x && event.clientX <= element.x + element.width && event.clientY >= element.y && event.clientY <= element.y + element.height;
    }
}