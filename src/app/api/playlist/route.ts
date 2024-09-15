import { NextRequest, NextResponse } from 'next/server'
import NodeCache from 'node-cache'

import spotifyApi from '~/lib/spotify'

// Initialize cache with a standard TTL of 1 hour
const cache = new NodeCache({ stdTTL: 3600 })

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const playlistId = searchParams.get('id')

  if (!playlistId) {
    return NextResponse.json(
      { error: 'Playlist ID is required' },
      { status: 400 }
    )
  }

  // Check if data is in cache
  const cachedData = cache.get<any>(playlistId)
  if (cachedData) {
    return NextResponse.json(cachedData)
  }

  try {
    // Retrieve an access token using client credentials flow
    const data = await spotifyApi.clientCredentialsGrant()
    const accessToken = data.body['access_token']
    spotifyApi.setAccessToken(accessToken)

    // Fetch the playlist
    const playlistData = await spotifyApi.getPlaylist(playlistId)

    const transformedData = {
      id: playlistData.body.id,
      name: playlistData.body.name,
      description: playlistData.body.description,
      images: playlistData.body.images,
      external_urls: playlistData.body.external_urls,
      tracks: playlistData.body.tracks.items.map((item: { track: any }) => ({
        id: item.track.id,
        name: item.track.name,
        artists: item.track.artists.map(
          (artist: { name: string }) => artist.name
        ),
        album: item.track.album.name,
        duration_ms: item.track.duration_ms,
        preview_url: item.track.preview_url
      }))
    }

    // Store data in cache
    cache.set(playlistId, transformedData)

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Error fetching playlist:', error)
    if (
      error instanceof Error &&
      'statusCode' in error &&
      error.statusCode === 404
    ) {
      return NextResponse.json({ error: 'Playlist not found' }, { status: 404 })
    }
    return NextResponse.json(
      { error: 'Error fetching playlist' },
      { status: 500 }
    )
  }
}
