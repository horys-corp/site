# Horys — Sistemas, apps e games

Site institucional estático em PT-BR, com identidade Retro-Futurism: tipografia pixelada, neon azul/rosa/ciano, grade geométrica, monitor CRT em CSS e glitch discreto.

## Executar localmente

Não há dependências de produção nem etapa de build. Na raiz do projeto:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Abra http://127.0.0.1:4173. Também é possível abrir `index.html` diretamente no navegador.

## Páginas

- `index.html`: apresentação, sistemas/apps/games, terminal interativo, contato e rodapé.
- `privacidade.html`: política do site e dos aplicativos pagos publicados pela Horys que a indicam.
- `termos.html`: termos de uso do site e informações sobre compra e contratação.
- `servicos.html`: compatibilidade com o endereço antigo, encaminhando para a seção de criações.
- `obrigado.html`: compatibilidade com o endereço antigo de contato.

## Publicação

A configuração Netlify continua publicando a raiz, sem comando de build. As rotas `/privacidade`, `/privacy` e `/privacy-policy` servem a política de privacidade. O endereço estável para as lojas, depois de publicar no domínio configurado, é `https://horys.dev/privacidade.html`.

O domínio `horys.dev` está definido nos metadados, no `sitemap.xml` e no `robots.txt`. Atualize esses arquivos se o domínio de produção mudar.

## Privacidade

O site não inclui anúncios, analytics, cookies de rastreamento, bibliotecas de terceiros ou formulários. O contato abre o cliente de e-mail do visitante. Fontes e imagens são locais. A infraestrutura de hospedagem e os serviços de e-mail podem processar registros técnicos e mensagens, como informado na política.

A política reflete as informações fornecidas pelo responsável: aplicativos pagos, sem anúncios, analytics ou coleta de dados pessoais. Vincule essa política apenas a produtos que atendam a essa descrição; se um app passar a usar login, coleta ou serviços externos, atualize a política e as declarações da loja antes da mudança.

## Acessibilidade e interação

Menu móvel com `aria-expanded`, fechamento por Escape, links de salto, foco visível, botões nativos e anúncios acessíveis na troca de modo do terminal. O layout é responsivo e respeita `prefers-reduced-motion`. O conteúdo e os links essenciais permanecem disponíveis sem JavaScript.

Os cards de criações entram em sequência ao aparecer na tela. Com mouse, o brilho neon acompanha o ponteiro e os cards inclinam suavemente, retornando ao estado inicial ao sair. O monitor do hero flutua no desktop. Telas de toque não recebem o efeito de inclinação; a preferência por movimento reduzido desativa as animações.

## Arquivos visuais

`styles.css` centraliza os tokens e o layout. O efeito CRT e o glitch estão no `<style>` do `index.html`. Fontes Press Start 2P e Space Mono em `assets/fonts/`, com suas licenças OFL. `assets/social-card.png` é a imagem local de compartilhamento social. Os SVGs de interface são inline.

Contato: contato@horys.dev

© 2026 Horys.
