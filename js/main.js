const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 70);
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.08 });
reveals.forEach(r => io.observe(r));

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) cur = s.id; });
    navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--accent)' : '';
    });
});

const overlay = document.getElementById('videoOverlay');
const overlayVideo = document.getElementById('overlayVideo');
const overlayClose = document.getElementById('overlayClose');

document.querySelectorAll('.project-thumb').forEach(thumb => {
    const vid = thumb.querySelector('.project-video');
    if (vid.getAttribute('src')) {
        thumb.addEventListener('mouseenter', () => {
            document.querySelectorAll('.project-video').forEach(v => v.pause());
            overlayVideo.src = vid.src;
            overlayVideo.load();
            overlayVideo.play().catch(e => console.log('play error:', e));
            overlay.classList.add('active');
        });

        thumb.addEventListener('mouseleave', () => {
            if (!overlay.classList.contains('active')) {
                document.querySelectorAll('.project-video').forEach(v => v.play());
            }
        });
    }
});

const closeOverlay = () => {
    overlay.classList.remove('active');
    overlayVideo.pause();
    overlayVideo.src = '';
    document.querySelectorAll('.project-thumb .project-video').forEach(v => v.play());
};

overlayClose.addEventListener('click', closeOverlay);
overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeOverlay(); });

const form = document.getElementById('contactForm');
const notification = document.createElement('div');
notification.style.cssText = `
    position: fixed;
    top: 4.5rem;
    right: 2rem;
    padding: .9rem 1.2rem;
    font-family: var(--body);
    font-size: .8rem;
    font-weight: 500;
    letter-spacing: .12em;
    text-transform: uppercase;
    border: 1px solid;
    z-index: 99999;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity .3s, transform .3s;
`;
document.body.appendChild(notification);

const showNotification = (message, success) => {
    notification.textContent = message;
    notification.style.background = success ? 'var(--accent)' : '#ff4444';
    notification.style.color = success ? '#000' : '#fff';
    notification.style.borderColor = success ? 'var(--accent)' : '#ff4444';
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(10px)';
    }, 5000);
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    try {
        const res = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(data).toString()
        });

        if (res.ok) {
            showNotification('✓ Message sent successfully!', true);
            form.reset();
        } else {
            showNotification('✕ Something went wrong. Try again.', false);
        }
    } catch (err) {
        showNotification('✕ Network error. Try again.', false);
    }
});

const navToggle = document.getElementById('navToggle');
const navLinksList = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinksList.classList.toggle('open');
    navToggle.classList.toggle('open');
});

navLinksList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksList.classList.remove('open');
        navToggle.classList.remove('open');
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        navLinksList.classList.remove('open');
        navToggle.classList.remove('open');
    }
});