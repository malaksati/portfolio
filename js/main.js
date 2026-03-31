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
            // resume thumbnail when mouse leaves
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
