import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useRef } from 'react'

import TransitionLink from '~/components/transition-link/page'
import { gsap } from '~/lib/gsap'

import s from '../page.module.css'

gsap.registerPlugin(ScrollTrigger)

const Header = () => {
  const blogTitle = useRef<HTMLSpanElement>(null)
  const titleLetters = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const dateRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    // Target all p elements within descriptionRef.current
    const paragraphs = descriptionRef?.current?.querySelectorAll('p')
    const dateParagraphs = dateRef.current?.querySelectorAll('p')
    gsap.set([paragraphs, dateParagraphs], { y: 50 })

    gsap.from([blogTitle.current], {
      yPercent: 130,
      delay: 0.2,
      stagger: 0.1
    })

    const spans = titleLetters.current?.querySelectorAll('span')
    if (spans) {
      gsap.fromTo(
        spans,
        { autoAlpha: 0, yPercent: 100 },
        { autoAlpha: 1, y: 0, stagger: 0.2, delay: 0.5 }
      )
    }

    gsap.to([paragraphs, dateParagraphs], {
      y: 0,
      stagger: 0.1,
      scrollTrigger: {
        trigger: descriptionRef.current,
        start: 'top 80%',
        end: 'bottom 20%'
      }
    })
  })

  return (
    <section className={s.header}>
      <div className={s.blog__title}>
        <TransitionLink href="/">
          <p>
            <span ref={blogTitle}>I 🩶 my computer job</span>
          </p>
        </TransitionLink>
      </div>
      <div className={s.title}>
        <h1 className={s.post__title}>
          not forever <br />
          <div ref={titleLetters}>
            <span>a</span>
            <span>r</span>
            <span>t</span>
          </div>
        </h1>
      </div>
      <div className={s.subtitle}>
        <div className={s.description} ref={descriptionRef}>
          <div className={s.description__wrapper}>
            <p>
              Some thoughts about maintaining my net art project through the
              years.
            </p>
          </div>
        </div>
      </div>
      <div className={s.date} ref={dateRef}>
        <p>June 11, 2023.</p>
      </div>
    </section>
  )
}

export default Header
