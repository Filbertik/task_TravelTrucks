export const loadFavorites = () => {
    try {
        const raw = localStorage.getItem("favorites");
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

export const saveFavorites = (ids) => {
    try {
        localStorage.setItem("favorites", JSON.stringify(ids));
    } catch { }
};
