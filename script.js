/* ==========================================
   CINEMATIC BIRTHDAY WEBSITE INTERACTIVE ENGINE
   Theme: "A Little Universe Made Just For You"
   ========================================== */

// 1. CENTRAL CONFIGURATION OBJECT
const birthdayConfig = {
    name: "DINESH",
    age: "24",
    message: `For You, On Your Birthday 🌸

On this special day, I wish you a sky full of light,
A heart full of dreams, and a future shining bright.
May every little wish you carry come true,
Because somehow, the world feels better with you.

Your smile has a magic I can never explain,
It turns ordinary moments into something beautiful again.
Maybe you don’t know what you mean to me,
But you’re a thought I secretly love to keep.

So today, I won’t say all the words in my heart,
I’ll simply wish you happiness from the very start.
May your birthday be as beautiful as you are,
And may you keep shining brighter than every star. ✨

Happy Birthday to someone truly special. ❤️

— DINESH KUMAR`,
    music: "assets/music/birthday-music.mp3",
    
    // 3 User-Uploaded NASA Satellite Name Photos
    nasaTextures: [
        "assets/nasa/nasa_name_1.jpg",
        "assets/nasa/nasa_name_2.jpg",
        "assets/nasa/nasa_name_3.jpg"
    ],

    // 5 NASA Hubble Telescope Photos Taken On Your Birthday
    hubblePhotos: [
        { image: "assets/hubble/hubble_1.jpg", caption: "Glowing Cyan Nebula in Deep Space" },
        { image: "assets/hubble/hubble_2.jpg", caption: "Hubble Deep Field Galaxy Cluster" },
        { image: "assets/hubble/hubble_3.jpg", caption: "Cosmic Star-Forming Region" },
        { image: "assets/hubble/hubble_4.jpg", caption: "Twinkling Globular Star Cluster" },
        { image: "assets/hubble/hubble_5.jpg", caption: "Majestic Floating Spiral Galaxy" }
    ],

    reasons: [
        { icon: "✨", title: "Your Smile", desc: "It brightens up even the darkest days." },
        { icon: "🌙", title: "Your Presence", desc: "Calm, comforting, and magical to be around." },
        { icon: "❤️", title: "Your Heart", desc: "Full of boundless love and genuine care." },
        { icon: "🌸", title: "Your Kindness", desc: "A soft warmth that makes everyone feel cherished." },
        { icon: "⭐", title: "The Way You Make People Happy", desc: "Effortlessly bringing joy wherever you go." }
    ],

    memories: [
        { image: "assets/memories/convocation_with_parents.jpg", caption: "Graduation Day with Mom & Dad — A Moment of Pure Pride & Love ❤️" },
        { image: "assets/memories/her_pic_1.png", caption: "Your Beautiful Smile That Lights Up Every Room ✨" },
        { image: "assets/memories/her_pic_2.png", caption: "Blooming with Grace, Elegance & Joy 🌸" },
        { image: "assets/memories/her_pic_3.png", caption: "Every Precious Memory Captured Forever 💖" }
    ],

    videos: [
        { youtubeId: "kHQ--82ZFqE" },
        { youtubeId: "V6PtTdZrW1M" },
        { youtubeId: "FyEMJImaf5I" },
        { youtubeId: "t5wEPpYcejw" },
        { youtubeId: "KVNZaue9y5o" }
    ]
};

// State Variables
let currentPage = 1;
let isAudioPlaying = false;
let audioContext = null;
let synthOscillator = null;

// Initialize Experience
document.addEventListener("DOMContentLoaded", () => {
    initCosmicCanvas();
    initBirthdayGate();
    renderNASAImageTypography();
    renderHubble();
    renderGallery();
    renderVideos();
    renderLetter();
    renderReasons();
    initAngelTimer();
    initEventListeners();
    initAudioController();
});

