
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
let registrationsOpen = true;

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

// Controle de inscrições
const registrationStatus =
    document.querySelector("#registration-status");

const registrationStatusText =
    document.querySelector("#registration-status-text");

const registrationDescription =
    document.querySelector("#registration-description");

const toggleRegistrationsButton =
    document.querySelector("#toggle-registrations-button");

const registrationMessage =
    document.querySelector("#registration-message");

// ======================================================
// STATUS DAS CANDIDATURAS
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
    if (!loginMessage) return;

    loginMessage.textContent = text;
    loginMessage.className = "message";

    if (type) {
        loginMessage.classList.add(type);
    }
}

function setApplicationsMessage(text, type) {
    if (!applicationsMessage) return;

    applicationsMessage.textContent = text;
    applicationsMessage.className = "message";

    if (type) {
        applicationsMessage.classList.add(type);
    }
}

function setSaveMessage(text, type) {
    if (!saveMessage) return;

    saveMessage.textContent = text;
    saveMessage.className = "message";

    if (type) {
        saveMessage.classList.add(type);
    }
}

function setRegistrationMessage(text, type) {
    if (!registrationMessage) return;

    registrationMessage.textContent = text;
    registrationMessage.className = "message";

    if (type) {
        registrationMessage.classList.add(type);
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
    if (!value) return "-";

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
// CONTROLE DE INSCRIÇÕES
// ======================================================

function renderRegistrationStatus(isOpen) {
    registrationsOpen = Boolean(isOpen);

    if (registrationStatus) {
        registrationStatus.classList.toggle(
            "is-open",
            registrationsOpen
        );

        registrationStatus.classList.toggle(
            "is-closed",
            !registrationsOpen
        );
    }

    if (registrationStatusText) {
        registrationStatusText.textContent = registrationsOpen
            ? "INSCRIÇÕES ABERTAS"
            : "INSCRIÇÕES FECHADAS";
    }

    if (registrationDescription) {
        registrationDescription.textContent = registrationsOpen
            ? "Os jogadores podem enviar novas candidaturas."
            : "Novas candidaturas estão bloqueadas. As candidaturas existentes continuam disponíveis.";
    }

    if (toggleRegistrationsButton) {
        toggleRegistrationsButton.textContent = registrationsOpen
            ? "Fechar inscrições"
            : "Reabrir inscrições";

        toggleRegistrationsButton.classList.toggle(
            "is-close-action",
            registrationsOpen
        );

        toggleRegistrationsButton.disabled = false;
    }
}

async function loadRegistrationStatus() {
    if (toggleRegistrationsButton) {
        toggleRegistrationsButton.disabled = true;
        toggleRegistrationsButton.textContent = "Carregando...";
    }

    setRegistrationMessage("");

    const response = await fetch(
        SUPABASE_URL + "/rest/v1/rpc/get_transfer_status",
        {
            method: "POST",
            headers: getAuthHeaders(),
            body: "{}"
        }
    );

    if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
            errorText || "Não foi possível consultar o status das inscrições."
        );
    }

    const isOpen = await response.json();

    if (typeof isOpen !== "boolean") {
        throw new Error("O Supabase retornou um status inválido.");
    }

    renderRegistrationStatus(isOpen);
}

