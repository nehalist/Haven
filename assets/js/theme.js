$(() => {
  const $document      = $(document);
  const $navigation    = $('.navbar');
  const $header        = $('.header');
  const $logo          = $('.header__logo');
  const $navLogo       = $('.navigation__logo');
  const $logoContainer = $('.navigation__logo-container');

  const adjustNavigationBgColor = () => {
    const scrollTop = $document.scrollTop();
    const alpha     = scrollTop / $header.height();

    $navigation.css('background-color', `rgba(52, 58, 64, ${alpha})`);
  };

  const logoSwitcher = () => {
    const scrollTop = $document.scrollTop();
    const padding = (scrollTop > $logo.offset().top + $logo.height()) ? 0 : '30px';
    $logoContainer.css('padding-top', padding);
  };

  $document.on('scroll load', logoSwitcher);

  $document.on('scroll load', adjustNavigationBgColor);
});
