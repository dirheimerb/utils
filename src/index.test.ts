import Slugger from ".";

describe('Slugger', () =>
{
    describe('constructor', () =>
    {
        it('should create an instance with default values', () =>
        {
            const slugger = new Slugger();
            expect(slugger.slug).toBe('');
            expect(slugger.occurrences).toBe(0);
            expect(slugger.map.size).toBe(0);
        });
        it('should create an instance with provided values', () =>
        {
            const slugger = new Slugger('Hello World', 1, new Map([['Hello World', 1]]));
            expect(slugger.slug).toBe('Hello World');
            expect(slugger.occurrences).toBe(1);
            expect(slugger.map.size).toBe(1);
        });
    });

    describe('getters and setters', () =>
    {
        const slugger = new Slugger();
        it('should set and get slug', () =>
        {
            slugger.slug = 'test';
            expect(slugger.slug).toBe('test');
        });


        it('should set and get occurrences', () =>
        {
            slugger.occurrences = 2;
            expect(slugger.occurrences).toBe(2);
        });
    });

    describe('own', () =>
    {
        it('should make slug immutable', () =>
        {
            const slugger = new Slugger('test');
            slugger.own('new');
            expect(() => { slugger.slug = 'change'; }).toThrow();
        });

        it('should make occurrences immutable', () =>
        {
            const slugger = new Slugger('test', 1);
            slugger.own('new');
            expect(() => { slugger.occurrences = 2; });
        });

    });


    describe('Should not be able to change map', () =>
    {
        it('should make map immutable', () =>
        {
            const slugger = new Slugger('test', 1, new Map([['test', 1]]));
            slugger.own('new');
            expect(() => { slugger.map.set('new', 1); });
        });
    });

    describe('Change the case of the slug', () =>
    {
        it('should change the case of the slug', () =>
        {
            const slugger = new Slugger('test');
            slugger.capitalize();
            expect(slugger.slug).toBe('Test');
        });
    });
    describe('slugify', () =>
    {
        it('should slugify a string correctly', async () =>
        {
            const slugger = new Slugger('testslug');
            slugger.slugify('testslug', false);

            expect(slugger.slug).toBe('testslug');
        });
    });

    describe('reset', () =>
    {
        it('should reset slugger to initial state', () =>
        {
            const slugger = new Slugger('test');
            slugger.mapit();
            slugger.reset();
            expect(slugger.slug).toBe('');
            expect(slugger.occurrences).toBe(0);
            expect(slugger.map.size).toBe(0);
        });
        describe('Change the case of the slug to lowercase', () =>
        {
            it('should change the case of the slug to lowercase', () =>
            {
                const slugger = new Slugger('TEST');
                slugger.lowercase();
                expect(slugger.slug).toBe('test');
            });
        });
        describe('own method', () =>
        {
            it('should redefine slug property', () =>
            {
                const slugger = new Slugger('test');
                slugger.own('new');
                expect(slugger.slug).toBe('new');
            });
        });
    });
});