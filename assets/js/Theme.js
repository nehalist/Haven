export class Theme {
  constructor() {
    this.$window = $(window);
    this.$document = $(document);
    this.$navigation = $('.navigation');
    this.$navbarToggler = $('.navbar-toggler');
    this.$logoContainer = $('.navigation__logo-container');
    this.$logo = $('.header__logo');
    this.$blogTitle = $('.header__title');
    this.$sidebar = $('.sidebar');
    this.initialSidebarWidth = $('.sidebar-container').width();
    this.initialSidebarOffset = this.$sidebar.offset().top;
  }

  init(options) {
    options = Object.assign({
      logoSwitcher: true,
      navbarBgAlpha: true,
      affixSidebar: true,
      featherlight: true
    }, options);

    if (options.logoSwitcher) {
      if (this.$logo.length || this.$blogTitle.length) {
        this.$window.on("scroll resize", () => this.logoSwitcher());
        this.logoSwitcher();
      }
    }

    if (options.navbarBgAlpha) {
      this.$window.on("scroll resize", () => this.adjustNavigationBgAlpha());
      this.adjustNavigationBgAlpha();
    }

    if (options.affixSidebar) {
      this.$window.on("scroll resize", () => this.affixSidebar());
      this.affixSidebar();
    }

    if (options.featherlight) {
      this.enableFeatherlight();
    }

    this.setGalleryRatio();
  }

  logoSwitcher() {
    if (this.isMobile()) {
      return;
    }

    const scrollTop = this.$document.scrollTop();
    const $ref = this.$logo.length ? this.$logo : this.$blogTitle;
    const padding = (scrollTop > $ref.offset().top + $ref.height()) ? 0 : '30px';
    this.$logoContainer.css('padding-top', padding);
  }

  adjustNavigationBgAlpha() {
    const scrollTop = this.$document.scrollTop();
    const alpha = this.isMobile() ? 1 : scrollTop / $('.header').height();
    this.$navigation.css('background-color', `rgba(9, 10, 11, ${alpha})`);
  }

  affixSidebar() {
    if (this.$sidebar.height() >= this.$document.height()) {
      return;
    }

    const scrollTop = this.$document.scrollTop();
    const offsetTop = this.$navigation.height() + 40;

    if ((scrollTop + offsetTop) < this.initialSidebarOffset || this.isMobile()) {
      this.$sidebar.css('position', 'initial');
      return;
    }

    this.$sidebar.css('width', this.initialSidebarWidth);
    this.$sidebar.css('position', 'fixed');
    this.$sidebar.css('top', offsetTop);
  }

  setGalleryRatio() {
    $('.kg-gallery-image img').each(function() {
      const $image = $(this);
      const $container = $(this).closest('.kg-gallery-image');
      const width = $image.width();
      const height = $image.height();
      const ratio = width / height;
      $container.css('flex', `${ratio} 1 0%`);
    });
  }

  enableFeatherlight() {
    $(".kg-gallery-image img, .post__content img").each(function() {
      var $this = $(this);
      var src = $this.attr('src');
      var a = $('<a/>').attr('href', src).addClass('lightbox');
      $this.wrap(a);
    });

    $("a.lightbox").featherlight({
      closeOnClick: 'anywhere'
    });
  }

  isMobile() {
    return this.$navbarToggler.is(':visible');
  }
}
