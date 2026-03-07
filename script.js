// Login
// document.getElementById('loginBtn').addEventListener('click', () => {
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     if (username === "admin" && password === "admin123") {
//         window.location.href = "main.html";
//     } else {
//         alert("Invalid credentials!");
//     }
// });




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
        
            
                <div class="card border-t-4 ${card.priority === "high" ? "border-[#a855f7]" : "border-green-500"} bg-base-100 shadow-sm p-5 space-y-3 h-80 cursor-pointer hover:shadow-md transition">

            <div class="flex justify-between">
                <img src="./B13-A5-Github-Issue-Tracker/assets/Open-Status.png" alt="open status">
                <div class="badge badge-soft badge-error">${card.priority.toUpperCase()}</div>
            </div>
            <h3 class="text-xl font-bold line-clamp-2">${card.title}</h3>
            <p class="line-clamp-2 text-gray-400">${card.description}</p>
            <div class="flex gap-3 mt-3 flex-wrap">
            ${card.labels.map(label => `

           
                <div class="badge badge-soft badge-success">
                    <span class="mr-1"><i class="fa-solid fa-wand-magic-sparkles"></i></span>${label.toUpperCase()}
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