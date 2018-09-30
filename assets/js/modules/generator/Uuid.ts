export default class Uuid {
    /**
     * Generate a unique uuid using s4
     */
    public static generate(): string {
        return Uuid.s4() + Uuid.s4() + '-' + Uuid.s4() + '-' + Uuid.s4() + '-' + Uuid.s4() + '-' + Uuid.s4() + Uuid.s4() + Uuid.s4();
    }

    /**
     * Create random part of s4 uuid
     */
    private static s4(): string {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
}