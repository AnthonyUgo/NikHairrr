// src/main.ts
import './styles/theme.css.ts';
import * as h from './hero.css.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <section class="${h.shell}">
    <h1 class="${h.title}">NikkHair</h1>
    <p class="${h.sub}">Luxury hair, zero compromise—bundles, frontals, and wigs that actually last.</p>
    <button class="${h.cta}">Shop Bundles</button>
  </section>
`;
