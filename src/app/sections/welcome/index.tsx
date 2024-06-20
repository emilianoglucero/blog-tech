'use client'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'

import TransitionLink from '~/components/transition-link/page'
import blogPosts from '~/data/blog-posts'
import { gsap } from '~/lib/gsap'

import authorPic from '../../images/author/emi.jpg'
import s from './welcome.module.css'

type LinksLiRefsType = Record<number, HTMLDivElement | null>

export const Welcome = () => {
  const authorPhotoRef = useRef<HTMLDivElement>(null)
  const blogImagesRef = useRef<Record<number, HTMLDivElement | null>>({})
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  const linksLiRefs = useRef<LinksLiRefsType>({})
  const linksUlRef = useRef<HTMLUListElement>(null)

  const subtitleContainer = useRef<HTMLDivElement>(null)

  const authorNameRef = useRef<HTMLParagraphElement>(null)
  const authorDescriptionRef = useRef<HTMLParagraphElement>(null)
  const authorEmailRef = useRef<HTMLParagraphElement>(null)

  const handleBlogHover = (e: React.MouseEvent<HTMLElement>, id: number) => {
    const element = blogImagesRef.current[id]
    if (element) {
      gsap.to(element, {
        autoAlpha: e ? 1 : 0
      })
    }
  }

  const handleBlogHoverExit = (
    e: React.MouseEvent<HTMLElement>,
    id: number
  ) => {
    const element = blogImagesRef.current[id]
    if (element) {
      gsap.to(element, {
        autoAlpha: e ? 0 : 1
      })
    }
  }

  const handleAuthorHover = (e: any) => {
    if (authorPhotoRef.current) {
      gsap.to(authorPhotoRef.current, {
        autoAlpha: e ? 1 : 0
      })
    }
  }

  const handleAuthorHoverExit = (e: any) => {
    gsap.to(authorPhotoRef.current, {
      autoAlpha: e ? 0 : 1
    })
  }

  useGSAP(() => {
    if (
      !titleRef.current &&
      !subtitleRef.current &&
      !descriptionRef.current &&
      !Object.keys(linksLiRefs.current).length
    ) {
      return
    }

    gsap.from([titleRef.current, subtitleRef.current, descriptionRef.current], {
      yPercent: 130,
      delay: 0.1,
      stagger: 0.1,
      onComplete: () => {
        gsap.set(subtitleContainer.current, {
          overflow: 'visible'
        })
        gsap.set(subtitleRef.current, {
          display: 'block'
        })
      }
    })

    gsap.from(Object.values(linksLiRefs.current), {
      yPercent: 130,
      delay: 0.1,
      stagger: 0.1,
      onComplete: () => {
        gsap.set(linksUlRef.current, {
          overflow: 'visible'
        })
      }
    })

    gsap.from(
      [
        authorNameRef.current,
        authorDescriptionRef.current,
        authorEmailRef.current
      ],
      {
        yPercent: 130,
        delay: 0.1,
        stagger: 0.1
      }
    )
  }, [])

  return (
    <div className={s.welcome}>
      <div className={s.header}>
        <div className={s.titles}>
          <h1 className={s.title}>
            <span ref={titleRef}>I 🖤 my computer job</span>
          </h1>
          <div className={s.subtitle} ref={subtitleContainer}>
            <div ref={subtitleRef}>
              by{' '}
              <Link
                href="https://www.emilianolucero.ar"
                target="_blank"
                rel="noopener"
              >
                <span
                  className={s.underline}
                  onMouseEnter={(e) => handleAuthorHover(e)}
                  onMouseLeave={(e) => handleAuthorHoverExit(e)}
                >
                  emi
                </span>
              </Link>
              <div className={s.authorPic} ref={authorPhotoRef}>
                <Image
                  src={authorPic}
                  alt="Photo of the author of the blog - Emiliano Lucero"
                  style={{
                    width: 'auto',
                    height: '600px'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={s.description}>
          <p ref={descriptionRef}>writings, explorations and stuff.</p>
        </div>
      </div>
      <div className={s.links}>
        <div>
          <ul className={s.links__list} ref={linksUlRef}>
            {blogPosts.map((post) => (
              <li key={post.id}>
                <div
                  ref={(el) => {
                    linksLiRefs.current[post.id] = el
                  }}
                >
                  <TransitionLink href={`/${post.slug}`}>
                    <h2
                      className={s.links__list__blog_post_text}
                      onMouseEnter={(e) => handleBlogHover(e, post.id)}
                      onMouseLeave={(e) => handleBlogHoverExit(e, post.id)}
                    >
                      {post.title}, {post.date}
                    </h2>
                  </TransitionLink>
                </div>
                {post.photo && (
                  <div
                    className={s.blog_post_image}
                    ref={(el) => {
                      blogImagesRef.current[post.id] = el
                    }}
                  >
                    <Image
                      src={post.photo}
                      alt="Photo of a group of mens playing cards in the beach related to the blog post about net art"
                      width={post.photo_width}
                      height={post.photo_height}
                      style={{
                        float: 'right',
                        marginTop: `${post.margin_top}%`
                      }}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={s.footer}>
        <div>
          <p className={s.author_name} ref={authorNameRef}>
            Emiliano Lucero
          </p>
        </div>
        <div>
          <p className={s.author_description} ref={authorDescriptionRef}>
            A software engineer based in Rosario, Argentina.
          </p>
        </div>
        <div>
          <p className={s.author_email} ref={authorEmailRef}>
            emilianoglucero@gmail.com
          </p>
        </div>
      </div>
    </div>
  )
}
