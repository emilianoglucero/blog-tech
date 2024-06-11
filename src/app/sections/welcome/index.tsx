'use client'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

import useIsomorphicLayoutEffect from '~/hooks/use-isomorphic-layout'
import { gsap } from '~/lib/gsap'

import authorPic from '../../images/author/emi.jpg'
import blogPostNetArt from '../../images/blogposts/netart-post.jpg'
import s from './welcome.module.css'

export const Welcome = () => {
  const [isBlogPostHovered, setIsBlogPostHovered] = useState(false)
  const [isAuthorHovered, setIsAuthorHovered] = useState(false)
  const authorPhotoRef = useRef<HTMLDivElement>(null)
  const blogPostPhotoRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (!blogPostPhotoRef.current) return
    if (isBlogPostHovered) {
      gsap.to(blogPostPhotoRef.current, {
        autoAlpha: 1
      })
    }
    if (!isBlogPostHovered) {
      gsap.to(blogPostPhotoRef.current, {
        autoAlpha: 0
      })
    }
  }, [isBlogPostHovered])
  useIsomorphicLayoutEffect(() => {
    if (!authorPhotoRef.current) return

    if (isAuthorHovered) {
      gsap.to(authorPhotoRef.current, {
        autoAlpha: 1
      })
    }
    if (!isAuthorHovered) {
      gsap.to(authorPhotoRef.current, {
        autoAlpha: 0
      })
    }
  }, [isAuthorHovered])

  return (
    <div className={s.welcome}>
      <h1 className={s.title}>digital digital</h1>
      <div className={s.subtitle}>
        <div>
          by{' '}
          <a
            href="https://www.emilianolucero.ar"
            target="_blank"
            rel="noopener"
            onMouseEnter={() => setIsAuthorHovered(true)}
            onMouseLeave={() => setIsAuthorHovered(false)}
          >
            <span className={s.underline}>emi</span>
          </a>
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

      <div className={s.description}>
        <p>writings, explorations and stuff.</p>
      </div>
      <div className={s.links}>
        <ul>
          <li>
            <a
              href="#"
              onMouseEnter={() => setIsBlogPostHovered(true)}
              onMouseLeave={() => setIsBlogPostHovered(false)}
            >
              <h2 className={s.blog_post_netart_text}>
                Los años y tu proyecto personal, pensamientos sobre como
                mantanerlo en el tiempo de manera austera y funcional, December
                11, 2023
              </h2>
            </a>

            <div className={s.blog_post_netart_image} ref={blogPostPhotoRef}>
              <Image
                src={blogPostNetArt}
                alt="Photo of a group of mens playing cards in the beach related to the blog post about net art"
                style={{
                  width: '680px',
                  height: 'auto'
                }}
              />
            </div>
          </li>
        </ul>
      </div>
      <div className={s.info}>
        <p className={s.author_name}>Emiliano Lucero</p>
        <p className={s.author_description}>
          A software engineer based in Rosario, Argentina.
        </p>
        <p className={s.author_email}>emilianoglucero@gmail.com</p>
      </div>
    </div>
  )
}
