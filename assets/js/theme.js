$(() => {
  const adjustNavbarBgColor = () => {
    const scrollTop = $('html').scrollTop();
    const header    = $('.header');
    const alpha     = scrollTop / header.height();

    $('.navbar').css('background-color', `rgba(52, 58, 64, ${alpha}`);
  };

  $(document).on('scroll', adjustNavbarBgColor);
  $(document).on('load', adjustNavbarBgColor);
});
