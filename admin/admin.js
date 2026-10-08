const SUPABASE_URL = "https://tctbfrljloakqfrvtghf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_4mU1Xs4dabKVcvVjtJZWgA_sNGYlE0U";

// ======================================================
// CONFIGURAÇÃO
// ======================================================

const AUTH_TOKEN_KEY = "server1593_admin_access_token";
const USER_KEY = "server1593_admin_user";

let accessToken =
localStorage.getItem(AUTH_TOKEN_KEY) || "";

let currentUser = null;
let applications = [];
let currentApplication = null;

// ======================================================
// ELEMENTOS
// ======================================================

const loginSection =
document.querySelector("#login-section");

const dashboardSection =
document.querySelector("#dashboard-section");

const loginForm =
document.querySelector("#login-form");

const loginMessage =
document.querySelector("#login-message");

const adminEmailInput =
document.querySelector("#admin-email");

const adminPasswordInput =
document.querySelector("#admin-password");

const adminUserEmail =
document.querySelector("#admin-user-email");

const logoutButton =
document.querySelector("#logout-button");

const searchInput =
document.querySelector("#search-input");

const statusFilter =
document.querySelector("#status-filter");

const refreshButton =
document.querySelector("#refresh-button");

const applicationsTableBody =
document.querySelector("#applications-table-body");

const applicationsCount =
document.querySelector("#applications-count");

const applicationsMessage =
document.querySelector("#applications-message");

const applicationDetails =
document.querySelector("#application-details");

const detailsTitle =
document.querySelector("#details-title");

const detailsContent =
document.querySelector("#details-content");

const closeDetailsButton =
document.querySelector("#close-details-button");

const detailsStatus =
document.querySelector("#details-status");

const adminNotes =
document.querySelector("#admin-notes");

const saveApplicationButton =
document.querySelector("#save-application-button");

const saveMessage =
document.querySelector("#save-message");

// ======================================================
// TEXTOS DE STATUS
// ======================================================

const statusLabels = {
pending: "Pendente",
reviewing: "Em análise",
approved: "Aprovado",
rejected: "Rejeitado",
transferred: "Transferido",
cancelled: "Cancelado"
};

// ======================================================
// FUNÇÕES AUXILIARES
// ======================================================

function showLogin() {

if (loginSection) {
loginSection.hidden = false;
}

if (dashboardSection) {
dashboardSection.hidden = true;
}
}

function showDashboard() {

if (loginSection) {
loginSection.hidden = true;
}

if (dashboardSection) {
dashboardSection.hidden = false;
}
}

function setLoginMessage(text, type) {

if (!loginMessage) {
return;
}

loginMessage.textContent = text;

loginMessage.className = "message";

if (type) {
loginMessage.classList.add(type);
}
}

function setApplicationsMessage(text, type) {

if (!applicationsMessage) {
return;
}

applicationsMessage.textContent = text;

applicationsMessage.className = "message";

if (type) {
applicationsMessage.classList.add(type);
}
}

function setSaveMessage(text, type) {

if (!saveMessage) {
return;
}

saveMessage.textContent = text;

saveMessage.className = "message";

if (type) {
saveMessage.classList.add(type);
}
}