// ==========================================
// 1.4. NOVEMBER 14 BIRTHDAY GATE & PASSWORD ENGINE
// ==========================================
function initBirthdayGate() {
    const lockScreen = document.getElementById("birthday-lock-screen");
    const appContainer = document.getElementById("app");
    const passInput = document.getElementById("pass-input");
    const btnUnlock = document.getElementById("btn-pass-unlock");
    const passError = document.getElementById("pass-error");

    if (!lockScreen) return;

    function isNovember14() {
        const today = new Date();
        return (today.getMonth() === 10 && today.getDate() === 14);
    }

    function isUnlocked() {
        // ON 14.11 EVERY YEAR: AUTOMATICALLY UNLOCKED WITHOUT PASSWORD!
        if (isNovember14()) return true;

        // Check if URL parameter ?preview=true or session unlocked
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("preview") === "true" || window.isSessionUnlocked === true) {
            return true;
        }

        return false;
    }

    function updateLockState() {
        if (isUnlocked()) {
            lockScreen.style.display = "none";
            if (appContainer) appContainer.style.display = "block";
        } else {
            lockScreen.style.display = "flex";
            if (appContainer) appContainer.style.display = "none";
            updateLockCountdown();
        }
    }

    function updateLockCountdown() {
        const now = new Date();
        let targetYear = now.getFullYear();
        let targetDate = new Date(targetYear, 10, 14, 0, 0, 0); // Nov 14 00:00:00

        if (now > new Date(targetYear, 10, 14, 23, 59, 59)) {
            targetYear++;
            targetDate = new Date(targetYear, 10, 14, 0, 0, 0);
        }

        const diff = targetDate - now;

        const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
        const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
        const mins = Math.max(0, Math.floor((diff / 1000 / 60) % 60));
        const secs = Math.max(0, Math.floor((diff / 1000) % 60));

        const dEl = document.getElementById("lock-days");
        const hEl = document.getElementById("lock-hours");
        const mEl = document.getElementById("lock-mins");
        const sEl = document.getElementById("lock-secs");

        if (dEl) dEl.textContent = days < 10 ? "0" + days : days;
        if (hEl) hEl.textContent = hours < 10 ? "0" + hours : hours;
        if (mEl) mEl.textContent = mins < 10 ? "0" + mins : mins;
        if (sEl) sEl.textContent = secs < 10 ? "0" + secs : secs;
    }

    function attemptUnlock() {
        const enteredPass = (passInput ? passInput.value : "").trim();
        if (enteredPass === "2005") {
            window.isSessionUnlocked = true;
            if (passError) passError.style.display = "none";
            updateLockState();
        } else {
            if (passError) passError.style.display = "block";
            if (passInput) {
                passInput.classList.add("shake-input");
                setTimeout(() => passInput.classList.remove("shake-input"), 600);
            }
        }
    }

    updateLockState();
    setInterval(updateLockCountdown, 1000);

    if (btnUnlock) {
        btnUnlock.addEventListener("click", attemptUnlock);
    }

    if (passInput) {
        passInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") attemptUnlock();
        });
    }
}

