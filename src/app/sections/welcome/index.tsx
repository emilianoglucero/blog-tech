'use client'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'

import TransitionLink from '~/components/transition-link/page'
import { POSTS } from '~/data/posts'
import { useDeviceDetect } from '~/hooks/use-device-detect'
import { gsap } from '~/lib/gsap'

import authorPic from '../../images/author/emi.jpg'
import s from './welcome.module.css'

const Welcome = () => {
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

  const containerPageRef = useRef<HTMLDivElement>(null)
  // Use the hook to get device information
  const { isMobile, isTouch } = useDeviceDetect()

  // Modify the event handlers to check for mobile or touch devices
  const handleBlogHover = (id: number) => {
    if (isMobile || isTouch) return
    const element = blogImagesRef.current[id]
    if (element) {
      gsap.to(element, {
        autoAlpha: 1
      })
    }
  }

  const handleBlogHoverExit = (id: number) => {
    if (isMobile || isTouch) return
    const element = blogImagesRef.current[id]
    if (element) {
      gsap.to(element, {
        autoAlpha: 0
      })
    }
  }

  const backgroundColors = [
    'rgb(49 58 159)',
    'rgb(202, 49, 49)',
    'rgb(20, 121, 58)',
    'rgb(255, 159, 28)'
  ]

  const handleAuthorHover = (e: any) => {
    if (isMobile || isTouch) return // Do nothing if it's a mobile or touch device
    if (authorPhotoRef.current) {
      const randomIndex = Math.floor(Math.random() * backgroundColors.length)
      const randomColor = backgroundColors[randomIndex]
      gsap.to(authorPhotoRef.current, {
        autoAlpha: e ? 1 : 0
      })
      gsap.to(containerPageRef.current, {
        backgroundColor: randomColor,
        color: '#e7e7e7'
      })
    }
  }

  const handleAuthorHoverExit = (e: any) => {
    if (isMobile || isTouch) return // Do nothing if it's a mobile or touch device
    gsap.to(authorPhotoRef.current, {
      autoAlpha: e ? 0 : 1
    })
    gsap.to(containerPageRef.current, {
      backgroundColor: '#e7e7e7',
      color: '#27272a'
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

  useEffect(() => {
    const colors = ['#e7e7e7', '#27272a']

    if (descriptionRef.current) {
      const letters = descriptionRef.current.querySelectorAll('span')

      letters.forEach((letter) => {
        letter.addEventListener('mouseenter', () => {
          gsap.to(letter, {
            color: colors[Math.floor(Math.random() * colors.length)]
          })
        })
      })
    }
  }, [])

  //Properly size images for different screen sizes
  type Breakpoint = {
    maxWidth: number
    size: string
  }

  const breakpoints: Breakpoint[] = [
    { maxWidth: 768, size: '100vw' },
    { maxWidth: 1200, size: '50vw' },
    { maxWidth: Infinity, size: '33vw' }
  ]

  const calculateSizes = (breakpoints: Breakpoint[]): string => {
    return breakpoints
      .map((bp) => `(max-width: ${bp.maxWidth}px) ${bp.size}`)
      .join(', ')
  }

  return (
    <>
      <div className={s.welcome} ref={containerPageRef}>
        <div className={s.authorPic} ref={authorPhotoRef}>
          <Image
            src={authorPic}
            alt="Photo of the author of the blog - Emiliano Lucero"
            width={869}
            height={1303}
            sizes="(max-width: 1120px) 420px,
             (max-width: 1880px) 680px,
             (max-width: 2680px) 869px,
             (max-width: 3000px) 1120px,
             1320px"
          />
        </div>
        <div className={s.header}>
          <div className={s.titles}>
            <h1 className={s.title}>
              <span ref={titleRef}>I 🖤 my computer job</span>
            </h1>
            <div className={s.subtitle} ref={subtitleContainer}>
              <div ref={subtitleRef}>
                by{' '}
                <Link
                  href="https://www.emilianolucero.info/"
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
              </div>
            </div>
          </div>

          <div className={s.description}>
            <p ref={descriptionRef}>
              {'writings, explorations and stuff.'
                .split('')
                .map((char, index) => (
                  <span key={index}>{char}</span>
                ))}
            </p>
          </div>
        </div>

        <nav className={s.posts__links}>
          {POSTS.map((post: any, index: number) => (
            <ul className={s.posts__links__item} key={index}>
              <li
                ref={(el) => {
                  linksRefDecoration.current[index] = el
                }}
              >
                <div className={s.posts__links__item__decoration}>◕</div>
                <span
                  className={s.posts__links__item__title}
                  ref={(el) => {
                    linksRefText.current[index] = el
                  }}
                >
                  <TransitionLink
                    href={`/${post.slug}`}
                    onMouseEnter={() => handleBlogHover(index)}
                    onMouseLeave={() => handleBlogHoverExit(index)}
                  >
                    {post.title}, {post.subtitle}, {post.dateToShow}
                  </TransitionLink>
                </span>
                {typeof post.meta?.image !== 'string' &&
                  post.meta?.image?.url && (
                    <div
                      className={s.blog_post_image}
                      ref={(el) => {
                        blogImagesRef.current[index] = el
                      }}
                    >
                      <Image
                        src={post.meta.image.url}
                        alt={post.meta.image.alt}
                        width={post.meta.image.width || 0}
                        height={post.meta.image.height || 0}
                        sizes={calculateSizes(breakpoints)}
                        priority={index === 0}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        style={{
                          float: 'right'
                        }}
                      />
                    </div>
                  )}
              </li>
            </ul>
          ))}
        </nav>
        <section className={s.page__draw}>
          <video autoPlay muted playsInline>
            <source
              src="./assets/videos/drawing-in-black-compressed.mp4"
              type="video/mp4"
            />
          </video>
        </section>
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
                hello@emilianolucero.info
              </p>
            </div>
          </div>
          <div className={s.footer__decoration}>{/* <Scene /> */}</div>
        </footer>
      </div>
    </>
  )
}

export default Welcome
