document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);

  // title Split 효과
  let typeSplit = new SplitType('.title h1', {
    types: 'lines, words, chars',
    tagName: 'span',
  });

  gsap.from('.title .char', {
    y: '100%',
    opacity: 0,
    duration: 0.8,
    ease: 'circ.out',
    stagger: 0.05,
  });

  // about_decs 자연스럽게 나타나는 효과
  gsap.from('.about_decs', {
    opacity: 0.8,
    y: 50,
    duration: 1.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.about',
      start: 'top center',
      scrub: true,
    },
  });

  // about_decs 강조 단어 개별 애니메이션
  gsap.from('.about_decs span', {
    opacity: 0,
    y: 20,
    scale: 0.8,
    duration: 0.6,
    stagger: 0.2,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.about',
      start: 'top center',
      once: true, // 한 번만 실행
    },
  });

  // 마우스 스크롤 이벤
  let isScrolling = false;
  const sections = document.querySelectorAll('.title, .about, .project, .contact');
  let currentIndex = 0;

  if (sections.length === 0) {
    console.error('섹션을 찾을 수 없습니다!');
    return; // 섹션을 찾을 수 없으면 함수 종료
  }
  // 스크롤 이벤트 처리
  window.addEventListener('wheel', function (event) {
    if (isScrolling) return;

    isScrolling = true;

    if (event.deltaY > 0) {
      currentIndex = Math.min(currentIndex + 1, sections.length - 1);
    } else {
      currentIndex = Math.max(currentIndex - 1, 0);
    }

    if (sections[currentIndex]) {
      sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      isScrolling = false;
    }, 500);
  });
});
