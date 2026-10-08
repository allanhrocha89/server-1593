
const SUPABASE_URL = "https://tctbfrljloakqfrvtghf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_4mU1Xs4dabKVcvVjtJZWgA_sNGYlE0U";

// ======================================================
// CONFIGURAÇÃO
// ======================================================

const AUTH_TOKEN_KEY = "server1593_admin_access_token";
const USER_KEY = "server1593_admin_user";

let accessToken = localStorage.getItem(AUTH_TOKEN_KEY) || "";
let currentUser = null;
let applications = [];
let currentApplication = null;

// ======================================================
// ELEMENTOS
// ======================================================

const loginSection = document.querySelector("#login-section");
const dashboardSection = document.querySelector("#dashboard-section");

const loginForm = document.querySelector("#login-form");
const loginMessage = document.querySelector("#login-message");

const adminEmailInput = document.querySelector("#admin-email");
const adminPasswordInput = document.querySelector("#admin-password");

const adminUserEmail = document.querySelector("#admin-user-email");
const logoutButton = document.querySelector("#logout-button");

const searchInput = document.querySelector("#search-input");
const statusFilter = document.querySelector("#status-filter");
const refreshButton = document.querySelector("#refresh-button");

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
// STATUS
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
// EXIBIÇÃO
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

// ======================================================
// MENSAGENS
// ======================================================

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

// ======================================================
// SEGURANÇA HTML
// ======================================================

function escapeHtml(value) {
    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ======================================================
// DATA
// ======================================================

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

// ======================================================
// HEADERS SUPABASE
// ======================================================

function getAuthHeaders() {
    return {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": "Bearer " + accessToken
    };
}

// ======================================================
// LOGIN
// ======================================================

async function login(email, password) {
    const response = await fetch(
        SUPABASE_URL + "/auth/v1/token?grant_type=password",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apikey": SUPABASE_ANON_KEY
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.error_description ||
            result.msg ||
            result.message ||
            "Não foi possível fazer login."
        );
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
        const errorText = await response.text();
        throw new Error(errorText);
    }

    const result = await response.json();

    return Array.isArray(result) && result.length > 0;
}

// ======================================================
// CARREGAR CANDIDATURAS
// ======================================================

