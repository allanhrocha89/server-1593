
const SUPABASE_URL = "https://tctbfrljloakqfrvtghf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_4mU1Xs4dabKVcvVjtJZWgA_sNGYlE0U";

const translations = {
  pt: {
    nav_home: "Início",
    nav_apply: "Inscrição",
    nav_rules: "Informações",
    nav_status: "Acompanhar inscrição",
    nav_cta: "Inscrever-se",
    eyebrow: "SERVER 1593 · TRANSFER CENTER",
    hero_title: "Seu próximo capítulo<br><span>começa aqui.</span>",
    hero_lead: "Envie suas informações para participar do processo de transferência para o Servidor 1593. Sua candidatura será analisada pela equipe responsável.",
    hero_button: "Começar inscrição",
    status_label: "STATUS DA TRANSFERÊNCIA",
    status_open: "INSCRIÇÕES ABERTAS",
    stat_server: "Servidor",
    stat_languages: "Idiomas",
    stat_community: "Comunidade",
    application_eyebrow: "APPLICATION",
    application_title: "Conte-nos sobre sua conta",
    application_lead: "Preencha todas as informações obrigatórias abaixo. Você pode alterar o idioma a qualquer momento.",
    nickname: "Nickname *",
    discord: "Discord *",
    current_server: "Servidor atual *",
    current_alliance: "Aliança atual *",
    power: "Power *",
    kills: "Kills *",
    profession: "Nível da profissão *",
    desired_alliance: "Aliança desejada *",
    friends: "Amigos / membros do grupo que irão com você *",
    squad1: "Poder do Squad 1 (milhões) *",
    squad2: "Poder do Squad 2 (milhões) *",
    squad3: "Poder do Squad 3 (milhões) *",
    contact: "Cor do assento na última temporada *",
    seat_placeholder: "Selecione uma cor",
    seat_gold: "Dourado",
    seat_purple: "Roxo",
    seat_blue: "Azul",
    seat_white: "Branco",
    comments: "Informações adicionais (opcional)",
    submit: "Enviar inscrição",
    info_eyebrow: "SERVER 1593",
    info_title: "Informações para transferência",
    rule1_title: "Dados corretos",
    rule1_text: "Informe dados reais e atualizados para facilitar a análise da sua candidatura.",
    rule2_title: "Grupos",
    rule2_text: "Se estiver transferindo com amigos, informe todos os jogadores que fazem parte do seu grupo.",
    rule3_title: "Análise",
    rule3_text: "O envio da inscrição não garante a transferência. Cada candidatura será analisada individualmente.",
    footer: "Transfer Applications",
    nickname_ph: "Seu nome no jogo",
    discord_ph: "Seu usuário",
    current_server_ph: "1587",
    alliance_ph: "Nome da aliança",
    power_ph: "185M",
    kills_ph: "1,234,567",
    profession_ph: "100",
    desired_ph: "Nome da aliança",
    friends_ph: "Liste os nicknames ou escreva Nenhum",
    squad_ph: "Ex.: 250 para 250 milhões",
    comments_ph: "Há algo que devemos saber? (opcional)",
    status_button: "Acompanhar inscrição",
    status_eyebrow: "APPLICATION STATUS",
    status_title: "Acompanhe sua inscrição",
    status_description: "Digite o código recebido após enviar sua candidatura para consultar o status.",
    status_code_label: "Código da inscrição",
    status_check: "Consultar status",
    status_result_code: "Código",
    status_result_status: "Status"
  },

  en: {
    nav_home: "Home",
    nav_apply: "Apply",
    nav_rules: "Information",
    nav_status: "Track Application",
    nav_cta: "Apply Now",
    eyebrow: "SERVER 1593 · TRANSFER CENTER",
    hero_title: "Your next chapter<br><span>starts here.</span>",
    hero_lead: "Submit your information to participate in the transfer process to Server 1593. Your application will be reviewed by the responsible team.",
    hero_button: "Start Application",
    status_label: "TRANSFER STATUS",
    status_open: "APPLICATIONS OPEN",
    stat_server: "Server",
    stat_languages: "Languages",
    stat_community: "Community",
    application_eyebrow: "APPLICATION",
    application_title: "Tell us about your account",
    application_lead: "Complete all required fields below. You can change the language at any time.",
    nickname: "Nickname *",
    discord: "Discord *",
    current_server: "Current server *",
    current_alliance: "Current alliance *",
    power: "Power *",
    kills: "Kills *",
    profession: "Profession level *",
    desired_alliance: "Desired alliance *",
    friends: "Friends / group members transferring with you *",
    squad1: "Squad 1 power (millions) *",
    squad2: "Squad 2 power (millions) *",
    squad3: "Squad 3 power (millions) *",
    contact: "Seat color in the last season *",
    seat_placeholder: "Select a color",
    seat_gold: "Gold",
    seat_purple: "Purple",
    seat_blue: "Blue",
    seat_white: "White",
    comments: "Additional information (optional)",
    submit: "Submit Application",
    info_eyebrow: "SERVER 1593",
    info_title: "Transfer Information",
    rule1_title: "Accurate data",
    rule1_text: "Provide accurate and up-to-date information to help with the application review.",
    rule2_title: "Groups",
    rule2_text: "If you are transferring with friends, list all players who are part of your group.",
    rule3_title: "Review",
    rule3_text: "Submitting an application does not guarantee a transfer. Each application will be reviewed individually.",
    footer: "Transfer Applications",
    nickname_ph: "Your in-game name",
    discord_ph: "Your username",
    current_server_ph: "1587",
    alliance_ph: "Alliance name",
    power_ph: "185M",
    kills_ph: "1,234,567",
    profession_ph: "100",
    desired_ph: "Alliance name",
    friends_ph: "List nicknames or enter None",
    squad_ph: "Example: 250 means 250 million",
    comments_ph: "Anything we should know? (optional)",
    status_button: "Track Application",
    status_eyebrow: "APPLICATION STATUS",
    status_title: "Track your application",
    status_description: "Enter the code you received after submitting your application to check its status.",
    status_code_label: "Application code",
    status_check: "Check Status",
    status_result_code: "Code",
    status_result_status: "Status"
  },

  es: {
    nav_home: "Inicio",
    nav_apply: "Inscripción",
    nav_rules: "Información",
    nav_status: "Consultar inscripción",
    nav_cta: "Inscribirse",
    eyebrow: "SERVER 1593 · TRANSFER CENTER",
    hero_title: "Tu próximo capítulo<br><span>comienza aquí.</span>",
    hero_lead: "Envía tu información para participar en el proceso de transferencia al Servidor 1593. Tu solicitud será revisada por el equipo responsable.",
    hero_button: "Comenzar inscripción",
    status_label: "ESTADO DE LA TRANSFERENCIA",
    status_open: "INSCRIPCIONES ABIERTAS",
    stat_server: "Servidor",
    stat_languages: "Idiomas",
    stat_community: "Comunidad",
    application_eyebrow: "APPLICATION",
    application_title: "Cuéntanos sobre tu cuenta",
    application_lead: "Completa todos los campos obligatorios. Puedes cambiar el idioma en cualquier momento.",
    nickname: "Nickname *",
    discord: "Discord *",
    current_server: "Servidor actual *",
    current_alliance: "Alianza actual *",
    power: "Power *",
    kills: "Kills *",
    profession: "Nivel de profesión *",
    desired_alliance: "Alianza deseada *",
    friends: "Amigos / miembros del grupo que se transfieren contigo *",
    squad1: "Poder del Squad 1 (millones) *",
    squad2: "Poder del Squad 2 (millones) *",
    squad3: "Poder del Squad 3 (millones) *",
    contact: "Color del asiento en la última temporada *",
    seat_placeholder: "Selecciona un color",
    seat_gold: "Dorado",
    seat_purple: "Morado",
    seat_blue: "Azul",
    seat_white: "Blanco",
    comments: "Información adicional (opcional)",
    submit: "Enviar inscripción",
    info_eyebrow: "SERVER 1593",
    info_title: "Información para la transferencia",
    rule1_title: "Datos correctos",
    rule1_text: "Proporciona datos reales y actualizados para facilitar la revisión de tu solicitud.",
    rule2_title: "Grupos",
    rule2_text: "Si te transfieres con amigos, indica todos los jugadores que forman parte de tu grupo.",
    rule3_title: "Revisión",
    rule3_text: "Enviar una solicitud no garantiza la transferencia. Cada solicitud será revisada individualmente.",
    footer: "Transfer Applications",
    nickname_ph: "Tu nombre en el juego",
    discord_ph: "Tu usuario",
    current_server_ph: "1587",
    alliance_ph: "Nombre de la alianza",
    power_ph: "185M",
    kills_ph: "1,234,567",
    profession_ph: "100",
    desired_ph: "Nombre de la alianza",
    friends_ph: "Indica los nicknames o escribe Ninguno",
    squad_ph: "Ej.: 250 equivale a 250 millones",
    comments_ph: "¿Hay algo que debamos saber? (opcional)",
    status_button: "Consultar inscripción",
    status_eyebrow: "ESTADO DE LA INSCRIPCIÓN",
    status_title: "Consulta tu inscripción",
    status_description: "Introduce el código recibido después de enviar tu solicitud para consultar su estado.",
    status_code_label: "Código de inscripción",
    status_check: "Consultar estado",
    status_result_code: "Código",
    status_result_status: "Estado"
  }
};


