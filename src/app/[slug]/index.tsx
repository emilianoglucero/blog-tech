'use client'

import { useGSAP } from '@gsap/react'
import DOMPurify from 'isomorphic-dompurify'
import { useRef } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import TransitionLink from '~/components/transition-link/page'
import { gsap } from '~/lib/gsap'

import s from './blogpost.module.css'

const BlogPost = ({ post }: any) => {
  const blogTitle = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLParagraphElement>(null)
  const contentRef = useRef<HTMLParagraphElement>(null)

  // Configure DOMPurify to allow <code>, <pre>, and <script> tags and their attributes
  const purifyConfig = {
    ADD_TAGS: ['code', 'pre', 'script'],
    ADD_ATTR: ['class', 'style', 'src']
  }

  const sanitizedContent = DOMPurify.sanitize(post.content_html, purifyConfig)

  useGSAP(() => {
    if (
      !dateRef.current &&
      !subtitleRef.current &&
      !titleRef.current &&
      !contentRef.current &&
      !blogTitle.current
    ) {
      return
    }

    gsap.from([blogTitle.current, dateRef.current, subtitleRef.current], {
      yPercent: 130,
      delay: 0.4,
      stagger: 0.1
    })

    gsap.from(contentRef.current, {
      autoAlpha: 0,
      duration: 4,
      delay: 0.4
    })

    const titleChars = titleRef.current?.querySelectorAll('span') || []
    gsap.from(titleChars, {
      yPercent: 130,
      delay: 0.1,
      stagger: 0.04,
      ease: 'back.out',
      duration: 1
    })
  }, [])

  const splitTitle = (title: string) => {
    return title.split(' ').map((word, index) => (
      <div key={index} className="word-container">
        {word.split('').map((char, charIndex) => (
          <span key={charIndex}>{char === ' ' ? '\u00A0' : char}</span>
        ))}
        <span>&nbsp;</span> {/* Add space between words */}
      </div>
    ))
  }

  const renderContent = (content: string) => {
    const codeBlockRegex = /<code>(.*?)<\/code>/gs
    const parts = content.split(codeBlockRegex)

    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <SyntaxHighlighter key={index} language="javascript" style={oneDark}>
            {part}
          </SyntaxHighlighter>
        )
      }
      return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />
    })
  }

  return (
    <div className={s.container}>
      <section className={s.header}>
        <div className={s.blog__title}>
          <TransitionLink href="/">
            <p>
              <span ref={blogTitle}>I 🩶 my computer job</span>
            </p>
          </TransitionLink>
        </div>
        <h1 className={s.title} ref={titleRef}>
          {splitTitle(post.title)}
        </h1>
        <h2 className={s.subtitle}>
          <span ref={subtitleRef}>{post.subtitle}</span>
        </h2>
        <p className={s.date}>
          <span ref={dateRef}>{post.dateToShow}</span>
        </p>
      </section>
      <section className={s.main} ref={contentRef}>
        <div className={s.main__content}>{renderContent(sanitizedContent)}</div>
      </section>
      <section className={s.footer}>
        <div className={s.blog__title}>
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
