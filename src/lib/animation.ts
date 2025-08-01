import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const animatePageIn = () => {
  const banner = document.getElementById("banner");

  if (banner) {
    const tl = gsap.timeline();

    tl.set([banner], {
      opacity: 1,
      display: "block",
      filter: "backdrop-filter: blur(15px)",
    }).to([banner], {
      opacity: 0,
      display: "none",
      filter: "backdrop-filter: blur(0px)",
      stagger: 0.2,
    });
  }
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const banner = document.getElementById("banner");

  if (banner) {
    const tl = gsap.timeline();

    tl.set([banner], {
      opacity: 0,
      display: "none",
      filter: "backdrop-filter: blur(0px)",
    }).to([banner], {
      opacity: 1,
      display: "block",
      filter: "backdrop-filter: blur(15px)",
      stagger: 0.2,
      onComplete: () => {
        router.push(href);
      },
    });
  }
};
