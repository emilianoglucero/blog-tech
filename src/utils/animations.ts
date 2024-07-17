import { gsap } from '~/lib/gsap'

import s from '../app/template.module.css'

export const animateHomePageIn = () => {
  const banner = document.querySelector(`.${s.banner}`)
  if (banner) {
    const tl = gsap.timeline()
    tl.set(banner, {
      yPercent: 0,
      backgroundColor: '#e7e7e7'
    }).to(banner, {
      duration: 0.1,
      yPercent: 100,
      ease: 'power4.inOut'
    })
    // tl.to(banner, {
    //   clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
    //   duration: 1.8,
    //   ease: 'power4.inOut'
    // })
  }
}

export const animatePostPageIn = () => {
  const banner = document.querySelector(`.${s.banner}`)
  if (banner) {
    const tl = gsap.timeline()
    tl.set(banner, {
      yPercent: 0
      // backgroundColor: '#e7e7e7'
    }).to(banner, {
      duration: 0.1,
      yPercent: 100,
      ease: 'power4.inOut'
    })
    // tl.to(banner, {
    //   clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
    //   duration: 1.8,
    //   ease: 'power4.inOut'
    // })
  }
}

export const animatePostPageOut = (href: string, router: any) => {
  const banner = document.querySelector(`.${s.banner}`)
  if (banner) {
    const tl = gsap.timeline()

    tl.set(banner, {
      yPercent: -100,
      backgroundColor: '#e7e7e7'
    }).to(banner, {
      duration: 1,
      yPercent: 0,
      ease: 'power4.inOut',
      onComplete: () => {
        router.push(href)
      }
    })
  }
}

export const animateHomePageOut = (href: string, router: any) => {
  const banner = document.querySelector(`.${s.banner}`)
  if (banner) {
    const tl = gsap.timeline()
    tl.set(banner, {
      yPercent: 100,
      backgroundColor: '#27272a'
    }).to(banner, {
      duration: 1,
      yPercent: 0,
      ease: 'power4.inOut',
      onComplete: () => {
        router.push(href)
      }
    })
  }
}
