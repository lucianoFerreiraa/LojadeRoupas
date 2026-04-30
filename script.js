// ============ DADOS ============
const products = [
    {
        id: 1,
        name: 'Vestido Slip Midi',
        cat: 'feminino',
        season: 'verao',
        price: 'R$ 1.290',
        tag: 'Novo',
        img: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=85&auto=format&fit=crop'
    },
    {
        id: 2,
        name: 'Blazer Estruturado Preto',
        cat: 'feminino',
        season: 'inverno',
        price: 'R$ 1.890',
        tag: '',
        img: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=85&auto=format&fit=crop'
    },
    {
        id: 3,
        name: 'Camisa Oxford Marinho',
        cat: 'masculino',
        season: 'inverno',
        price: 'R$ 890',
        tag: '',
        img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=85&auto=format&fit=crop'
    },
    {
        id: 4,
        name: 'Terno Slim Antracite',
        cat: 'masculino',
        season: 'inverno',
        price: 'R$ 3.490',
        tag: 'Ícone',
        img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=85&auto=format&fit=crop'
    },
    {
        id: 5,
        name: 'Vestido de Linho Off',
        cat: 'feminino',
        season: 'verao',
        price: 'R$ 1.590',
        tag: '',
        img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=85&auto=format&fit=crop'
    },
    {
        id: 6,
        name: 'Conjunto Alfaiataria Areia',
        cat: 'masculino',
        season: 'verao',
        price: 'R$ 2.790',
        tag: 'Novo',
        img: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=85&auto=format&fit=crop'
    }
];

const ugcImages = [
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=85&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=85&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=85&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=85&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=85&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600&q=85&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=600&q=85&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=85&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=600&q=85&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=85&auto=format&fit=crop'
];

const wishlist = new Set();
let currentFilter = 'all';

// ============ ELEMENT SDK ============
const defaultConfig = {
    brand_name: 'SUA LOGO AQUI!',
    whatsapp_number: '5569992892060',
    hero_subtitle: 'NEW COLLECTION — FW/25',
    hero_title: 'A expressão da sua nova versão.',
    hero_cta: 'VER COLEÇÃO COMPLETA',
    catalog_title: 'The Lookbook',
    catalog_subtitle: 'Edição Limitada · Outono/Inverno',
    social_tagline: 'Vista-se de confiança todos os dias.',
    social_subtitle: '@sualoja no Instagram',
    whatsapp_message: 'Olá, amei o Lookbook! Gostaria de verificar a disponibilidade de uma peça.'
};

function onConfigChange(config) {
    const brand = config.brand_name || defaultConfig.brand_name;
    document.getElementById('brandLogo').textContent = brand;
    document.getElementById('footerLogo').textContent = brand;
    document.getElementById('heroEyebrow').innerHTML = '<span class="inline-block w-8 h-px bg-[#D4AF37]"></span> ' + (config.hero_subtitle || defaultConfig.hero_subtitle);

    // Divide o título principal em duas linhas, a segunda em itálico/script
    const heroTitle = (config.hero_title || defaultConfig.hero_title).trim();
    const parts = splitTitle(heroTitle);
    document.getElementById('heroTitle1').textContent = parts[0];
    document.getElementById('heroTitle2').innerHTML = parts[1] ? `<span class="font-script">${escapeHtml(parts[1])}</span>` : '';

    document.getElementById('heroCtaText').textContent = config.hero_cta || defaultConfig.hero_cta;

    const catTitle = (config.catalog_title || defaultConfig.catalog_title).trim();
    const catParts = splitTitle(catTitle);
    document.getElementById('catalogTitle').innerHTML = catParts[1] ? `${escapeHtml(catParts[0])} <span class="font-script text-[#D4AF37]">${escapeHtml(catParts[1])}</span>` : escapeHtml(catTitle);

    document.getElementById('catalogSubtitle').textContent = config.catalog_subtitle || defaultConfig.catalog_subtitle;
    document.getElementById('socialSubtitle').textContent = config.social_subtitle || defaultConfig.social_subtitle;

    const tagline = (config.social_tagline || defaultConfig.social_tagline).trim();
    const tagParts = splitTitle(tagline);
    if (tagParts[1]) {
        document.getElementById('socialTagline').innerHTML = `${escapeHtml(tagParts[0])} <span class="font-script text-[#D4AF37]">${escapeHtml(tagParts[1])}</span>`;
    } else {
        document.getElementById('socialTagline').textContent = tagline;
    }

    updateWhatsAppLink();
}

function splitTitle(text) {
    const words = text.split(' ');
    if (words.length <= 2) return [text, ''];
    const half = Math.ceil(words.length / 2);
    return [words.slice(0, half).join(' '), words.slice(half).join(' ')];
}

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    } [c]));
}

