export interface Track {
  id: string
  name: string
  artists: string[]
  album: string
  duration_ms: number
  preview_url: string | null
}

export interface Playlist {
  id: string
  name: string
  description: string
  images: { url: string }[]
  tracks: Track[]
  external_urls: { spotify: string }
}