// ======================================================
// IDIOMA
// ======================================================

const langSelect = document.querySelector("#language");
const formLang = document.querySelector("#form-language");

function setLanguage(lang) {
  const selectedLang = translations[lang] ? lang : "pt";
  const t = translations[selectedLang];

  document.documentElement.lang =
    selectedLang === "pt" ? "pt-BR" : selectedLang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;

    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;

    if (t[key] !== undefined) {
      el.placeholder = t[key];
    }
  });

  if (langSelect) {
    langSelect.value = selectedLang;
  }

  if (formLang) {
    formLang.value = selectedLang;
  }

  localStorage.setItem("transfer_language", selectedLang);
}

const savedLanguage =
  localStorage.getItem("transfer_language") || "pt";

setLanguage(savedLanguage);

if (langSelect) {
  langSelect.addEventListener("change", (event) => {
    setLanguage(event.target.value);
  });
}


// ======================================================
// ENVIO DA INSCRIÇÃO
// ======================================================

const form = document.querySelector("#application-form");
const message = document.querySelector("#form-message");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const lang =
      (formLang && formLang.value) ||
      localStorage.getItem("transfer_language") ||
      "pt";

    const messages = {
      pt: {
        sending: "Enviando inscrição...",
        success: "Inscrição recebida com sucesso!",
        code: "Seu código de candidatura é:",
        error: "Não foi possível enviar. Tente novamente.",
        invalid: "Confira os campos obrigatórios e preencha todos corretamente."
      },
      en: {
        sending: "Submitting application...",
        success: "Application received successfully!",
        code: "Your application code is:",
        error: "Could not submit. Please try again.",
        invalid: "Please check and complete all required fields correctly."
      },
      es: {
        sending: "Enviando inscripción...",
        success: "¡Inscripción recibida con éxito!",
        code: "Tu código de solicitud es:",
        error: "No fue posible enviar. Inténtalo de nuevo.",
        invalid: "Revisa y completa correctamente todos los campos obligatorios."
      }
    };

    const currentMessages = messages[lang] || messages.pt;

    if (!form.reportValidity()) {
      if (message) {
        message.textContent = currentMessages.invalid;
      }
      return;
    }

    if (message) {
      message.textContent = currentMessages.sending;
    }

    if (
      SUPABASE_URL.startsWith("YOUR_") ||
      SUPABASE_ANON_KEY.startsWith("YOUR_")
    ) {
      if (message) {
        message.textContent =
          "Configure Supabase in app.js before publishing.";
      }
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch(
        SUPABASE_URL + "/rest/v1/rpc/submit_application",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": "Bearer " + SUPABASE_ANON_KEY
          },
          body: JSON.stringify({
            p_nickname: data.nickname.trim(),
            p_discord: data.discord.trim(),
            p_current_server: data.current_server,
            p_current_alliance: data.current_alliance.trim(),
            p_power: data.power.trim(),
            p_kills: data.kills.trim(),
            p_profession: data.profession,
            p_desired_alliance: data.desired_alliance.trim(),
            p_friends: data.friends.trim(),
            p_squad_1: data.squad_1,
            p_squad_2: data.squad_2,
            p_squad_3: data.squad_3,
            p_contact: data.contact,
            p_comments: data.comments.trim(),
            p_language: data.language || lang
          })
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      const applicationCode = result && result[0]
        ? result[0].application_code
        : null;

      if (!applicationCode) {
        throw new Error("Application code was not returned.");
      }

      form.reset();

      if (formLang) {
        formLang.value = lang;
      }

      if (message) {
        message.replaceChildren();

        const success = document.createElement("strong");
        success.textContent = currentMessages.success;

        const codeText = document.createElement("span");
        codeText.textContent =
          currentMessages.code + " " + applicationCode;

        message.appendChild(success);
        message.appendChild(document.createElement("br"));
        message.appendChild(codeText);

        message.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }

      console.log("Application submitted successfully:", applicationCode);

    } catch (error) {
      console.error("Application submission error:", error);

      if (message) {
        message.textContent = currentMessages.error;
      }
    }
  });
}


