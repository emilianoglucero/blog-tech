import '@14islands/r3f-scroll-rig/css'

import { GlobalCanvas, SmoothScrollbar } from '@14islands/r3f-scroll-rig'
import { useRef } from 'react'

import { useDeviceDetect } from '~/hooks/use-device-detect'

export const CanvasProvider = ({ children }: { children: React.ReactNode }) => {
  const eventSource = useRef(null!)
  const isMobile = useDeviceDetect().isMobile

  return (
    <div ref={eventSource}>
      <GlobalCanvas
        eventSource={eventSource}
        camera={{ fov: 33 }}
        scaleMultiplier={0.01}
        eventPrefix="client"
        style={{
          pointerEvents: 'none',
          zIndex: 100
        }}
      />

      <SmoothScrollbar enabled={!isMobile}>
        {(bind) => <main {...bind}>{children}</main>}
      </SmoothScrollbar>
    </div>
  )
}
