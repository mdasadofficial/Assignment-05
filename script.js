// issues Counter
const issuesCount = document.getElementById("issues-count");

// Spinner element
const loadSpinner = document.getElementById("loadSpinner");

// Buttons
const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");

// issue store 
let allIssues = [];


//  issue card load  
const loadCards = () => {

    loadSpinner.classList.remove("hidden");
    loadSpinner.classList.add("flex");

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((json) => {

            allIssues = json.data; //  data store
            displayCards(allIssues);

        })
        .catch((err) => console.log(err));
};



// Card display function
const displayCards = (cards) => {

    loadSpinner.classList.add("hidden");

    const issuesContainer = document.getElementById("issuesContainer");
     // Issues count update
    issuesCount.innerText = cards.length;
    issuesContainer.innerHTML = "";

    for (let card of cards) {

        const cardDiv = document.createElement("div");

        cardDiv.innerHTML = `
        
        <div class="card border-t-4 ${card.status === "open" ? "border-green-500" : "border-[#a855f7]"} shadow-sm p-5 space-y-3 h-80 cursor-pointer hover:shadow-md transition">

            <div class="flex justify-between">

                <img src="./B13-A5-Github-Issue-Tracker/assets/${card.status === "open" ? "Open-Status.png" : "Closed-Status.png"}" alt="${card.status}">

                <div class="badge badge-soft ${card.priority === "high" ? "badge-error" :
                card.priority === "medium" ? "badge-warning" :
                    "badge-success"
            }">

                    ${card.priority.toUpperCase()}
                </div>

            </div>

            <h3 class="text-xl font-bold line-clamp-2">${card.title}</h3>

            <p class="line-clamp-2 text-gray-400">${card.description}</p>

            <div class="flex gap-3 mt-3 flex-wrap">

            ${card.labels.map(label => `

                <div class="badge badge-soft ${label === "bug" ? "badge-error" :
                    label === "enhancement" ? "badge-success" :
                        label === "documentation" ? "badge-info" :
                            "badge-secondary"
                }">

                    <span class="mr-1">
                        <i class="fa-solid fa-wand-magic-sparkles"></i>
                    </span>

                    ${label.toUpperCase()}

                </div>

                `).join('')
            }

            </div>

            <hr>

            <p>${card.author}</p>
            <p>${new Date(card.createdAt).toLocaleDateString()}</p>

        </div>
        `;

        issuesContainer.appendChild(cardDiv);
    }
};



// Button toggle function
const toggleActiveBtn = (activeBtn) => {

    const buttons = [allBtn, openBtn, closedBtn];

    buttons.forEach(btn => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-soft");
    });

    activeBtn.classList.remove("btn-soft");
    activeBtn.classList.add("btn-primary");
};



// All button
allBtn.addEventListener("click", () => {

    toggleActiveBtn(allBtn);
    displayCards(allIssues);

});


// Open button
openBtn.addEventListener("click", () => {

    toggleActiveBtn(openBtn);

    const openIssues = allIssues.filter(issue => issue.status === "open");

    displayCards(openIssues);

});


// Closed button
closedBtn.addEventListener("click", () => {

    toggleActiveBtn(closedBtn);

    const closedIssues = allIssues.filter(issue => issue.status === "closed");

    displayCards(closedIssues);

});


// Page load / data load
loadCards();