import ICache from '../models/ICache';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import localforage from 'localforage';

export default class CacheService {

    public static readonly SECONDS: string = 'seconds';
    public static readonly MINUTES: string = 'minutes';
    public static readonly HOURS: string = 'hours';
    public static readonly DAYS: string = 'days';

    protected _durationInSeconds: number = 0;
    protected _namespace: string = '';

    public get namespace(): string {
        return this.namespace;
    }

    constructor(durationInSeconds: number = 0, unit: string = CacheService.SECONDS, namespace: string = 'CacheService.') {
        this._namespace = namespace;

        switch (unit) {
            case CacheService.SECONDS:
                this._durationInSeconds = durationInSeconds;
                break;
            case CacheService.MINUTES:
                this._durationInSeconds = durationInSeconds * 60;
                break;
            case CacheService.HOURS:
                this._durationInSeconds = durationInSeconds * 3600;
                break;
            case CacheService.DAYS:
                this._durationInSeconds = durationInSeconds * 86400;
                break;
            default:
                this._durationInSeconds = durationInSeconds;
        }
    }

    public async get(key: string): Promise<ICache> {
        try {
            const {value, expiration}: ICache = await this._getItem(key);
            const hasTimestampExpired: boolean = this._hasTimestampExpired(expiration);

            return {
                value,
                expiration,
                isExpired: this._durationInSeconds === 0 || hasTimestampExpired,
            };
        } catch (error) {
            return this._onError(error);
        }
    }

    public async set(key: string, value: any): Promise<Partial<ICache>> {
        try {
            const todayInMilliseconds: number = this._todayInMilliseconds();

            return this._setItem(key, {value, expiration: todayInMilliseconds});
        } catch (error) {
            return this._onError(error);
        }
    }

    public async remove(key: string): Promise<void> {
        try {
            return this._removeItem(key);
        } catch (error) {
            return this._onError(error);
        }
    }

    public async clearAll(): Promise<void> {
        try {
            let allKeys: string[] = await this._getKeys();

            allKeys = allKeys.filter((key: string) => key.startsWith(this._namespace));

            await Promise.all(
                allKeys.map(async (key: string) => this._removeItem(key))
            );
        } catch (error) {
            return this._onError(error);
        }
    }

    public async hasTimestampExpiredFor(key: string): Promise<boolean> {
        try {
            const {expiration}: ICache = await this._getItem(key);

            return this._hasTimestampExpired(expiration);
        } catch (error) {
            return this._onError(error);
        }
    }

    private _hasTimestampExpired(expiration: number = 0): boolean {
        const timestampInMilliseconds: number = expiration;
        const todayInMilliseconds: number = this._todayInMilliseconds();

        const timestampDifferenceInSeconds: number = differenceInSeconds(todayInMilliseconds, timestampInMilliseconds);
        const timeRemainingInSeconds: number = this._durationInSeconds - timestampDifferenceInSeconds;

        if (timeRemainingInSeconds <= 0) {
            return true;
        }

        return false;
    }

    private _todayInMilliseconds(): number {
        return new Date().getTime();
    }

    private _onError(error: any): null {
        console.log(error);

        return null;
    }

    private _createCacheKey(key: string): string {
        return key.startsWith(this._namespace) ? key : `${this._namespace}${key}`;
    }

    private async _getItem(key: string): Promise<ICache> {
        const cacheKey: string = this._createCacheKey(key);
        const data: ICache = await localforage.getItem(cacheKey);

        return data || {} as any;
    }

    private async _setItem(key: string, value: ICache): Promise<ICache> {
        const cacheKey: string = this._createCacheKey(key);

        return localforage.setItem(cacheKey, value);
    }

    private async _removeItem(key: string): Promise<void> {
        const cacheKey: string = this._createCacheKey(key);

        return localforage.removeItem(cacheKey);
    }

    private async _getKeys(): Promise<string[]> {
        return localforage.keys();
    }

}
