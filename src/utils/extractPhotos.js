const pickUrl = (v) => {
    if (!v) return null;
    if (typeof v === "string") return v;
    if (typeof v === "object") {
        const candidate =
            v.url || v.src || v.original || v.large || v.medium || v.thumb || v.thumbnail || v.image || v.href;
        return typeof candidate === "string" ? candidate : null;
    }
    return null;
};

const toAbsolute = (u) => {
    try {
        const s = String(u).trim();
        if (!s) return null;

        if (/^(data|blob):/i.test(s)) return s;

        if (/^\/\//.test(s)) return window ? `${window.location.protocol}${s}` : `https:${s}`;

        if (/^https?:\/\//i.test(s)) return s;

        if (typeof window !== "undefined") {
            return new URL(s, document.baseURI || window.location.origin).toString();
        }
        return s;
    } catch {
        return null;
    }
};

export const extractPhotos = (camper) => {
    if (!camper || typeof camper !== "object") return [];

    const pushFromArray = (arr, out) => {
        if (!Array.isArray(arr)) return;
        for (const item of arr) {
            const url = pickUrl(item);
            if (url) out.push(url);
        }
    };

    const out = [];

    pushFromArray(camper.gallery, out);
    pushFromArray(camper.images, out);
    pushFromArray(camper.photos, out);
    pushFromArray(camper.pictures, out);
    pushFromArray(camper.media, out);
    pushFromArray(camper.thumbs, out);
    pushFromArray(camper.assets, out);
    pushFromArray(camper.galleryPhotos, out);

    if (camper.gallery && typeof camper.gallery === "object") {
        pushFromArray(camper.gallery.urls || camper.gallery.items || camper.gallery.list, out);
    }
    if (camper.media && typeof camper.media === "object") {
        pushFromArray(camper.media.gallery || camper.media.images || camper.media.photos, out);
    }
    if (camper.assets && typeof camper.assets === "object") {
        pushFromArray(camper.assets.images || camper.assets.photos, out);
    }

    [camper.image, camper.img, camper.photo, camper.picture, camper.preview].forEach((v) => {
        const url = pickUrl(v);
        if (url) out.push(url);
    });

    const normalized = out
        .map(toAbsolute)
        .filter(Boolean)
        .filter((u) => /^(https?:)?\/\//i.test(u) || /^(data|blob):/i.test(u));

    return Array.from(new Set(normalized));
};
