import {
  ScrollScene,
  styles,
  UseCanvas,
  useScrollRig
} from '@14islands/r3f-scroll-rig'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense, useRef } from 'react'
import Markdown from 'react-markdown'
import rehypeExternalLinks from 'rehype-external-links'

import { AspectBox } from '~/components/aspect-box'
import { Cell } from '~/components/grid/cell'
import { Row } from '~/components/grid/row'
import { WebglPixelatedImage } from '~/components/three/image/webgl-pixelated-image/webgl-pixelated-image'
import { getImageSizes } from '~/lib/utils/image'

import s from './highlight.module.css'

interface HighlightProps {
  isFirstInSection?: boolean
  title: string
  description?: string
  url: string
  image?: {
    url: string
    alt: string
    width: number
    height: number
  }
  contentPosition?: {
    start: number
    end: number
    mobileSpan?: number
    order?: number
    align?: 'start' | 'center' | 'end' | undefined
  }
  imagePosition?: {
    start: number
    end: number
    mobileSpan?: number
    order?: number
  }
}

export const Highlight = ({
  isFirstInSection,
  title,
  description,
  url,
  image,
  contentPosition = {
    start: 1,
    end: 12,
    mobileSpan: 8,
    order: 1,
    align: 'start'
  },
  imagePosition = { start: 13, end: 24, mobileSpan: 8, order: 2 }
}: HighlightProps) => {
  const trackedElement = useRef(null!)
  const imgRef = useRef(null!)
  const { hasSmoothScrollbar } = useScrollRig()

  const sizes = getImageSizes(
    image?.width ?? 0,
    (image?.width ?? 0) / 2,
    (image?.width ?? 0) / 3
  )

  return (
    <div
      className={`${s.highlight} ${isFirstInSection ? s.firstInSection : ''}`}
    >
      <Row>
        <Cell
          start={contentPosition.start}
          end={contentPosition.end}
          mobileSpan={contentPosition.mobileSpan}
          order={contentPosition.order}
          align={contentPosition.align}
          className={s.content}
        >
          {/* <div className={s.contentContainer}> */}
          <h3 className={s.title}>
            <Link href={url} target="_blank" rel="noopener noreferrer">
              {title}
            </Link>
          </h3>
          {description && (
            <div className={s.description}>
              <Markdown
                rehypePlugins={[[rehypeExternalLinks, { target: '_blank' }]]}
              >
                {description}
              </Markdown>
            </div>
          )}
          {/* </div> */}
        </Cell>

        {image && (
          <Cell
            start={imagePosition.start}
            end={imagePosition.end}
            mobileSpan={imagePosition.mobileSpan}
            order={imagePosition.order}
            className={s.imageWrapper}
          >
            <div
              className={`${s.imageContainer} ${styles.hiddenWhenSmooth}`}
              ref={trackedElement}
            >
              <AspectBox ratio={16 / 9}>
                <Image
                  src={image.url}
                  alt={image.alt}
                  ref={imgRef}
                  fill
                  sizes={sizes}
                  // width={image.width}
                  // height={image.height}
                />
              </AspectBox>
            </div>
            {hasSmoothScrollbar && (
              <UseCanvas>
                <ScrollScene track={trackedElement}>
                  {(props) => (
                    <Suspense fallback={null}>
                      <WebglPixelatedImage
                        imgRef={imgRef}
                        easeFactorValue={0.05}
                        {...props}
                      />
                    </Suspense>
                  )}
                </ScrollScene>
              </UseCanvas>
            )}
          </Cell>
        )}
      </Row>
    </div>
  )
}
