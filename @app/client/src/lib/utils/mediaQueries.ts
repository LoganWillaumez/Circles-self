export const useMediaQuery = (breakpoint: number) => {
  let isDesktop = window.innerWidth > breakpoint;

  const checkDesktop = () => {
    isDesktop = window.innerWidth > breakpoint;
  };

  window.addEventListener('resize', checkDesktop);

  const cleanup = () => {
    window.removeEventListener('resize', checkDesktop);
  };

  return { getIsDesktop: () => isDesktop, cleanup };
};
