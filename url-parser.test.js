import { urlToHash } from "./url-parser";

describe('url-parser', () => {
    describe('urlToHash', () => {
        it('should match assignment', () => {
            const urlFormatString = '/:version/api/:collection/:id';
            const urlInstanceString = '/6/api/listings/3?sort=desc&limit=10';
            const result = urlToHash( urlFormatString, urlInstanceString );
            const expectedResult = {
                version: '6',
                collection: 'listings',
                id: '3',
                sort: 'desc',
                limit: '10'
            }
            expect( result ).toEqual( expectedResult );
        });
        it('should work with no search params', () => {
            const urlFormatString = '/:version/api/:collection/:id';
            const urlInstanceString = '/6/api/listings/3';
            const result = urlToHash( urlFormatString, urlInstanceString );
            const expectedResult = {
                version: '6',
                collection: 'listings',
                id: '3'
            }
            expect( result ).toEqual( expectedResult );
        });
        it('should work with no variable path params', () => {
            const urlFormatString = '/api/listings';
            const urlInstanceString = '/api/listings?sort=desc&limit=10';
            const result = urlToHash( urlFormatString, urlInstanceString );
            const expectedResult = {
                sort: 'desc',
                limit: '10'
            }
            expect( result ).toEqual( expectedResult );
        });
        it('should work with no constant path params', () => {
            const urlFormatString = '/:version/:collection/:id';
            const urlInstanceString = '/6/listings/3?sort=desc&limit=10';
            const result = urlToHash( urlFormatString, urlInstanceString );
            const expectedResult = {
                version: '6',
                collection: 'listings',
                id: '3',
                sort: 'desc',
                limit: '10'
            }
            expect( result ).toEqual( expectedResult );
        });
        it('should work with no path params or search params', () => {
            const urlFormatString = '/api/listings';
            const urlInstanceString = '/api/listings';
            const result = urlToHash( urlFormatString, urlInstanceString );
            const expectedResult = {}
            expect( result ).toEqual( expectedResult );
        });
        it('should work with null valued search params', () => {
            const urlFormatString = '/api/listings';
            const urlInstanceString = '/api/listings?sort=desc&limit=';
            const result = urlToHash( urlFormatString, urlInstanceString );
            const expectedResult = {
                sort: 'desc',
                limit: ''
            }
            expect( result ).toEqual( expectedResult );
        });
    });
});
