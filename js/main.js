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