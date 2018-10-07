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

  init() {
    if (this.$logo.length || this.$blogTitle.length) {
      this.$window.on("scroll resize", () => this.logoSwitcher());
      this.logoSwitcher();
    }

    this.$window.on("scroll resize", () => this.adjustNavigationBgAlpha());
    this.adjustNavigationBgAlpha();

    this.$window.on("scroll resize", () => this.affixSidebar());
    this.affixSidebar();
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

  isMobile() {
    return !this.$navbarToggler.is(':visible');
  }
}
