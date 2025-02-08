import s from './hero-video.module.css'

export const HeroVideo = () => {
  return (
    <div className={s.videoContainer}>
      <video autoPlay muted loop playsInline className={s.video}>
        <source
          src="./assets/videos/2024-highlights/hero-video.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  )
}
