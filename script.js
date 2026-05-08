const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
}

themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

const textArray = [
    "Hello, World!", 
    "I'm Hazem.", 
    "An Aspiring AI Engineer.",
    "System Ready..."
];
let textIndex = 0;
let charIndex = 0;
const typewriterElement = document.getElementById("typewriter");

function type() {
    if (charIndex < textArray[textIndex].length) {
        typewriterElement.innerHTML += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typewriterElement.innerHTML = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textIndex++;
        if (textIndex >= textArray.length) textIndex = 0;
        setTimeout(type, 500);
    }
}

setTimeout(type, 1000);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => { appearOnScroll.observe(fader); });




const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '[ ENCRYPTING_AND_SENDING... ]';
        submitBtn.style.color = '#ffbd2e';

        const formData = new FormData(this);

        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                submitBtn.innerHTML = '[ DATA_SENT_SUCCESSFULLY ]';
                submitBtn.style.color = '#27c93f'; // لون أخضر
                submitBtn.style.borderColor = '#27c93f';
                this.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.color = 'var(--text-color)';
                    submitBtn.style.borderColor = 'var(--text-color)';
                }, 4000);
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            submitBtn.innerHTML = '[ TRANSFER_FAILED ]';
            submitBtn.style.color = '#ff5f56'; 
            submitBtn.style.borderColor = '#ff5f56';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.color = 'var(--text-color)';
                submitBtn.style.borderColor = 'var(--text-color)';
            }, 4000);
        });
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const rickRollTrap = document.querySelector('.close');

    if (rickRollTrap) {
        rickRollTrap.addEventListener('click', () => {
            const terminalOutput = document.querySelector('.terminal-body');
            
            if (terminalOutput) {
                terminalOutput.innerHTML = `
                    <p style="color: #ff5f56; font-weight: bold; font-size: 1.2rem;">> FATAL ERROR: UNAUTHORIZED ACCESS!</p>
                    <p style="color: #ffbd2e;">> SYSTEM DEFENSE MECHANISM TRIGGERED...</p>
                    <p>> Executing counter-measure in: <span id="countdown" style="color: #ff5f56; font-weight: bold; font-size: 1.5rem;">3</span></p>
                `;
                
                let timeLeft = 3;
                const countdownElement = document.getElementById('countdown');
                
                const timer = setInterval(() => {
                    timeLeft--;
                    
                    if (timeLeft > 0) {
                        countdownElement.textContent = timeLeft;
                    } else {
                        clearInterval(timer);
                        countdownElement.textContent = "0";
                        terminalOutput.innerHTML += `<br><p style="color: #27c93f; font-weight: bold;">> GOODBYE.</p>`;
                        
                        setTimeout(() => {
                            window.location.replace('trap.html');
                        }, 500);
                    }
                }, 1000);
            }
        });
    }
});