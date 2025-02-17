'use client'

import { useGSAP } from '@gsap/react'
import { memo, useMemo, useRef } from 'react'

import { useAppStore } from '~/context/use-app-store'
import { useDeviceDetect } from '~/hooks/use-device-detect'
import { gsap } from '~/lib/gsap'

import LoaderOverlay from '../loader-overlay'
import { ASCII_ART } from './constants'
import s from './loader.module.css'

// const AsciiLine = memo(
//   ({ line, className }: { line: string; className: string }) => (
//     <pre className={className}>
//       {line.split('').map((char, index) => (
//         <span key={index} className={s.hiddenChar}>
//           {char}
//         </span>
//       ))}
//     </pre>
//   )
// )

// const AsciiBlock = memo(
//   ({ lines, isOverlay }: { lines: string[]; isOverlay: boolean }) => {
//     const className = s.ascii_line + (isOverlay ? '__overlay' : '')
//     return (
//       <div className={s.ascii__container}>
//         {lines.map((line, index) => (
//           <AsciiLine key={index} line={line} className={className} />
//         ))}
//       </div>
//     )
//   }
// )

const IntroAnimation = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const textContainerOverlayRef = useRef<HTMLDivElement | null>(null)
  const asciiContainerRef = useRef<HTMLPreElement | null>(null)

  const containerOverlayColor1Ref = useRef<HTMLDivElement | null>(null)
  const containerOverlayColor2Ref = useRef<HTMLDivElement | null>(null)
  const containerOverlayColor3Ref = useRef<HTMLDivElement | null>(null)
  const containerOverlayColor4Ref = useRef<HTMLDivElement | null>(null)

  const containerOverlayFinalRef = useRef<HTMLDivElement | null>(null)

  const loaderContainerRef = useRef<HTMLDivElement | null>(null)

  const { isMobile: isMobileDevice } = useDeviceDetect()

  const { introSeen, setIntroSeen } = useAppStore()

  const renderAsciiArt = (art: string, isOverlay: boolean) => {
    const className = `${s.ascii_line}${isOverlay ? '__overlay' : ''}`

    return (
      <pre className={s.ascii_art}>
        {art.split('\n').map((line, index) => (
          <div key={index} className={className} aria-hidden="true">
            {line}
          </div>
        ))}
      </pre>
    )
  }
  const mm = gsap.matchMedia()

  useGSAP(() => {
    if (introSeen) {
      return
    }

    mm.add(
      {
        isMobile: '(max-width: 500px)',
        // if is min width is 500px and max width is 1000px
        isDesktop: '(min-width: 500px) and (max-width: 1500px)',
        isLargeScreen: '(min-width: 1500px)'
      },
      (context) => {
        const conditions = context.conditions as {
          isMobile: boolean
          isDesktop: boolean
          isLargeScreen: boolean
        }
        const { isMobile, isDesktop, isLargeScreen } = conditions

        const timeLine = gsap.timeline()
        if (
          (asciiContainerRef.current &&
            containerRef.current &&
            textContainerOverlayRef.current &&
            containerOverlayColor1Ref.current &&
            containerOverlayColor2Ref.current &&
            containerOverlayColor3Ref.current &&
            containerOverlayColor4Ref.current &&
            containerOverlayFinalRef.current &&
            loaderContainerRef.current,
          textContainerOverlayRef.current)
        ) {
          const lines = asciiContainerRef.current?.querySelectorAll(
            `.${s.ascii_line}`
          )
          const textDivscOverlay =
            textContainerOverlayRef.current?.querySelectorAll('div')

          if (lines && lines.length > 0) {
            timeLine
              .to(lines, {
                opacity: 1,
                // duration: 0.09,
                stagger: 0.06,
                // ease: 'none',
                delay: 0.3
              })
              .to(
                [
                  containerOverlayColor1Ref.current,
                  containerOverlayColor2Ref.current,
                  containerOverlayColor3Ref.current,
                  containerOverlayColor4Ref.current,
                  containerOverlayFinalRef.current
                ],
                {
                  clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',

                  // ease: 'circ.out',
                  ease: 'power1.inOut',
                  duration: isMobile ? 1.6 : isLargeScreen ? 1.2 : 1,
                  stagger: {
                    amount: 0.6
                  }
                },
                '-=1.1'
              )
              .to(
                textDivscOverlay,
                {
                  x: isMobile ? 2000 : 2500,
                  stagger: 0.1,
                  duration: 5,

                  ease: 'back.in(2)'
                },
                isLargeScreen
                  ? '-=1.8'
                  : isDesktop
                    ? '-=1.8'
                    : isMobile
                      ? '-=2.4'
                      : '-=2.4'
              )
              .to(
                textContainerOverlayRef.current,
                {
                  scale: 6,
                  rotate: -90,
                  y: 1000,
                  duration: isMobile ? 2.6 : isLargeScreen ? 2.8 : 3,
                  ease: 'expo.inOut'
                },
                isLargeScreen
                  ? '-=3.6'
                  : isDesktop
                    ? '-=3.6'
                    : isMobile
                      ? '-=3.6'
                      : '-=3.6'
              )

              .to(
                loaderContainerRef.current,
                {
                  clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
                  duration: isMobile
                    ? 1
                    : isDesktop
                      ? 1
                      : isLargeScreen
                        ? 1
                        : 1,
                  onComplete: () => {
                    setIntroSeen(true)
                  }
                },
                isMobile ? '-=1.4' : isLargeScreen ? '-=0.6' : '-=0.7'
              )
          }
        }
      }
    )
  }, [introSeen, setIntroSeen, isMobileDevice])

  return (
    <>
      <div className={s.container} ref={containerRef}>
        <div className={s.ascii__container}>
          <pre className={s.ascii_art} ref={asciiContainerRef}>
            {renderAsciiArt(ASCII_ART, false)}
          </pre>
        </div>
      </div>
      <LoaderOverlay
        asciiColor="#27272a"
        backgroundColor="#e7e7e7"
        isMobileDevice={isMobileDevice}
        ref={containerOverlayColor1Ref}
      />
      <LoaderOverlay
        asciiColor="#e7e7e7"
        backgroundColor="#27272a"
        isMobileDevice={isMobileDevice}
        ref={containerOverlayColor2Ref}
      />
      <LoaderOverlay
        asciiColor="#27272a"
        backgroundColor="#e7e7e7"
        isMobileDevice={isMobileDevice}
        ref={containerOverlayColor3Ref}
      />
      <LoaderOverlay
        asciiColor="#e7e7e7"
        backgroundColor="#27272a"
        isMobileDevice={isMobileDevice}
        ref={containerOverlayColor4Ref}
      />
      <div className={s.container__overlay} ref={containerOverlayFinalRef}>
        <div
          className={s.text__container__overlay}
          ref={textContainerOverlayRef}
        >
          <div className={s.text__overlay}>
            B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!: :T8:: 8 !B:8.B
            | . B:|: :.|B!8!8"!✦! B! B.8 " .988| ^ P^B✲..| 8|. 8 : 8.B .
            ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.| T.!f8|: 88^
            ?:.! :||P8 b8 .V TB|88W8 P8 ☮| b.☆. . |88 : B.8.|Y6 8.:8.:B 8 |. B
            o:B .b B 8B| ||fB:'B:6:8T B8|. ' v| 8.8 B 8 8|:T. |B8 f.| 88: B8
            B88B":!|d:|b8 | . |:. !YP8 ✲. 8 B ?:YB.:B888 888^ |☮Bo |||B8: :|B
            P. ':|8i: ||.8|: oR| .B "B:B : B89:|. . |B .8 8b:| | 9.8B... 8^| !|:
            b6 F T? ,."|T : F i9 B|.: B|:||R B. .B B: .BB|B9 ' B.F8 8 |98. |..:
            .?8|b8bB..B ||P! .8.Y ! ...B8ou.| |!f|P .. 8 .8!☮ :. ^.f. 8:: ,|: 8
            .|88 B8:.8 . ^: 8 B:!B.; 8 B !^ . !T!T| |:8 '8:.BY. 'uTi:B8 |B?89:!
            ✦ PB8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 .
            :88.B.8.B8 B| : | .8 || 8 ..:.TPT 8 !.: T✲B 8B8 8T B : 88#bd . . .:B
            : . :.:8 . ..68;8| :: 8 9| | .. 8 |:8|B | .^BB8 ':8B8 8u R . B. :|B
            8:B ..B 88!8 B;:.|88 ||B 8 B . !. :☮.B | ✦.:8!|^ 9|: :8BB| :8?of.
            8T98||.8 |P"i B|88.!|8:8. '. |Y| 8!B8.. .:f|8B :,: :b Y o|| .- bB '.
            8|..R8#8 .8 8|! B :. : B8B8:B| | B.|8?? W B8B. :! |B .TB8B 8: |B .8
            ! m| :; .- _.: ^8.B8 B. !. ^B :BB! B 8 B8 _|9B:f8B ,Bf88. B8 . . !
            o|.. |. B |'B.!6!|B||: BB !9 BY-|8. . 8b:886: . :.. 8 6.8 : | 8|. ::
            a . 8 PB.!o8.8 | B8 B i |Bt:| :: . : :|..|8. fYB |8B 8☮::. F8 B 8|
            | !8.F .P..BR8| B|P :B . B:?: : a^ :B | :.. |B :B "| !.|
            RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o T8|.8 B8:i8 .|.8 |.!
            ^:✲;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8|| ,i||.!B: 8: |8i
            :88 8 B.88| : " . B! . .☮889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88
            "B!8 . .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo|
            |!8 .b ..|: B. B8 | ! |:B.B B.: :|8:. :":W 8 |:B ✲., b9B ,.8 B!. |
            .:B o |.^:F f8|B88 :"'i .o = '. B8!. BB|:| .": ,8 ✦| 88 R.|" f 8 8.:
            u | : 89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f
            .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf .b
            8:8 .|8,. !. f! B||| | ..|.od !bT .|:|| B !☆;.9F |^ .| i |: B| 8
            .8T:!|B f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 !
            8!8:^ 8B 9,: 8 |BT. :o- 8 f |:o||b 8 8 8|8B8: |. !.98 R 8!B ' :|'B
            :. 8|!o |.!6 8 8 .' 8| i.|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B: P88:d.^☮ :
            ..B|.?: : ! B :| ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 ! BBB_8.i' 88
            =FB BP8.:.:B | B !BB... :o8!. .| B" 9 i 8.88.8:8 F.|8:B8..B!. B8 B8.
            B f.: | 8 88: .?|Y8|Pb:| 8 .. . !! :8 Ba ;:|B8 8. 8BB6 . ✲B,: :8!!B:
            |bB .B|i9. ✦8!8 8i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B .8^: B9.| .
            | |!888 u.,:. . 9☮|8 , 6:Y ..|.:: 8|8 . ..B 8! B ?: ;|R .u8 ! 88
            88: ..::B.' |8BF || BY R!B!!| ::" Y:.o-.: 886 8B.. 8B .8. ":. |8."f
            . ! V .:88 .9.|!.| !B ..Bo9: 88 o 9T|BB6B|uBT:F|.8BF . f .8P8 9' ✦'
            .! 88 8 8.| . F ! 8 f :B?:b |. 8 .
          </div>

          <div className={s.text__overlay}>
            B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!: :T8:: 8 !B:8.B
            | . B:|: :.|B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8 ;88:|9; B'8ii ^ :b
            , :F. B8.lB :8.!. : 8.B... |☆:8 .: . |..| 8|. 8 : 8.B . ^.|,Y:8B:.
            B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.| T.!f8|: 88^ ?:.! :||P8 b8
            .V TB|88W8 P8 | b. . . |88 : B.8.|Y6 8.:8.:B 8 |. B o:B .b B 8B|
            ||fB:'B:6:8T B✦8|. ' | 8.8 B 8 8|:T. |B8 f.| 88: B8 B88B":!|d:|b8 |
            . |:. !YP8 . 8 B ?:YB.:B888 888^ |Bo |||B8: :|B P. ':|8i: ||.8|: oR|
            .B "B:B : B89:|. . |B .8 8b:| | 9.8B... 8^| !|: b6 F T? ,."|T : F i9
            B|.: B|:|✦ B. .B B: .BB|B9 ' B.F8 8 |98. |..: .?8|b8bB..B ||P! .8.Y
            ! ...B8ou.| |!f|P .. 8 .8! :. ^.f. ✲8:: ,|: 8 .|88 B8:.8 . ^: 8
            B:!B.; 8 B !^ . !T!T| |:8 '8:.BY. 'uTi:B8 |B?89:! PB8:8o|F;:|
            8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 . :88.B.8.B8 B| : | .8
            || 8 ..:.TPT 8 !.: TB 8B8 8T B : 88#bd . . .:B : . :.:8 . ..68;8| ::
            8 9| | .. 8 |:8|B | .^BB8 ':8B8 8u R . B. :|B 8:B ..B 88!8 B;:.|88
            ||B 8 B . !. :.B | .:8!|^ 9|: :8BB| :8?of. 8T98||.8 |P"i B|88.!|8:8.
            '. |Y| 8!B8.. .:f|8B :,: :b Y o|| .- bB '. 8|..R8#8 .8 8|! B :. :
            B8B8:B| | B✦.|8?? W B8B. :! |B .TB8B 8: |✲B .8 ! m| :; .- _.: ^8.B8
            B. !. ^B :BB! B 8 B8 _|9B:f8B ,Bf88. B8 . . ! o|.. |. B |'B.!6!|B||:
            BB !9 BY-|8. . 8b:886: . :.. 8 6.8 : | 8|. :: a . 8 PB.!o8.8 | B8 B
            i |Bt:| :: . : :|..|8. fYB |8B 8::. ✦F8 B 8| | !8.F .P..BR8| B|P :B
            . B:?: : a^ :B | :.. |B :B "| !.| RB.::?8.:8.|BPB BB .8 9..:.8 ' |
            ^| 8:| .o T8|.8 B8:i8 .|.8 |.! ^:;.✲|8 o8 8,iR! .:: : .: . 8 .88
            BB..: :| : .8|| ,i||.!B: 8: |8i :88 8 B.88| : " . B! .
            .889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88 "B!8 . .8|8.|8| 9 B :B:|.
            8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b ..|: B. B8 | ✲!
            |:B.B B.: :|8:. :":W 8 |:B ., b9B ,.8 B!. | .:B o |.^:F f8|B88 :"'i
            .o = '. B8!. BB|:| .": ,8 | 88✦ R.|" f 8 8.: u | : 89b^ 8B..!!8
            f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f .8P8 9' ' .! 88 8
            8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf .b 8:8 .|☮8,. !. f!
            B||| | ..|.od !bT .|:|| B ! ;.9F |^ .| i |: B| 8 .8T:!|B f :B8 . .8B
            |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 ! 8!8:^ 8B 9,: 8 |BT.
            :o- 8 f |:o||b 8 8 8|8B8: |. !.98 R 8!B ' :|'B :. 8|!o |.!6 8 8 .'
            8| i.|8 #. 'B:P!'.8 ✦Tb8B8.8 BB..8.B: P88:d.^ : ..B|.?: : ! B :|
            ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 ! BBB_8.i' 88 =FB BP8.:.:B | B
            !BB... :o8!. .| B" 9 i 8.88.8:8 F.|8:B8..B!. B8 B8. B f.: | 8 88:
            .?|Y8|Pb:| 8 .. . !! :8 Ba ;:|B8 8. 8BB6 . ✲B,: :8!!B: |bB .B|i9.
            8!8 8i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B .8^: B9.| . | |!888
            u.,:. . 9☮|8 , 6:Y ..|.:: 8|8 . ..B 8! B ?: ;|R .u8 ! 88 88:
            ..::B.' |8BF || BY R!B!!| ::" Y:.o-.: 886 8B.. 8B .8. ":. |8."f . !
            V .:88 .9.|!.| !B ..Bo9: 88 o 9T|BB6B|uBT:F|.8BF . f .8P8 9' ✦' .!
            88 8 8.| . F ! 8 f :B?:b |. 8 .
          </div>

          <div className={s.text__overlay}>
            B... b | ..oB| :8 .8B8| To|✲ f P..:. .:B. BB:6'.!8_!: :T8:: 8 !B:8.B
            | . B:|: :.|B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8 ;88:|9; B'8ii ^ :b
            , :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|. 8 : 8.B . ^.|,Y:8B:.
            B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.| T.!f8|: 88^ ?:.! :||P8 b8
            .V TB|88W8 P8 | b. . ✦. |88 : B.8.|Y6 8.:8.:✲B 8 |.☮ B o:B .b B 8B|
            ||fB:'B:6:8T B✦8|. ' | 8.8 B 8 8|:T. |B8 f.| 88: B8 B88B":!|d:|b8 |
            . |:. !YP8 . 8 B ?:YB.:B8☆88 888^ |Bo |||B8: :|B P. ':|8i: ||.8|:
            oR| .B "B:B : B89:|. . |B . 8b:| | 9.8B... 8^| !|: b6 F T? ,."|T : F
            i9 B|.: B|:|☮|R B. .B B: .BB|B9 ' B.F8 8 |98. |..: .?8|b8bB..B ||P!
            .8.Y ! ...B8ou.✲| |!f|P .. 8 .8! :. ^.f. 8:: ,|: 8 .|88 B8:.8 . ^: 8
            B:!B.; 8 B !^ . !T!T| |:8 '8:.BY. 'uTi:B8 |B?89:! PB8:8o|F;:|
            8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | ✲| B 8 . :88.B.8.B8 B| : | .8
            || 8 ..:.TPT 8 !.: TB 8B8 8T B : 88#bd . . .:B : . :.:8 . ..68;8| ::
            8 9| | .. 8 |:8|B | .^BB8 ':8B8 8u R . B.☆:|B 8:B ..B 88!8 B;:.|88
            ||B 8 B . !. :.B | .:8!|^ 9|: :8BB| :8?of. 8T98||.8 |P"i B|88.!|8:8.
            '. |Y| 8!B8.. .:f|8B :,: :b Y o|| .- bB '. 8|..R8#8 .8 8|! B :. :
            B8B8:B| | B✦.|8?? W B8B. :! |☮B .TB8B 8: |B .8 ! m| :; .- _.: ^8.B8
            B. !. ^B :BB! B 8 B8 _|9B:f8B ,Bf88. B8 . . ! o|.. |. B |'B.!6!|B||:
            BB !9 BY-|8. . 8b:886: . :.. 8 6.8 : | 8|. :: a . 8 PB.!o8.8 | B8 B
            i |Bt:| :: . : :|..|8. fYB |8B 8::. ✦F8 B 8| | !8.F .P..BR8| B|P :B
            . B:?: : a^ :B | :.. |B :B "| !.| RB.::?8.:8.|BPB BB .8 9..:.8 ' |
            ^| 8:| .o T8|.8 B8:i8 .|.8 |.! ^:;.✲|8 o8 8,iR! .:: : .: . 8 .88
            BB..: :| : .8|| ,i||.!B: 8: |8i :88 8 B.88| : " . B! .
            .889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88 "B!8 . .8|8.|8| 9 B :B:|.
            8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b ..|: B. B8 | ✲!
            |:B.B B.: :|8:. :":W 8 |:B ., b9B ,.8 B!. | .:B o |.^:F f8|B88 :"'i
            .o = '. B8!. BB|:| .": ,8 | 88✦ R.|" f 8 8.: u | : 89b^ 8B..!!8
            f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f .8P8 9' ' .! 88 8
            8.| . F ! 8 f :B?:b |. ✲8 .☆.B 8: B68 : .. o:Bf .b 8:8 .|☮8,. !. f!
            B||| | ..|.od !bT .|:|| B ! ;.9F |^ .☆| i |: B| 8 .8T:!|B f :B8 .
            .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 ! 8!8:^ 8B 9,: 8
            |BT. :o- 8 f |:o||b 8 8 8|8B8: |. !.98 R 8!B ' :|'B :. 8|!o |.!6 8 8
            .' 8| i.|8 #. 'B:P!'.8 ✦Tb8B8.8 BB..8.B: P88:d.^ : ..B|.?: : ! B :|
            ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 ! BBB_8.i' 88 =FB BP8.:.:B | B
            !BB... :o8!. .| B" 9 i 8.88.8:8 F.|8:B8..B!. B8 B8☮. B f.: | 8 88:✦
            .?|Y8|Pb:| 8 .. . !! :8 Ba ;:|B8 8. 8BB6 ☆. B,: :8!!B: |bB .B|i9.
            8!8 8✲i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B .8^: B9.| . | |!888
            u.,:. . 9|8 , ☆6:Y ..|.:: 8|8 . ..B 8! B ?: ;|R .u8 ! 88 88: ..::B.'
            |8BF || BY R!B!!| ✦::" Y:.o-.: 886 8B.. 8B .8. ":. |8."f . ! V .:88
            .9.|!.| !B ..Bo9: 88 o 9T|BB6B|uBT:F|.8BF . f .8P8 9' ' .! 88 8 8.|
            . F ! 8 f :B?:b |. 8 .
          </div>

          <div className={s.text__overlay}>
            B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!: :T8:: 8 ✲!B:8.B
            | . B:|: :.|B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8 ;88:|9; B'8ii ^ :b
            , :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|. 8 : 8.B . ^.|,Y:8B:.
            B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.| T.!f8|: 88^ ?:.! :||P8 b8
            .V TB|88W8 P8 | b. . ✦. |88 : B.8.|Y6 8.:8.:✲B 8 |.☮ B o:B .b B 8B|
            ||fB:'B:6:8T B✦8|. ' | 8.8 B 8 8|:T. |B8 f.| 88: B8 B88B":!|d:|b8 |
            . |:. !YP8 . 8 B ?:YB.:B8☆88 888^ |Bo |||B8: :|B P. ':|8i: ||.8|:
            oR| .B "B:B : B89:|. . |B . 8b:| | 9.8B... 8^| !|: b6 F T? ,."|T : F
            i9 B|.: B|:|☮|R B. .B B: .BB|B9 ' B.F8 8 |98. |..: .?8|b8bB..B ||P!
            .8.Y ! ...B8ou.✲| |!f|P .. 8 .8! :. ^.f. 8:: ,|: 8 .|88 B8:.8 . ^: 8
            B:!B.; 8 B !^ . !T!T| |:8 '8:.BY. 'uTi:B8 |B?89:! PB8:8o|F;:|
            8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | ✲| B 8 . :88.B.8.B8 B| : | .8
            || 8 ..:.TPT 8 !.: TB 8B8 8T B : 88#bd . . .:B : . :.:8 . ..68;8| ::
            8 9| | .. 8 |:8|B | .^BB8 ':8B8 8u R . B.☆:|B 8:B ..B 88!8 B;:.|88
            ||B 8 B . !. :.B | .:8!|^ 9|: :8BB| :8?of. 8T98||.8 |P"i B|88.!|8:8.
            '. |Y| 8!B8.. .:f|8B :,: :b Y o|| .- bB '. 8|..R8#8 .8 8|! B :. :
            B8B8:B| | B✦.|8?? W B8B. :! |☮B .TB8B 8: |B .8 ! m| :; .- _.: ^8.B8
            B. !. ^B :BB! B 8 B8 _|9B:f8B ,Bf88. B8 . . ! o|.. |. B |'B.!6!|B||:
            BB !9 BY-|8. . 8b:886: . :.. 8 6.8 : | 8|. :: a . 8 PB.!o8.8 | B8 B
            i |Bt:| :: . : :|..|8. fYB |8B 8::. ✦F8 B 8| | !8.F .P..BR8| B|P :B
            . B:?: : a^ :B | :.. |B :B "| !.| RB.::?8.:8.|BPB BB .8 9..:.8 ' |
            ^| 8:| .o T8|.8 B8:i8 .|.8 |.! ^:;.✲|8 o8 8,iR! .:: : .: . 8 .88
            BB..: :| : .8|| ,i||.!B: 8: |8i :88 8 B.88| : " . B! .
            .889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88 "B!8 . .8|8.|8| 9 B :B:|.
            8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b ..|: B. B8 | ✲!
            |:B.B B.: :|8:. :":W 8 |:B ., b9B ,.8 B!. | .:B o |.^:F f8|B88 :"'i
            .o = '. B8!. BB|:| .": ,8 | 88✦ R.|" f 8 8.: u | : 89b^ 8B..!!8
            f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f .8P8 9' ' .! 88 8
            8.| . F ! 8 f :B?:b |. ✲8 .☆.B 8: B68 : .. o:Bf .b 8:8 .|☮8,. !. f!
            B||| | ..|.od !bT .|:|| B ! ;.9F |^ .☆| i |: B| 8 .8T:!|B f :B8 .
            .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 ! 8!8:^ 8B 9,: 8
            |BT. :o- 8 f |:o||b 8 8 8|8B8: |. !.98 R 8!B ' :|'B :. 8|!o |.!6 8 8
            .' 8| i.|8 #. 'B:P!'.8 ✦Tb8B8.8 BB..8.B: P88:d.^ : ..B|.?: : ! B :|
            ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 ! BBB_8.i' 88 =FB BP8.:.:B | B
            !BB... :o8!. .| B" 9 i 8.88.8:8 F.|8:B8..B!. B8 B8☮. B f.: | 8 88:✦
            .?|Y8|Pb:| 8 .. . !! :8 Ba ;:|B8 8. 8BB6 ☆. B,: :8!!B: |bB .B|i9.
            8!8 8✲i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B .8^: B9.| . | |!888
            u.,:. . 9|8 , ☆6:Y ..|.:: 8|8 . ..B 8! B ?: ;|R .u8 ! 88 88: ..::B.'
            |8BF || BY R!B!!| ✦::" Y:.o-.: 886 8B.. 8B .8. ":. |8."f . ! V .:88
            .9.|!.| !B ..Bo9: 88 o 9T|BB6B|uBT:F|.8BF . f .8P8 9' ' .! 88 8 8.|
            . F ! 8 f :B?:b |. 8 .
          </div>
        </div>
        <div className={s.loader__container} ref={loaderContainerRef}></div>
      </div>
    </>
  )
}

export default IntroAnimation
