export class Theme {
  constructor() {
    this.$document = $(document);
    this.$navigation = $('.navigation');
    this.$logoContainer = $('.navigation__logo-container');
    this.$logo = $('.header__logo');
    this.$sidebar = $('.sidebar');
    this.initialSidebarWidth = $('.sidebar-container').width();
    this.initialSidebarOffset = this.$sidebar.offset().top;
  }

  init() {
    if (this.$logo.length) {
      this.$document.on("scroll", () => this.logoSwitcher());
      this.logoSwitcher();
    }

    this.$document.on("scroll", () => this.adjustNavigationBgAlpha());
    this.adjustNavigationBgAlpha();

    this.$document.on("scroll", () => this.affixSidebar());
    this.affixSidebar();
  }

  logoSwitcher() {
    const scrollTop = this.$document.scrollTop();
    const padding = (scrollTop > this.$logo.offset().top + this.$logo.height()) ? 0 : '30px';
    this.$logoContainer.css('padding-top', padding);
  }

  adjustNavigationBgAlpha() {
    const scrollTop = this.$document.scrollTop();
    const alpha = scrollTop / $('.header').height();
    this.$navigation.css('background-color', `rgba(9, 10, 11, ${alpha})`);
  }

  affixSidebar() {
    if (this.$sidebar.height() >= this.$document.height()) {
      return;
    }

    const scrollTop = this.$document.scrollTop();
    const offsetTop = this.$navigation.height() + 40;

    if ((scrollTop + offsetTop) < this.initialSidebarOffset) {
      this.$sidebar.css('position', 'initial');
      return;
    }

    this.$sidebar.css('width', this.initialSidebarWidth);
    this.$sidebar.css('position', 'fixed');
    this.$sidebar.css('top', offsetTop);
  }
}
