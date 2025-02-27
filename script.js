const apiUrl = "https://your-backend-url.com"; // Заменить на реальный URL бэкенда

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.access_token) {
            localStorage.setItem("token", data.access_token);
            document.getElementById("login").style.display = "none";
            document.getElementById("content").style.display = "block";
        } else {
            document.getElementById("login-message").innerText = "Ошибка входа";
        }
    });
}

function fetchVisits() {
    fetch(`${apiUrl}/visits`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const visitList = document.getElementById("visit-list");
        visitList.innerHTML = "";
        data.forEach(visit => {
            const li = document.createElement("li");
            li.innerText = `Адрес: ${visit.address}, Инспектор: ${visit.inspector_name}, Дата: ${visit.date}`;
            visitList.appendChild(li);
        });
    });
}
