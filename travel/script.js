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