async function loadApplications() {
    setApplicationsMessage("Carregando candidaturas...");

    const response = await fetch(
        SUPABASE_URL +
        "/rest/v1/applications?select=*&order=created_at.desc",
        {
            method: "GET",
            headers: getAuthHeaders()
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
    }

    applications = await response.json();

    updateStatistics();
    renderApplications();

    setApplicationsMessage("");
}

// ======================================================
// ESTATÍSTICAS
// ======================================================

function updateStatistics() {
    const total = applications.length;

    const pending = applications.filter(function(item) {
        return item.status === "pending";
    }).length;

    const reviewing = applications.filter(function(item) {
        return item.status === "reviewing";
    }).length;

    const approved = applications.filter(function(item) {
        return item.status === "approved";
    }).length;

    const rejected = applications.filter(function(item) {
        return item.status === "rejected";
    }).length;

    const transferred = applications.filter(function(item) {
        return item.status === "transferred";
    }).length;

    const statTotal = document.querySelector("#stat-total");
    const statPending = document.querySelector("#stat-pending");
    const statReviewing = document.querySelector("#stat-reviewing");
    const statApproved = document.querySelector("#stat-approved");
    const statRejected = document.querySelector("#stat-rejected");
    const statTransferred = document.querySelector("#stat-transferred");

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
// FILTRO
// ======================================================

function getFilteredApplications() {
    const search = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    const selectedStatus = statusFilter
        ? statusFilter.value
        : "all";

    return applications.filter(function(application) {
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
    });
}

// ======================================================
// RENDERIZAR TABELA
// ======================================================

function renderApplications() {
    if (!applicationsTableBody) {
        return;
    }

    const filtered = getFilteredApplications();

    applicationsTableBody.innerHTML = "";

    if (applicationsCount) {
        applicationsCount.textContent =
            filtered.length +
            (filtered.length === 1
                ? " inscrição"
                : " inscrições");
    }

    if (filtered.length === 0) {
        applicationsTableBody.innerHTML =
            "<tr>" +
            "<td colspan=\"8\">" +
            "Nenhuma candidatura encontrada." +
            "</td>" +
            "</tr>";

        return;
    }

    filtered.forEach(function(application) {
        const row = document.createElement("tr");

        const statusClass =
            "status-" + application.status;

        const statusLabel =
            statusLabels[application.status] ||
            application.status;

        row.innerHTML =
            "<td>" +
            escapeHtml(application.application_code) +
            "</td>" +

            "<td>" +
            escapeHtml(application.nickname) +
            "</td>" +

            "<td>" +
            escapeHtml(application.current_server) +
            "</td>" +

            "<td>" +
            escapeHtml(application.power) +
            "</td>" +

            "<td>" +
            escapeHtml(
                application.desired_alliance || "-"
            ) +
            "</td>" +

            "<td>" +
            "<span class=\"status-badge " +
            statusClass +
            "\">" +
            escapeHtml(statusLabel) +
            "</span>" +
            "</td>" +

            "<td>" +
            escapeHtml(
                formatDate(application.created_at)
            ) +
            "</td>" +

            "<td>" +
            "<button " +
            "type=\"button\" " +
            "class=\"view-button\" " +
            "data-id=\"" +
            escapeHtml(application.id) +
            "\">" +
            "Ver" +
            "</button>" +
            "</td>";

        applicationsTableBody.appendChild(row);
    });

    applicationsTableBody
        .querySelectorAll(".view-button")
        .forEach(function(button) {
            button.addEventListener(
                "click",
                function() {
                    const id =
                        button.getAttribute("data-id");

                    openApplication(id);
                }
            );
        });
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

    currentApplication = application;

    if (detailsTitle) {
        detailsTitle.textContent =
            application.nickname +
            " · " +
            (application.application_code || "");
    }

    if (detailsStatus) {
        detailsStatus.value =
            application.status || "pending";
    }

    if (adminNotes) {
        adminNotes.value =
            application.admin_notes || "";
    }

    renderApplicationDetails(application);

    if (applicationDetails) {
        applicationDetails.hidden = false;

        applicationDetails.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

// ======================================================
// DETALHES
// ======================================================

function renderApplicationDetails(application) {
    if (!detailsContent) {
        return;
    }

    const fields = [
        ["Código", application.application_code],
        ["Nickname", application.nickname],
        ["Discord", application.discord],
        ["Servidor atual", application.current_server],
        ["Aliança atual", application.current_alliance],
        ["Power", application.power],
        ["Kills", application.kills],
        ["Profissão", application.profession],
        ["Aliança desejada", application.desired_alliance],
        ["Amigos / grupo", application.friends],
        ["Squad 1", application.squad_1],
        ["Squad 2", application.squad_2],
        ["Squad 3", application.squad_3],
        ["Contato adicional", application.contact],
        ["Idioma", application.language],
        ["Informações adicionais", application.comments],
        ["Criada em", formatDate(application.created_at)],
        ["Atualizada em", formatDate(application.updated_at)]
    ];

    detailsContent.innerHTML = "";

    fields.forEach(function(field) {
        const label = field[0];
        const value = field[1] || "-";

        const item = document.createElement("div");

        item.className = "detail-item";

        item.innerHTML =
            "<span class=\"detail-label\">" +
            escapeHtml(label) +
            "</span>" +

            "<div class=\"detail-value\">" +
            escapeHtml(value) +
            "</div>";

        detailsContent.appendChild(item);
    });
}

// ======================================================
// SALVAR CANDIDATURA
// ======================================================

async function saveApplication() {
    if (!currentApplication) {
        return;
    }

    const newStatus =
        detailsStatus
            ? detailsStatus.value
            : currentApplication.status;

    const newNotes =
        adminNotes
            ? adminNotes.value
            : "";

    setSaveMessage("Salvando alterações...");

    const response = await fetch(
        SUPABASE_URL +
        "/rest/v1/applications?id=eq." +
        encodeURIComponent(currentApplication.id),
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "apikey": SUPABASE_ANON_KEY,
                "Authorization":
                    "Bearer " + accessToken,
                "Prefer":
                    "return=representation"
            },
            body: JSON.stringify({
                status: newStatus,
                admin_notes: newNotes,
                updated_at: new Date().toISOString()
            })
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
    }

    const updated = await response.json();

    if (
        Array.isArray(updated) &&
        updated.length > 0
    ) {
        currentApplication = updated[0];
    } else {
        currentApplication.status = newStatus;
        currentApplication.admin_notes = newNotes;
    }

    const index =
        applications.findIndex(function(item) {
            return item.id === currentApplication.id;
        });

    if (index !== -1) {
        applications[index] = currentApplication;
    }

    updateStatistics();
    renderApplications();
    renderApplicationDetails(currentApplication);

    if (detailsStatus) {
        detailsStatus.value =
            currentApplication.status;
    }

    if (adminNotes) {
        adminNotes.value =
            currentApplication.admin_notes || "";
    }

    setSaveMessage(
        "Alterações salvas com sucesso.",
        "success"
    );
}

// ======================================================
// LOGOUT
// ======================================================

function logout() {
    accessToken = "";
    currentUser = null;

    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    if (applicationDetails) {
        applicationDetails.hidden = true;
    }

    showLogin();

    if (adminPasswordInput) {
        adminPasswordInput.value = "";
    }

    setLoginMessage("");
}

// ======================================================
// EVENTO DE LOGIN
// ======================================================

if (loginForm) {
    loginForm.addEventListener(
        "submit",
        async function(event) {
            event.preventDefault();

            const email =
                adminEmailInput
                    ? adminEmailInput.value.trim()
                    : "";

            const password =
                adminPasswordInput
                    ? adminPasswordInput.value
                    : "";

            if (!email || !password) {
                setLoginMessage(
                    "Informe seu e-mail e sua senha.",
                    "error"
                );

                return;
            }

            setLoginMessage("Entrando...");

            try {
                const auth =
                    await login(email, password);

                accessToken =
                    auth.access_token;

                currentUser =
                    auth.user;

                localStorage.setItem(
                    AUTH_TOKEN_KEY,
                    accessToken
                );

                localStorage.setItem(
                    USER_KEY,
                    JSON.stringify(currentUser)
                );

                const isAdmin =
                    await verifyAdmin(
                        currentUser.email
                    );

                if (!isAdmin) {
                    logout();

                    setLoginMessage(
                        "Este usuário não possui permissão de administrador.",
                        "error"
                    );

                    return;
                }

                if (adminUserEmail) {
                    adminUserEmail.textContent =
                        currentUser.email;
                }

                showDashboard();
                setLoginMessage("");

                await loadApplications();

            } catch (error) {
                console.error(
                    "Admin login error:",
                    error
                );

                accessToken = "";

                localStorage.removeItem(
                    AUTH_TOKEN_KEY
                );

                setLoginMessage(
                    "Não foi possível entrar. Verifique seu e-mail e senha.",
                    "error"
                );
            }
        }
    );
}

// ======================================================
// LOGOUT
// ======================================================

if (logoutButton) {
    logoutButton.addEventListener(
        "click",
        function() {
            logout();
        }
    );
}

// ======================================================
// PESQUISA
// ======================================================

if (searchInput) {
    searchInput.addEventListener(
        "input",
        function() {
            renderApplications();
        }
    );
}

// ======================================================
// FILTRO DE STATUS
// ======================================================

if (statusFilter) {
    statusFilter.addEventListener(
        "change",
        function() {
            renderApplications();
        }
    );
}

// ======================================================
// ATUALIZAR
// ======================================================

if (refreshButton) {
    refreshButton.addEventListener(
        "click",
        async function() {
            try {
                await loadApplications();
            } catch (error) {
                console.error(
                    "Refresh error:",
                    error
                );

                setApplicationsMessage(
                    "Não foi possível atualizar as candidaturas.",
                    "error"
                );
            }
        }
    );
}

// ======================================================
// FECHAR DETALHES
// ======================================================

if (closeDetailsButton) {
    closeDetailsButton.addEventListener(
        "click",
        function() {
            if (applicationDetails) {
                applicationDetails.hidden = true;
            }

            currentApplication = null;
        }
    );
}

// ======================================================
// SALVAR ALTERAÇÕES
// ======================================================

if (saveApplicationButton) {
    saveApplicationButton.addEventListener(
        "click",
        async function() {
            try {
                await saveApplication();
            } catch (error) {
                console.error(
                    "Save application error:",
                    error
                );

                setSaveMessage(
                    "Não foi possível salvar as alterações.",
                    "error"
                );
            }
        }
    );
}

// ======================================================
// RESTAURAR SESSÃO
// ======================================================

async function restoreSession() {
    if (!accessToken) {
        showLogin();
        return;
    }

    try {
        const response = await fetch(
            SUPABASE_URL + "/auth/v1/user",
            {
                method: "GET",
                headers: {
                    "apikey": SUPABASE_ANON_KEY,
                    "Authorization":
                        "Bearer " + accessToken
                }
            }
        );

        if (!response.ok) {
            throw new Error(
                "Session expired."
            );
        }

        currentUser =
            await response.json();

        const isAdmin =
            await verifyAdmin(
                currentUser.email
            );

        if (!isAdmin) {
            logout();
            return;
        }

        if (adminUserEmail) {
            adminUserEmail.textContent =
                currentUser.email;
        }

        showDashboard();

        await loadApplications();

    } catch (error) {
        console.error(
            "Session restore error:",
            error
        );

        logout();
    }
}

// ======================================================
// INICIALIZAÇÃO
// ======================================================

restoreSession();
