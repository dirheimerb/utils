import { regex } from './regex';
/**
 * Slugger
 * @class Slugger
 * @description Slugger class for generating slugs
 * @version 1.0.0
 * @example const slugger = new Slugger("Hello World");
 * @example const slugger = new Slugger("Hello World", 1);
 * @example const slugger = new Slugger("Hello World", 1, new Map<string, number>());
 */
export default class Slugger {
    /**
     * @private
     * @property {string} _slug
     */
    private _slug: string;
    /**
     * @private
     * @property {number} _occurrences
     */
    private _occurrences: number;
    /**
     * @private
     * @property {Map<string, number>} _map
     */
    private _map: Map<string, number> = new Map<string, number>();
    /**
     * @constructor
     * @param slug<string>
     * @param _occurrences<number>
     * @param map<string, number>
     */
    constructor(
        slug: string = '',
        occurrences: number = 0,
        map: Map<string, number> = new Map<string, number>(),
    ) {
        this._slug = slug;
        this._occurrences = occurrences;
        this._map = map;
        console.log('Slugger class instantiated'); // Debugging line
    }
    /**
     * @public
     * @property {string} slug
     */
    get slug() {
        return this._slug;
    }
    /**
     * @public
     * @property {number} occurrences
     */
    get occurrences() {
        return this._occurrences;
    }
    /**
     * @public
     * @property {Map<string, number>} map
     */
    get map() {
        return this._map;
    }
    /**-
     * @public
     * @property {string} slug
     */
    set slug(slug: string) {
        this._slug = slug;
    }
    /**
     * @public
     * @property {number} occurrences
     */
    set occurrences(occurrences: number) {
        this._occurrences = occurrences;
    }
    /**
     * @public
     * @property {Map<string, number>} mapq
     */
    set map(map: Map<string, number>) {
        this._map = map;
    }
    /**
     * @public
     * @method own
     * @param slug
     * @returns
     */
    own(slug: string = this.slug) {
        const newObject = Object.defineProperty(this, '_slug', {
            value: slug,
            writable: false,
            enumerable: false,
            configurable: false,
        });
        console.log('Exiting own with newObject:', newObject); // Debugging line
        return newObject;
    }
    /**'
     * @public
     * @method lowercase
     * @returns {string}
     * @description sets the slug to lowercase
     */
    lowercase(): string {
        this._slug = this._slug.trim().toLowerCase();
        return this._slug;
    }
    /**
     * @public
     * @method trim
     * @returns {string}
     * @description trims the slug
     */
    trim(): string {
        this._slug = this._slug.trim();
        console.log('Exiting trim with this._slug:', this._slug); // Debugging line
        return this._slug;
    }
    /**
     * @public
     * @method uppercase
     * @returns {string}
     * @description sets the slug to uppercase
     */
    uppercase(): string {
        console.log(
            'Entering uppercase with this._slug:',
            this._slug,
        ); // Debugging line
        this._slug = this._slug.trim().toUpperCase();
        return this._slug;
    }
    /**
     * @public
     * @method capitalize
     * @description sets the slug to capitalize
     * @returns {string}
     */
    capitalize(): string {
        this._slug = this._slug
            .trim()
            .replace(/\w\S*/g, (w) =>
                w.replace(/^\w/, (c) => c.toUpperCase()),
            );

        return this._slug;
    }
    /**
     * @public
     * @method mapit
     * @description maps the slug
     * @returns {void}
     */
    public mapit(): void {
        const map = this._map;
        const slug = this._slug;
        map.set(slug, (map.get(slug) || 0) + 1);
        if (map.has(slug)) {
            this._occurrences = map.get(slug) || 0;
        } else {
            this._occurrences = 0;
        }
    }
    /**
     * @public
     * @async
     * @method slugify
     * @description Slugifies the given string and returns it.
     * @param slugger The string to slugify.
     * @param maintainCase Whether to maintain the case.
     * @returns {Promise<string>} The slugified string.
     */
    public async slugify(
        slugger: string,
        maintainCase: boolean = false,
    ): Promise<string> {
        console.log('Entering slugify with slugger:', slugger); // Debugging line
        if (typeof slugger !== 'string' || slugger === '') return '';
        try {
            this._slug = slugger.trim();
            this.mapit();
            let result: string;
            if (maintainCase) {
                console.log('maintainCase is true');
                result = this._slug
                    .toLowerCase()
                    .replace(regex, '')
                    .replace(/ /g, '-');
            } else {
                console.log('maintainCase is false');
                result = this._slug
                    .toLowerCase()
                    .replace(regex, '')
                    .replace(/ /g, '-');
            }
            console.log('Exiting slugify with result:', result); // Debugging line

            return result;
        } catch (err: any) {
            // Handle error here.
            throw new Error(`Failed to slugify: ${err.message}`);
        }
    }

    /**
     * @public
     * @method reset
     * @description resets the slug
     * @returns {void}
     */
    reset(): void {
        this._slug = '';
        this._occurrences = 0;
        this._map.clear();
    }
}
