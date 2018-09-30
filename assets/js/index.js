require('../sass/main.scss');

require('bootstrap/dist/js/bootstrap');
require('lunr/lunr');
require('./jquery.ghostHunter');

// require('./theme');

import {Theme} from "./Theme";
import {Search} from "./Search";

(new Theme()).init();
(new Search()).init();
