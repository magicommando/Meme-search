let allMemes = [];
let currentPage = 1;
const pageSize = 12;

async function TopMemes() {
    const respond = await fetch('https://api.imgflip.com/get_memes');
    const data = await respond.json();
    allMemes = data.data.memes;
    currentPage = 1;
    renderpage();
}
function renderPage() {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const pageMemes = allMemes.slice(start, end);

    displayMemes(pageMemes);
    renderPaginantionControls();
}

function renderPaginationsControls() {
    const footer = document.querySelector("footer");
    const totalPages = Math.ceil(allMemes.length / pageSize);

    let html = '<div class="pagination">';

    if (currentPage > 1) {
        html += `<button class="page-btn" data-page=${currentPage - 1}">Prev</button>`;
    }
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    if (currentPage < totalPages) {
        html += `<button class="page-btn" data-page="${currentPage + 1}">Next</button>`;
    }
    html += '</div>';
    footer.innerHTML = html;
}

document.querySelectorAll(".page-btn").forEach(btn => { btn.addEventListener("click", () => { currentPage = Number(btn.dataset.page); renderPage();
    });
});


function displayMemes(memes) {
    const results = document.getElementById("results");
    results.innerHTML = "";

    if (memes.length === 0) {
        results.innerHTML = "<p>No memes found.</p>";
        return;
    }
    memes.forEach(meme => {
        const img = document.createElement("img");
        img.src = meme.url;
        img.alt = meme.name;
        results.appendChild(img);

    });
}

async function searchMemes(query) {
    const respond = await fetch('https://api.imgflip.com/get_memes');
    const data = await respond.json();
    const memes = data.data.memes;

    allMemes = memes.filter(meme => meme.name.toLowerCase().includes(query.toLowerCase())
    );

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

document.getElementById("searchForm").addEventListener("click", async () => {
    const query = document.getElementById("searchInput").value.trim();
    const memes = await fetchTopMemes();
    if (query.length > 0){
        searchMemes(query);
    }
});

document.getElementById("getTopMemes").addEventListener("click", async () => {
    const memes = await fetchTopMemes();
    displayMemes(memes);
});

document.getElementById("makeMemes").addEventListener("click", () => {
    window.open("https://imgflip.com/memegenerator", "_blank");
});