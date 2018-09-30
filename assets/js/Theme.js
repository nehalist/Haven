export class Theme {
  constructor() {
    this.$document = $(document);
    this.$navigation = $('.navigation');
    this.$logoContainer = $('.navigation__logo-container');
    this.$logo = $('.header__logo');
  }

  init() {
    if (this.$logo.length) {
      this.$document.on("scroll", () => this.logoSwitcher());
      this.logoSwitcher();
    }

    this.$document.on("scroll", () => this.adjustNavigationBgAlpha());
    this.adjustNavigationBgAlpha();
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
}
