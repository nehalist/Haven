export class Search {
  constructor() {
    this.$searchInput = $('#search-input');
    this.$searchResults = $('#search-results');
    this.cache = false;
  }

  init() {
    this.loadPosts();
    this.search();
  }

  search() {
    this.$searchInput.on('keyup', $elem => {
      const input = $elem.target.value;
      this.setSearchResults(this.index.search(`${input.trim()}*`));
    });
  }

  setSearchResults(results) {
    if (!results instanceof Array) {
      return;
    }

    this.$searchResults.children('li').remove();
    results.forEach(result => {
      const post = this.posts.find(post => post.id === result.ref);
      if (post) {
        this.$searchResults.append(`<li>${post.title}</li>`);
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
        if (!data.hasOwnProperty('posts') || !data.posts instanceof Array || typeof data.posts === 'undefined') {
          return;
        }

        this.posts = data.posts;

        const lastUpdatedAt = this.posts[0].updated_at;
        if (lastUpdatedAt === localStorage.getItem('lastUpdatedAt') && this.cache) {
          return;
        }

        this.index = lunr(function () {
          this.field('title');
          this.field('plaintext');

          this.pipeline.remove(lunr.stemmer);
          this.searchPipeline.remove(lunr.stemmer);

          data.posts.forEach(post => {
            this.add(post);
          });
        });
        localStorage.setItem('lastUpdatedAt', lastUpdatedAt);
      });
  }
}
