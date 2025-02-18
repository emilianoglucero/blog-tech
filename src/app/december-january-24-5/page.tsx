'use client'

import { useGSAP } from '@gsap/react'
import DOMPurify from 'dompurify'
import Image from 'next/image'
import { useRef } from 'react'

import { formatDuration } from '~/components/spotify/SpotifyPlaylist'
import TransitionLink from '~/components/transition-link/page'
import { useSpotifyPlaylist } from '~/hooks/use-spotify-playlist'
import { gsap } from '~/lib/gsap'

import s from './page.module.css'

const Page = () => {
  const containerOverlay = useRef<HTMLDivElement>(null)
  const { isLoading, playlist, error } = useSpotifyPlaylist(
    '0cqThc44jmFndmCcLoUYtP'
  )
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
        <header className={s.header}>
          <nav className={s.nav}>
            <TransitionLink href="/">
              <span>I 🖤 my computer job</span>
            </TransitionLink>
          </nav>
          <h1 className={s.title}>December - January (2024/5).</h1>
          <p className={s.subtitle}>
            A delayed relaxing and psych-up one for the holidays.
          </p>
        </header>

        <main className={s.main}>
          <div className={s.heroImage}>
            <Image
              src="/assets/images/playlist-dec-jan/cocina.jpg"
              alt="A girl with a bass in a kitchen."
              width={1642}
              height={1046}
            />
            <p className={s.heroImage__description}>
              Captured in Ciudad de Córdoba, Argentina (2024): My friend Dio
              with a bass in a kitchen.
            </p>
          </div>
          {error && (
            <div className={s.error}>
              Error: upppps sorry! something bad happened. Please reload or try
              again later
            </div>
          )}
          {isLoading ? (
            <div className={s.loading}>Loading...</div>
          ) : (
            <div className={s.playlist}>
              <p
                className={s.playlist__description}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(playlist?.description || '')
                }}
              ></p>
              <div className={s.playlist__link}>
                <a
                  href={playlist?.external_urls.spotify}
                  target="_blank"
                  rel="noopener"
                >
                  Listen on Spotify
                </a>
              </div>
              <div className={s.playlist__images}>
                {playlist?.images[0]?.url && (
                  <Image
                    src={playlist?.images[0]?.url}
                    alt={playlist?.images[0]?.url}
                    width={400}
                    height={400}
                  />
                )}
              </div>
              <div className={s.playlist__tracks}>
                {playlist?.tracks.map((track, index) => (
                  <div className={s.playlist__track} key={track.id}>
                    <div className={s.playlist__track__number}>
                      <span>🍓</span>
                      <span>{index + 1}</span>
                      <span>.</span>
                    </div>
                    <div className={s.playlist__track__info}>
                      <h3 className={s.playlist__track__title}>
                        {track.name} .
                      </h3>
                      <p className={s.playlist__track__artist}>
                        {track.artists.map((artist) => artist).join(', ')}
                      </p>
                      <span className={s.playlist__track__duration}>
                        {formatDuration(track.duration_ms)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        <footer className={s.footer}>
          <TransitionLink href="/">
            <span>I 🖤 my computer job</span>
          </TransitionLink>
        </footer>
      </div>
    </>
  )
}

export default Page