async function toggleRegistrationStatus() {
    if (!toggleRegistrationsButton) return;

    const nextStatus = !registrationsOpen;

    const confirmation = nextStatus
        ? "Deseja reabrir as inscrições para o Servidor 1593?"
        : "Deseja fechar as inscrições? Novas candidaturas serão bloqueadas.";

    if (!window.confirm(confirmation)) return;

    toggleRegistrationsButton.disabled = true;
    toggleRegistrationsButton.textContent = "Salvando...";
    setRegistrationMessage("");

    try {
        const response = await fetch(
            SUPABASE_URL + "/rest/v1/rpc/set_transfer_status",
            {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    p_is_open: nextStatus
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();

            throw new Error(
                errorText || "Não foi possível alterar o status das inscrições."
            );
        }

        const savedStatus = await response.json();

        if (typeof savedStatus !== "boolean") {
            throw new Error("O Supabase retornou uma confirmação inválida.");
        }

        renderRegistrationStatus(savedStatus);

        setRegistrationMessage(
            savedStatus
                ? "Inscrições reabertas com sucesso."
                : "Inscrições fechadas com sucesso.",
            "success"
        );

    } catch (error) {
        console.error("Registration status error:", error);

        setRegistrationMessage(
            "Não foi possível alterar o status. Verifique as permissões e as funções no Supabase.",
            "error"
        );

        try {
            await loadRegistrationStatus();
        } catch (refreshError) {
            console.error(
                "Registration refresh error:",
                refreshError
            );

            if (toggleRegistrationsButton) {
                toggleRegistrationsButton.disabled = false;
                toggleRegistrationsButton.textContent = "Tentar novamente";
            }
        }
    }
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

    if (statTotal) statTotal.textContent = total;
    if (statPending) statPending.textContent = pending;
    if (statReviewing) statReviewing.textContent = reviewing;
    if (statApproved) statApproved.textContent = approved;
    if (statRejected) statRejected.textContent = rejected;
    if (statTransferred) statTransferred.textContent = transferred;
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

        return matchesStatus && searchableText.includes(search);
    });
}

// ======================================================
// RENDERIZAR TABELA
// ======================================================

function renderApplications() {
    if (!applicationsTableBody) return;

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
            "<tr><td colspan=\"8\">Nenhuma candidatura encontrada.</td></tr>";

        return;
    }

    filtered.forEach(function(application) {
        const row = document.createElement("tr");

        const statusClass = "status-" + application.status;
        const statusLabel =
            statusLabels[application.status] || application.status;

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
            escapeHtml(application.desired_alliance || "-") +
            "</td>" +

            "<td><span class=\"status-badge " +
            escapeHtml(statusClass) +
            "\">" +
            escapeHtml(statusLabel) +
            "</span></td>" +

            "<td>" +
            escapeHtml(formatDate(application.created_at)) +
            "</td>" +

            "<td><button type=\"button\" class=\"view-button\" data-id=\"" +
            escapeHtml(application.id) +
            "\">Ver</button></td>";

        applicationsTableBody.appendChild(row);
    });

    applicationsTableBody
        .querySelectorAll(".view-button")
        .forEach(function(button) {
            button.addEventListener("click", function() {
                openApplication(button.getAttribute("data-id"));
            });
        });
}

// ======================================================
// ABRIR CANDIDATURA
// ======================================================

function openApplication(id) {
    const application = applications.find(function(item) {
        return item.id === id;
    });

    if (!application) return;

    currentApplication = application;

    if (detailsTitle) {
        detailsTitle.textContent =
            application.nickname + " · " +
            (application.application_code || "");
    }

    if (detailsStatus) {
        detailsStatus.value = application.status || "pending";
    }

    if (adminNotes) {
        adminNotes.value = application.admin_notes || "";
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
    if (!detailsContent) return;

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
        const item = document.createElement("div");
        item.className = "detail-item";

        item.innerHTML =
            "<span class=\"detail-label\">" +
            escapeHtml(field[0]) +
            "</span><div class=\"detail-value\">" +
            escapeHtml(field[1] || "-") +
            "</div>";

        detailsContent.appendChild(item);
    });
}

// ======================================================
// SALVAR CANDIDATURA
// ======================================================

async function saveApplication() {
    if (!currentApplication) return;

    const newStatus = detailsStatus
        ? detailsStatus.value
        : currentApplication.status;

    const newNotes = adminNotes
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
                "Authorization": "Bearer " + accessToken,
                "Prefer": "return=representation"
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

    if (Array.isArray(updated) && updated.length > 0) {
        currentApplication = updated[0];
    } else {
        currentApplication.status = newStatus;
        currentApplication.admin_notes = newNotes;
    }

    const index = applications.findIndex(function(item) {
        return item.id === currentApplication.id;
    });

    if (index !== -1) {
        applications[index] = currentApplication;
    }

    updateStatistics();
    renderApplications();
    renderApplicationDetails(currentApplication);

    if (detailsStatus) {
        detailsStatus.value = currentApplication.status;
    }

    if (adminNotes) {
        adminNotes.value = currentApplication.admin_notes || "";
    }

    setSaveMessage("Alterações salvas com sucesso.", "success");
}

