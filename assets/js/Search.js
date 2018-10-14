export class Search {
  constructor() {
    this.$searchInput = $('#search-input');
    this.$searchResults = $('#search-results');
    this.$searchModal = $('#searchModal');
    this.$searchResultItemTemplate = $('#search-result-item');
    this.results = [];
  }

  init() {
    if (!window.ghost) {
      $('.navigation__toggle-search-button').hide();
      return;
    }

    this.loadPosts();
    this.search();

    this.$searchModal.on('shown.bs.modal', () => this.$searchInput.focus());
    this.$searchInput.keypress(e => {
      if (e.which === 13 && this.results.length > 0) {
        const $result = this.$searchResults.find('li').first();
        $result.find('a')[0].click();
      }
    });
  }

  search() {
    this.$searchInput.on('keyup', $elem => {
      const input = $elem.target.value.trim();

      this.results = (input !== "") ? this.index.search(`${input}*`) : [];
      this.setSearchResults(this.results);
    });
  }

  setSearchResults(results) {
    if (!(results instanceof Array)) {
      return;
    }

    this.$searchResults.children('li').remove();
    results.forEach(result => {
      const post = this.posts.find(post => post.id === result.ref);
      if (post) {
        const template = this.$searchResultItemTemplate.html()
          .replace("%title%", post.title)
          .replace("%primary_tag%", post.primary_tag ? post.primary_tag.name : '')
          .replace("%date%", (new Date(post.created_at)).toLocaleDateString())
          .replace("%url%", post.url)
        ;

        this.$searchResults.append(`${template}`);
      }
    });
  }

  loadPosts() {
    const url = ghost.url.api('posts', {
      include: 'tags',
      limit: 'all',
      order: 'updated_at desc',
      formats: ["plaintext"]
    });
    $.ajax(url)
      .done(data => {
        if (!data.hasOwnProperty('posts') || !(data.posts instanceof Array) || typeof data.posts === 'undefined') {
          return;
        }

        this.posts = data.posts;

        this.index = lunr(function () {
          this.field('title', { boost: 10 });
          this.field('plaintext');

          this.pipeline.remove(lunr.stemmer);
          this.searchPipeline.remove(lunr.stemmer);

          data.posts.forEach(post => {
            this.add(post);
          });
        });
      });
  }
}
