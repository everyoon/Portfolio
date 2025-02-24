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

  let isScrolling = false; // 중복 스크롤 방지 변수

  // .title과 section 요소들 모두 포함
  const sections = document.querySelectorAll('.title, .about, .project, .contact');
  let currentIndex = 0; // 현재 섹션의 인덱스

  // 섹션이 제대로 선택되었는지 확인
  if (sections.length === 0) {
    console.error('섹션을 찾을 수 없습니다!');
    return; // 섹션을 찾을 수 없으면 함수 종료
  }

  // 스크롤 이벤트 처리
  window.addEventListener('wheel', function (event) {
    if (isScrolling) return; // 이미 스크롤 중이면 무시

    isScrolling = true; // 스크롤 시작

    // 아래로 스크롤 시
    if (event.deltaY > 0) {
      currentIndex = Math.min(currentIndex + 1, sections.length - 1);
    }
    // 위로 스크롤 시
    else {
      currentIndex = Math.max(currentIndex - 1, 0);
    }

    // 해당 섹션으로 부드럽게 이동
    if (sections[currentIndex]) {
      sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
    }

    // 스크롤이 끝난 후 잠시 대기
    setTimeout(() => {
      isScrolling = false;
    }, 500); // 800ms 후 스크롤 이벤트 가능
  });
});
