const SUPABASE_URL = "https://tctbfrljloakqfrvtghf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_4mU1Xs4dabKVcvVjtJZWgA_sNGYlE0U";

const translations = {
  pt: {
    nav_home:"Início",nav_apply:"Inscrição",nav_rules:"Informações",nav_cta:"Inscrever-se",
    eyebrow:"SERVER 1593 · TRANSFER CENTER",hero_title:"Seu próximo capítulo<br><span>começa aqui.</span>",
    hero_lead:"Envie suas informações para participar do processo de transferência para o Servidor 1593. Sua candidatura será analisada pela equipe responsável.",
    hero_button:"Começar inscrição",rules_button:"Ver informações",status_label:"STATUS DA TRANSFERÊNCIA",status_open:"INSCRIÇÕES ABERTAS",
    stat_server:"Servidor",stat_languages:"Idiomas",stat_community:"Comunidade",
    application_eyebrow:"APPLICATION",application_title:"Conte-nos sobre sua conta",application_lead:"Preencha as informações abaixo. Você pode alterar o idioma a qualquer momento.",
    nickname:"Nickname *",discord:"Discord *",current_server:"Servidor atual *",current_alliance:"Aliança atual",power:"Power *",kills:"Kills",profession:"Profissão",desired_alliance:"Aliança desejada",
    friends:"Amigos / membros do grupo que irão com você",squad1:"Grupo / Squad 1",squad2:"Grupo / Squad 2",squad3:"Grupo / Squad 3",contact:"Contato adicional",comments:"Informações adicionais",submit:"Enviar inscrição",
    info_eyebrow:"SERVER 1593",info_title:"Informações para transferência",rule1_title:"Dados corretos",rule1_text:"Informe dados reais e atualizados para facilitar a análise da sua candidatura.",rule2_title:"Grupos",rule2_text:"Se estiver transferindo com amigos, informe todos os jogadores que fazem parte do seu grupo.",rule3_title:"Análise",rule3_text:"O envio da inscrição não garante a transferência. Cada candidatura será analisada individualmente.",footer:"Transfer Applications",
    nickname_ph:"Seu nome no jogo",discord_ph:"Seu usuário",alliance_ph:"Nome da aliança",profession_ph:"Profissão / especialidade",desired_ph:"Nome da aliança",friends_ph:"Liste os nicknames ou membros do grupo",optional:"Opcional",contact_ph:"Discord / outro contato",comments_ph:"Há algo que devemos saber?"
  },
  en: {
    nav_home:"Home",nav_apply:"Apply",nav_rules:"Information",nav_cta:"Apply Now",
    eyebrow:"SERVER 1593 · TRANSFER CENTER",hero_title:"Your next chapter<br><span>starts here.</span>",
    hero_lead:"Submit your information to participate in the transfer process to Server 1593. Your application will be reviewed by the responsible team.",
    hero_button:"Start Application",rules_button:"View Information",status_label:"TRANSFER STATUS",status_open:"APPLICATIONS OPEN",
    stat_server:"Server",stat_languages:"Languages",stat_community:"Community",
    application_eyebrow:"APPLICATION",application_title:"Tell us about your account",application_lead:"Fill in the information below. You can change the language at any time.",
    nickname:"Nickname *",discord:"Discord *",current_server:"Current Server *",current_alliance:"Current Alliance",power:"Power *",kills:"Kills",profession:"Profession",desired_alliance:"Desired Alliance",
    friends:"Friends / group members transferring with you",squad1:"Group / Squad 1",squad2:"Group / Squad 2",squad3:"Group / Squad 3",contact:"Additional contact",comments:"Additional information",submit:"Submit Application",
    info_eyebrow:"SERVER 1593",info_title:"Transfer Information",rule1_title:"Accurate data",rule1_text:"Provide accurate and up-to-date information to help with the application review.",rule2_title:"Groups",rule2_text:"If you are transferring with friends, list all players who are part of your group.",rule3_title:"Review",rule3_text:"Submitting an application does not guarantee a transfer. Each application will be reviewed individually.",footer:"Transfer Applications",
    nickname_ph:"Your in-game name",discord_ph:"Your username",alliance_ph:"Alliance name",profession_ph:"Profession / specialty",desired_ph:"Alliance name",friends_ph:"List nicknames or group members",optional:"Optional",contact_ph:"Discord / other contact",comments_ph:"Anything we should know?"
  },
  es: {
    nav_home:"Inicio",nav_apply:"Inscripción",nav_rules:"Información",nav_cta:"Inscribirse",
    eyebrow:"SERVER 1593 · TRANSFER CENTER",hero_title:"Tu próximo capítulo<br><span>comienza aquí.</span>",
    hero_lead:"Envía tu información para participar en el proceso de transferencia al Servidor 1593. Tu solicitud será revisada por el equipo responsable.",
    hero_button:"Comenzar inscripción",rules_button:"Ver información",status_label:"ESTADO DE LA TRANSFERENCIA",status_open:"INSCRIPCIONES ABIERTAS",
    stat_server:"Servidor",stat_languages:"Idiomas",stat_community:"Comunidad",
    application_eyebrow:"APPLICATION",application_title:"Cuéntanos sobre tu cuenta",application_lead:"Completa la información. Puedes cambiar el idioma en cualquier momento.",
    nickname:"Nickname *",discord:"Discord *",current_server:"Servidor actual *",current_alliance:"Alianza actual",power:"Power *",kills:"Kills",profession:"Profesión",desired_alliance:"Alianza deseada",
    friends:"Amigos / miembros del grupo que se transfieren contigo",squad1:"Grupo / Squad 1",squad2:"Grupo / Squad 2",squad3:"Grupo / Squad 3",contact:"Contacto adicional",comments:"Información adicional",submit:"Enviar inscripción",
    info_eyebrow:"SERVER 1593",info_title:"Información para la transferencia",rule1_title:"Datos correctos",rule1_text:"Proporciona datos reales y actualizados para facilitar la revisión de tu solicitud.",rule2_title:"Grupos",rule2_text:"Si te transfieres con amigos, indica todos los jugadores que forman parte de tu grupo.",rule3_title:"Revisión",rule3_text:"Enviar una solicitud no garantiza la transferencia. Cada solicitud será revisada individualmente.",footer:"Transfer Applications",
    nickname_ph:"Tu nombre en el juego",discord_ph:"Tu usuario",alliance_ph:"Nombre de la alianza",profession_ph:"Profesión / especialidad",desired_ph:"Nombre de la alianza",friends_ph:"Indica los nicknames o miembros del grupo",optional:"Opcional",contact_ph:"Discord / otro contacto",comments_ph:"¿Hay algo que debamos saber?"
  }
};