// ==========================================
// 1.5. ANGEL TIME COMPLETED ENGINE (Since Nov 14, 2005 6:45 PM)
// ==========================================
function initAngelTimer() {
    // Birthdate: Nov 14, 2005 at 18:45:00 (Month index 10 = November)
    const birthDate = new Date(2005, 10, 14, 18, 45, 0);

    function updateTimer() {
        const now = new Date();
        
        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();
        let hours = now.getHours() - birthDate.getHours();
        let minutes = now.getMinutes() - birthDate.getMinutes();
        let seconds = now.getSeconds() - birthDate.getSeconds();

        if (seconds < 0) {
            seconds += 60;
            minutes--;
        }
        if (minutes < 0) {
            minutes += 60;
            hours--;
        }
        if (hours < 0) {
            hours += 24;
            days--;
        }
        if (days < 0) {
            const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
            days += prevMonthLastDay;
            months--;
        }
        if (months < 0) {
            months += 12;
            years--;
        }

        const yEl = document.getElementById("angel-years");
        const mEl = document.getElementById("angel-months");
        const dEl = document.getElementById("angel-days");
        const hEl = document.getElementById("angel-hours");
        const minEl = document.getElementById("angel-minutes");
        const sEl = document.getElementById("angel-seconds");

        if (yEl) yEl.textContent = years;
        if (mEl) mEl.textContent = months;
        if (dEl) dEl.textContent = days;
        if (hEl) hEl.textContent = hours;
        if (minEl) minEl.textContent = minutes;
        if (sEl) sEl.textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// ==========================================
// 2. NASA SATELLITE IMAGE TYPOGRAPHY ENGINE
// ==========================================
function renderNASAImageTypography() {
    const textures = birthdayConfig.nasaTextures;

    // Helper to generate NASA satellite name banner elements
    function buildNASABannerContainer() {
        const wrapper = document.createElement("div");
        wrapper.className = "nasa-banners-wrapper";

        textures.forEach((url, idx) => {
            const imgCard = document.createElement("div");
            imgCard.className = "nasa-banner-card";
            imgCard.innerHTML = `<img src="${url}" alt="NASA Satellite Name Photo ${idx + 1}" loading="lazy">`;
            wrapper.appendChild(imgCard);
        });

        return wrapper;
    }

    // 1. Inject into Page 2 (The Reveal under HAPPY BIRTHDAY)
    const page2Container = document.querySelector(".page2-nasa");
    if (page2Container) {
        page2Container.innerHTML = "";
        page2Container.appendChild(buildNASABannerContainer());
    }

    // 2. Inject into Page 6 (Surprise Gift Box Reveal)
    const page6Target = document.getElementById("nasa-name-target");
    if (page6Target) {
        page6Target.innerHTML = "";
        page6Target.appendChild(buildNASABannerContainer());

        // Text clipped letters
        const nameStr = (birthdayConfig.name || "DINESH").trim();
        const textWrapper = document.createElement("div");
        textWrapper.className = "nasa-text-clipped-wrapper";

        for (let i = 0; i < nameStr.length; i++) {
            const char = nameStr[i];
            const span = document.createElement("span");
            span.className = "nasa-letter";
            span.textContent = char;

            let textureIndex = 0;
            if (i >= Math.floor(nameStr.length / 3) && i < Math.floor((2 * nameStr.length) / 3)) {
                textureIndex = 1;
            } else if (i >= Math.floor((2 * nameStr.length) / 3)) {
                textureIndex = 2;
            }

            span.style.backgroundImage = `url('${textures[textureIndex % textures.length]}')`;
            span.style.animationDelay = `${i * 0.15}s`;
            textWrapper.appendChild(span);
        }

        page6Target.appendChild(textWrapper);
    }

    // 3. Inject into Page 7 (Final Wish Card under HAPPY BIRTHDAY)
    const page7Target = document.getElementById("final-name-display");
    if (page7Target) {
        page7Target.innerHTML = "";
        page7Target.appendChild(buildNASABannerContainer());
    }
}

// ==========================================
// 3. PAGE DYNAMIC CONTENT RENDERS
// ==========================================
function renderHubble() {
    const container = document.getElementById("hubble-container");
    if (!container) return;
    container.innerHTML = "";
    
    birthdayConfig.hubblePhotos.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "hubble-card glass-card";
        card.innerHTML = `
            <div class="hubble-img-wrapper">
                <img src="${item.image}" alt="Hubble ${index + 1}" loading="lazy">
            </div>
            <p class="hubble-caption">${item.caption}</p>
        `;
        card.addEventListener("click", () => openLightbox(item.image, item.caption));
        container.appendChild(card);
    });
}

