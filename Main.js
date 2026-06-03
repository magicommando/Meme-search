let allMemes = [];
let currentPage = 1;
const pageSize = 12;

function appendMemes(memes) {
    memes.forEach((meme,index) => {
        const wrapper = document.createElement("div");
        wrapper,classList.add("meme-box");

        const img = document.createElement("img");
        img.src = meme.url;
        img.alt = meme.name;
        img.classList.add("meme-img");

        img.onLoad = () => {
            const height = img.getBoundingClientRect().height;
            const rows = Math.ceil(height / 10);
            wrapper.style.setProperty("--row-span", rows);

            setTimeout(() => {
                img.classList.add("fade-in");
            }, index * 50);
        };

        const caption = document.createElement("p");
        caption.classList.add("meme-caption");
        caption.textContent = meme.name;

        wrapper.appendChild(img);
        wrapper.appendChild(caption);
        results.appendChild(wrapper);
    });
}
function renderPage() {
    displayMemes(allMemes);
}



function displayMemes(memes) {
    const results = document.getElementById("results");
    results.innerHTML = "";

    memes.forEach((meme, index) => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("meme-box");

        const img = document.createElement("img");
        img.src = meme.url;
        img.alt = meme.name;
        img.classList.add("meme-img");

        img.onload = () => {
            const height = img.getBoundingClientRect().height;
            const rows = Math.ceil(height / 38);
            wrapper.style.setProperty("--row-span", rows);
            setTimeout(() => {
                img.classList.add("fade-in");
            }, index * 50);
        };

        const caption = document.createElement("p");
        caption.classList.add("meme-caption");
        caption.textContent = meme.name;

        wrapper.appendChild(img);
        wrapper.appendChild(caption);
        results.appendChild(wrapper);

    });
}

async function searchMemes(query) {
    const respond = await fetch('https://api.imgflip.com/get_memes');
    const data = await respond.json();
    const memes = data.data.memes;

    allMemes = memes.filter(meme => meme.name.toLowerCase().includes(query.toLowerCase())
    );
    if (allMemes.length === 0) {
        const results = document.getElementById("results");
        results.innerHTML = `
            <div class="no-results">
                <img src="Assets/sad-monkey.png" alt=sad Monkey" class="sad-monkey">
                <h2>No Results Found</h2>
                <p>Try searching something else, Ultra Gangsta.</p>
            </div>
        `;
        return;
    }

    currentPage = 1;
    renderPage();

}

async function fetchTopMemes() {
    try {
        const respond = await fetch('https://api.imgflip.com/get_memes');
        const data = await respond.json();

        if (!data.success) {
            throw new Error('Failed to fetch memes');
        }

        return data.data.memes;
    } catch (err) {
        console.error("Error fetching memes:", err);
        return [];
    }
}

async function loadHome() {
    allMemes = await fetchTopMemes();
    currentPage = 1;
    renderPage();
}

document.getElementById("home").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";

    allMemes = [];
    currentPage = 1;

    const results = document.getElementById("results");
    const footer = document.querySelector("footer");
    const about = document.getElementById("aboutSection");

    about.style.display = "none"
    about.innerHTML = "";

    results.innerHTML ="";
    footer.innerHTML = `<small>Sourced from Imgflip API ©2026</small>`;
});

document.getElementById("about").addEventListener("click", () => {
    const about = document.getElementById("aboutSection");
    const results = document.getElementById("results");
    const footer = document.querySelector("footer");

    results.innerHTML = "";
    footer.innerHTML = "";

    about.style.display = "block";
    about.innerHTML = `
        <div class="about-box">
            <h2>About Meme Search</h2>
            <p>This Meme Search application was created by the Ultra Gangsta also known as Corbin,
            built to look super cool and retro.</p>

            <p>The goal is to stand out from the rest while flexing creativity and superior
            meme‑searching capabilities. Witness greatness. Enjoy the experience. Or don’t.
            I know I DID.</p>
        </div>
    `;
});


document.getElementById("searchForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = document.getElementById("searchInput").value.trim();
    if (query.length > 0){
        searchMemes(query);
    }
});

document.getElementById("submitIcon").addEventListener("click", () => {
    document.getElementById("searchForm").dispatchEvent(new Event("submit"));
})


document.getElementById("getTopMemes").addEventListener("click", async () => {
    allMemes = await fetchTopMemes();
    currentPage=1;
    renderPage();
});

document.getElementById("makeMemes").addEventListener("click", () => {
    window.open("https://imgflip.com/memegenerator", "_blank");
});

const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");


clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearBtn.style.display = "none";
    searchInput.focus();
})

const pressStartScreen = document.getElementById("pressStartScreen");

function hidePressStart() {
    pressStartScreen.classList.add("fade-out");
    setTimeout(() => {
        pressStartScreen.style.display = "none";

    }, 800);
}
pressStartScreen.addEventListener("click", hidePressStart);

let loaded = false;
let loadedCount =0;
const chunkSize =20;
window.addEventListener("scroll", () => {
    if (loading) return;

    const scrollPos = window.innerHeight + window.scrollY;
    const bottom = document.body.offsetHeight - 300;
    if (scrollPos >= bottom) {
        loadMoreMemes();
        if (loading) return;
        if (loadedCount >= allMemes.length) return;

        loading = true;

        const nextChunk = allMemes.slice(leadedCount, loadedCount +ChunkSize);
        loadedCount += chunkSize;

        appendMemes(nextChunk)
        loading = false;
    }
});