const langSelect = document.querySelector("#language");
const formLang = document.querySelector("#form-language");

function setLanguage(lang){
  const t = translations[lang];
  document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) el.placeholder = t[key];
  });
  langSelect.value = lang;
  formLang.value = lang;
  localStorage.setItem("transfer_language", lang);
}
setLanguage(localStorage.getItem("transfer_language") || "pt");
langSelect.addEventListener("change", e => setLanguage(e.target.value));

const form = document.querySelector("#application-form");
const message = document.querySelector("#form-message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const lang = formLang.value;
  const messages = {
    pt:["Enviando inscrição...","Inscrição recebida. A equipe responsável analisará seus dados."],
    en:["Submitting application...","Application received. The responsible team will review your information."],
    es:["Enviando inscripción...","Inscripción recibida. El equipo responsable revisará tus datos."]
  };
  message.textContent = messages[lang][0];

  if (SUPABASE_URL.startsWith("YOUR_") || SUPABASE_ANON_KEY.startsWith("YOUR_")) {
    message.textContent = "Configure Supabase in app.js before publishing.";
    return;
  }

  const data = Object.fromEntries(new FormData(form).entries());
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/applications`, {
      method:"POST",
      headers:{"Content-Type":"application/json","apikey":SUPABASE_ANON_KEY,"Authorization":`Bearer ${SUPABASE_ANON_KEY}`,"Prefer":"return=minimal"},
      body:JSON.stringify(data)
    });
    if(!response.ok) throw new Error(await response.text());
    form.reset();
    formLang.value = lang;
    message.textContent = messages[lang][1];
  } catch(error) {
    console.error(error);
    message.textContent = lang === "pt" ? "Não foi possível enviar. Tente novamente." : lang === "en" ? "Could not submit. Please try again." : "No fue posible enviar. Inténtalo de nuevo.";
  }
});