// ======================================================
// CONSULTA DE STATUS
// ======================================================

const statusCodeInput = document.querySelector("#application-code");
const statusButton = document.querySelector("#check-status");
const statusMessage = document.querySelector("#status-message");
const statusResult = document.querySelector("#status-result");
const resultCode = document.querySelector("#result-code");
const resultStatus = document.querySelector("#result-status");

const statusTranslations = {
  pt: {
    pending: "Pendente",
    reviewing: "Em análise",
    approved: "Aprovado",
    rejected: "Rejeitado",
    transferred: "Transferido",
    cancelled: "Cancelado",
    searching: "Consultando inscrição...",
    notFound: "Não encontramos uma inscrição com esse código.",
    error: "Não foi possível consultar o status. Tente novamente.",
    enterCode: "Digite o código da sua inscrição."
  },
  en: {
    pending: "Pending",
    reviewing: "Under review",
    approved: "Approved",
    rejected: "Rejected",
    transferred: "Transferred",
    cancelled: "Cancelled",
    searching: "Checking application...",
    notFound: "No application was found with this code.",
    error: "Could not check the status. Please try again.",
    enterCode: "Enter your application code."
  },
  es: {
    pending: "Pendiente",
    reviewing: "En revisión",
    approved: "Aprobado",
    rejected: "Rechazado",
    transferred: "Transferido",
    cancelled: "Cancelado",
    searching: "Consultando solicitud...",
    notFound: "No encontramos una solicitud con este código.",
    error: "No fue posible consultar el estado. Inténtalo de nuevo.",
    enterCode: "Introduce el código de tu inscripción."
  }
};