function renderGallery() {
    const container = document.getElementById("gallery-container");
    container.innerHTML = "";
    
    birthdayConfig.memories.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "polaroid-card";
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="polaroid-img-wrapper">
                <img src="${item.image}" alt="Memory ${index + 1}" loading="lazy">
            </div>
            <p class="polaroid-caption">${item.caption}</p>
        `;
        
        card.addEventListener("click", () => openLightboxMedia('image', item.image, item.caption));
        container.appendChild(card);
    });
}

function renderVideos() {
    const container = document.getElementById("videos-container");
    if (!container) return;
    container.innerHTML = "";
    
    birthdayConfig.videos.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "video-card glass-card";
        card.style.animationDelay = `${index * 0.15}s`;
        
        const previewContent = item.youtubeId 
            ? `<div class="yt-preview-box" style="position:relative;width:100%;height:100%;overflow:hidden;border-radius:12px;background:#000;">
                <iframe class="card-yt-iframe" 
                        src="https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${item.youtubeId}&controls=0&modestbranding=1&rel=0&playsinline=1" 
                        frameborder="0" 
                        allow="autoplay; encrypted-media; picture-in-picture" 
                        style="width:100%;height:100%;pointer-events:none;border-radius:12px;transform:scale(1.35);object-fit:cover;">
                </iframe>
               </div>`
            : `<video src="${item.src}" autoplay muted loop playsinline></video>`;

        card.innerHTML = `
            <div class="video-preview-wrapper">
                ${previewContent}
                <div class="video-play-overlay">
                    <div class="play-btn-circle">▶</div>
                </div>
            </div>
        `;

        card.addEventListener("click", () => {
            if (item.youtubeId) {
                openLightboxMedia('youtube', item.youtubeId);
            } else {
                openLightboxMedia('video', item.src);
            }
        });
        container.appendChild(card);
    });
}

function openLightboxMedia(type, srcOrId, caption) {
    const modal = document.getElementById("lightbox-modal");
    const imgEl = document.getElementById("lightbox-img");
    const vidEl = document.getElementById("lightbox-video");
    const iframeEl = document.getElementById("lightbox-iframe");
    const captionEl = document.getElementById("lightbox-caption");

    captionEl.textContent = caption || "";

    // Reset displays
    imgEl.style.display = "none"; imgEl.src = "";
    vidEl.style.display = "none"; vidEl.pause(); vidEl.src = "";
    if (iframeEl) { iframeEl.style.display = "none"; iframeEl.src = ""; }

    if (type === 'youtube') {
        if (iframeEl) {
            iframeEl.style.display = "block";
            iframeEl.src = `https://www.youtube-nocookie.com/embed/${srcOrId}?autoplay=1&loop=1&playlist=${srcOrId}&controls=1&rel=0`;
        }
    } else if (type === 'video') {
        vidEl.style.display = "block";
        vidEl.src = srcOrId;
        vidEl.loop = true;
        vidEl.play().catch(() => {});
    } else {
        imgEl.style.display = "block";
        imgEl.src = srcOrId;
    }

    modal.classList.add("active");
}

function closeLightbox() {
    const modal = document.getElementById("lightbox-modal");
    const vidEl = document.getElementById("lightbox-video");
    const iframeEl = document.getElementById("lightbox-iframe");
    
    if (vidEl) {
        vidEl.pause();
        vidEl.src = "";
    }
    if (iframeEl) {
        iframeEl.src = "";
    }
    modal.classList.remove("active");
}

function renderLetter() {
    const letterText = document.getElementById("letter-text");
    if (!letterText) return;
    
    // Parse poem stanzas and bold elements into clean styled HTML paragraphs
    const paragraphs = birthdayConfig.message.split("\n\n").map(para => {
        let text = para.replace(/🌸|✨|❤️/g, match => `<span class="letter-emoji">${match}</span>`);
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/— \*\*DINESH KUMAR\*\*/g, '<span class="letter-signature">— DINESH KUMAR</span>');
        return `<p class="letter-stanza">${text.replace(/\n/g, '<br>')}</p>`;
    });

    letterText.innerHTML = paragraphs.join("");
}

