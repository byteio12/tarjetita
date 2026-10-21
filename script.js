// ====== CONFIGURACIÓN (edita aquí) ======
// Año, Mes (0 = enero), Día
const START_DATE = new Date(2026, 4, 23, 21, 7, 0);

// Frases propias: reemplaza cada "note" por un recuerdo real de ustedes
const songs = [
    { id: 1, title: "¿Qué Te Parece?",  artist: "Grupo Frontera, Oscar Maydon",    note: '"Si tú me dices que sí, Movére el mundo por ti, Nadie podrá tenerte. Tú serás solo de mí, Yo tambien soy para ti, Juraré complacerte"', liked: false },
    { id: 2, title: "Darte un Beso",    artist: "Prince Royce",                    note: '"Yo solo quiero darte un beso, Y regalarte mis mañanas, Cantar para calmar tus miedos, Quiero que no te falte nada."', liked: false },
    { id: 3, title: "QUÉDATE BEBÉ",     artist: "Grupo Frontera",                  note: '"Porque una vida sin ti, No tiene sentido. Es como morir, si haber vivido Una vida sin ti, Es tiempo perdido"', liked: false },
    { id: 4, title: "Dame Tu Querer",    artist: "Raulin Rodriguez",               note: '"Esos ojito tan verde, ay que iluminan tu cara, Me están quitando el sentido de la noche a la mañana "', liked: false }
];

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ====== TARJETAS DE CANCIONES ======
function renderSongs() {
    const container = document.getElementById('song-cards-container');
    container.innerHTML = '';

    songs.forEach((song, index) => {
        const card = document.createElement('div');
        card.className = "bg-romantic-panel/70 border border-romantic-500/20 hover:border-romantic-500/50 rounded-2xl p-5 card-transition hover:-translate-y-1 shadow-lg relative group";
        card.innerHTML = `
            <div class="flex items-start justify-between gap-3 mb-3">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-romantic-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">${index + 1}</div>
                    <div>
                        <h3 class="text-lg font-bold text-white group-hover:text-romantic-300 transition-colors">${song.title}</h3>
                        <p class="text-xs text-gray-400">${song.artist}</p>
                    </div>
                </div>
                <button type="button" data-id="${song.id}" aria-label="Me gusta: ${song.title}" aria-pressed="false"
                        class="like-btn w-9 h-9 rounded-full bg-gray-900/80 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95">
                    <i class="fa-regular fa-heart text-gray-400 transition-all"></i>
                </button>
            </div>
            <p class="text-sm text-gray-300/90 mt-2 font-light">
                <i class="fa-solid fa-star text-romantic-400 mr-1"></i> ${song.note}
            </p>
        `;
        container.appendChild(card);
    });
}

// Like: solo cambia el ícono, sin redibujar todo
document.getElementById('song-cards-container').addEventListener('click', (e) => {
    const btn = e.target.closest('.like-btn');
    if (!btn) return;
    e.stopPropagation(); // evita el disparo extra del listener global

    const song = songs.find(s => s.id === Number(btn.dataset.id));
    song.liked = !song.liked;

    const icon = btn.querySelector('i');
    icon.className = song.liked
        ? 'fa-solid fa-heart text-romantic-500 scale-110 transition-all'
        : 'fa-regular fa-heart text-gray-400 transition-all';
    btn.setAttribute('aria-pressed', String(song.liked));

    if (song.liked) triggerHearts(e);
});

// ====== CONTADOR ======
const pad = (n, len = 2) => String(n).padStart(len, '0');

function updateTimer() {
    const diff = Math.max(0, new Date() - START_DATE);
    document.getElementById('days').textContent    = pad(Math.floor(diff / 86400000), 3);
    document.getElementById('hours').textContent   = pad(Math.floor(diff / 3600000) % 24);
    document.getElementById('minutes').textContent = pad(Math.floor(diff / 60000) % 60);
    document.getElementById('seconds').textContent = pad(Math.floor(diff / 1000) % 60);
}
setInterval(updateTimer, 1000);
updateTimer();

// ====== CARTA ======
function toggleLetter() {
    const content = document.getElementById('letter-content');
    const btn = document.getElementById('open-letter-btn');
    const open = content.classList.toggle('hidden') === false;

    document.getElementById('letter-icon').className = open
        ? 'fa-solid fa-envelope-open text-romantic-400'
        : 'fa-solid fa-envelope-open-text';
    document.getElementById('letter-btn-text').textContent = open ? 'Ocultar Carta' : 'Leer Dedicatoria';
    btn.setAttribute('aria-expanded', String(open));
    if (open) createHeartBurst();
}
document.getElementById('open-letter-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleLetter();
});

// ====== VINILO ======
document.getElementById('vinyl-card').addEventListener('click', () => {
    const label = document.getElementById('vinyl-label');
    const needle = document.getElementById('needle');
    label.classList.toggle('paused');
    needle.classList.toggle('playing');
});

// ====== CORAZONES EN CANVAS ======
const canvas = document.getElementById('heart-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // dibujar en px CSS, nítido en retina
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function drawHeart(x, y, s) {
    ctx.beginPath();
    ctx.moveTo(x, y + s * 0.3);
    ctx.bezierCurveTo(x, y, x - s * 0.5, y, x - s * 0.5, y + s * 0.3);
    ctx.bezierCurveTo(x - s * 0.5, y + s * 0.6, x, y + s * 0.8, x, y + s);
    ctx.bezierCurveTo(x, y + s * 0.8, x + s * 0.5, y + s * 0.6, x + s * 0.5, y + s * 0.3);
    ctx.bezierCurveTo(x + s * 0.5, y, x, y, x, y + s * 0.3);
    ctx.fill();
}

class HeartParticle {
    constructor(x, y, isBurst = false) {
        this.x = x ?? Math.random() * window.innerWidth;
        this.y = y ?? window.innerHeight + 20;
        this.size = Math.random() * 14 + 8;
        this.speedY = isBurst ? (Math.random() * -4 - 2) : (Math.random() * -1.5 - 0.5);
        this.speedX = isBurst ? (Math.random() * 6 - 3) : (Math.random() * 1.5 - 0.75);
        this.opacity = 1;
        this.fadeRate = Math.random() * 0.015 + 0.005;
        this.color = `hsl(${Math.random() * 30 + 330}, 90%, 65%)`;
    }
    update() { this.y += this.speedY; this.x += this.speedX; this.opacity -= this.fadeRate; }
    draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.opacity);
        ctx.fillStyle = this.color;
        drawHeart(this.x, this.y, this.size);
        ctx.restore();
    }
}

function createHeartBurst() {
    if (reduceMotion) return;
    for (let i = 0; i < 30; i++) {
        particles.push(new HeartParticle(window.innerWidth / 2, window.innerHeight / 2, true));
    }
}

function triggerHearts(e) {
    if (reduceMotion) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? window.innerWidth / 2;
    const y = e.clientY ?? e.touches?.[0]?.clientY ?? window.innerHeight / 2;
    for (let i = 0; i < 12; i++) particles.push(new HeartParticle(x, y, true));
}

function animateParticles() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if (particles.length < 40 && Math.random() < 0.3) particles.push(new HeartParticle());

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].opacity <= 0 || particles[i].y < -20) particles.splice(i, 1);
    }
    requestAnimationFrame(animateParticles);
}

window.addEventListener('load', () => {
    renderSongs();
    if (!reduceMotion) animateParticles();
    // Un solo listener global (el vinilo ya no dispara por su cuenta)
    document.addEventListener('click', triggerHearts);
});