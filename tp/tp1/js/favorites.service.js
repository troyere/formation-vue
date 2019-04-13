window.favoritesService = {
  favorites: [],
  addToFavorites(show) {
    this.favorites.push(show)
  },
  findFavorites(id) {
    return this.favorites.findIndex(it => it.id === id)
  },
  removeFromFavorites(id) {
    let favoriteIndex = this.findFavorites(id);
    this.favorites.splice(favoriteIndex, 1)
  },
  isFavorite(id) {
    return this.findFavorites(id) !== -1
  }
};
