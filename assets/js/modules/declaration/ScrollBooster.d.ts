declare module 'scrollbooster' {
    export interface scrollBoosterConfiguration {
        viewport?: Element | HTMLElement;
        content?: Element | HTMLElement;
        handle?: Element | HTMLElement;
        bounce?: boolean;
        textSelection?: boolean;
        friction?: number;
        bounceForce?: number;
        emulateScroll?: boolean;
        onUpdate?: Function;
        onClick?: Function;
        shouldScroll?: Function;
    }

    export interface Position {
        x: number;
        y: number;
    }

    export interface Volume {
        width: number;
        height: number;
    }

    export interface scrollBoosterUpdate {
        dragOffsetPosition: Position;
        position: Position;
        content: Volume;
        viewport: Volume;
        isDragging: boolean;
        isRunning: boolean;
        isScrolling: boolean;
    }

    export class ScrollBooster {
        constructor(config?: scrollBoosterConfiguration);

        public setPosition(position: Position): void;

        public updateMetrics(): void;

        public getUpdate(): scrollBoosterUpdate;

        public destroy(): void;
    }

    export default ScrollBooster;
}