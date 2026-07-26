// ---------- in-/uitloggen (mockup) ----------
(function () {
  var KEY = 'kp-ingelogd';
  function ingelogd() { try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function pas_toe() { document.body.classList.toggle('is-ingelogd', ingelogd()); }
  document.addEventListener('DOMContentLoaded', function () {
    pas_toe();
    document.addEventListener('click', function (e) {
      var el = e.target.closest('[data-auth-action]');
      if (!el) return;
      var actie = el.getAttribute('data-auth-action');
      try {
        if (actie === 'login') localStorage.setItem(KEY, '1');
        else localStorage.removeItem(KEY);
      } catch (err) {}
      pas_toe();
      if (actie === 'login' && !/leden\.html$/.test(location.pathname)) {
        e.preventDefault();
      }
      if (actie === 'logout' && !/leden\.html$/.test(location.pathname)) {
        e.preventDefault();
      }
    });
  });
})();

// Koperen Passer — statische website
(function () {
  // ---------- mobiel slide-over menu ----------
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('mainNav');
  var overlay = document.getElementById('navOverlay');
  var closeBtn = document.getElementById('navClose');

  function setMenu(open) {
    nav.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    toggle.classList.toggle('open', open);
    document.body.classList.toggle('nav-locked', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (toggle && nav && overlay) {
    toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
    overlay.addEventListener('click', function () { setMenu(false); });
    if (closeBtn) closeBtn.addEventListener('click', function () { setMenu(false); });
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  // ---------- filterchips (agenda) ----------
  var filters = document.getElementById('filters');
  if (filters) {
    var cards = Array.prototype.slice.call(document.querySelectorAll('.card[data-cat], article[data-cat]'));
    var blocks = Array.prototype.slice.call(document.querySelectorAll('[data-month-block]'));
    var countEl = document.getElementById('filterCount');

    filters.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      filters.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      var cat = chip.getAttribute('data-cat') || 'alles';
      var visible = 0;
      cards.forEach(function (card) {
        var show = cat === 'alles' || card.getAttribute('data-cat') === cat;
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      blocks.forEach(function (block) {
        var any = block.querySelector('.card[data-cat]:not([style*="display: none"]), article[data-cat]:not([style*="display: none"])');
        block.style.display = any ? '' : 'none';
      });
      if (countEl) countEl.textContent = visible === 1 ? '1 activiteit' : visible + ' activiteiten';
    });
  }

  // ---------- nieuwsbriefformulieren ----------
  document.querySelectorAll('.newsletter-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button');
      btn.textContent = 'Ingeschreven ✓';
      btn.disabled = true;
    });
  });

  // ---------- faq ----------
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq-item');
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        o.classList.remove('open');
        o.querySelector('.faq-icon').textContent = '+';
      });
      if (!wasOpen) {
        item.classList.add('open');
        q.querySelector('.faq-icon').textContent = '−';
      }
    });
  });

  // ---------- groepen: zoeken ----------
  var zoek = document.getElementById('groepSearch');
  if (zoek) {
    var provBlocks = Array.prototype.slice.call(document.querySelectorAll('.prov-block'));
    var totaalLabel = document.getElementById('groepCount');
    var leeg = document.getElementById('geenResultaat');
    var wis = document.getElementById('wisZoek');

    function filterGroepen() {
      var q = zoek.value.trim().toLowerCase();
      var totaal = 0;
      provBlocks.forEach(function (block) {
        var n = 0;
        block.querySelectorAll('.g-item').forEach(function (item) {
          var show = !q || item.textContent.toLowerCase().indexOf(q) !== -1;
          item.style.display = show ? '' : 'none';
          if (show) n++;
        });
        block.style.display = n ? '' : 'none';
        var c = block.querySelector('.count');
        if (c) c.textContent = n === 1 ? '1 groep' : n + ' groepen';
        totaal += n;
      });
      if (totaalLabel) totaalLabel.textContent = q ? (totaal === 1 ? '1 groep gevonden' : totaal + ' groepen gevonden') : '70 lokale groepen';
      if (leeg) leeg.classList.toggle('hidden', totaal !== 0);
    }
    zoek.addEventListener('input', filterGroepen);
    if (wis) wis.addEventListener('click', function () { zoek.value = ''; filterGroepen(); });
  }

  // ---------- inschrijfformulier activiteit ----------
  var actForm = document.getElementById('actForm');
  if (actForm) {
    actForm.addEventListener('submit', function (e) {
      e.preventDefault();
      document.getElementById('actFormWrap').classList.add('hidden');
      document.getElementById('actSuccess').classList.remove('hidden');
    });
  }

  // ---------- word lid ----------
  var lidForm = document.getElementById('lidForm');
  if (lidForm) {
    lidForm.addEventListener('submit', function (e) {
      e.preventDefault();
      document.getElementById('lidFormWrap').classList.add('hidden');
      document.getElementById('lidSuccess').classList.remove('hidden');
    });
  }
})();


