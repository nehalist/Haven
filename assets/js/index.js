require('../sass/main.scss');

require('bootstrap/dist/js/bootstrap');
require('lunr/lunr');
require('featherlight/release/featherlight.min');

import {Theme} from "./Theme";
import {Search} from "./Search";

import Prism from 'prismjs';
Prism.highlightAll();

(new Theme()).init({
  logoSwapper: true,
  navbarBgAlpha: true,
  affixSidebar: true,
  featherlight: true
});
(new Search()).init();