function getConfig() {
    return (window.elementSdk && window.elementSdk.config) || defaultConfig;
}

function updateWhatsAppLink(customMsg) {
    const c = getConfig();
    const num = (c.whatsapp_number || defaultConfig.whatsapp_number).replace(/\D/g, '');
    const msg = customMsg || c.whatsapp_message || defaultConfig.whatsapp_message;
    const url = `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
    document.getElementById('waLink').href = url;
    return url;
}

if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities: () => ({
            recolorables: [],
            borderables: [],
            fontEditable: undefined,
            fontSizeable: undefined
        }),
        mapToEditPanelValues: (config) => new Map([
            ['brand_name', config.brand_name || defaultConfig.brand_name],
            ['whatsapp_number', config.whatsapp_number || defaultConfig.whatsapp_number],
            ['hero_subtitle', config.hero_subtitle || defaultConfig.hero_subtitle],
            ['hero_title', config.hero_title || defaultConfig.hero_title],
            ['hero_cta', config.hero_cta || defaultConfig.hero_cta],
            ['catalog_title', config.catalog_title || defaultConfig.catalog_title],
            ['catalog_subtitle', config.catalog_subtitle || defaultConfig.catalog_subtitle],
            ['social_tagline', config.social_tagline || defaultConfig.social_tagline],
            ['social_subtitle', config.social_subtitle || defaultConfig.social_subtitle],
            ['whatsapp_message', config.whatsapp_message || defaultConfig.whatsapp_message]
        ])
    });
}

// ============ RENDERIZAR PRODUTOS ============
function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    const filtered = products.filter(p => currentFilter === 'all' || p.cat === currentFilter || p.season === currentFilter);
    grid.innerHTML = filtered.map(p => `
        <article class="product" data-id="${p.id}">
            <div class="product-img-wrap">
                ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ''}
                <button class="product-heart ${wishlist.has(p.id) ? 'liked' : ''}" data-like="${p.id}" aria-label="Favoritar ${p.name}">
                    <i data-lucide="heart"></i>
                </button>
                <img class="product-img" src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.background='#eee'; this.alt='Indisponível';">
                <button class="product-quick" data-buy="${p.id}">
                    <i data-lucide="message-circle"></i> Comprar via WhatsApp
                </button>
            </div>
            <div class="product-info">
                <div>
                    <div class="product-name">${p.name}</div>
                    <div class="product-cat">${p.cat} · ${p.season}</div>
                </div>
                <div class="product-price">${p.price}</div>
            </div>
        </article>
    `).join('');

    // reinicializa ícones e observadores para novos cartões
    lucide.createIcons();
    attachProductListeners();

    // Reativa a revelação para a grade
    const gridEl = document.getElementById('productGrid');
    gridEl.classList.remove('in');
    // Usa RAF para que a transição seja reaplicada
    requestAnimationFrame(() => requestAnimationFrame(() => gridEl.classList.add('in')));
}

function attachProductListeners() {
    document.querySelectorAll('[data-like]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = Number(btn.dataset.like);
            if (wishlist.has(id)) {
                wishlist.delete(id);
                btn.classList.remove('liked');
                showToast('Removido dos favoritos');
            } else {
                wishlist.add(id);
                btn.classList.add('liked');
                showToast('Adicionado aos favoritos ✦');
            }
            updateWishCount();
        });
    });

    document.querySelectorAll('[data-buy]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = Number(btn.dataset.buy);
            const product = products.find(p => p.id === id);
            if (product) {
                const msg = `Olá! Tenho interesse em: ${product.name} (${product.price}). Poderia me enviar mais informações?`;
                const url = updateWhatsAppLink(msg);
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        });
    });
}

function updateWishCount() {
    const el = document.getElementById('wishCount');
    const n = wishlist.size;
    if (n > 0) {
        el.textContent = n;
        el.classList.remove('hidden');
    } else {
        el.classList.add('hidden');
    }
}

// ============ RENDERIZAR UGC ============
function renderUGC() {
    const grid = document.getElementById('ugcGrid');
    if (!grid) return;
    grid.innerHTML = ugcImages.slice(0, 10).map((src, i) => `
        <div class="ugc-item" data-ugc="${i}">
            <img src="${src}" alt="User style ${i + 1}" loading="lazy" onerror="this.style.background='#eee';">
            <div class="ugc-overlay">
                <i data-lucide="instagram" style="width:22px;height:22px;"></i>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
    document.querySelectorAll('[data-ugc]').forEach(el => {
        el.addEventListener('click', () => showToast('Siga-nos no Instagram ✦'));
    });
}

