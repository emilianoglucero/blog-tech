'use client'

import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { useRef } from 'react'
import Draggable from 'react-draggable'

import SpotifyPlaylist from '~/components/spotify/SpotifyPlaylist'
import TransitionLink from '~/components/transition-link/page'
import { gsap } from '~/lib/gsap'

import kidsInConcert from '../images/playlist-oct-nov-24/playlist-oct-nov.jpg'
import s from './page.module.css'
import Scene from './Scene'

const Page = () => {
  const containerOverlay = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    gsap.to(containerOverlay.current, {
      clipPath: 'inset(0 0 100% 0)',
      delay: 0.2,
      duration: 1,
      ease: 'power2.inOut'
    })
  })

  return (
    <>
      <div className={s.container__overlay} ref={containerOverlay}></div>

      <div className={s.container}>
        <div className={s.header}>
          <div className={s.blog__title}>
            <p>
              <TransitionLink href="/">
                <span>I 🖤 my computer job</span>
              </TransitionLink>
            </p>
          </div>

          <h1 className={s.title}>
            <div className={s.title__words__wrapper}>
              <span>Hey!</span> <br />
              <span> Hey!</span> <br />
              <span> You!</span>
              <br />
              <span> You!</span>
            </div>
          </h1>
        </div>

        <section>
          <div className={s.description}>
            <p>
              Ambient Textures: <br />A curated selection of sounds in the shape
              of a playlist every two-months
            </p>
          </div>
        </section>
        <section className={s.photo__wrapper}>
          <Image
            src={kidsInConcert}
            alt="Kids in concert"
            width={400}
            height={400}
          />
          <figcaption className={s.photo__caption}>
            <p>
              <span>Kids having fun in Sonar Festival, Barcelona, 2023</span>
            </p>
          </figcaption>
        </section>
        <Draggable>
          <section className={s.canvas} data-draggable="true">
            <Scene />
          </section>
        </Draggable>
        <Draggable>
          <section className={s.canvas__two} data-draggable="true">
            <Scene />
          </section>
        </Draggable>
        <Draggable>
          <section className={s.canvas__three} data-draggable="true">
            <Scene />
          </section>
        </Draggable>
        <Draggable>
          <section className={s.canvas__four} data-draggable="true">
            <Scene />
          </section>
        </Draggable>
        <section className={s.player__wrapper}>
          <SpotifyPlaylist playlistId="1tcGJDiXPCR4uCkDd0ChYG" />
        </section>
        <footer className={s.footer}>
          <div className={s.blog__title}>
            <p>
              <TransitionLink href="/">
                <span>I 🖤 my computer job</span>
              </TransitionLink>
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Page
