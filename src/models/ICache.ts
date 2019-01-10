export default interface ICache {
    readonly value: any;
    readonly expiration: number;
    readonly isExpired?: boolean;
}