async function checkApplicationStatus() {
  if (!statusCodeInput || !statusMessage || !statusResult) {
    return;
  }

  const lang = localStorage.getItem("transfer_language") || "pt";
  const t = statusTranslations[lang] || statusTranslations.pt;
  const code = statusCodeInput.value.trim().toUpperCase();

  statusResult.hidden = true;

  if (!code) {
    statusMessage.textContent = t.enterCode;
    return;
  }

  statusMessage.textContent = t.searching;

  try {
    const response = await fetch(
      SUPABASE_URL + "/rest/v1/rpc/check_application_status",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": "Bearer " + SUPABASE_ANON_KEY
        },
        body: JSON.stringify({
          lookup_code: code
        })
      }
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const result = await response.json();

    if (!result || result.length === 0) {
      statusMessage.textContent = t.notFound;
      return;
    }

    const application = result[0];
    const translatedStatus =
      t[application.status] || application.status;

    if (resultCode) {
      resultCode.textContent = application.application_code;
    }

    if (resultStatus) {
      resultStatus.textContent = translatedStatus;
    }

    statusResult.hidden = false;
    statusMessage.textContent = "";

  } catch (error) {
    console.error("Status lookup error:", error);
    statusResult.hidden = true;
    statusMessage.textContent = t.error;
  }
}

if (statusButton) {
  statusButton.addEventListener("click", (event) => {
    event.preventDefault();
    checkApplicationStatus();
  });
}

if (statusCodeInput) {
  statusCodeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      checkApplicationStatus();
    }
  });
}

async function getPublicRegistrationStatus() {
    const response = await fetch(
        SUPABASE_URL + "/rest/v1/rpc/get_transfer_status",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": "Bearer " + SUPABASE_ANON_KEY
            },
            body: "{}"
        }
    );

    if (!response.ok) {
        throw new Error("Não foi possível consultar as inscrições.");
    }

    return Boolean(await response.json());
}

function renderPublicRegistrationStatus(isOpen) {
    const dot = document.querySelector("#public-status-dot");
    const label = document.querySelector("#public-registration-status");
    const submitButton = document.querySelector(
        "#application-form button[type='submit']"
    );

    const language = (
        localStorage.getItem("transfer_language") || "pt"
    ).toLowerCase().slice(0, 2);

    const messages = {
        pt: {
            open: "INSCRIÇÕES ABERTAS",
            closed: "INSCRIÇÕES FECHADAS"
        },
        en: {
            open: "APPLICATIONS OPEN",
            closed: "APPLICATIONS CLOSED"
        },
        es: {
            open: "INSCRIPCIONES ABIERTAS",
            closed: "INSCRIPCIONES CERRADAS"
        }
    };

    const text = messages[language] || messages.pt;

    if (label) {
        label.textContent = isOpen ? text.open : text.closed;
    }

    if (dot) {
        dot.classList.toggle("is-closed", !isOpen);
        dot.classList.toggle("is-open", isOpen);
    }

    if (submitButton) {
        submitButton.disabled = !isOpen;
        submitButton.classList.toggle("registration-closed", !isOpen);
    }
}

async function refreshPublicRegistrationStatus() {
    try {
        const isOpen = await getPublicRegistrationStatus();
        renderPublicRegistrationStatus(isOpen);
        return isOpen;
    } catch (error) {
        console.error("Erro ao consultar inscrições:", error);

        // Em caso de falha na consulta, não permitir novo envio
        // pela interface até confirmar que as inscrições estão abertas.
        renderPublicRegistrationStatus(false);
        return false;
    }
}