// ---------- ledenomgeving ----------
(function () {
  var ledenWrap = document.getElementById('ledenLijst');
  if (!ledenWrap) return;
  var kalWrap = document.getElementById('ledenKalender');

  var activiteiten = [
    { wanneer: 'toekomst', datum: 'za 18 jul', titel: 'Bezoek aan het Industriemuseum', plaats: 'Industriemuseum, Gent', publiek: true },
    { wanneer: 'toekomst', datum: 'do 06 aug', titel: 'Architectuurwandeling door Gent', plaats: 'Gent centrum', publiek: true },
    { wanneer: 'toekomst', datum: 'za 29 aug', titel: 'Lezing en gezamenlijk diner', plaats: 'Sint-Baafshuis, Gent', publiek: false },
    { wanneer: 'toekomst', datum: 'za 12 sep', titel: 'Operabezoek: La Traviata', plaats: 'Opera Gent', publiek: false },
    { wanneer: 'voorbij', datum: 'za 20 jun', titel: 'Lentewandeling door de Leiestreek', plaats: 'Sint-Martens-Latem', publiek: true },
    { wanneer: 'voorbij', datum: 'za 09 mei', titel: 'Bezoek aan het STAM', plaats: 'STAM, Gent', publiek: true },
    { wanneer: 'voorbij', datum: 'za 18 apr', titel: 'Algemene ledenvergadering', plaats: 'Sint-Baafshuis, Gent', publiek: false }
  ];
  var bestuursOrde = ['Voorzitter', 'Ondervoorzitter', 'Secretaris', 'Penningmeester'];
  var leden = [
    { naam: 'Rik De Smet', functie: 'Voorzitter', gemeente: 'Gent', email: 'rik@artevelde.koperenpasser.be' },
    { naam: 'Mia Peeters', functie: 'Ondervoorzitter', gemeente: 'Gentbrugge', email: 'mia@artevelde.koperenpasser.be' },
    { naam: 'Karel Vermeulen', functie: 'Secretaris', gemeente: 'Mariakerke', email: 'karel@artevelde.koperenpasser.be' },
    { naam: 'An De Waele', functie: 'Penningmeester', gemeente: 'Gent', email: 'an@artevelde.koperenpasser.be' },
    { naam: 'Lieve Baert', functie: 'Lid', gemeente: 'Drongen', email: 'lieve.baert@email.be' },
    { naam: 'Paul Claeys', functie: 'Lid', gemeente: 'Gent', email: 'paul.claeys@email.be' },
    { naam: 'Greta Coppens', functie: 'Lid', gemeente: 'Sint-Amandsberg', email: 'greta.coppens@email.be' },
    { naam: 'Jan Maes', functie: 'Lid', gemeente: 'Merelbeke', email: 'jan.maes@email.be' },
    { naam: 'Els Van Damme', functie: 'Lid', gemeente: 'De Pinte', email: 'els.vandamme@email.be' },
    { naam: 'Hugo Willems', functie: 'Lid', gemeente: 'Gentbrugge', email: 'hugo.willems@email.be' }
  ];
  var documenten = [
    { titel: 'Programmafolder najaar 2026', datum: 'juni 2026' },
    { titel: 'Verslag algemene ledenvergadering 2026', datum: 'april 2026' },
    { titel: 'Huishoudelijk reglement', datum: 'januari 2025' },
    { titel: 'Historiek van de club (jubileumbrochure)', datum: '2020' }
  ];

  var zoekveld = document.getElementById('ledenZoek');
  var kalMode = 'toekomst';
  var sortMode = 'alfabetisch';

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function past(t) {
    var q = (zoekveld && zoekveld.value || '').trim().toLowerCase();
    return !q || t.toLowerCase().indexOf(q) !== -1;
  }
  function achternaam(n) { var d = n.split(' '); return d.slice(1).join(' ') || n; }

  function renderKalender() {
    if (!kalWrap) return;
    var items = activiteiten.filter(function (a) { return a.wanneer === kalMode && past(a.titel + ' ' + a.plaats); });
    kalWrap.innerHTML = items.map(function (a) {
      var tag = a.publiek ? '<span class="tag tag-groen">Publiek</span>' : '<span class="tag">Voor leden</span>';
      return '<div class="kal-row"><span class="kal-badge">' + esc(a.datum) + '</span>' +
        '<div class="kal-main"><span class="kal-title">' + esc(a.titel) + '</span><span class="kal-place">' + esc(a.plaats) + '</span></div>' +
        tag + '<a href="activiteit-industriemuseum.html" class="link-primary">Bekijk →</a></div>';
    }).join('');
    document.getElementById('kalenderLeeg').classList.toggle('hidden', items.length !== 0);
  }

  function renderLeden() {
    var lijst = leden.filter(function (l) { return past(l.naam + ' ' + l.functie + ' ' + l.gemeente); });
    lijst = lijst.slice().sort(function (a, b) {
      if (sortMode === 'functie') {
        var ia = bestuursOrde.indexOf(a.functie); var ib = bestuursOrde.indexOf(b.functie);
        var ra = ia === -1 ? 99 : ia; var rb = ib === -1 ? 99 : ib;
        if (ra !== rb) return ra - rb;
      }
      if (sortMode === 'gemeente') {
        var g = a.gemeente.localeCompare(b.gemeente, 'nl');
        if (g !== 0) return g;
      }
      return achternaam(a.naam).localeCompare(achternaam(b.naam), 'nl');
    });
    var vorigeKop = null;
    var html = '';
    lijst.forEach(function (l) {
      var kop = '';
      if (sortMode === 'functie') kop = bestuursOrde.indexOf(l.functie) !== -1 ? 'Bestuur' : 'Leden';
      if (sortMode === 'gemeente') kop = l.gemeente;
      if (kop && kop !== vorigeKop) { html += '<h3 class="groep-kop">' + esc(kop) + '</h3>'; vorigeKop = kop; }
      var isBestuur = bestuursOrde.indexOf(l.functie) !== -1;
      var fCls = isBestuur ? 'lid-functie lid-functie--bestuur' : 'lid-functie';
      html += '<div class="lid-row"><span class="lid-naam">' + esc(l.naam) + '</span>' +
        '<span class="' + fCls + '">' + esc(l.functie) + '</span>' +
        '<span class="lid-gemeente">' + esc(l.gemeente) + '</span>' +
        '<a href="mailto:' + esc(l.email) + '">' + esc(l.email) + '</a></div>';
    });
    document.getElementById('ledenLijst').innerHTML = html;
    document.getElementById('ledenLeeg').classList.toggle('hidden', lijst.length !== 0);
  }

  function renderDocs() {
    var items = documenten.filter(function (d) { return past(d.titel); });
    document.getElementById('ledenDocs').innerHTML = items.map(function (d) {
      return '<a href="#" class="doc-item"><span class="doc-type">PDF</span><span class="doc-name">' + esc(d.titel) + '</span><span class="doc-date">' + esc(d.datum) + '</span></a>';
    }).join('');
    document.getElementById('docsLeeg').classList.toggle('hidden', items.length !== 0);
  }

  function renderAll() { renderKalender(); renderLeden(); renderDocs(); }

  var kalChips = document.getElementById('kalChips');
  if (kalChips) kalChips.addEventListener('click', function (e) {
    var chip = e.target.closest('.chip'); if (!chip) return;
    this.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('active'); });
    chip.classList.add('active');
    kalMode = chip.getAttribute('data-kal');
    renderKalender();
  });
  document.getElementById('sortChips').addEventListener('click', function (e) {
    var chip = e.target.closest('.chip'); if (!chip) return;
    this.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('active'); });
    chip.classList.add('active');
    sortMode = chip.getAttribute('data-sort');
    renderLeden();
  });
  if (zoekveld) zoekveld.addEventListener('input', renderAll);

  renderAll();
})();


