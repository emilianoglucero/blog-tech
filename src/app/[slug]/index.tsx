'use client'

import { useGSAP } from '@gsap/react'
import DOMPurify from 'isomorphic-dompurify'
import { useRef } from 'react'

import TransitionLink from '~/components/transition-link/page'
import { gsap } from '~/lib/gsap'

import s from './blogpost.module.css'

const BlogPost = ({ post }: any) => {
  // console.log('post', post)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const dateRef = useRef<HTMLParagraphElement>(null)
  const contentRef = useRef<HTMLParagraphElement>(null)
  // const footerTitleRef = useRef<HTMLDivElement>(null)

  // Sanitize the HTML content
  const sanitizedContent = DOMPurify.sanitize(post.content_html)
  useGSAP(() => {
    if (!titleRef.current && !dateRef.current && !contentRef.current) {
      return
    }

    gsap.from([titleRef.current, dateRef.current], {
      yPercent: 130,
      delay: 0.1,
      stagger: 0.1
    })

    gsap.from(contentRef.current, {
      autoAlpha: 0,
      duration: 2,
      delay: 0.1
    })
  }, [])
  return (
    <div className={s.container}>
      <section className={s.header}>
        <h1 className={s.title}>
          <span ref={titleRef}>{post.title}</span>
        </h1>
        <p className={s.date}>
          <span ref={dateRef}>{post.dateToShow}</span>
        </p>
      </section>
      <section className={s.main} ref={contentRef}>
        {/* Use dangerouslySetInnerHTML to render the sanitized HTML */}
        <div
          className={s.main__content}
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </section>
      <section className={s.footer}>
        <div className={s.footer__title}>
          <TransitionLink href="/">
            <p>
              <span>I 🩶 my computer job</span>
            </p>
          </TransitionLink>
        </div>
      </section>
    </div>
  )
}

export default BlogPost
