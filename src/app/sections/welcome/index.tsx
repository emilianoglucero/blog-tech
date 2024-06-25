'use client'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'

import TransitionLink from '~/components/transition-link/page'
import { useDeviceDetect } from '~/hooks/use-device-detect'
import { gsap } from '~/lib/gsap'
import { Post } from '~/lib/payload-types'

import authorPic from '../../images/author/emi.jpg'
import s from './welcome.module.css'

export const Welcome = ({ posts }: { posts: Post[] }) => {
  const linksRefDecoration = useRef<Record<number, HTMLLIElement | null>>({})
  const linksRefText = useRef<Record<number, HTMLSpanElement | null>>({})
  const authorPhotoRef = useRef<HTMLDivElement>(null)
  const blogImagesRef = useRef<Record<number, HTMLDivElement | null>>({})
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  const subtitleContainer = useRef<HTMLDivElement>(null)

  const authorNameRef = useRef<HTMLParagraphElement>(null)
  const authorDescriptionRef = useRef<HTMLParagraphElement>(null)
  const authorEmailRef = useRef<HTMLParagraphElement>(null)
  // Use the hook to get device information
  const { isMobile, isTouch } = useDeviceDetect()

  // Modify the event handlers to check for mobile or touch devices
  const handleBlogHover = (e: React.MouseEvent<HTMLElement>, id: number) => {
    if (isMobile || isTouch) return // Do nothing if it's a mobile or touch device
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
    if (isMobile || isTouch) return // Do nothing if it's a mobile or touch device
    const element = blogImagesRef.current[id]
    if (element) {
      gsap.to(element, {
        autoAlpha: e ? 0 : 1
      })
    }
  }

  const handleAuthorHover = (e: any) => {
    if (isMobile || isTouch) return // Do nothing if it's a mobile or touch device
    if (authorPhotoRef.current) {
      gsap.to(authorPhotoRef.current, {
        autoAlpha: e ? 1 : 0
      })
    }
  }

  const handleAuthorHoverExit = (e: any) => {
    if (isMobile || isTouch) return // Do nothing if it's a mobile or touch device
    gsap.to(authorPhotoRef.current, {
      autoAlpha: e ? 0 : 1
    })
  }

  useGSAP(() => {
    if (
      !titleRef.current &&
      !subtitleRef.current &&
      !descriptionRef.current &&
      !Object.keys(linksRefDecoration.current).length
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

    const timeline = gsap.timeline()
    timeline.fromTo(
      Object.values(linksRefDecoration.current),
      {
        opacity: 0
      },
      {
        opacity: 1,
        delay: 0.3,
        stagger: 0.1
      }
    )

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
                    float: 'right'
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
      <main className={s.posts__links}>
        {posts.map((post: Post) => (
          <div className={s.posts__links__item} key={post.id}>
            <li
              ref={(el) => {
                linksRefDecoration.current[post.id as unknown as number] = el
              }}
            >
              <div className={s.posts__links__item__decoration}>◕</div>
              <span
                className={s.posts__links__item__title}
                ref={(el) => {
                  linksRefText.current[post.id as unknown as number] = el
                }}
                onMouseEnter={(e) => handleBlogHover(e, Number(post.id))}
                onMouseLeave={(e) => handleBlogHoverExit(e, Number(post.id))}
              >
                <TransitionLink href={`/${post.slug}`}>
                  {post.title}, {post.subtitle}, {post.dateToShow}
                </TransitionLink>
              </span>
              {typeof post.meta?.image !== 'string' &&
                post.meta?.image?.url && (
                  <div
                    className={s.blog_post_image}
                    ref={(el) => {
                      blogImagesRef.current[post.id as unknown as number] = el
                    }}
                  >
                    <Image
                      src={post.meta.image.url}
                      alt={post.meta.image.alt}
                      width={post.meta.image.width ?? 0}
                      height={post.meta.image.height ?? 0}
                      style={{
                        float: 'right'
                      }}
                    />
                  </div>
                )}
            </li>
          </div>
        ))}
      </main>
      <footer className={s.footer}>
        <div className={s.footer__details}>
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
        <div className={s.footer__decoration}>{/* <Scene /> */}</div>
      </footer>
    </div>
  )
}
