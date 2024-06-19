'use client'

import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

import TransitionLink from '~/components/transition-link/page'
import { BlogPostProps } from '~/data/blog-posts'
import { gsap } from '~/lib/gsap'

import s from './blogpost.module.css'

const BlogPost = ({ title, content }: BlogPostProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const dateRef = useRef<HTMLParagraphElement>(null)
  const contentRef = useRef<HTMLParagraphElement>(null)
  const footerTitleRef = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (
      !titleRef.current &&
      !dateRef.current &&
      !contentRef.current &&
      !footerTitleRef
    ) {
      return
    }

    gsap.from(
      [
        titleRef.current,
        dateRef.current,
        contentRef.current,
        footerTitleRef.current
      ],
      {
        yPercent: 130,
        delay: 0.1,
        stagger: 0.1
      }
    )
  }, [])
  return (
    <div className={s.container}>
      <section className={s.header}>
        <h1 className={s.title}>
          <span ref={titleRef}>
            Example title here this is an example title
          </span>
        </h1>
        <p className={s.date}>
          <span ref={dateRef}>December 11, 2024</span>
        </p>
      </section>
      <section className={s.main}>
        <p className={s.main__content} ref={contentRef}>
          Mantener un proyecto personal a lo largo de los años puede ser un
          desafío. Este artículo explora estrategias y pensamientos para
          mantener tu proyecto relevante y en crecimiento.
        </p>
      </section>
      <section className={s.footer}>
        <div className={s.footer__title}>
          <TransitionLink href="/">
            <p>
              <span ref={footerTitleRef}>I 🩶 my computer job</span>
            </p>
          </TransitionLink>
        </div>
      </section>
    </div>
  )
}

export default BlogPost
