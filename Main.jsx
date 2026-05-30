async function searchMemes(query) {
    const res = await fetch("https:// api.imgflip.com/get_memes");
    const data = await res.json();
    const memes = data.data.memes;
}

function searchMemes(query) {
    const q = query.toLowerCase();
    return memes.filter(m => m.name.toLowerCase().includes(q));
}