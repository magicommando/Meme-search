async function getTopMemes() {
    const respond = await fetch('https://api.imgflip.com/get_memes');
    const data = await respond.json();
    displayMemes(data.data.memes);
}

function displayMemes(memes) {
    const results = document.getElementById("results");
    results.innerHTML = "";
    memes.forEach(meme => {
        const img = document.createElement("img");
        img.src = meme.url;
        img.alt = meme.name;
        results.appendChild(img);

    });
}