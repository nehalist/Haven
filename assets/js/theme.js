$(() => {
  const $document = $(document);
  const $logo = $('.header__logo');
  const $logoContainer = $('.navigation__logo-container');

  const logoSwitcher = () => {
    const scrollTop = $document.scrollTop();
    const padding = (scrollTop > $logo.offset().top + $logo.height()) ? 0 : '30px';
    $logoContainer.css('padding-top', padding);
  };

  if ($logo.length) {
    $document.on('scroll', logoSwitcher);
    logoSwitcher();
  }
});
