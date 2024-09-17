'use client'
import DOMPurify from 'dompurify'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import styles from './spotify.module.css'

interface Track {
  id: string
  name: string
  artists: string[]
  album: string
  duration_ms: number
  preview_url: string | null
}

interface Playlist {
  id: string
  name: string
  description: string
  images: { url: string }[]
  tracks: Track[]
  external_urls: { spotify: string }
}

interface SpotifyPlaylistProps {
  playlistId: string
}

export default function SpotifyPlaylist({ playlistId }: SpotifyPlaylistProps) {
  const [playlist, setPlaylist] = useState<Playlist | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const fetchPlaylist = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/playlist?id=${playlistId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch playlist')
        }
        const data = await response.json()
        setPlaylist(data)
      } catch (err) {
        setError('Error fetching playlist')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlaylist()
  }, [playlistId])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentTrack])

  const handlePlayPause = (track: Track) => {
    if (currentTrack && currentTrack.id === track.id) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentTrack(track)
      setIsPlaying(true)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent, track: Track) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handlePlayPause(track)
    }
  }

  if (isLoading) {
    return (
      <div className={styles.loading} aria-live="polite">
        ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
        <br />
        Loading playlist...
        <br />
        ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆ <br />
        ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
        <br />
        ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
        <br />
        ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
        <br />
        ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
        <br />
        ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
        <br />
        ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
        <br />
        ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
        <br />
        ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
        <br />
      </div>
    )
  }
  if (error) {
    return (
      <div className={styles.error} aria-live="assertive" role="alert">
        {error}
      </div>
    )
  }
  if (!playlist) {
    return (
      <div className={styles.error} aria-live="assertive" role="alert">
        No playlist data available
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.card} role="region" aria-label="Spotify Playlist">
        <div className={styles.cardHeader}>
          <div className={styles.headerContent}>
            <div className={styles.playlistName}>
              <h1>{playlist.name}</h1>
            </div>
            <div className={styles.playlistImage}>
              <Image
                src={playlist.images[0]?.url || '/placeholder.svg'}
                alt=""
                width={640}
                height={640}
              />
            </div>
            <div className={styles.playlistDescription}>
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(playlist.description)
                }}
              ></p>
            </div>
            <div className={styles.openSpotifyLink}>
              <a
                href={playlist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Spotify
                <span className={styles.srOnly}>(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.cardContent}>
          <ul className={styles.trackList} aria-label="Playlist tracks">
            {playlist.tracks.map((track, index) => (
              <li key={track.id} className={styles.trackItem}>
                <span className={styles.trackNumber} aria-hidden="true">
                  {index + 1}
                </span>
                <div className={styles.trackInfo}>
                  <p className={styles.trackName}>{track.name}</p>
                  <p className={styles.trackArtists}>
                    {track.artists.join(', ')}
                  </p>
                </div>
                <button
                  className={styles.playButton}
                  onClick={() => handlePlayPause(track)}
                  onKeyDown={(e) => handleKeyDown(e, track)}
                  disabled={!track.preview_url}
                  aria-label={`${isPlaying && currentTrack?.id === track.id ? 'Pause' : 'Play'} ${track.name} by ${track.artists.join(', ')}`}
                  aria-pressed={isPlaying && currentTrack?.id === track.id}
                >
                  <span aria-hidden="true">
                    {isPlaying && currentTrack?.id === track.id
                      ? 'pause'
                      : 'play'}
                  </span>
                </button>
                <span className={styles.trackDuration} aria-label="Duration">
                  {formatDuration(track.duration_ms)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {currentTrack && currentTrack.preview_url && (
        <audio
          ref={audioRef}
          src={currentTrack.preview_url}
          onEnded={() => setIsPlaying(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000)
  const seconds = ((ms % 60000) / 1000).toFixed(0)
  return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`
}
