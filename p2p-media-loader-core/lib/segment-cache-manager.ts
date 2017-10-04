import {EventEmitter} from "events";
import SegmentInternal from "./segment-internal";

export enum SegmentCacheManagerEvents {
    CacheUpdated = "cache_updated"
}

export class SegmentCacheManager extends EventEmitter {

    private segments: Map<string, SegmentInternal> = new Map();

    public get(key: string): SegmentInternal | undefined {
        return this.segments.get(key);
    }

    public has(key: string): boolean {
        return this.segments.has(key);
    }

    public set(key: string, value: SegmentInternal): void {
        this.segments.set(key, value);
        this.emit(SegmentCacheManagerEvents.CacheUpdated);
    }

    public keys(): Array<string> {
        return Array.from(this.segments.keys());
    }

    public delete(keys: string[]): void {
        keys.forEach(key => this.segments.delete(key));
        this.emit(SegmentCacheManagerEvents.CacheUpdated);
    }

    public destroy(): void {
        this.segments.clear();
    }

    public forEach(callbackfn: (value: SegmentInternal, key: string, map: Map<string, SegmentInternal>) => void, thisArg?: any): void {
        this.segments.forEach(callbackfn, thisArg);
    }

    public updateLastAccessed(key: string): void {
        const segment = this.get(key);
        if (segment) {
            segment.lastAccessed = new Date().getTime();
        }
    }

}
