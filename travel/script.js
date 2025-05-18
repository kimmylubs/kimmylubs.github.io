console.log('runnin');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      window.scrollTo({
          top: targetSection.offsetTop - 50, // Adjust for fixed nav height
          behavior: 'smooth'
      });
  });
});
// Show/hide "To the Top" button and handle click
const toTopBtn = document.getElementById('toTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    toTopBtn.style.display = 'block';
  } else {
    toTopBtn.style.display = 'none';
  }
});
toTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});