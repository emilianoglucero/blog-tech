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

import { useGSAP } from '@gsap/react'

import { BooksList } from './components/books-list/books-list'

const Page = () => {
  const containerOverlay = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const numberTwo = useRef<HTMLSpanElement>(null)
  const numberZero = useRef<HTMLSpanElement>(null)
  const numberTwo2 = useRef<HTMLSpanElement>(null)
  const numberFour = useRef<HTMLSpanElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    gsap.to(containerOverlay.current, {
      clipPath: 'inset(0 0 100% 0)',
      delay: 0.2,
      duration: 1,
      ease: 'power2.inOut'
    })

    // 2024 number animation
    const timeline = gsap.timeline({
      delay: 0.2,
      scrollTrigger: {
        trigger: '#websites',
        start: 'top-=100% top',
        end: '+=450%',
        scrub: 1
      }
    })
    timeline
      .to(numberTwo.current, {
        yPercent: -200,
        xPercent: -4000,
        rotate: 360
      })
      .to(
        numberZero.current,
        {
          yPercent: 4000,
          xPercent: -200,
          rotate: 360
        },
        0
      )
      .to(
        numberTwo2.current,
        {
          yPercent: -2000,
          xPercent: 2000,
          rotate: 360
        },
        0
      )
      .to(
        numberFour.current,
        {
          yPercent: -200,
          xPercent: 3500,
          rotate: -360
        },
        0
      )
  })

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
    const colorGrayLighter = ['#262626', '#ec8624', '#262626', '#262626']
    const colorGreen2 = ['#262626', '#fb65c1', '#f00', '#fb65c1']
    const colorWhite = ['#fb65c1', '#262626', '#0038ff', '#42ff00']
    const colorPrimary = ['#262626', '#ec8624', '#262626', '#262626']

    // Store initial values to reset later
    const initialColors = {
      '--color-gray-lighter': '#262626',
      '--color-green': '#42ff00',
      '--color-white': '#fff',
      '--color-primary': '#e7e7e7'
    }

    if (footerRef.current) {
      let currentIndex = 0

      const updateColors = () => {
        gsap.to(document.documentElement, {
          '--color-gray-lighter': colorGrayLighter[currentIndex],
          '--color-green': colorGreen2[currentIndex],
          '--color-white': colorWhite[currentIndex],
          '--color-primary': colorPrimary[currentIndex],
          duration: 1.5
        })
        currentIndex = (currentIndex + 1) % colorGrayLighter.length
      }

      const st = ScrollTrigger.create({
        trigger: footerRef.current,
        start: 'bottom+=80px bottom',
        end: 'bottom bottom',
        onEnter: updateColors,
        toggleActions: 'play none none none'
      })

      // Cleanup function
      return () => {
        // Kill the ScrollTrigger instance
        st.kill()
        // Reset CSS variables to initial values
        gsap.set(document.documentElement, initialColors)
      }
    }
  }, [])
  return (
    <>
      <div className={s.container__overlay} ref={containerOverlay}></div>

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
          <span ref={numberTwo}>2</span>
          <span ref={numberZero}>0</span>
          <span ref={numberTwo2}>2</span>
          <span ref={numberFour}>4</span>
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
                  websites, to movies, to music, to podcasts, to comedy and
                  more.
                </p>
              </section>
            </Cell>
          </Row>
          <Row>
            <Cell start={1} end={11} mobileSpan={8} align="start">
              <div className={s.websites} id="websites">
                <p>Let's start with the websites. The damn websites.</p>
              </div>
            </Cell>
          </Row>
          <section className={s.highlights}>
            {/*WEBSITES*/}
            <div className={s.highlightsItem}>
              <h2>eighteen websites not nominated by awwwards:</h2>
              {HIGHLIGHTS_WEBSITES_2024.map((highlight, index) => (
                <Highlight
                  key={highlight.title}
                  isFirstInSection={index === 0}
                  {...highlight}
                />
              ))}
            </div>
            {/*MOVIES*/}
            <div className={s.highlightsItem}>
              <h2>four movies:</h2>
              <div className={s.highlightsItemDescription}>
                Now the movies. Truth be told I did not watch a lot of 2024
                movies because the time I destinate for cinema I did tried to
                watch all José Celestino Campusano's filmography.
              </div>
              {HIGHLIGHTS_MOVIES_2024.map((highlight, index) => (
                <Highlight
                  key={highlight.title}
                  title={highlight.title}
                  description={highlight.description}
                  url={highlight.url ?? ''}
                  image={highlight.image}
                  contentPosition={highlight.contentPosition}
                  imagePosition={highlight.imagePosition}
                  isFirstInSection={index === 0}
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
              <div className={s.highlightsItemDescription}>
                Some day I'll release new music and hire El Cielo and Fantastic
                3D Creation and Fomotrauma and Pleazzures. Some day.
              </div>
              {HIGHLIGHTS_MUSIC_VIDEOS_2024.map((highlight, index) => (
                <Highlight
                  key={highlight.title}
                  title={highlight.title}
                  description={highlight.description}
                  url={highlight.url}
                  image={highlight.image}
                  contentPosition={highlight.contentPosition}
                  imagePosition={highlight.imagePosition}
                  isFirstInSection={index === 0}
                />
              ))}
            </div>
            {/*LIVE SHOWS*/}
            <div className={s.highlightsItem}>
              <h2>three live shows:</h2>
              <div className={s.highlightsItemDescription}>
                I'm a simple boy with simple hobbies and I've always wanted to
                go on tour with a band. I had traveled to play in other cities
                before, but I wanted to do it as a proper tour—an <i>n</i>{' '}
                number of gigs in <i>n</i> number of days. Travel and play.{' '}
                <br />
                Back when I lived in Mexico City, I met several people
                organizing DIY tours with their underground bands, especially
                from the U.S. Here in Argentina, it's much rarer to see bands
                playing tours with more than two gigs. I don't know why but I
                wanted that experience. <br />
                This year, the planets aligned, and thanks to my friends and the
                help of many people involved, we made it happen. <br />
                It's tough because, as you can imagine, you have to organize a
                lot—make connections, coordinate with people, bands, and venues
                from other cities, take time off work (or whatever you're
                doing), handle logistics, and more. <br />
                But we got Lauri's precious Renault Clio on the road and played
                four shows in seven days in the northeast of the country. <br />
                That first taste broke something loose. Suddenly we're crossing
                borders - Formosa, Paraguay, Rosario, Paraná, San Luis. A team
                of four friends, one car and two shows to offer. <br />
                Every night was different but the feeling was always the same:
                this is exactly where we're supposed to be. Making noise and
                sharing moments.
                <br />
                While we figure out where the road leads next, here are some
                shows that lit up my 2024.
              </div>

              {HIGHLIGHTS_LIVE_SHOWS_2024.map((highlight, index) => (
                <Highlight
                  key={highlight.title}
                  title={highlight.title}
                  description={highlight.description}
                  url={highlight.url}
                  image={highlight.image}
                  contentPosition={highlight.contentPosition}
                  imagePosition={highlight.imagePosition}
                  isFirstInSection={index === 0}
                />
              ))}
            </div>
            {/*COMEDY*/}
            <div className={s.highlightsItem}>
              <h2>one comedy piece:</h2>
              <div className={s.highlightsItemDescription}>
                It's an honor to present this award to O'Malley.
              </div>
              {HIGHLIGHTS_COMEDY_2024.map((highlight, index) => (
                <Highlight
                  key={highlight.title}
                  title={highlight.title}
                  description={highlight.description}
                  url={highlight.url}
                  image={highlight.image}
                  contentPosition={highlight.contentPosition}
                  imagePosition={highlight.imagePosition}
                  isFirstInSection={index === 0}
                />
              ))}
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
                <a
                  href="https://open.spotify.com/playlist/3Nh96L9bWVq3ycQdkaZvEE?si=3cd7c38f867441b3"
                  target="_blank"
                  rel="noopener"
                >
                  <span className={s.decoration}>______________________</span>
                  my favs sixty-one songs of 2024 RELEASED IN SPOTIFY
                </a>
              </div>
            </section>
            <Row>
              <Cell start={6} end={22} mobileSpan={8} align="start">
                <section
                  className={s.highlightsSubtitle}
                  style={{ justifyContent: 'start', marginBottom: '9.25rem' }}
                >
                  <p ref={footerRef}>
                    Hey you scrolled down all the way down here, are you crazy?{' '}
                    <br />
                    If you have any feedback, recommendations, wants to hire me
                    or just want to say
                    <i>*hi I liked this you should see this*</i>, please reach
                    out to me on{' '}
                    <a
                      target="_blank"
                      href="https://x.com/emilianoglucero"
                      rel="noopener"
                    >
                      X,
                    </a>{' '}
                    <a
                      target="_blank"
                      href="https://instagram.com/emilianogiannakopoulos"
                      rel="noopener"
                    >
                      Instagram
                    </a>
                    , book a call on{' '}
                    <a
                      target="_blank"
                      href="https://calendly.com/hello-emilianolucero/30min"
                      rel="noopener"
                    >
                      Calendly
                    </a>{' '}
                    or send me an email at{' '}
                    <a href="mailto:hello@emilianolucero.info">
                      hello@emilianolucero.info
                    </a>
                    .
                  </p>
                </section>
              </Cell>
            </Row>
          </section>
        </div>
      </div>
    </>
  )
}

export default Page