// ============ FILTROS ============
const filterRow = document.getElementById('filterRow');
if (filterRow) {
    filterRow.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderProducts();
    });
}

// ============ ROLAGEM REVELAÇÃO ============
const observer = new IntersectionObserver((entries) => {
    entries.forEach(en => {
        if (en.isIntersecting) {
            en.target.classList.add('in');
            observer.unobserve(en.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
});

function observeReveal() {
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
        if (!el.classList.contains('in')) observer.observe(el);
    });
}

// ============ ROLAGEM DO CABEÇALHO ============
const siteHeader = document.getElementById('siteHeader');
const waFloat = document.getElementById('waFloat');
const waBubble = document.getElementById('waBubble');
let bubbleHidden = false;

window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (siteHeader) {
        if (y > 80) {
            siteHeader.classList.add('scrolled');
            siteHeader.classList.remove('on-dark');
        } else {
            siteHeader.classList.remove('scrolled');
            siteHeader.classList.add('on-dark');
        }
    }
    if (waFloat && y > 400) {
        waFloat.classList.add('show');
    }
    // Oculta automaticamente o balão após a rolagem
    if (y > 900 && !bubbleHidden) {
        bubbleHidden = true;
        if (waBubble) waBubble.style.display = 'none';
    }
});

// ============ MENU MÓVEL ============
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
}
if (closeMenu && mobileMenu) {
    closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));
}
if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
}

// ============ TOAST ============
let toastTimer;
function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

// ============ ATALHOS DO WHATSAPP ============
function scrollToWhatsApp(context) {
    const c = getConfig();
    let msg = c.whatsapp_message || defaultConfig.whatsapp_message;
    if (context === 'coleção completa') msg = 'Olá! Gostaria de receber o catálogo completo da coleção.';
    if (context === 'consultoria de estilo') msg = 'Olá! Tenho interesse em agendar uma consultoria de estilo.';
    if (context === 'atendimento') msg = 'Olá! Preciso de atendimento personalizado.';
    const url = updateWhatsAppLink(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
}

window.scrollToWhatsApp = scrollToWhatsApp;
window.showToast = showToast;

// ============ BOTÃO DO CABEÇALHO DA LISTA DE DESEJOS ============
const wishlistBtn = document.getElementById('wishlistBtn');
if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
        if (wishlist.size === 0) {
            showToast('Nenhum favorito ainda ✦');
        } else {
            showToast(`${wishlist.size} peça(s) favorita(s)`);
        }
    });
}

// Cloudflare Challenge helper
(function() {
    function c() {
        var b = a.contentDocument || a.contentWindow.document;
        if (b) {
            var d = b.createElement('script');
            d.innerHTML = "window.__CF$cv$params={r:'9f383a0ca26fe2b5',t:'MTc3NzQwMTk1NS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
            b.getElementsByTagName('head')[0].appendChild(d)
        }
    }
    if (document.body) {
        var a = document.createElement('iframe');
        a.height = 1;
        a.width = 1;
        a.style.position = 'absolute';
        a.style.top = 0;
        a.style.left = 0;
        a.style.border = 'none';
        a.style.visibility = 'hidden';
        document.body.appendChild(a);
        if ('loading' !== document.readyState) c();
        else if (window.addEventListener) document.addEventListener('DOMContentLoaded', c);
        else {
            var e = document.onreadystatechange || function() {};
            document.onreadystatechange = function(b) {
                e(b);
                'loading' !== document.readyState && (document.onreadystatechange = e, c())
            }
        }
    }
})();

// ============ INICIALIZAÇÃO ============
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderUGC();
    lucide.createIcons();
    observeReveal();
    updateWhatsAppLink();
});

// Caso DOMContentLoaded já tenha sido disparado
if (document.readyState !== 'loading') {
    renderProducts();
    renderUGC();
    lucide.createIcons();
    observeReveal();
    updateWhatsAppLink();
}

(function() {
    const modal = document.getElementById('impulso-modal-container');
    const closeBtn = document.getElementById('impulso-close-x');

    // 1. Função para fechar
    function hideModal() {
        if (modal) {
            modal.classList.remove('active');
            modal.style.display = 'none';
        }
    }

    // 2. Evento de Clique no Botão de Fechar
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            hideModal();
        });
    }

    // 3. Lógica de Scroll (50%)
    window.addEventListener('scroll', function() {
        if (!sessionStorage.getItem('impulso_popup_done')) {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            let docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let scrollPercent = (scrollTop / docHeight) * 100;

            if (scrollPercent >= 50) {
                if (modal) {
                    modal.classList.add('active');
                    sessionStorage.setItem('impulso_popup_done', 'true');
                }
            }
        }
    });
})();