function escapeHtml(value) {

if (value === null || value === undefined) {
return "";
}

return String(value)
.replace(/&/g, "&")
.replace(/</g, "<")
.replace(/>/g, ">")
.replace(/"/g, """)
.replace(/'/g, "'");
}

function formatDate(value) {

if (!value) {
return "-";
}

const date = new Date(value);

if (Number.isNaN(date.getTime())) {
return value;
}

return date.toLocaleString("pt-BR", {
dateStyle: "short",
timeStyle: "short"
});
}

function getAuthHeaders() {

return {
"Content-Type": "application/json",
"apikey": SUPABASE_ANON_KEY,
"Authorization": "Bearer " + accessToken
};
}

// ======================================================
// LOGIN SUPABASE
// ======================================================

async function login(email, password) {

const response = await fetch(
SUPABASE_URL +
"/auth/v1/token?grant_type=password",
{
method: "POST",

```
  headers: {
    "Content-Type": "application/json",
    "apikey": SUPABASE_ANON_KEY
  },

  body: JSON.stringify({
    email: email,
    password: password
  })
}
```

);

const result = await response.json();

if (!response.ok) {

```
throw new Error(
  result.error_description ||
  result.msg ||
  result.message ||
  "Não foi possível fazer login."
);
```

}

return result;
}

// ======================================================
// VERIFICAR ADMIN
// ======================================================

async function verifyAdmin(userEmail) {

const response = await fetch(
SUPABASE_URL +
"/rest/v1/admin_users?select=email&email=eq." +
encodeURIComponent(userEmail),
{
method: "GET",
headers: getAuthHeaders()
}
);

if (!response.ok) {

```
const errorText =
  await response.text();

throw new Error(errorText);
```

}

const result =
await response.json();

return (
Array.isArray(result) &&
result.length > 0
);
}

// ======================================================
// CARREGAR CANDIDATURAS
// ======================================================

async function loadApplications() {

setApplicationsMessage(
"Carregando candidaturas..."
);

const response = await fetch(
SUPABASE_URL +
"/rest/v1/applications?select=*&order=created_at.desc",
{
method: "GET",
headers: getAuthHeaders()
}
);

if (!response.ok) {

```
const errorText =
  await response.text();

throw new Error(errorText);
```

}

applications =
await response.json();

updateStatistics();

renderApplications();

setApplicationsMessage("");
}

// ======================================================
// ESTATÍSTICAS
// ======================================================

function updateStatistics() {

const total =
applications.length;

const pending =
applications.filter(function(item) {
return item.status === "pending";
}).length;

const reviewing =
applications.filter(function(item) {
return item.status === "reviewing";
}).length;

const approved =
applications.filter(function(item) {
return item.status === "approved";
}).length;

const rejected =
applications.filter(function(item) {
return item.status === "rejected";
}).length;

const transferred =
applications.filter(function(item) {
return item.status === "transferred";
}).length;

const statTotal =
document.querySelector("#stat-total");

const statPending =
document.querySelector("#stat-pending");

const statReviewing =
document.querySelector("#stat-reviewing");

const statApproved =
document.querySelector("#stat-approved");

const statRejected =
document.querySelector("#stat-rejected");

const statTransferred =
document.querySelector("#stat-transferred");

if (statTotal) {
statTotal.textContent = total;
}

if (statPending) {
statPending.textContent = pending;
}

if (statReviewing) {
statReviewing.textContent = reviewing;
}

if (statApproved) {
statApproved.textContent = approved;
}

if (statRejected) {
statRejected.textContent = rejected;
}

if (statTransferred) {
statTransferred.textContent = transferred;
}
}

// ======================================================
// FILTRAR CANDIDATURAS
// ======================================================

function getFilteredApplications() {

const search =
searchInput
? searchInput.value
.trim()
.toLowerCase()
: "";

const selectedStatus =
statusFilter
? statusFilter.value
: "all";

return applications.filter(function(application) {

```
const matchesStatus =
  selectedStatus === "all" ||
  application.status === selectedStatus;


if (!search) {
  return matchesStatus;
}


const searchableText = [
  application.application_code,
  application.nickname,
  application.discord,
  application.current_server,
  application.current_alliance,
  application.desired_alliance,
  application.power
]
  .filter(Boolean)
  .join(" ")
  .toLowerCase();


return (
  matchesStatus &&
  searchableText.includes(search)
);
```

});
}

// ======================================================
// RENDERIZAR TABELA
// ======================================================

function renderApplications() {

if (!applicationsTableBody) {
return;
}

const filtered =
getFilteredApplications();

applicationsTableBody.innerHTML = "";

if (applicationsCount) {

```
applicationsCount.textContent =
  filtered.length +
  (filtered.length === 1
    ? " inscrição"
    : " inscrições");
```

}

if (filtered.length === 0) {

```
applicationsTableBody.innerHTML =
  '<tr>' +
  '<td colspan="8">' +
  "Nenhuma candidatura encontrada." +
  "</td>" +
  "</tr>";

return;
```

}

filtered.forEach(function(application) {

```
const row =
  document.createElement("tr");


const statusClass =
  "status-" +
  application.status;


const statusLabel =
  statusLabels[application.status] ||
  application.status;


row.innerHTML =
  "<td>" +
  escapeHtml(
    application.application_code
  ) +
  "</td>" +

  "<td>" +
  escapeHtml(
    application.nickname
  ) +
  "</td>" +

  "<td>" +
  escapeHtml(
    application.current_server
  ) +
  "</td>" +

  "<td>" +
  escapeHtml(
    application.power
  ) +
  "</td>" +

  "<td>" +
  escapeHtml(
    application.desired_alliance ||
    "-"
  ) +
  "</td>" +

  '<td><span class="status-badge ' +
  statusClass +
  '">' +
  escapeHtml(statusLabel) +
  "</span></td>" +

  "<td>" +
  escapeHtml(
    formatDate(application.created_at)
  ) +
  "</td>" +

  "<td>" +
  '<button type="button" class="view-button" data-id="' +
  escapeHtml(application.id) +
  '">' +
  "Ver" +
  "</button>" +
  "</td>";


applicationsTableBody.appendChild(row);
```

});

applicationsTableBody
.querySelectorAll(".view-button")
.forEach(function(button) {

```
  button.addEventListener(
    "click",
    function() {

      const id =
        button.getAttribute("data-id");

      openApplication(id);
    }
  );
});
```

}

// ======================================================
// ABRIR CANDIDATURA
// ======================================================

function openApplication(id) {

const application =
applications.find(function(item) {
return item.id === id;
});

if (!application) {
return;
}

currentApplication =
application;

if (detailsTitle) {

```
detailsTitle.textContent =
  application.nickname +
  " · " +
  (application.application_code || "");
```

}

if (detailsStatus) {

```
detailsStatus.value =
  application.status || "pending";
```

}

if (adminNotes) {

```
adminNotes.value =
  application.admin_notes || "";
```

}

renderApplicationDetails(
application
);

if (applicationDetails) {

```
applicationDetails.hidden = false;

applicationDetails.scrollIntoView({
  behavior: "smooth",
  block: "start"
});
```

}
}

// ======================================================
// DETALHES DA CANDIDATURA
// ======================================
