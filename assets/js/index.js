require('../sass/main.scss');

require('bootstrap/dist/js/bootstrap');
require('lunr/lunr');

import {Theme} from "./Theme";
import {Search} from "./Search";

(new Theme()).init({
  logoSwitcher: true,
  navbarBgAlpha: true,
  affixSidebar: true
});
(new Search()).init();
