document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     Mobile nav toggle
  --------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const tabnav = document.getElementById('tabnav');

  if (navToggle && tabnav) {
    navToggle.addEventListener('click', () => {
      const isOpen = tabnav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // close mobile nav after choosing a section
    tabnav.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        tabnav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------------------------------------------------
     Scroll-spy: highlight the active tab in the side nav
  --------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.tabnav__list a');

  const setActive = (id) => {
    navLinks.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(section => spy.observe(section));
  }

  /* ---------------------------------------------------------
     Reveal-on-scroll for section headings & cards
  --------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(
    '.section__eyebrow, .section__title, .section__lede, ' +
    '.ledger__row, .stamp-card, .work-card, .org-card, .profil__card, .profil__text, .contact-item'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const revealer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(el => revealer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------------------------------------------------------
     Back to top
  --------------------------------------------------------- */
  const toTop = document.getElementById('toTop');
  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
