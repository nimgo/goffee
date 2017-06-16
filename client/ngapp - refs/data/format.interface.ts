export class Format {
    static splitTags(tags: string): string[] {
        let t: string[] = [];
        if (tags) {
            t = tags.split(':');
            return t.slice(1, t.length - 1);
        }
        return [];
    }
}