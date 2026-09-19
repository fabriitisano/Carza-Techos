// Un único gesto de apertura al cargar: las lamas del techo giran para "abrirse"
// (solo existe en la home; en el resto de las páginas simplemente no encuentra nada y no hace nada)
window.addEventListener('DOMContentLoaded', () => {
  const slats = document.querySelectorAll('.slat');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !slats.length) return;
  slats.forEach((slat, i) => {
    slat.style.transition = 'transform .8s cubic-bezier(.2,.7,.3,1)';
    slat.style.transform = 'scaleY(0.15)';
    setTimeout(() => { slat.style.transform = 'scaleY(1)'; }, 200 + i * 90);
  });
});

// Animaciones de entrada al hacer scroll (compartido por todas las páginas)
window.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(t => t.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(t => io.observe(t));
});
