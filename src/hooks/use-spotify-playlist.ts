import { useEffect, useState } from 'react'

import { Playlist } from '~/types/spotify'

interface UseSpotifyPlaylistReturn {
  playlist: Playlist | null
  isLoading: boolean
  error: string | null
}

export function useSpotifyPlaylist(
  playlistId: string
): UseSpotifyPlaylistReturn {
  const [playlist, setPlaylist] = useState<Playlist | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  return { playlist, isLoading, error }
}