// ======================================================
// LOGOUT
// ======================================================

function logout() {
    accessToken = "";
    currentUser = null;
    applications = [];
    currentApplication = null;

    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    if (applicationDetails) {
        applicationDetails.hidden = true;
    }

    if (toggleRegistrationsButton) {
        toggleRegistrationsButton.disabled = true;
        toggleRegistrationsButton.textContent = "Aguardando login...";
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
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = adminEmailInput
            ? adminEmailInput.value.trim()
            : "";

        const password = adminPasswordInput
            ? adminPasswordInput.value
            : "";

        if (!email || !password) {
            setLoginMessage("Informe seu e-mail e sua senha.", "error");
            return;
        }

        setLoginMessage("Entrando...");

        try {
            const auth = await login(email, password);

            accessToken = auth.access_token;
            currentUser = auth.user;

            localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
            localStorage.setItem(USER_KEY, JSON.stringify(currentUser));

            const isAdmin = await verifyAdmin(currentUser.email);

            if (!isAdmin) {
                logout();

                setLoginMessage(
                    "Este usuário não possui permissão de administrador.",
                    "error"
                );

                return;
            }

            if (adminUserEmail) {
                adminUserEmail.textContent = currentUser.email;
            }

            showDashboard();
            setLoginMessage("");

            await loadApplications();
            await loadRegistrationStatus();

        } catch (error) {
            console.error("Admin login error:", error);

            accessToken = "";
            currentUser = null;

            localStorage.removeItem(AUTH_TOKEN_KEY);
            localStorage.removeItem(USER_KEY);

            setLoginMessage(
                "Não foi possível entrar ou carregar o painel. Verifique seu acesso e a configuração do Supabase.",
                "error"
            );
        }
    });
}

// ======================================================
// EVENTOS DO PAINEL
// ======================================================

if (logoutButton) {
    logoutButton.addEventListener("click", logout);
}

if (searchInput) {
    searchInput.addEventListener("input", renderApplications);
}

if (statusFilter) {
    statusFilter.addEventListener("change", renderApplications);
}

if (refreshButton) {
    refreshButton.addEventListener("click", async function() {
        try {
            await loadApplications();
            await loadRegistrationStatus();
        } catch (error) {
            console.error("Refresh error:", error);

            setApplicationsMessage(
                "Não foi possível atualizar os dados do painel.",
                "error"
            );
        }
    });
}

if (toggleRegistrationsButton) {
    toggleRegistrationsButton.addEventListener(
        "click",
        toggleRegistrationStatus
    );
}

if (closeDetailsButton) {
    closeDetailsButton.addEventListener("click", function() {
        if (applicationDetails) {
            applicationDetails.hidden = true;
        }

        currentApplication = null;
    });
}

if (saveApplicationButton) {
    saveApplicationButton.addEventListener("click", async function() {
        try {
            await saveApplication();
        } catch (error) {
            console.error("Save application error:", error);

            setSaveMessage(
                "Não foi possível salvar as alterações.",
                "error"
            );
        }
    });
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
                    "Authorization": "Bearer " + accessToken
                }
            }
        );

        if (!response.ok) {
            throw new Error("Sessão expirada.");
        }

        currentUser = await response.json();

        const isAdmin = await verifyAdmin(currentUser.email);

        if (!isAdmin) {
            logout();
            return;
        }

        if (adminUserEmail) {
            adminUserEmail.textContent = currentUser.email;
        }

        showDashboard();

        await loadApplications();
        await loadRegistrationStatus();

    } catch (error) {
        console.error("Session restore error:", error);

        logout();

        setLoginMessage(
            "Sua sessão expirou ou não foi possível carregar o painel. Entre novamente.",
            "error"
        );
    }
}

// ======================================================
// INICIALIZAÇÃO
// ======================================================

restoreSession();