// ---------- eigen foto opladen (hero + terugblikken) ----------
(function () {
  var imgs = document.querySelectorAll('img[data-upload]');
  if (!imgs.length) return;
  Array.prototype.forEach.call(imgs, function (img) {
    var slot = img.getAttribute('data-upload');
    var key = 'kp-foto-' + slot;
    try {
      var stored = localStorage.getItem(key);
      if (stored) img.src = stored;
    } catch (e) {}
    var host = img.parentElement;
    host.classList.add('foto-slot-host');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'foto-browse';
    btn.textContent = 'Eigen foto kiezen';
    btn.setAttribute('aria-label', 'Eigen foto kiezen voor: ' + (img.alt || slot));
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.className = 'foto-input';
    btn.addEventListener('click', function () { input.click(); });
    input.addEventListener('change', function () {
      var file = input.files && input.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        var tmp = new Image();
        tmp.onload = function () {
          var max = 1600;
          var s = Math.min(1, max / Math.max(tmp.width, tmp.height));
          var c = document.createElement('canvas');
          c.width = Math.round(tmp.width * s);
          c.height = Math.round(tmp.height * s);
          c.getContext('2d').drawImage(tmp, 0, 0, c.width, c.height);
          var url = c.toDataURL('image/jpeg', 0.85);
          document.querySelectorAll('img[data-upload="' + slot + '"]').forEach(function (el) { el.src = url; });
          try { localStorage.setItem(key, url); } catch (e) {}
        };
        tmp.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
    host.appendChild(btn);
    host.appendChild(input);
  });
})();


// ---------- contactformulier ----------
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('contactFormWrap').classList.add('hidden');
    document.getElementById('contactSuccess').classList.remove('hidden');
  });
})();
