$(() => {
  const $document = $(document);
  const $logo = $('.header__logo');
  const $logoContainer = $('.navigation__logo-container');

  const logoSwitcher = () => {
    const scrollTop = $document.scrollTop();
    const padding = (scrollTop > $logo.offset().top + $logo.height()) ? 0 : '30px';
    $logoContainer.css('padding-top', padding);
  };

  const adjustNavigationBgColor = () => {
    const scrollTop = $document.scrollTop();
    const alpha     = scrollTop / $('.header').height();

    $('.navigation').css('background-color', `rgba(9, 10, 11, ${alpha})`);
  };

  if ($logo.length) {
    $document.on('scroll', logoSwitcher);
    logoSwitcher();
  }

  $document.on('scroll', adjustNavigationBgColor);
  adjustNavigationBgColor();
});
