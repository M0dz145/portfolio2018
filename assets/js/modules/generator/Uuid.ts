export default class Uuid {
    public static generate(): string {
        return Uuid.s4() + Uuid.s4() + '-' + Uuid.s4() + '-' + Uuid.s4() + '-' + Uuid.s4() + '-' + Uuid.s4() + Uuid.s4() + Uuid.s4();
    }

    private static s4(): string {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
}