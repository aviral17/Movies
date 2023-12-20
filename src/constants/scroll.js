// The scroll-behavior: smooth property only works when scrolling is done via clicking on an anchor link or when using the Element.scrollIntoView() method. It does not work when scrolling is done programmatically, such as with the window.scrollTo()

export const smoothScrollTo = (targetY, duration) => {
  const startingY = window.pageYOffset;
  const diff = targetY - startingY;
  let start;

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const percent = Math.min(time / duration, 1);

    window.scrollTo(0, startingY + diff * percent);

    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
};
