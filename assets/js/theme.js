$(() => {
  const $document = $(document);
  const $logo = $('.header__logo');
  const $logoContainer = $('.navigation__logo-container');
  const $sidebar = $('.sidebar');
  const $window = $(window);
  const $navigation = $('.navigation');
  const $search = $('.search');
  const $searchInput = $('.search__input');

  const logoSwitcher = () => {
    const scrollTop = $document.scrollTop();
    const padding = (scrollTop > $logo.offset().top + $logo.height()) ? 0 : '30px';
    $logoContainer.css('padding-top', padding);
  };

  const adjustNavigationBgColor = () => {
    const scrollTop = $document.scrollTop();
    const alpha = scrollTop / $('.header').height();
    $navigation.css('background-color', `rgba(9, 10, 11, ${alpha})`);
  };

  $document.on('scroll', adjustNavigationBgColor);
  adjustNavigationBgColor();

  if ($logo.length) {
    $document.on('scroll', logoSwitcher);
    logoSwitcher();
  }

  if ($sidebar.height() < ($window.height() - $navigation.height())) {
    // sidebar
  }

  $searchInput.ghostHunter({
    results: '#search-results',
    onKeyUp: true,
    result_template: '<div class="search__result gh-search-item" id="gh-{{ref}}"><a class="search__result-link" href="{{link}}">{{title}}</a></div>',
    info_template: ''
  });
});
