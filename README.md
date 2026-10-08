# Server 1593 Transfer Center

Site neutro para o **Servidor 1593**, sem referência a qualquer aliança específica.

## Idiomas

O visitante pode escolher:
- Português
- English
- Español

A escolha é salva no navegador e o idioma escolhido também é gravado junto com a candidatura no Supabase.

## Publicação gratuita

### Supabase
1. Crie um projeto.
2. Abra o SQL Editor.
3. Execute `supabase/schema.sql`.
4. Coloque a Project URL e a anon/publishable key no `app.js`.
5. Nunca coloque a `service_role` key no frontend.

### Cloudflare Pages
1. Suba estes arquivos para um repositório GitHub.
2. Crie um projeto no Cloudflare Pages.
3. Conecte o repositório.
4. Framework: None.
5. Build command: vazio.
6. Output directory: `/`.
7. Publique.

## Próxima etapa
Criar painel administrativo protegido por login para revisar, filtrar, aprovar e rejeitar candidaturas.
