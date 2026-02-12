document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('intro-screen');
    const celebrationScreen = document.getElementById('celebration-screen');
    const giftBox = document.getElementById('open-gift');
    const bgMusic = document.getElementById('bg-music');
    
    // Confetti configurations
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];
    let animationId = null;

    canvas.width = width;
    canvas.height = height;

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    // Gift Open Interaction
    giftBox.addEventListener('click', () => {
        // Animate Lid opening
        const lid = giftBox.querySelector('.lid');
        lid.style.transform = 'translateY(-20px) rotate(-10deg)';
        
        // Play Music if source is available (Optional)
        // bgMusic.play().catch(e => console.log("Audio play failed (user interaction needed or no src):", e));

        setTimeout(() => {
            // Transition screens
            introScreen.classList.remove('active');
            
            setTimeout(() => {
                introScreen.style.display = 'none';
                celebrationScreen.classList.add('active');
                startConfetti();
            }, 500); // 0.5s fade out match css
        }, 600);
    });

    // --- Confetti Logic ---
    // Gold, Yellow, Silver, White palette
    const colors = ['#FFD700', '#FFC107', '#FFEB3B', '#FFFACD', '#FFFFFF', '#C0C0C0', '#DAA520', '#B8860B'];

    function createParticle() {
        const x = Math.random() * width;
        const y = -10; // Start slightly above
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 7 + 3;
        const speedY = Math.random() * 3 + 2;
        const speedX = Math.random() * 2 - 1;
        const angle = Math.random() * 360;
        const spin = Math.random() * 10 - 5;

        particles.push({ x, y, color, size, speedY, speedX, angle, spin });
    }

    function updateParticles() {
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.y += p.speedY;
            p.x += Math.sin(p.angle * Math.PI / 180) * 1.5; // Swaying effect
            p.angle += p.spin;

            // Remove off-screen particles
            if (p.y > height) {
                particles.splice(i, 1);
                i--;
            }
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, width, height);
        for (const p of particles) {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
        }
    }

    function loop() {
        // Add new particles occasionally
        if (particles.length < 300) { 
             createParticle();
             createParticle(); 
        }
        
        updateParticles();
        drawParticles();
        animationId = requestAnimationFrame(loop);
    }

    function startConfetti() {
        // Burst initially
        for(let i=0; i<50; i++) createParticle();
        loop();
    }
});
