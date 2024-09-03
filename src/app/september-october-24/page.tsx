'use client'

import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { useRef } from 'react'
import Draggable from 'react-draggable'

import SpotifyPlaylist from '~/components/spotify/SpotifyPlaylist'
import TransitionLink from '~/components/transition-link/page'
import { gsap } from '~/lib/gsap'

import kidsInConcert from '../images/playlist-sep-oct-24/playlist-sep-oct.jpg'
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
            <TransitionLink href="/">
              <p>
                <span>hola :)</span>
              </p>
            </TransitionLink>
          </div>

          <h1 className={s.title}>
            <div className={s.title__words__wrapper}>
              <span>ESTE</span> <br />
              <span> JUEVES!</span> <br />
              <span> EN FLOYD!</span>
            </div>
          </h1>
        </div>

        <section>
          <div className={s.description}>
            <p>
              Ciclo Jit Jot Vol 10: <br />
              Lauri Fire + <br /> El Nombre Secreto + <br /> Los Rayos <br />
              22hs
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
        </section>
        <Draggable>
          <section className={s.canvas}>
            <Scene />
          </section>
        </Draggable>
        <Draggable>
          <section className={s.canvas__two}>
            <Scene />
          </section>
        </Draggable>
        <Draggable>
          <section className={s.canvas__three}>
            <Scene />
          </section>
        </Draggable>
        <Draggable>
          <section className={s.canvas__four}>
            <Scene />
          </section>
        </Draggable>
        <section className={s.player__wrapper}>
          <SpotifyPlaylist playlistId="1tcGJDiXPCR4uCkDd0ChYG" />
        </section>
      </div>
    </>
  )
}

export default Page
