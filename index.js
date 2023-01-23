import {urlToHash} from './url-parser.js';

const urlFormatString = '/:version/api/:collection/:id';

const urlInstanceString = '/6/api/listings/3?sort=desc&limit=10';

const result = urlToHash( urlFormatString, urlInstanceString );

console.table( result );
