



const loadCards = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((json) => displayCards(json.data));

};


const displayCards = (cards) => {
    const issuesContainer = document.getElementById("issuesContainer");
    issuesContainer.innerHTML = "";
    for (let card of cards) {
        console.log(card);

        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
        
            
                <div class="card border-t-4 ${card.status === "open" ? "border-green-500" : "border-[#a855f7]"} shadow-sm p-5 space-y-3 h-80 cursor-pointer hover:shadow-md transition">

            <div class="flex justify-between">
                <img src="./B13-A5-Github-Issue-Tracker/assets/${card.status === "open" ? "Open-Status.png" : "Closed- Status .png"}" alt="${card.status}">
                <div class="badge badge-soft ${card.priority === "high" ? "badge-error" :
                card.priority === "medium" ? "badge-warning" :
                    "badge-success"}">
                  ${card.priority.toUpperCase()}
                   </div>
            </div>
            <h3 class="text-xl font-bold line-clamp-2">${card.title}</h3>
            <p class="line-clamp-2 text-gray-400">${card.description}</p>
            <div class="flex gap-3 mt-3 flex-wrap">
            ${card.labels.map(label => `

           
               <div class="badge badge-soft ${label === "bug" ? "badge-error" :
                    label === "enhancement" ? "badge-success" :
                        label === "documentation" ? "badge-info" : "badge-secondary"}">
                        
               <span class="mr-1"><i class="fa-solid fa-wand-magic-sparkles"></i></span>
                ${label.toUpperCase()}
                       </div>
                `).join('')}
            </div>
            <hr>
            <p>${card.author}</p>
            <p>${new Date(card.updatedAt).toLocaleDateString()}</p>
        </div>

        `;
        issuesContainer.appendChild(cardDiv);
    }

};
loadCards();