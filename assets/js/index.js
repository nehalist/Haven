require('../sass/main.scss');

require('bootstrap/dist/js/bootstrap');
require('lunr/lunr');
require('featherlight/release/featherlight.min');

import {Theme} from "./Theme";
import {Search} from "./Search";

(new Theme()).init({
  logoSwitcher: true,
  navbarBgAlpha: true,
  affixSidebar: true,
  featherlight: true
});
(new Search()).init();
