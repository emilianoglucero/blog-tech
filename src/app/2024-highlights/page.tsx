'use client'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'

import { Cell } from '~/components/grid/cell'
import { Row } from '~/components/grid/row'
import TransitionLink from '~/components/transition-link/page'
import {
  HIGHLIGHTS_BOOKS_2024,
  HIGHLIGHTS_COMEDY_2024,
  HIGHLIGHTS_LIVE_SHOWS_2024,
  HIGHLIGHTS_MOVIES_2024,
  HIGHLIGHTS_MUSIC_VIDEOS_2024,
  HIGHLIGHTS_PODCASTS_2024,
  HIGHLIGHTS_WEBSITES_2024
} from '~/data/2024-highlights'
import useIsomorphicLayoutEffect from '~/hooks/use-isomorphic-layout'
import { gsap } from '~/lib/gsap'

import { HeroVideo } from './components/hero-video/hero-video'
import { Highlight } from './components/highlight'
import s from './page.module.css'
gsap.registerPlugin(ScrollTrigger)

import { BooksList } from './components/books-list/books-list'

const Page = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (titleRef.current) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#highlights',
          start: 'top-=20% top',
          end: 'bottom bottom'
          // markers: true
        },
        repeat: -1,
        repeatDelay: 2
      })
      timeline.to(titleRef.current, {
        opacity: 0,
        duration: 0.1
      })
      timeline.to(
        titleRef.current,
        {
          opacity: 1,
          duration: 0.1
        },
        '+=.5'
      )
      timeline.to(titleRef.current, {
        opacity: 0,
        duration: 0.1
      })
      timeline.to(titleRef.current, {
        opacity: 1,
        duration: 0.1
      })
      timeline.to(titleRef.current, {
        opacity: 0,
        duration: 0.1
      })
      timeline.to(titleRef.current, {
        opacity: 1,
        duration: 0.1
      })
    }
  }, [])
  return (
    <div className={s.container}>
      <nav className={s.nav}>
        <div className={s.blog__title}>
          <p>
            <TransitionLink href="/">
              <span>I 🖤 my computer job</span>
            </TransitionLink>
          </p>
        </div>
      </nav>
      <h1 className={s.title}>
        <span>2</span>
        <span>0</span>
        <span>2</span>
        <span>4</span>
      </h1>
      <section className={s.hero}>
        <HeroVideo />
      </section>
      <div className={s.highlightsContainer}>
        <section className={s.highlightsTitle} id="highlights">
          <h2 ref={titleRef}>highlights</h2>
          <span>👀</span>
          {/* decorate with symbols? */}
        </section>
        <Row>
          <Cell start={1} end={11} mobileSpan={8} align="start">
            <section className={s.highlightsSubtitle}>
              <p>
                Hey what's going on there, here are a few cultural consumption
                highlights I think is deserved to be shared. <br /> From
                websites, to movies, to music, to podcasts, to comedy and more.
              </p>
            </section>
          </Cell>
        </Row>
        <Row>
          <Cell start={1} end={11} mobileSpan={8} align="start">
            <div className={s.websites}>
              <p>Let's start with the websites. The damn websites.</p>
            </div>
          </Cell>
        </Row>
        <section className={s.highlights}>
          {/*WEBSITES*/}
          <div className={s.highlightsItem}>
            <h2>eighteen websites not nominated by awwwards:</h2>
            {HIGHLIGHTS_WEBSITES_2024.map((highlight) => (
              <Highlight
                key={highlight.title}
                title={highlight.title}
                description={highlight.description}
                url={highlight.url}
                image={highlight.image}
                contentPosition={highlight.contentPosition}
                imagePosition={highlight.imagePosition}
              />
            ))}
            {/*MOVIES*/}
            <div className={s.highlightsItem}>
              <h2>four movies:</h2>
              {HIGHLIGHTS_MOVIES_2024.map((highlight) => (
                <Highlight
                  key={highlight.title}
                  title={highlight.title}
                  description={highlight.description}
                  url={highlight.url ?? ''}
                  image={highlight.image}
                  contentPosition={highlight.contentPosition}
                  imagePosition={highlight.imagePosition}
                />
              ))}
            </div>
            {/*PODCASTS*/}
            <div className={s.highlightsItem} id="podcasts">
              {HIGHLIGHTS_PODCASTS_2024.map((section, index) => (
                <BooksList
                  key={index}
                  title={section.title}
                  subtitle={section.subtitle}
                  items={section.items}
                  image={section.image}
                  contentPosition={section.contentPosition}
                  imagePosition={section.imagePosition}
                  webglType={section.webglType}
                />
              ))}
            </div>
            {/*MUSIC VIDEOS*/}
            <div className={s.highlightsItem}>
              <h2>four music videos:</h2>
              {HIGHLIGHTS_MUSIC_VIDEOS_2024.map((highlight) => (
                <Highlight
                  key={highlight.title}
                  title={highlight.title}
                  description={highlight.description}
                  url={highlight.url}
                  image={highlight.image}
                  contentPosition={highlight.contentPosition}
                  imagePosition={highlight.imagePosition}
                />
              ))}
            </div>
            {/*LIVE SHOWS*/}
            <div className={s.highlightsItem}>
              <h2>three live shows:</h2>
              {HIGHLIGHTS_LIVE_SHOWS_2024.map((highlight) => (
                <Highlight
                  key={highlight.title}
                  title={highlight.title}
                  description={highlight.description}
                  url={highlight.url}
                  image={highlight.image}
                  contentPosition={highlight.contentPosition}
                  imagePosition={highlight.imagePosition}
                />
              ))}
            </div>
            {/*COMEDY*/}
            <div className={s.highlightsItem}>
              <h2>one comedy piece:</h2>
              {HIGHLIGHTS_COMEDY_2024.map((highlight) => (
                <Highlight
                  key={highlight.title}
                  title={highlight.title}
                  description={highlight.description}
                  url={highlight.url}
                  image={highlight.image}
                  contentPosition={highlight.contentPosition}
                  imagePosition={highlight.imagePosition}
                />
              ))}
            </div>
          </div>
          {/*BOOKS*/}
          <section className={s.extra} id="extra">
            {HIGHLIGHTS_BOOKS_2024.map((section, index) => (
              <BooksList
                key={index}
                title={section.title}
                subtitle={section.subtitle}
                items={section.items}
                image={section.image}
                contentPosition={section.contentPosition}
                imagePosition={section.imagePosition}
                webglType={section.webglType}
              />
            ))}
            {/* MUSIC */}
            <div className={s.music}>
              <h2>extra two: sixty-one songs</h2>
              <a href="https://www.goodreads.com/book/show/57278.The_Great_Gatsby">
                <span className={s.decoration}>______________________</span>
                my favs sixty-one songs of 2024 RELEASED IN SPOTIFY
              </a>
            </div>
          </section>
        </section>
      </div>
    </div>
  )
}

export default Page