function renderReasons() {
    const container = document.getElementById("reasons-list");
    container.innerHTML = "";
    
    birthdayConfig.reasons.forEach((reason, index) => {
        const card = document.createElement("div");
        card.className = "reason-card";
        card.innerHTML = `
            <span class="reason-icon">${reason.icon}</span>
            <div>
                <h3 class="reason-title">${reason.title}</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 4px;">${reason.desc}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// ==========================================
// 4. NAVIGATION & EVENT HANDLERS
// ==========================================
function initEventListeners() {
    // Lightbox Close
    document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
    document.getElementById("lightbox-modal").addEventListener("click", (e) => {
        if (e.target.id === "lightbox-modal") closeLightbox();
    });

    // Page 1 -> Page 2 Transition
    document.getElementById("btn-start").addEventListener("click", () => {
        startAudio();
        goToPage(2);
    });

    // Page 2: Blow Candles Wish -> Go to Hubble section
    document.getElementById("btn-wish").addEventListener("click", () => {
        const candles = document.querySelectorAll(".candle");
        candles.forEach(c => c.classList.add("out"));
        
        // Confetti explosion
        confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#ffd700', '#ff758c', '#7b2cbf', '#ffffff']
        });
        
        setTimeout(() => goToPage("hubble"), 2200);
    });

    // Page Hubble -> Page 3
    const btnHubbleNext = document.getElementById("btn-hubble-next");
    if (btnHubbleNext) {
        btnHubbleNext.addEventListener("click", () => goToPage(3));
    }

    // Page 3 -> Page 4 (Read Letter)
    const btnPage3Next = document.getElementById("btn-page3-next");
    if (btnPage3Next) {
        btnPage3Next.addEventListener("click", () => goToPage(4));
    }

    // Page 4: Open Letter Envelope (Manual read & control)
    const btnOpenLetter = document.getElementById("btn-open-letter");
    const btnLetterNext = document.getElementById("btn-letter-next");
    const btnLetterInsideNext = document.getElementById("btn-letter-inside-next");
    const envelope = document.getElementById("envelope");

    function openEnvelope() {
        if (envelope) envelope.classList.add("open");
        if (btnOpenLetter) btnOpenLetter.style.display = "none";
        if (btnLetterNext) btnLetterNext.style.display = "inline-flex";
        if (btnLetterInsideNext) btnLetterInsideNext.style.display = "inline-flex";
    }

    if (btnOpenLetter) {
        btnOpenLetter.addEventListener("click", openEnvelope);
    }
    if (envelope) {
        envelope.addEventListener("click", openEnvelope);
    }

    if (btnLetterNext) {
        btnLetterNext.addEventListener("click", (e) => {
            e.stopPropagation();
            goToPage(5);
        });
    }
    if (btnLetterInsideNext) {
        btnLetterInsideNext.addEventListener("click", (e) => {
            e.stopPropagation();
            goToPage(5);
        });
    }

    // Page 5 -> Page 6 (Gift Reveal)
    const btnPage5Next = document.getElementById("btn-page5-next");
    if (btnPage5Next) {
        btnPage5Next.addEventListener("click", () => goToPage(6));
    }

    // Page 6: Open Gift & Trigger NASA Satellite Name Reveal
    document.getElementById("btn-open-gift").addEventListener("click", () => {
        const giftBox = document.getElementById("gift-box");
        giftBox.classList.add("shaking");
        
        setTimeout(() => {
            giftBox.classList.remove("shaking");
            giftBox.classList.add("open");
            
            // Trigger Massive Stardust Confetti Burst
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.5 },
                colors: ['#ffd700', '#4cc9f0', '#ff758c']
            });

            // Hide button and reveal NASA Satellite Typography Name
            document.getElementById("btn-open-gift").style.display = "none";
            const nasaBox = document.getElementById("nasa-reveal-container");
            nasaBox.classList.add("active");
            
            // Staggered reveal animation for NASA letters
            gsap.fromTo(".nasa-letter", 
                { opacity: 0, scale: 0.2, y: 50 },
                { opacity: 1, scale: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "back.out(1.7)" }
            );

            setTimeout(() => goToPage(7), 8000);
        }, 1200);
    });

    // Page 7: Restart Surprise
    document.getElementById("btn-restart").addEventListener("click", () => {
        // Reset state
        document.querySelectorAll(".candle").forEach(c => c.classList.remove("out"));
        document.getElementById("envelope").classList.remove("open");
        document.getElementById("gift-box").classList.remove("open");
        document.getElementById("btn-open-gift").style.display = "inline-flex";
        document.getElementById("nasa-reveal-container").classList.remove("active");
        
        goToPage(1);
    });
}

function goToPage(pageNumber) {
    const current = document.querySelector(".page.active");
    const next = document.getElementById(`page-${pageNumber}`);
    
    if (next) {
        if (current) {
            current.classList.remove("active");
        }
        currentPage = pageNumber;
        setTimeout(() => {
            next.classList.add("active");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 200);
    }
}

// ==========================================
// 5. WEB AUDIO & MP3 CONTROLLER
// ==========================================
function initAudioController() {
    const musicBtn = document.getElementById("music-toggle");
    
    musicBtn.addEventListener("click", () => {
        if (isAudioPlaying) {
            stopAudio();
        } else {
            startAudio();
        }
    });
}

function startAudio() {
    if (isAudioPlaying) return;
    
    try {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        
        isAudioPlaying = true;
        document.getElementById("music-toggle").classList.add("playing");
        
        // Play sweet Happy Birthday Music-Box Melody
        playHappyBirthdayMelody();
    } catch (e) {
        console.log("Audio playback notice:", e);
    }
}

function stopAudio() {
    isAudioPlaying = false;
    document.getElementById("music-toggle").classList.remove("playing");
    if (synthOscillator) {
        try { synthOscillator.stop(); } catch(e){}
    }
}

function playHappyBirthdayMelody() {
    if (!audioContext) return;
    
    // Musical notes for Happy Birthday tune (Frequencies in Hz)
    const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, Bb4 = 466.16, C5 = 523.25;

    // Tune sequence: [frequency, duration in beats]
    const song = [
        // Phrase 1: Happy Birthday to You
        [C4, 0.75], [C4, 0.25], [D4, 1.0], [C4, 1.0], [F4, 1.0], [E4, 2.0],
        // Phrase 2: Happy Birthday to You
        [C4, 0.75], [C4, 0.25], [D4, 1.0], [C4, 1.0], [G4, 1.0], [F4, 2.0],
        // Phrase 3: Happy Birthday Dear Angel
        [C4, 0.75], [C4, 0.25], [C5, 1.0], [A4, 1.0], [F4, 1.0], [E4, 1.0], [D4, 2.0],
        // Phrase 4: Happy Birthday to You
        [Bb4, 0.75], [Bb4, 0.25], [A4, 1.0], [F4, 1.0], [G4, 1.0], [F4, 2.5]
    ];

    let noteIndex = 0;
    const tempo = 450; // ms per beat

    const playNext = () => {
        if (!isAudioPlaying) return;

        const [freq, duration] = song[noteIndex];
        const noteTime = (duration * tempo) / 1000;

        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        // Soft music-box chime timbre
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioContext.currentTime);

        gain.gain.setValueAtTime(0.01, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.12, audioContext.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + noteTime + 0.4);

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start();
        osc.stop(audioContext.currentTime + noteTime + 0.5);

        noteIndex = (noteIndex + 1) % song.length;

        // Pause slightly after each musical phrase
        const pause = (noteIndex === 6 || noteIndex === 12 || noteIndex === 19 || noteIndex === 0) ? 600 : 0;
        setTimeout(playNext, noteTime * 1000 + pause);
    };

    playNext();
}

// ==========================================
// 6. COSMIC CANVAS ENGINE
// ==========================================
function initCosmicCanvas() {
    const canvas = document.getElementById("cosmic-canvas");
    const ctx = canvas.getContext("2d");
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Create 150 Stars & Floating Dust
    const stars = [];
    for (let i = 0; i < 160; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random(),
            speed: Math.random() * 0.02 + 0.005
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Dark Cosmic Gradient Background
        const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
        bgGrad.addColorStop(0, '#050714');
        bgGrad.addColorStop(0.5, '#0a0d28');
        bgGrad.addColorStop(1, '#10002b');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
        
        // Draw Twinkling Stars
        stars.forEach(star => {
            star.alpha += star.speed;
            if (star.alpha > 1 || star.alpha < 0) {
                star.speed = -star.speed;
            }
            
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#ffd700';
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}
