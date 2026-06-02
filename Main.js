let allMemes = [];
let currentPage = 1;
const pageSize = 12;

function renderPage() {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const pageMemes = allMemes.slice(start, end);

    displayMemes(pageMemes);
    renderPaginationControls();
}

function renderPaginationControls() {
    const footer = document.querySelector("footer");
    const totalPages = Math.ceil(allMemes.length / pageSize);

    let html = '<div class="pagination">';

    if (currentPage > 1) {
        html += `<button class="page-btn" data-page="${currentPage - 1}">Prev</button>`;
    }
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    if (currentPage < totalPages) {
        html += `<button class="page-btn" data-page="${currentPage + 1}">Next</button>`;
    }
    html += '</div>';

   
    footer.innerHTML = html;

     document.querySelectorAll(".page-btn").forEach(btn => {
         btn.addEventListener("click", () => {
            currentPage = Number(btn.dataset.page);
            renderPage();
         });
     });
}


function displayMemes(memes) {
    const results = document.getElementById("results");
    results.innerHTML = "";

    memes.forEach((meme, index) => {
        const img = document.createElement("img");
        img.src = meme.url;
        img.alt = meme.name;
        img.classList.add("meme-img");

        img.onload = () => {
            setTimeout(() => {
            img.classList.add("fade-in");
            }, index * 50);
        };

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
    results.innerHTML ="";
    
    footer.innerHTML = "";
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