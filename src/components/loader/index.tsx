'use client'

import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

import { useAppStore } from '~/context/use-app-store'
import { useDeviceDetect } from '~/hooks/use-device-detect'
import { gsap } from '~/lib/gsap'

import s from './loader.module.css'

export const Loader = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const textContainerRef = useRef<HTMLDivElement | null>(null)
  const asciiContainerRef = useRef<HTMLPreElement | null>(null)

  const { isMobile: isMobileDevice } = useDeviceDetect()

  const { introSeen, setIntroSeen } = useAppStore()

  const asciiArt = `
                   .,,uod8B8bou,,.
              ..,uod8BBBBBBBBBBBBBBBBRPFT?l!i:.
         ,=m8BBBBBBBBBBBBBBBRPFT?!||||||||||||||
         !...:!TVBBBRPFT||||||||||!!^^""'   ||||
         !.......:!?|||||!!^^""'            ||||
         !.........||||                     ||||
         !.........||||  ##                 ||||
         !.........||||                     ||||
         !.........||||                     ||||
         !.........||||                     ||||
         !.........||||                     ||||
         .........||||                    ,||||
          .;.......||||               _.-!!|||||
   .,uodWBBBBb.....||||       _.-!!|||||||||!:.
!YBBBBBBBBBBBBBBb..!|||:..-!!|||||||!iof68BBBBBb....
!..YBBBBBBBBBBBBBBb!!||||||||!iof68BBBBBBRPFT?!::   ..
!....YBBBBBBBBBBBBBBbaaitf68BBBBBBRPFT?!:::::::::     :.
!......YBBBBBBBBBBBBBBBBBBBRPFT?!::::::;:!^".;:::       '.
!........YBBBBBBBBBBRPFT?!::::::::::^''...::::::;         iBBbo.
...........YBRPFT?!::::::::::::::::::::::::;iof68bo.      WBBBBbo.
  ...........:::::::::::::::::::::::;iof688888888888b.     .YBBBP^'
    .........::::::::::::::::;iof688888888888888888888b.     .
      .......:::::::::;iof688888888888888888888888888888b.
        .....:::;iof688888888888888888888888888888888899fT!
          ...::!8888888888888888888888888888888899fT|!^"'
            .' !!988888888888888888888888899fT|!^"'
                .!!8888888888888888899fT|!^"'
                  .!988888888899fT|!^"'
                    .!9899fT|!^"'
                      .!^"'
  `

  const renderAsciiArt = (art: string) => {
    return art.split('').map((char, index) => (
      <span key={index} className={s.hiddenChar}>
        {char}
      </span>
    ))
  }
  const mm = gsap.matchMedia()

  useGSAP(() => {
    console.log('useGSAP hook executed') // Debugging: log when the hook is executed

    if (introSeen) {
      console.log('Intro not seen or textContainerRef is null') // Debugging: log the condition
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
        // const { isMobile, isDesktop } = context.conditions
        // const { isMobile, isDesktop } = context.conditions

        const tl = gsap.timeline()
        console.log(context.conditions)
        if (asciiContainerRef.current && textContainerRef.current) {
          const chars = asciiContainerRef.current.querySelectorAll(
            `.${s.hiddenChar}`
          )
          // console.log('Animating chars:', chars) // Debugging: log the elements

          const textDivs = textContainerRef.current?.querySelectorAll('div')

          tl.to(textDivs, {
            opacity: 0.1,
            stagger: 0.01,
            delay: 0.1
          })
            .to(chars, {
              opacity: 1,
              delay: 0.3,
              stagger: 0.002
            })
            .to(asciiContainerRef.current, {
              skewX: -90,
              duration: 1.8,
              opacity: 0
            })

          tl.to(
            textDivs,
            {
              x: 500,
              stagger: 0.1
              // opacity: 0.5
            },
            isLargeScreen
              ? '-=2.6'
              : isDesktop
                ? '-=2.2'
                : isMobile
                  ? '-=2.6'
                  : '-=2.4'
          )
            .to(
              textDivs,
              {
                opacity: 1
                // stagger: 0.01
              },
              isMobile
                ? '-=0.2'
                : isDesktop
                  ? '+=0.6'
                  : isLargeScreen
                    ? '+=0.6'
                    : '+=0.6'
            )
            .to(
              textContainerRef.current,
              {
                scale: 4,
                rotate: -90,
                y: 1000,
                duration: 3,
                ease: 'power4.inOut'
              },
              isLargeScreen ? 6 : isDesktop ? 6.2 : isMobile ? 6 : 6.2
            )

          const textDivsReverse = Array.from(
            textContainerRef.current.querySelectorAll('div')
          ).reverse()

          tl.to(
            textDivsReverse,
            {
              x: isMobile
                ? 1500
                : isDesktop
                  ? 2000
                  : isLargeScreen
                    ? 3000
                    : 2000,
              duration: isMobile ? 4 : isDesktop ? 3 : isLargeScreen ? 4 : 3,
              stagger: isMobile
                ? 0.1
                : isDesktop
                  ? 0.09
                  : isLargeScreen
                    ? 0.09
                    : 0.09,
              ease: 'expo.inOut'
            },
            isMobile ? 5.2 : 6.2
          ).to(
            containerRef.current,
            {
              yPercent: -100,
              duration: isMobile
                ? 1.8
                : isDesktop
                  ? 1.4
                  : isLargeScreen
                    ? 1.8
                    : 1.4,
              onComplete: () => {
                setIntroSeen(true)
              }
            },
            isMobile ? 8.6 : isDesktop ? 9.2 : isLargeScreen ? 9.4 : 9
          )
        }
      }
    )
  }, [introSeen, setIntroSeen, isMobileDevice])

  return (
    <>
      <div className={s.container} ref={containerRef}>
        <div className={s.symbols__container}></div>
        <div className={s.ascii__container}>
          <pre className={s.ascii_art} ref={asciiContainerRef}>
            {renderAsciiArt(asciiArt)}
          </pre>
        </div>
        <div className={s.text__container} ref={textContainerRef}>
          {/* {generateTextDivs(25)} */}
          <div className={s.text}>
            B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!: :T8:: 8 !B:8.B
            | . B:|: :.|B!8!8"!✦! B! B.8 " .988| ^ P^B✲..| 8|. 8 : 8.B .
            ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.| T.!f8|: 88^
            ?:.! :||P8 b8 .V TB|88W8 P8 ☮| b.☆. . |88 : B.8.|Y6 8.:8.:B 8 |. B
            o:B .b B 8B| ||fB:'B:6:8T B8|. ' ☺v| 8.8 B 8 8|:T. |B8 f.| 88: B8
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
            o|.. |. B |'B.!6!|B||: BB !9 BY-|8☺. . 8b:886: . :.. 8 6.8 : | 8|.
            :: a . 8 PB.!o8.8 | B8 B i |Bt:| :: . : :|..|8. fYB |8B 8☮::. F8 B
            8| | !8.F .P..BR8| B|P :B . B:?: : a^ :B | :.. |B :B "| !.|
            RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o T8|.8 B8:i8 .|.8 |.!
            ^:✲;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8|| ,i||.!B: 8: |8i
            :88 8 B.88| : " . B! . .☮889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88
            "B!8 . .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo|
            |!8 .b ..|: B. B8 | ! |:B.B B.: :|8:. :":W 8 |:B ✲., b9B ,.8 B!. |
            .:B o |.^:F f8|B88 :"'i .o = '. B8!. BB|:| .": ,8 ✦| 88 R.|" f 8 8.:
            u | : 89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!☺|B. .8.|F .
            f .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf
            .b 8:8 .|8,. !. f! B||| | ..|.od !bT .|:|| B !☆;.9F |^ .| i |: B| 8
            .8T:!|B f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 !
            8!8:^ 8B 9,: 8 |BT. :o- 8 f |:o||b 8 8 8|8B8: |. !.98 R 8!B ' :|'B
            :. 8|!o |.!6 8 8 .' 8| i.|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B: P88:d.^☮ :
            ..B|.?: : ! B :| ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 ! BBB_8.i' 88
            =FB BP8.:.:B | B !BB... :o8!. .| B" 9 i 8.88.8:8 F.|8:B8..B!. B8 B8.
            B f.: | 8 88: .?|Y8|Pb:| 8 .. . !! :8 Ba ;:|B8 8. 8BB6 . ✲B,: :8!!B:
            |bB .B|i9. ✦8!8 8i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B .8^: B9.| .
            | |!888 u.,:. . 9☮|8 , 6:Y ..|.:: 8|8 . ☺..B 8! B ?: ;|R .u8 ! 88
            88: ..::B.' |8BF || BY R!B!!| ::" Y:.o-.: 886 8B.. 8B .8. ":. |8."f
            . ! V .:88 .9.|!.| !B ..Bo9: 88 o 9T|BB6B|uBT:F|.8BF . f .8P8 9' ✦'
            .! 88 8 8.| . F ! 8 f :B?:b |. 8 .
          </div>

          <div className={s.text}>
            B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!: :T8:: 8 !B:8.B
            | . B:|: :.|B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8 ;88:|9; B'8ii ^ :b
            , :F. B8.lB :8.!. : 8.B... |☆:8 .: . |..| 8|. 8 : 8.B . ^.|,Y:8B:.
            B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.| T.!f8|: 88^ ?:.! :||P8 b8
            .V TB|88W8 P8 | b. . . |88 : B.8.|Y6 8.:8.:B 8 |. B o:B .b B 8B|
            ||fB:'B:6:8T ✲B8|. ' | 8.8 B 8 8|:T. |B8 f.| 88: B8 B88B":!|d:|b8 |
            . |:. !YP8 . 8 B ?:YB.:B888 888^ |Bo |||B8: :|B P. ':|8i: ||.8|: oR|
            .B "B:B : B89:|. . |B .8 8b:| | 9.8B... 8^| !|: b6 F T? ,."|T : F i9
            B|.: B|:||✦ B. .B B: .BB|B9 ' B.F8 8 |98. |..: .?8|b8bB..B ||P! .8.Y
            ! ...B8ou.| |!f|P .. 8 .8! :.☺ ^.f. ✲8:: ,|: 8 .|88 B8:.8 . ^: 8
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
            ^| 8:| .o T8|.8 B8:i8 .|.8 |.! ^:;.|8 o8 8,iR! .:: : .: . 8 .88
            BB..: :| : .8|| ,i||.!B: 8: |8i :88 8 B☺.88| : " . B! .
            .889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88 "B!8 . .8|8.|8| 9 B :B:|.
            8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b ..|: B. B8 | ✲!
            |:B.B B.: :|8:. :":W 8 |:B ., b9B ,.8 B!. | .:B o |.^:F f8|B88 :"'i
            .o = '. B8!. BB|:| .": ,8 | 88✦ R.|" f 8 8.: u | : 89b^ 8B..!!8
            f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f .8P8 9' ' .! 88 8
            8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .✲. o:Bf .b 8:8 .|8,.☆!. f!
            B||| | ..|.od !bT .|:|| B ! ;.9F |^ .| i |: B| 8 .8T:!|☺B f :B8 .
            .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 ! 8!8☺:^ 8B 9,: 8
            |BT. :o- 8 f |:o||b 8 8 8|8B8: |. !.98 R 8!B ' :|'B :. 8|!o |.!6 8 8
            .' 8| i.|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B: P88:d.^ : ..B|.?: : !✲ B✦ :|
            ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 ! BBB_8.i' 88 =FB BP8.:.:B | B
            !BB... :o8!. .| B" 9 i 8.88.8:8 F.|8:B8..B!. B8 B8. B f.: | 8 88:
            .?|Y8|Pb:| 8 .. . !! :8 Ba ;:|B8 8. 8BB6 . B,: :8!!B: |bB .B|i9. 8!8
            8i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B .8^: B9.| . | |!888 u.,:. .
            9|8 , 6:Y ..|.:: 8|8 . ..B 8! B ?: ;|R .u8 ! 88 88: ..::☺B.' |8BF
            || BY R!B!!| ::" Y:.o-.: 886 8B.. 8B .8. ":. |8."f . ! V .:88
            .9.|!.| !B ..Bo9: 88 o 9T|BB6B|uBT:F|.8BF . f .8P8 9' ' .! 88 8 8.|
            . F ! 8 f :B?:b |. 8 .
          </div>

          <div className={s.text}>
            B... b | ..oB| :8 .8B8| To|✲ f P..:. .:B. BB:6'.!8_!: :T8:: 8 !B:8.B
            | . B:|: :.|B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8 ;88:|9; B'8ii ^ :b
            , :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|. 8 : 8.B . ^.|,Y:8B:.
            B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.| T.!f8|: 88^ ?:.! :||P8 b8
            .V TB|88W8 P8 | b. . ✦. ☺|88 : B.8.|Y6 8.:8.:✲B 8 |.☮ B o:B .b B
            8B| ||fB:'B:6:8T B✦8|. ' | 8.8 B 8 8|:T. |B8 f.| 88: B8
            B88B":!|d:|b8 | . |:. !YP8 . 8 B ?:YB.:B8☆88 888^ |Bo |||B8: :|B P.
            ':|8i: ||.8|: oR| .B "B:B : B89:|. . |B .☺ 8b:| | 9.8B... 8^| !|:
            b6 F T? ,."|T : F i9 B|.: B|:|☮|R B. .B B: .BB|B9 ' B.F8 8 |98.
            |..: .?8|b8bB..B ||P! .8.Y ! ...B8ou.✲| |!f|P .. 8 .8! :. ^.f. 8::
            ,|: 8 .|88 B8:.8 . ^: 8 B:!B.; 8 B !^ . !T!T| |:8 '8:.BY. 'uTi:B8
            |B?89:! PB8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | ✲| B 8 .
            :88.B.8.B8 B| : | .8 || 8 ..:.TPT 8 !.: TB 8B8 ☺8T B : 88#bd . .
            .:B : . :.:8 . ..68;8| :: 8 9| | .. 8 |:8|B | .^BB8 ':8B8 8u R .
            B.☆:|B 8:B ..B 88!8 B;:.|88 ||B 8 B . !. :.B | .:8!|^ 9|: :8BB|
            :8?of. 8T98||.8 |P"i B|88.!|8:8. '. |Y| 8!B8.. .:f|8B :,: :b Y o||
            .- bB '. 8|..R8#8 .8 8|! B :. : B8B8:B| | B.|8?? W B8B. :! |☮B
            .TB8B 8: |B .8 ! m| :; .- _.: ^8.B8 B. !. ^B :BB! B 8 B8 _|9B:f8B
            ,Bf88. B8 . . ! o|.. |. B |'B.!6!|B||: BB !9 BY-|8. . 8b:886: . :..
            8 6.8 : | 8|. :: a . 8 PB.!o8.8 | B8 B i |Bt:| :: . : :|..|8. fYB
            |8B 8::. F8 B 8| | !8.F .P..BR8| B|P :B . B:?: : a^ :B | :.. |B :B
            "| !.| RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o T8|.8 B8:i8 .|.8
            |.! ^:;.✲|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8|| ,i||.!B: 8:
            |8i :88 8 B.88| : " . B! . .889oi6!.:.BB|B 8✲'B "B|8 |. !8!!| .RB 88
            "B!8 . .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8.✦ .l6? : |B.8Y Bo|
            |!8 .b .☆.|: B. B8 | ! |:B.B B☮.: :|8:. :":W 8 |:B ., b9B☮ ,.8 B!.
            | .:B o |.^:F f8|B88 :"'i .o = '. B8!. BB|:| .": ,8 | 88 R.|" f 8☺
            8.: u | : 89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F
            . f .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf
            .b 8:8 .|☮8,. !. f! B||| | ..|.od !bT .|:|| B ! ;.9F |^ .| i |: B|
            8 .8T:!|B f :B8 . .8B |T8:B: 8B | ☮f ; .|:. T 8; B|8|Y:|.| V. 88 !8
            ! 8!8:^ 8B 9,: 8 |BT. :o- 8 f |:o||b 8 8 8|8B8: |. !.98 R 8!B ' :|'B
            :. 8|!o |.!6 8 8 .' 8| i.|8 #. 'B:P!'.8 ✦Tb8B8.8 BB..8.B: P88:d.^ :
            ..B|.?: : ! B :| ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 ! BBB_8.i' 88
            =FB BP8.:.:B | B !BB... :o8!. .| B" 9 i 8.88.8:8 F.|8:B8..B!. B8
            B8☮. B f.: | 8 88:✦ .?|Y8|Pb:| 8 .. . !! :8 Ba ;:|B8 8. 8BB☺6 ☆.
            B,: :8!!B: |bB .B|i9. 8!8 8✲i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B
            .8^: B9.| . | |!888 u.,:. . 9|8 , 6:Y ..|.:: 8|8 . ..B 8! B ?: ;|R
            .u8 ! 88 88: ..::B.' |8BF ||☺ BY R!B!!| ✦::" Y:.o-.: 886 8B.. 8B
            .8. ":. |8."f . ! V .:88 .9.|!.| !B ..Bo9: 88 o 9T|BB6B|uBT:F|.8BF .
            f .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 .
          </div>
          <div className={s.text}>
            B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!: :T8:: 8 ✲!B:8.B
            | . B:|: :.|B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8 ;88:|9; B'8ii ^ :b
            , :F. B8.lB ☮:8.!. : 8.B... | :8 .: . |..| 8|. 8 : 8.B☮ .
            ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B !..!8☺'BBB 9B| m 8.| T.!f8|: 88^
            ?:.! :||P8 b8 .V TB|88W8 P8 | b. .☆ . |88 : B.8.|Y6 8.:8.:B 8 |. B
            o:B ✲.b B 8B| ||fB:'B:6:8T B8|. ' | 8.8 B 8 8|:T. |B8 f ✦.| 88: B8
            B88B":!|d:|b8 |☺ . |:. !YP8 . 8 B ?:YB.:B888 888^ |Bo |||B8: :|B P.
            ':|☮8i: ||.8|: oR| .B "B:B : B☮89:|. . |B .8 8b:| | 9.8B... 8^|
            !|: b6 F T? ,."✦|T : F i9 B|.: B|:||R B. .B B: .BB|B9 ' B.F8 8 |98.
            |..: .?8|b8bB..B ||P! .8.Y ! ...B8ou.|☆|!f|P .. 8 .8! :. ^.f. 8::
            ,|: 8 .|88 B8:.8 . ^: 8 B:!B.; 8 B !^ . !T!T| |:8 '8:.BY. 'uTi:B8
            |B?89:! PB8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 .
            :88.B.8.B8 B| : | .8 || 8 ..:.TPT 8 !.: TB 8B8 8T B : 88#bd . . .:B
            : . :.:8 . ..68;8| :: 8 9| | ✲.. 8 |:8|B | .^BB8 ':8B8 8u R . B. :|B
            8:B ..B 88!8 B;:.|88 ||B 8 B . !. :.B | .:8!|^ 9|: :8BB| :8?of.
            8T98||.8 |P"i B|88.!|8:8. '. ☺|Y| 8!B8.. .:f|8B :,: :b Y o|| .- bB
            '. 8|..R8#8 .8 8|! B :. : B8B8:B| | B.|8?? W B8B. :! |B .TB8B 8: |B
            .8 ! m| :; .- _.: ^8.B8 B. !. ^B :BB! B 8 B8 _|9B:f8B ,Bf88. B8 . .
            ! o|.. |. B |'B.!6!|B||: BB !9 BY-|8. . 8b:886: . :☮.. 8 6.8 : |
            8|. :: a . 8 PB.!o8.8 | B8 B i |Bt:|✲ :: . : :|..|8. fYB |8B 8::. F8
            B 8| | !8.F .P..BR8| B|P :B . B:?: : a^ :B | :.. |B :B "| !.|
            RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o T8|.8 B8:i8 .|.8 |.!
            ^:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8|| ,i||.!B: 8: |8i :88
            8 B.88| : " . B! . .889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88 "B!8 .
            .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b
            ..|: B. B8 | ! |:B.B B.: :|8:. :":W 8 |:B ., b9B ,.8 B!. | .:B o
            |.^:F f8|B88 :"'i .o ☺= '. B8!. BB|:| .": ,8 | 88 R.|" f 8 8.: u |
            : 89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 ☆'!:| .B.!|B. .8.|F . f
            .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. ✲8 .☆.B 8: B68 : .. o:Bf .b
            8:8 .|8,. !. f! B||| | ..|.od !bT .|:|| B ! ;.9F |^ .☆| i |: B| 8
            .8T:!|B f :B8 .✦ .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 !
            8!8:^ 8B 9,: 8 |✲BT. :o- 8 f |:o||b 8 8 8|8B8: |. !.98 R 8!B ' :|'B
            :. 8|!o |.!6 8 8 .' 8| i.|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B: P88:d.^ :
            .☮.B|.?: : ! B :| ||.a.☮|. B|. |o8? . 9 :.o|. 8;B. |B8 ! BBB_8.i'
            88 =FB BP8.:.:B | B !BB... :o8!. .| B" 9 i 8.88.8:8 F.|8:B8..B!. B8
            B8. B f.: | 8 88: .?|Y8|Pb:| 8 ☺.. . !! :8 Ba ;:|B8 8. 8BB6 . B,:
            :8!!B: |bB .B|i9. 8!8 8i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B .8^:
            B9.| ✦ . | |!888 u.,:. . 9|8 , ☆6:Y ..|.✲:: 8|8 . ..B 8! B ?: ☮;|R
            .u8 ! 88 88: ..::B.' |8BF || BY R!B!!| ::" Y:.o-.:✦ 886 8B.. 8B .8.
            ":. |8."f . ! V .:88 .9.|!.| !B ..Bo9: 88 o 9T|BB6B|uBT:F|.8BF . f
            .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 .
          </div>
          <div className={s.text}>
            B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!:☮ :T8:: 8
            !B:8.B | . B:|: :.|B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8 ;88:|9;
            B'8ii ^ :b , :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|. 8 : 8.B .
            ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B !✲..!8'BBB 9 ✦B| m 8.| T.!f8|: 88^
            ?:.✦! :||P8 b8 .V T☮B|☆88W8 P8 | b. . . |88 : B.8.|Y☮6 8.:8.:B 8
            |. B o:B .b B 8B| ||fB:'B:6:8T B8|. ' | 8.8 B 8 8|:T. |B8 f.| 88: B8
            B88B":!|d:|b8 | . |:. !YP8☺✲ . 8 B ?:YB.:B888 888^ |Bo |||B8: :|B
            P. ':|8i: ||.8|: oR| .B "B:B : B89:|. . |B .8 8b:| | 9.8B... 8^| !|:
            b6 F T? ,."|T : F i9 B|.: B|:||R B. .B B: .BB|B9 ' B.F8 8 |98. |..:
            .?8|b8bB..B ||P! .8.Y ! ...B8ou.| |!f|P .. 8 .8! :. ^.f. 8:: ,|: 8
            .|88 B8:.8 . ^: 8 B:!B.; 8 B !^ . !T!T| |:8 '8:.BY. 'uTi:B8 |B?89:!
            P☮B8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8"☮ 6 :. 8 | | B 8 .
            :88.B.8.B8 B| : | .8 || 8 ..:.TPT 8 !.: TB 8B8 8T B : 88#bd . . .:B
            : . :.:8 . ..68;8| :: 8 9| | .. 8 |:8|B | .^BB8 ✦':8B8 8u R . B. :|B
            8:B ..B 88!8 B;:.|88 ||B 8 B . !. ☮:.B | .:8!|^ 9|: :8BB| :8?of.
            8T98||.8 |P"i B|88.!|8:8. '. |Y| 8!B8.. .:f|8B :,: :b Y o|| .- bB '.
            8|..R8#8 .8 8|! B :. : B8B8:B| | B.|8?? W B8B. :! |B .TB8B 8: |B .8
            ! m| :;☮ .- _.: ^8.B8 B. !. ^B☺ :BB! B 8 B8 _|9B:f8B ,Bf88. B8 . .
            ! o|.. |. B |'B.!6!|B||: BB !9 BY-|8.☮ . 8b:886: . :.. 8 6.8 : |
            8|. :: a . 8☮ PB.!o8.8 | B8 B i |Bt:| :: . : :|..|8. fYB |8B 8::.
            F8 B 8| | !8.F .P..BR8| B|✦P :B . B:?: : a^ :B | ✲:.. |B :B "| !.|
            RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o T8|.8 B8:i8 .|.8 |.!
            ^☮:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8|| ,i||.!B: 8: |8i
            :88 8 B.88| : " . B! . .889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88 "B!8
            . .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b
            ..|: B. B8 | ! |:B.B B.: :|8:. :":W 8 |:B .,☆ b9B ,.8 B!. | .:B o
            |.^:F f8|✲B88 :"'i .o = '. ☮B8!. BB|:| .": ,8 | 88 R.|" f☮ 8 8.: u
            | : 89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f
            .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf .b
            8:8 .|8,. !. f! B||| | ..|.od !bT .|:|| B ! ;.9F |^ .| i |: B| 8
            .8T:!|B f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 !
            8!8:^ 8B 9,: 8 |BT. :o- 8 f |:o||b 8 8 8|8B8: |. !.98 R 8!B ' :|'B
            :. 8|!o |.!6 8 8 .' 8| ☮i.☺☆|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B:
            P88:d.^ : ..B✦|.?: : ! B :| ||.a.|. B|. |o8? . 9 :.o|. ✦8;B. |B8 !
            BBB_8.i' 88 =FB BP8.:.:B | B !BB... :o8!. .| B" 9 i 8.88.8:8
            F.|8:B8..B!. ☮B8 B8. B f.: | 8 88: .?|Y8|Pb:| 8 .. . !! :8 Ba ;:|B8
            8. 8BB6 . B,: :8!!B: |bB .B|i9. 8!8 8i.:| B 8 B8 || |.8. ^ ..8.B B 9
            888:8 B .8^: B9.| . | |!888✲ u.,:. . 9|8 , 6:Y ..|.:: 8|8 . ..B 8! B
            ?: ;|R .u8 ! 88 88: ..::B.' |8BF || BY R!B!!| ::" Y:.o-☮.: 886 8B..
            8B .8.☮ ":. |8."f . ! V .:88 .9.|!.| !B ..Bo9: 88 o
            9T|BB6B|uBT:F|.8BF . f .8P8 9' ' ✦ .! 88 8 8.| . F ! 8 f :B?:☮b |.
            8 .
          </div>
          <div className={s.text}>
            B... b | ..oB| :8 .8B8| To| ✲f P..:. .:B. BB:6'.!8_!: :T8:: 8 !B:8.B
            | . B:|: :.|B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8 ;88:|9; B'8ii ^ :b
            , :F. B8.lB :8.!. : 8.B... | :8 .: .☆ |..☺| 8|. 8 : 8.B .
            ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.| T☆.!f8|: 88^
            ?:.! :||P8 b8 .V TB|88W8 P8 | b. . . |88 : B.8.|Y6 8.:8✲.:B 8 |. B
            o:B .b B 8B| ||fB:'B:6:8T B8|. ' | 8.8 B 8 8|:T. |B8 f.| 88: B8
            B88B":!|d:|b8 | . |:. !YP8 . 8☮ B ?:YB.:B888 888^ |Bo |||B8: :|B P.
            ':|8i☮: ||.8|: oR| .B "B:B : B89:|. . |B .8 8b:| | 9.8B... 8^| !|:
            b6 F T? ,."|T : F i9 B|.: B|:||R B. .B B: .BB|B9 ' B.F8 8 |98. |..:
            .?8|b8bB..B ||P! .8.Y ! ...B8ou.| |!f|P .. 8 .8!✦ :. ^.f. 8:: ☆,|: 8
            .|88 B8:.8 . ^: 8 B:!B.; 8 B !^ . !T!T| |:8 '8:.BY. 'uTi:B8 |B?89:!
            PB8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B ☮8 .
            :88.B.8.B8 B| : ✲| .8 || 8 ..:.TPT 8 !.: TB 8B8 8T B : 88#bd . . .:B
            : . :.:8 . ..68;8| :: 8 9| | .. 8 |:8|B | .^BB8 ':8B8 8u R . B. :|B
            8:B ..B 88!8 B;:.|✦88 ||B 8 B . !. :.B | .:8!|^ 9|: :8BB| :8?of.
            8T98||.8 |P"i B|88.!|8:8. '. |Y| 8☺!B8.. .:f|8B :,: :b Y o|| .- bB
            '. 8|..R8#8 .8 8|! B :. : B8B8:B| | B.|8?? W B8B. :! |B .TB8B 8: |B
            .8 ! m| :; .- _.: ^8.B8 B. !. ^B :☮BB! B 8 B8 _|9B:f8B ,Bf88. B8 .
            . ! o|.☆. |. B |'B.!6!|B||: BB !9 BY-|8. . 8b:886: . :.. 8 6.8 : |
            8|. :: a . 8 PB.!o8.8 | B8 B i |Bt:| :: . : :|..|8. fYB |8B 8::. F8
            B 8| | !8.F .P..BR8| B|P :B . B:?: : a^ :B | :.. |B :B "| !.|
            RB.☺::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o T8|.8 B8:i8 .|.8 |.!
            ^:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8|| ,i||.!B: 8: |8i :88
            8 B.88| : " . B! . .889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88 "B!8 .
            .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B☮.8Y Bo| |!8 .b
            ..|: B. B8 | ! |:B.B B.: :|8:. :":W 8 |:B ., b9B ,.8 B!. | .:B o
            |.^:F f8|B88 :"'i .o = '. B8!. BB|:| .": ,8 | 88 R.|☆" f 8 8.: u | :
            89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f .8P8
            9' ' .! 88 8 8.| . F ! 8 f :B?:✲b |. 8 . .B 8: B68 : .. o:Bf .b
            8:☺8 .|8,. !. f! B||| | ..|.od !bT .|:|| B ! ;.9F |^ .| i |: B| ☮8
            .8T:!|B f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 !
            8!8:^ 8B 9,: 8 |BT. :o- 8 f |☮:o||b 8 8 8|8B8: |. !.98 R 8!B ' :|'B
            :. 8|!o |.!6 8 8 ☆.' 8| i.|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B: P88:d.^ :
            ..B|.?: : ! B :| ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 ! BBB_8.i' 88
            =FB BP8.:.:B | B !BB... :o8!. .| B" 9 i 8.88.8:8 F.|8:B8..B!. B8 B8.
            B f.: | 8 88: .?|Y8|Pb:| 8 .. . !! :8 Ba ;:|B8 8. 8BB6 . B,: :8!!B:
            |bB .B|i9. 8!8 8i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B .8^: B☮9.|
            ☺. | |!888 u.,:. . 9|8 , 6:Y ✦ ..|.:: 8|8 . ..B 8! B ?: ;|R .u8 !
            88 88: ..::B.' |8BF || BY R!B!!| ::" Y:.o-.: 886 8B.. 8B .8. ":.
            |8."f . ! V .:88 .9.|!.| !B ..Bo9:☮ 88 o 9T|BB6B|uBT:F|.8BF . f
            .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 .
          </div>
          <div className={s.text}>
            B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!: :T8:: 8 ✲!B:8.B
            | . B:|: :.|B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8 ;88:|9; B'8ii ^ :b
            , :F. B8.lB ☮:8.!. : 8.B... | :8 .: . |..| 8|. 8 : 8.B☮ .
            ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B !..!8☺'BBB 9B| m 8.| T.!f8|: 88^
            ?:.! :||P8 b8 .V TB|88W8 P8 | b. .☆ . |88 : B.8.|Y6 8.:8.:B 8 |. B
            o:B ✲.b B 8B| ||fB:'B:6:8T B8|. ' | 8.8 B 8 8|:T. |B8 f ✦.| 88: B8
            B88B":!|d:|b8 |☺ . |:. !YP8 . 8 B ?:YB.:B888 888^ |Bo |||B8: :|B P.
            ':|☮8i: ||.8|: oR| .B "B:B : B☮89:|. . |B .8 8b:| | 9.8B... 8^|
            !|: b6 F T? ,."✦|T : F i9 B|.: B|:||R B. .B B: .BB|B9 ' B.F8 8 |98.
            |..: .?8|b8bB..B ||P! .8.Y ! ...B8ou.|☆|!f|P .. 8 .8! :. ^.f. 8::
            ,|: 8 .|88 B8:.8 . ^: 8 B:!B.; 8 B !^ . !T!T| |:8 '8:.BY. 'uTi:B8
            |B?89:! PB8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 .
            :88.B.8.B8 B| : | .8 || 8 ..:.TPT 8 !.: TB 8B8 8T B : 88#bd . . .:B
            : . :.:8 . ..68;8| :: 8 9| | ✲.. 8 |:8|B | .^BB8 ':8B8 8u R . B. :|B
            8:B ..B 88!8 B;:.|88 ||B 8 B . !. :.B | .:8!|^ 9|: :8BB| :8?of.
            8T98||.8 |P"i B|88.!|8:8. '. ☺|Y| 8!B8.. .:f|8B :,: :b Y o|| .- bB
            '. 8|..R8#8 .8 8|! B :. : B8B8:B| | B.|8?? W B8B. :! |B .TB8B 8: |B
            .8 ! m| :; .- _.: ^8.B8 B. !. ^B :BB! B 8 B8 _|9B:f8B ,Bf88. B8 . .
            ! o|.. |. B |'B.!6!|B||: BB !9 BY-|8. . 8b:886: . :☮.. 8 6.8 : |
            8|. :: a . 8 PB.!o8.8 | B8 B i |Bt:|✲ :: . : :|..|8. fYB |8B 8::. F8
            B 8| | !8.F .P..BR8| B|P :B . B:?: : a^ :B | :.. |B :B "| !.|
            RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o T8|.8 B8:i8 .|.8 |.!
            ^:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8|| ,i||.!B: 8: |8i :88
            8 B.88| : " . B! . .889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88 "B!8 .
            .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b
            ..|: B. B8 | ! |:B.B B.: :|8:. :":W 8 |:B ., b9B ,.8 B!. | .:B o
            |.^:F f8|B88 :"'i .o ☺= '. B8!. BB|:| .": ,8 | 88 R.|" f 8 8.: u |
            : 89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 ☆'!:| .B.!|B. .8.|F . f
            .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. ✲8 .☆.B 8: B68 : .. o:Bf .b
            8:8 .|8,. !. f! B||| | ..|.od !bT .|:|| B ! ;.9F |^ .☆| i |: B| 8
            .8T:!|B f :B8 .✦ .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 !
            8!8:^ 8B 9,: 8 |✲BT. :o- 8 f |:o||b 8 8 8|8B8: |. !.98 R 8!B ' :|'B
            :. 8|!o |.!6 8 8 .' 8| i.|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B: P88:d.^ :
            .☮.B|.?: : ! B :| ||.a.☮|. B|. |o8? . 9 :.o|. 8;B. |B8 ! BBB_8.i'
            88 =FB BP8.:.:B | B !BB... :o8!. .| B" 9 i 8.88.8:8 F.|8:B8..B!. B8
            B8. B f.: | 8 88: .?|Y8|Pb:| 8 ☺.. . !! :8 Ba ;:|B8 8. 8BB6 . B,:
            :8!!B: |bB .B|i9. 8!8 8i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B .8^:
            B9.| ✦ . | |!888 u.,:. . 9|8 , ☆6:Y ..|.✲:: 8|8 . ..B 8! B ?: ☮;|R
            .u8 ! 88 88: ..::B.' |8BF || BY R!B!!| ::" Y:.o-.:✦ 886 8B.. 8B .8.
            ":. |8."f . ! V .:88 .9.|!.| !B ..Bo9: 88 o 9T|BB6B|uBT:F|.8BF . f
            .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 .
          </div>
          <div className={s.text}>
            B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6☆'.!8_!: :T8:: 8 !B:8.B
            | . B:|: :.|B!8!8"!! B! B.8 " .988| ^✲ P^B.:: : :8 ;88:|9; B'8ii ^
            :b , :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|. 8 : 8.B .
            ^.|,Y:8B:. B! 8 :R☮ ..: B8|9 8| B !..!8'BBB 9B| m 8.| T.!f8|: 88^
            ?:.! :||P8 b8 .V TB|88W8 P8 | b. . ☺. |88 : B.8.|Y6 8.:8.:B 8 |. ✲B
            o:B .b B 8B| ||fB:'B:6:8T B8|. ' | 8.8 B 8 8|:T. |B8 f.| 88: B8
            B88B":!|d:|b8 | . |:. !YP8 . 8 B ?:YB.:B888 888^ |Bo |||B8: :|B P.
            ':|8i: ||.8|: oR| .B "B: ✦B : B89:|. . |B .8 8b:| | 9.8B... 8^| !|:
            b6 F T? ,."|T : F i9 B|.: B|:||R B. .B B: .BB|B9 ' B.F8 8 |98. |..:
            .?8|b8bB..B ||P! .8.Y ! ...B8ou.| |!f|P .. 8 .8! :. ^☺.f. 8:: ,|: 8
            .|88 B8:.8 . ^: 8 B:!B.✲; 8 B !☆^ . !T!T| |:8 '8:.BY. '☮uTi:B8
            |B?89:! PB8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 .
            :88✲.B.8.B8 B| : | .8 || 8 ..:.TPT 8 !.: TB 8B8 8T B : 88#bd . . .:B
            : . :.:8 . ..68;8| :: 8 9| | .. 8 |:8|B | .^BB8 ':8B8 8u R . B. :|B
            8:B ..B 88☮!8 B;:.|88 ||B 8 B . !. :.B | ✦ .:8!|^ 9|: :8BB| :8?of.
            8T98||.8 |P"i B|88.!|8:8. '. |Y| 8!B8.. .:f|8B☆ :,: :b Y o|| .- bB
            '. 8|..R8#8 .8 8|! B :. : B8B8:B| | B.|8?? W B8B. :! |B .TB8B 8: |B
            .8 ! m| :; .- _.: ^8.B8 B. !. ^B :✲B☮B! B 8 B8 _|9B:f8B ,Bf88. B8 .
            . ! o|.. |. B |'B.!6!|B||: BB !9 BY-|8. . 8b:886: . :.. 8 6.8 : |
            8|. :: a . 8 PB.!o8.8 | B8 B i |Bt:| :: . : :|..|8. fYB |8B 8::. F8
            B 8| | !8.F .P..BR8| B|P :B . B:?: : a^ :B | :.. |B :B "| !.|
            RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o T8|.8 B8:i8 .|.8 |.!
            ^:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8|| ,i||.!B: 8: |8i☺
            :88 8 B.88| : " . B! . .889oi6✲!.:.BB|B 8'B "B|8 |. !8!!| .RB ☮88
            "B!8 . .8|8.|8| 9 B :B:|. 8| 8.BB.8☆ BbT. d BB .8. .l6? : |B.8Y Bo|
            |!8 .b ..|: B. B8 ✦| ! |:B.B B.: :|8:. :":W 8 |:B ., b9B ☆" f 8 8.:
            u | : 89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f
            .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf .b
            8:8 .|8,. !. f! B|||☮ | ..|.od !bT .|:|| B ! ;.9F |^ .| i |: B| 8
            .8T:!|B f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 !
            8!8:^ 8B 9,: 8 |BT. :o- 8 f |:o||b 8 8 8|8B8: |. !.98 R 8!B ' :|'B
            :. 8|!o |.!6 8 8 .' 8| i.|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B: P88:d.^ :
            ..B|.?: : ! B :| ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 ! BBB_8.i' 88
            =FB BP8.:.:B | B !BB... :☆8!. ✦.| B" 9 i 8.88.8:8 F.|8:B8..B!.
            B8☮☮ B8. B f☺.: | 8 88:✲ .?|Y8|Pb:| 8 .. . !! :8 Ba ;:|B8 8. 8BB6
            . B,: :8!!B: |bB .B|i9. 8!8 8i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B
            .8^: B9.| . | |!888 u.,:. . 9|8 , 6:Y ..|.:: 8|8 . ..B 8! B ?: ;|R
            .u8☆ ! 88 88: ..::B.' |8BF || BY R!B!!| ::" Y:.o-.: 886 8B.. 8B .8.
            ":. |8."f . ! V .:88 .9.|!.| !B ..Bo9: 88 o 9T|BB6B|uBT:F|.8BF . f
            ✦.8P8 9' ' .! 88 8 8.| .☮ F ! 8 f :B?:☺b |. 8 .
          </div>
          <div className={s.text}>
            B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!: :T8:: 8 !B:8.B
            | . B:|: :.|✲B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8 ;88:|9; B'8ii ^
            :b , :F. B☮☮8.lB :8.!. : 8.B... | :8 .: . |..| 8|. ☆8 : 8.B .
            ^☮.|,Y:8B:. B! 8 :R ✦ ..: B8|9☺ 8| B !..!8'BBB 9B| m 8.| T.!f8|:
            88^ ?:.! :||P8 b8 .V TB|88W8 P8 | b. . . |88 : B.8.|Y6 8.:8☮.:B 8
            |. B o:B .b B 8B| ||fB:'B:☮6:8T B8|. ' | 8.8 B 8 8|:T. |B8 f.| 88:✲
            B8 B88B":!|d:|b8 | . |:. !YP8 . 8 B ?:YB.:B888 888^ |Bo |||B8: :|B
            P. ':|8i: ||.8|: oR| .B "B:B : B89☮:|. . |B .8 8b:| | 9.8B... 8^|
            !|: b6 F T? ,."|T : F i9 B|.: B|:||R B. .B B: .BB|B9 ' ✦ B.F8 8 |98.
            |..: .?8|b8bB..B ||P! .8.Y ! ...B8ou.| |!f|P .. 8 .8! :. ^.f. 8::
            ,|: 8 .|88 B8:.8 ☺. ^: 8 B:!B.; 8 B !^ . !T!T| |:8 '8:.BY✲. 'uTi:B8
            |B?89:! PB8:8o☆|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 .
            :88.B.8.B8 B| : | .8 || 8 ..:.TPT 8 !.: TB 8B8 8T B : 88#bd . . .:B
            : . :.:8 . ..68;8| :: 8 9| | .. 8 |:☆8|B | .^BB8 ':8B8 8u R . B. :|B
            8:B ..B 88!8 B;:.|88 ||B 8 B . !. :.B | .:8!|^ 9|: :8BB| :8?of.
            8T98||.8 |P"i B|88.!|8:8. '. |Y| 8!B8.. .:f|8B :,: :b Y o|| .- bB '.
            8|..☮R8#8 .8 8|! B :. : B8B8:B| | B.☺|8?? W B8B. :! |B .TB8B 8: |B
            .8 ! m| :; .- _.: ^8.B8 B. !. ^B :BB! B 8 B8 _|9B:f8B ,Bf88. B8 . .
            ! o|.. |. B |'B.!6!|B||: BB !9 BY-|8. . 8b:886: . :.. 8 6.8 : | 8|.
            :: a . 8 PB.!o8.8 | B8 B i |Bt:| :: . : :|..|8. fYB |8B 8::. F8 B 8|
            | !8.F .P..BR8| B|P :B . B:?: : a^ :B | :.. |B :B "| !.|
            RB.::?8.:8.|BPB BB .8 9.✦.:.8 ' | ^| 8:| .o T8|.8 B8:i8 .☮|.8 |.!
            ^:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8|| ,i||.!B: 8: |8i :88
            8 B.88| : " . B! . .889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88 "B!8 .
            .8|8.|8| 9 B :B✲:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b
            ..|: B. B8 | ! |:B.B B.: ✦ :|8:. :":W 8 |:B ., b9B ,.8☮☆B!. | .:B o
            |.^:F f8|B88 :"'i .o = '. B☺8!. BB|:| .": ,8 | 88 R.|" f 8 8.: u |
            : 89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f .8P8
            9' ' .! 88 8☆ 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf .b 8:8
            .|8,. !. f! B||| | ☮..|.od !bT .|:|| B ! ;.9F |^ .| i |: B| 8
            .8T:!|B f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8☺|Y:|.| V. 88 !8 !
            8!8:^ 8B 9,: 8 |BT. :o- 8 f |:o|☮|b 8 8 8|8B8: |. !.98 R 8!B ' :|'B
            :. 8|!o |.!6 8 8 .' 8| i.|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B: P88:d.^ :
            ..B|.?: : ! B :| ||.a.|. B|. |o8?☆ . 9 :.o|. 8;B. |B8 ! BBB_8.i' 88
            =FB BP8.:.:B | B !BB... :o8!. .| B" 9 i 8.88.8:8 F.|8:B8..B!. B8 B8.
            B f.: | 8 88: .?|Y8|Pb☮:| 8 .. . !! :8 Ba ;:|✲B8 8. 8BB6 . B,:
            :8!!B: |bB .B|i9✦. 8!8 8☺i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B
            .8^: B9.| . | |!888 u.,:. . 9|8 , 6:Y ..|.:: 8|8 . ..B 8! B ?: ;|R
            .u8 ! 88 88: ..::B.' |8BF || BY R!B!!| ::" Y:.o-.: 88☺6 8B.. 8B
            .8.☮ ":. |8."f . ! V .:88 .9.|!.| !B ..Bo9: 88 o 9T|BB6B|uBT:F|.8BF
            . f .8P8 9' ' .! 88 8 8.| . F ! ☮8 f :B?:b |. 8 .
          </div>
          <div className={s.text}>
            B...✲b | ..oB✲| :8 .8B8| To| ☆f P..:. .:B. BB:6'.!8_!: :T8:: 8
            !B:8.B | . B:|: :.|B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8 ;88:|9;
            B'8ii ^ :b , :F. B8.lB :8.!. : 8.B... ✦| :8 .: . |..| 8|. 8 ☮: 8.B
            . ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.| T.!f8|: 88^
            ?✲:.! :||P8 b8 .V TB|88W✦☺8 P8 | b. . . |88 : B.8.|Y6 8.:8.:B 8 |.
            B o:B .b B 8B| ||fB:'B:6:8T B8|. ' | 8.8 B 8 8|:T. |B8 f.| 88: B8
            B88B":!|d:|b8 | . |:. !YP8 . 8 B ✲?:YB.:B888 888^ |Bo |||B8: :|B
            P☺. ':|8i: ||.8|: oR| .B "B:B : B89:|. . |B .8 8b:| | 9.8B... 8^|
            !|: b6 F T? ,."|T : F i9 B|.: B|:||R B. .B B: .BB|B9 ' B.F8 8 ✲|98.
            |..: .?8|b8bB..B ||P! .8.Y ! ...B8ou.| |!f|P .. 8 .8! :. ^.f. 8::
            ,|: 8 .|88 B8:☆.8 . ^: 8 B:!B.; 8 B !^ . !T!T| |:8 '8:☮.BY. 'uTi:B8
            |B?89:! PB8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 .
            :88.B.8.B8 B| : | .8 || 8 ..:☮.TPT 8 !.: TB 8B8 8T B : 88#bd . .
            .:B : . :.:8 . ..68;8| :: 8 9| | .. 8 ☺|:8|B | .^BB8 ':8B8 8u R .
            B. :|B 8:B ..B 88!8 B;:.|88 ||B 8 B . !. :.B | .:8!|^ 9|: :8BB|
            :8?of. 8T98||.8 |P"i B|88.!|8:8. '. |Y| 8!B8.. .:f|8B :,: :b Y o||
            .- bB '. 8|..R8#8 .8 8|! B :. : B8B8:B| | B.|8?? W B8B. :! |B .TB8B
            8: |B .8 ! m| :; .- _.: ^8.B8 ☆B. !. ^B :BB! B 8 B8 ☆_|9B:f8B ,Bf88.
            B8 . . ! o|.. |. B |'B.!6!|B||: BB !9 BY-|8. . 8b:886: . :.. 8 6.8 :
            | 8|. :: a . 8 PB.!o8.8 | B8 B i |Bt:| :: . : :|☮..|8. fYB |8B 8::.
            F8 B 8| | !8.☮F .P..BR8| B|P :B . B:?: : a^ ☺B | :.. |B :B "| !.|
            RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o ✲T8|.8 B8:i8 .|.8 |.!
            ^:;.|8 o8 8,iR! .:: ☺: .: . 8 .88 BB..: :| : .8|| ,i||.!B: 8: |8i
            :88 8 B.88✲| : " . B! . .889oi6!.:.BB|B 8'B "B|8 |☆. !8!!| .RB 88
            "B!8 . .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo|
            |!8 .b ..|: B. B8 | ! |:B.B B.: : |8:. :":W 8 |:B ., b9B ,.8 B!. |
            .:B o |.^:F f8|B88 :"'i .o = '. B8!. BB|:| .": ,8 | 88 R.|" f 8 8.:
            u | : 89b^ 8B..!☆!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f
            .8P8 9' ' .! 88 8 8.| . F ! 8 f :B☮?:b |. 8 . .B 8: B68 : .. o:Bf
            .b 8:8 .|8,. !. f! B||| | ..|.od !bT .|:|| B ! ;.9F |^ .| i |: B| 8
            .8T:!|B f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 !
            8!8:^ 8B 9,: 8 |BT. :o- 8 ☆f |:o||b 8 8 8|8B8: |. !.98 R 8!B ' :|'B
            :. 8|!o | .!6 8 8 .' 8| i.|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B: P88:d.^ :
            ..B|.?: : ! B :| ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 ! BBB_8.i☮' 88
            =FB BP8.:.:B | B !BB... ✲:o8!. .| B" 9 i 8.88.8:8 F.|8:B8..B!. B8
            B8. B f.: | 8 88: .?|Y8|Pb:| 8 .. . !! :8 Ba ;:|B8 8. 8BB6 . B,:
            :8!!B: |bB .B|i9. 8!8 8i.:|☺B 8 B8 || |.8. ^ ..8.B ☮B 9 888:8 B
            .8^: B9.| . | |!888 u.,:. . 9|8 , 6:Y ..|.:: 8|8 . ..B 8☺! B ?: ;|R
            .u8 ! 88 88: ..::B.' |8BF || BY R!B!! ✦| ::" Y:.o-.: 886 8B.. 8B .8.
            ":. |8."f . ! V .:88 .9.|!.| !B ..Bo9: 88 o 9T|BB6B|uBT:F|.8BF . f
            .8P8 9' ' .! 88 8 8.| ☮. F ! 8 f :B?:b |. 8 .
          </div>
          <div className={s.text}>
            B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!: ✲:T8:: 8 !B:8.B
            | . B:|: :.|B!8!8"!! B! B.8 " .988| ^ P^B.:: : :☮☮8 ;88:|9; B'8ii
            ^ :b , :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|. 8 : 8.B .
            ^.|✲,Y:8B:. B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.| T.!f8|: 88^
            ?:.! :||P8 b8 .V T☮B|88W8 P8 | b. ✦. . |88 : B.8.|Y6 8.:8.:B ☮8 |.
            B o:B .b B 8B| ||fB:'B:6:8T B☆8|. ✦ ' | 8.8 B 8 8|:T. |B8 f.| 88: B8
            B88B":!|d:|b8 | . |:. !YP8 . 8 B ?:YB.:B888 888^ |Bo |||B8: :|B P.
            ':|8i: ||.8|: oR| .B "B:B : B89:|. . |B .8 8b:| | 9.8B... 8^| !|: b6
            F T? ,."|T : F i9 B|.: B|:||R B☮. .B B: .BB|B9 ' B.F8 8 |98. |..:
            .?8|b8☮bB..B ||P! .8.Y ! ...B8ou.| |!f|P .. 8 .8! :. ^.f. 8:: ,|: 8
            .|88 B8:.8 . ^: 8 B:!B.; 8 B !^ . !T!T| |:8 '8:.BY. 'uTi:B8 |B?89:!
            PB8:8o|F;:| 8:8|bR| 8 ☺o.!.! u :8 .9B |8" 6 :. 8 | | B 8 .
            :88.☮B.8.B8 B| : | .8 || 8 ..:.TPT 8 !.: TB 8B8 8T B : 88#bd . .
            .:B : . :.:8 . ..68;8| :: 8 9| | .. 8 |:8|B | .^BB8 ':8B8 8u R . B.
            :|B 8:B ..B 88!8 B;:.|88 ||B 8 B . !. :.B | .:8!|^ 9|: :8BB| :8?of.
            8T98||.8 |P"i B|88.!☺|8:8. '. |Y| 8!B8.. .:f|8B :,: :b Y o|| .- bB
            '. 8|..R8#8 .8 8|! B :. : B8B8:B| | B.|8?☮? W B8B. :! |B .TB8B 8:
            |B .8 ! m| :; .- _.: ^8.B8 B. !. ^B :BB! B 8 B8 _|9B:f8B ,Bf88. B8 .
            . ! o|.. |. B |'B.!6!|B||: BB !9 BY-|8. . 8b:886: . :.. 8 6.8 ✲: |
            8|. :: a . 8 PB.!o8.8 | B8 B i |Bt:| :: . : :|..|8. fYB |8B 8::. F8
            B 8| | !8.F .P..BR8| B|P :B . B:?✦: : a^ :B | :.. |B :B "| !.|
            RB.::?8.:8.|BPB BB .8 ☮9..:.8 ' | ^|☺ 8:| .o T8|.8 B8:i8 .|.8 |.!
            ^:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8|| ,i||.!B: 8: |8i :88
            8 B.88| : "☮ . B! . .889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88 "B!8 .
            .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b
            ..|: B. B8☮☮ | ! |:B.B B.: :|8:. :":W 8 |:B ., b9B ,.8 B!. | .:B o
            |.^:F f8|B88 :"'i .o = '. B8!. BB|:| .": ,8 | 88 R.|" f 8 8.: u | :
            89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. ☮.8.|F . f .8P8
            9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 :☆i |: B| 8
            .8✲T:!|✲B f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 !
            8!8:^ 8B 9,: 8 |BT. :o ✦- 8 f ☆|:o||b 8 8 8|8B8: |. !.98 R 8!B '
            :|'B :. 8|!o |.!6 8 8 .' 8| i.|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B:
            P88:d.^ : ..B|.?: : ! B :| ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 !
            BBB_8.i' 88 =FB BP8.:.:B | B !B☺B... :o8!. .| B" 9 i 8.88.8:8
            F.|8:B8..B!. B8☮ B8. B f.: | 8 88: .?|Y8|Pb:| 8 ☮☮.. . !! :8 Ba
            ;:|B8 8. 8BB6 . B,: :8!!B: |bB .B|i9. 8!8 8i.:| B 8 B8 || |.8. ^
            ..8.B B 9 888:8 B .8^: B9.| . | |!888 u.,:☆. . 9|8 , 6:Y ..|.:: 8|8
            . ..B 8! B ?:☺ ;|R .u8 ! 88 88: ..::B.' |8BF || BY R!B!!| :✲:"
            Y:.o-.: 886 8B.. 8B .8. ":. |8."f . ! V .:88 .9.|!.| !B ..Bo9: 88
            o☮ 9T|BB6B|uBT:F|.8BF . f .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b
            ✦☮|. 8 .
          </div>
          <div className={s.text}>
            B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!: :T8:: 8 !B:8.B
            | . B:|: :.|✲B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8 ;88:|9; B'8ii ^
            :b , :F. B☮☮8.lB :8.!. : 8.B... | :8 .: . |..| 8|. ☆8 : 8.B .
            ^☮.|,Y:8B:. B! 8 :R ✦ ..: B8|9☺ 8| B !..!8'BBB 9B| m 8.| T.!f8|:
            88^ ?:.! :||P8 b8 .V TB|88W8 P8 | b. . . |88 : B.8.|Y6 8.:8☮.:B 8
            |. B o:B .b B 8B| ||fB:'B:☮6:8T B8|. ' | 8.8 B 8 8|:T. |B8 f.| 88:✲
            B8 B88B":!|d:|b8 | . |:. !YP8 . 8 B ?:YB.:B888 888^ |Bo |||B8: :|B
            P. ':|8i: ||.8|: oR| .B "B:B : B89☮:|. . |B .8 8b:| | 9.8B... 8^|
            !|: b6 F T? ,."|T : F i9 B|.: B|:||R B. .B B: .BB|B9 ' ✦ B.F8 8 |98.
            |..: .?8|b8bB..B ||P! .8.Y ! ...B8ou.| |!f|P .. 8 .8! :. ^.f. 8::
            ,|: 8 .|88 B8:.8 ☺. ^: 8 B:!B.; 8 B !^ . !T!T| |:8 '8:.BY✲. 'uTi:B8
            |B?89:! PB8:8o☆|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 .
            :88.B.8.B8 B| : | .8 || 8 ..:.TPT 8 !.: TB 8B8 8T B : 88#bd . . .:B
            : . :.:8 . ..68;8| :: 8 9| | .. 8 |:☆8|B | .^BB8 ':8B8 8u R . B. :|B
            8:B ..B 88!8 B;:.|88 ||B 8 B . !. :.B | .:8!|^ 9|: :8BB| :8?of.
            8T98||.8 |P"i B|88.!|8:8. '. |Y| 8!B8.. .:f|8B :,: :b Y o|| .- bB '.
            8|..☮R8#8 .8 8|! B :. : B8B8:B| | B.☺|8?? W B8B. :! |B .TB8B 8: |B
            .8 ! m| :; .- _.: ^8.B8 B. !. ^B :BB! B 8 B8 _|9B:f8B ,Bf88. B8 . .
            ! o|.. |. B |'B.!6!|B||: BB !9 BY-|8. . 8b:886: . :.. 8 6.8 : | 8|.
            :: a . 8 PB.!o8.8 | B8 B i |Bt:| :: . : :|..|8. fYB |8B 8::. F8 B 8|
            | !8.F .P..BR8| B|P :B . B:?: : a^ :B | :.. |B :B "| !.|
            RB.::?8.:8.|BPB BB .8 9.✦.:.8 ' | ^| 8:| .o T8|.8 B8:i8 .☮|.8 |.!
            ^:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8|| ,i||.!B: 8: |8i :88
            8 B.88| : " . B! . .889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88 "B!8 .
            .8|8.|8| 9 B :B✲:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b
            ..|: B. B8 | ! |:B.B B.: ✦ :|8:. :":W 8 |:B ., b9B ,.8☮☆B!. | .:B o
            |.^:F f8|B88 :"'i .o = '. B☺8!. BB|:| .": ,8 | 88 R.|" f 8 8.: u |
            : 89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f .8P8
            9' ' .! 88 8☆ 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf .b 8:8
            .|8,. !. f! B||| | ☮..|.od !bT .|:|| B ! ;.9F |^ .| i |: B| 8
            .8T:!|B f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8☺|Y:|.| V. 88 !8 !
            8!8:^ 8B 9,: 8 |BT. :o- 8 f |:o|☮|b 8 8 8|8B8: |. !.98 R 8!B ' :|'B
            :. 8|!o |.!6 8 8 .' 8| i.|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B: P88:d.^ :
            ..B|.?: : ! B :| ||.a.|. B|. |o8?☆ . 9 :.o|. 8;B. |B8 ! BBB_8.i' 88
            =FB BP8.:.:B | B !BB... :o8!. .| B" 9 i 8.88.8:8 F.|8:B8..B!. B8 B8.
            B f.: | 8 88: .?|Y8|Pb☮:| 8 .. . !! :8 Ba ;:|✲B8 8. 8BB6 . B,:
            :8!!B: |bB .B|i9✦. 8!8 8☺i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B
            .8^: B9.| . | |!888 u.,:. . 9|8 , 6:Y ..|.:: 8|8 . ..B 8! B ?: ;|R
            .u8 ! 88 88: ..::B.' |8BF || BY R!B!!| ::" Y:.o-.: 88☺6 8B.. 8B
            .8.☮ ":. |8."f . ! V .:88 .9.|!.| !B ..Bo9: 88 o 9T|BB6B|uBT:F|.8BF
            . f .8P8 9' ' .! 88 8 8.| . F ! ☮8 f :B?:b |. 8 .
          </div>
          <div className={s.text}>
            B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!: :T8:: 8 !B:8.B
            | . B:|: :.|B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8☆ ;88:|9; B'8ii ^
            :b , :F. B8.lB :8.!. : 8.B...☆ | :8 .: . |..| 8|. 8 : 8.B .
            ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.| T.!f8|: 88^
            ?:.! :||P8 b8 .V TB|88W8 P8 | b. . . |88 : B.8.|Y6 8.:8.:B 8 |. B
            o:B .b B 8B| ||fB:'B:6:8T B8|. ' | 8.8 B 8 8|✲:T. |B8 f.| 88: B8
            B88B":!|d:|b8 | . |:. !Y☮☮P8 . 8 B ?:YB.:B888 888^ |Bo |||B8: :|B
            P. ':|8i: ||.8|: oR| .B "B:B : B89:|. . |B .8 8b:| | 9.8B... 8^| !|:
            b6 F T? ,."|T : F ✦i9 B|.: B|:|☆|R B. .B B: .BB|B9 ' B.F8 8 |98.
            |..: .?8|b8bB..B ||P! .8.Y ! ...B8ou.| |!f|P .. 8 .8! :. ^.f. 8::
            ,|: 8 .|88 B8:.8 . ^: 8 B:!B.; 8 B !^ . !T!T| |:8 '8:.BY. 'uT☆i:B8
            |B?89:! PB8:8o|F;:| 8✲:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8☮ | | B 8 .
            :88.B.8.B8 B| : | .8 || 8 ..:.TPT 8 !.: TB 8B8 8T B : 88#bd . . .:B
            : . :.:8 . ..68;8| :: 8 9| | .. 8 |:8|B | .^BB8 ':8B8 8u R . B. :|B☆
            8:B ..B 88!8 B;:.|88 ||B 8 B . !. :.B | .:8!|^ 9|: :8BB| :8?of.
            8T98||.8 |P"i B|88.!|8:8. ✲'. |Y| 8!B8.. .:f|8B :,: :b Y o|| .- bB
            '. 8|..R8#8 .8 8|! B :. : B8B8:B| | B.|8?? W B8B. :! |B .TB8B 8: |B
            .8 ! m| :; .- _.: ☺^8.B8 B. !. ^B :BB! B ✦8 B8 _|9B:f8B ,Bf88. B8☆
            . . ! o|.. |. B |'B.!6!|B||: BB !9 BY-|8. . 8b:☮886: . :.. 8 6.8 :
            | 8|. :: a . 8 PB.!o8.8 | B8 B i |Bt:| :: . : :|..|8. fYB |8B 8::.
            F8 B 8| | !8.F .P..BR8| B|P :B . B:?: : a^ :B | :.. ☺|B :B "| !.|
            RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o T8|.8 B8:i8 .|.8 |.!
            ^:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8|| ,i||.!B: 8: |8i :88
            8 B.88| : " . B! . .889oi6!.:.BB|B 8'B "B|8 |. !8☆!!| .RB 88 "B!8 .
            .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b
            ..|: B. B☮8 | ! |:B.B B.: :|8:. :":W 8 |:B ., b9B ,.8 B!. | .:B o
            |.^:F f8|B88 :"'i .o = '. B8!. BB|:| ✲.": ,8 | 88 R.|" f 8 8.: u | :
            89b^ 8B..!!8☆8 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf .b 8:8
            .|8,. !. f! B||| | ..|.od !bT .|:|| B ! ;.9F |^ .| i |: B| 8 .8T:!|B
            f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 ☺|'☆B :. 8|!o
            |.!6 8 8 .' 8| i.|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B: P88:d.^ : ..B|.?: :
            ! B :| ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 ! BBB_☮8.i' 88 =FB
            BP8☮.:.:B | B !BB... :o8!. .| B" 9 i 8.88.8:8 F.|8:B8..B!. B8 B8. B
            f.: | 8 88: .?|Y8|Pb:| 8 .. . !! :8 Ba ;:|B8 8. 8BB6 . B,: :8!!B:
            |bB .B|i9. 8!8 8i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B .8^: B9.| .
            | |!888 u.,:. . 9|8☺ , 6 ✦:Y ..|.:: 8|8 . ..B 8! B ?: ;|R .u8 ! 88
            88: ..::B.' |8BF || BY R!B!!| ::" Y:.o-.: 886 8B.. 8B .8. ":. |8."f
            . ! V .:88 .9.|!.| !B ..Bo9: 88 o 9T|BB6B|uBT:F|.8BF . f .8P8 9' '
            .! 88 8 8.| . F ! 8 f :☮☮B?:b |. 8 .
          </div>
          <div className={s.text}>
            B...✲b | ..oB✲| :8 .8B8| To| ☆f P..:. .:B. BB:6'.!8_!: :T8:: 8
            !B:8.B | . B:|: :.|B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8 ;88:|9;
            B'8ii ^ :b , :F. B8.lB :8.!. : 8.B... ✦| :8 .: . |..| 8|. 8 ☮: 8.B
            . ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.| T.!f8|: 88^
            ?✲:.! :||P8 b8 .V TB|88W✦☺8 P8 | b. . . |88 : B.8.|Y6 8.:8.:B 8 |.
            B o:B .b B 8B| ||fB:'B:6:8T B8|. ' | 8.8 B 8 8|:T. |B8 f.| 88: B8
            B88B":!|d:|b8 | . |:. !YP8 . 8 B ✲?:YB.:B888 888^ |Bo |||B8: :|B
            P☺. ':|8i: ||.8|: oR| .B "B:B : B89:|. . |B .8 8b:| | 9.8B... 8^|
            !|: b6 F T? ,."|T : F i9 B|.: B|:||R B. .B B: .BB|B9 ' B.F8 8 ✲|98.
            |..: .?8|b8bB..B ||P! .8.Y ! ...B8ou.| |!f|P .. 8 .8! :. ^.f. 8::
            ,|: 8 .|88 B8:☆.8 . ^: 8 B:!B.; 8 B !^ . !T!T| |:8 '8:☮.BY. 'uTi:B8
            |B?89:! PB8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 .
            :88.B.8.B8 B| : | .8 || 8 ..:☮.TPT 8 !.: TB 8B8 8T B : 88#bd . .
            .:B : . :.:8 . ..68;8| :: 8 9| | .. 8 ☺|:8|B | .^BB8 ':8B8 8u R .
            B. :|B 8:B ..B 88!8 B;:.|88 ||B 8 B . !. :.B | .:8!|^ 9|: :8BB|
            :8?of. 8T98||.8 |P"i B|88.!|8:8. '. |Y| 8!B8.. .:f|8B :,: :b Y o||
            .- bB '. 8|..R8#8 .8 8|! B :. : B8B8:B| | B.|8?? W B8B. :! |B .TB8B
            8: |B .8 ! m| :; .- _.: ^8.B8 ☆B. !. ^B :BB! B 8 B8 ☆_|9B:f8B ,Bf88.
            B8 . . ! o|.. |. B |'B.!6!|B||: BB !9 BY-|8. . 8b:886: . :.. 8 6.8 :
            | 8|. :: a . 8 PB.!o8.8 | B8 B i |Bt:| :: . : :|☮..|8. fYB |8B 8::.
            F8 B 8| | !8.☮F .P..BR8| B|P :B . B:?: : a^ ☺B | :.. |B :B "| !.|
            RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o ✲T8|.8 B8:i8 .|.8 |.!
            ^:;.|8 o8 8,iR! .:: ☺: .: . 8 .88 BB..: :| : .8|| ,i||.!B: 8: |8i
            :88 8 B.88✲| : " . B! . .889oi6!.:.BB|B 8'B "B|8 |☆. !8!!| .RB 88
            "B!8 . .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo|
            |!8 .b ..|: B. B8 | ! |:B.B B.: : |8:. :":W 8 |:B ., b9B ,.8 B!. |
            .:B o |.^:F f8|B88 :"'i .o = '. B8!. BB|:| .": ,8 | 88 R.|" f 8 8.:
            u | : 89b^ 8B..!☆!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f
            .8P8 9' ' .! 88 8 8.| . F ! 8 f :B☮?:b |. 8 . .B 8: B68 : .. o:Bf
            .b 8:8 .|8,. !. f! B||| | ..|.od !bT .|:|| B ! ;.9F |^ .| i |: B| 8
            .8T:!|B f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 !
            8!8:^ 8B 9,: 8 |BT. :o- 8 ☆f |:o||b 8 8 8|8B8: |. !.98 R 8!B ' :|'B
            :. 8|!o | .!6 8 8 .' 8| i.|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B: P88:d.^ :
            ..B|.?: : ! B :| ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 ! BBB_8.i☮' 88
            =FB BP8.:.:B | B !BB... ✲:o8!. .| B" 9 i 8.88.8:8 F.|8:B8..B!. B8
            B8. B f.: | 8 88: .?|Y8|Pb:| 8 .. . !! :8 Ba ;:|B8 8. 8BB6 . B,:
            :8!!B: |bB .B|i9. 8!8 8i.:|☺B 8 B8 || |.8. ^ ..8.B ☮B 9 888:8 B
            .8^: B9.| . | |!888 u.,:. . 9|8 , 6:Y ..|.:: 8|8 . ..B 8☺! B ?: ;|R
            .u8 ! 88 88: ..::B.' |8BF || BY R!B!! ✦| ::" Y:.o-.: 886 8B.. 8B .8.
            ":. |8."f . ! V .:88 .9.|!.| !B ..Bo9: 88 o 9T|BB6B|uBT:F|.8BF . f
            .8P8 9' ' .! 88 8 8.| ☮. F ! 8 f :B?:b |. 8 .
          </div>
          <div className={s.text}>
            B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!: ☆:T8:: 8 !B:8.B
            | . B:|: :.|B!8✲!8"!! B! B.8 " .988☮| ^ P^B.:: : :8 ;88:|9; B'8ii ^
            :b , :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|.✲ 8 : 8.B .
            ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B !..!8'BBB☺ 9B| m 8.| T.!f8|: 88^
            ?:.! :||P8 b8 .V TB|88W8 P8 | b. . . |88 :☆ B.8.|Y6 8.:8.:B 8 |. B
            o:B .b B 8B| ||✦ fB:'B:6:8T B8|. ' | 8.8 B 8 8|:T. |B8 f.| 88: B8
            B88B":!|d:|b8 |☺ . |:. !YP8 . 8 B ?:Y☮B.:B888 888^ |Bo |||B8: :|B
            P. ':|8i: ||.8|: oR| .B "B:B : B89:|. . |B .8 8b:| | 9.8B... 8^| !|:
            b6 F T? ,."|T : F i9 B|.: B|:||R B. .B B: .BB|B9 ' B.F8 8 |98. |..:
            .?8|b8bB..☮B ||P!✲✲ .8.Y ! ...B8ou.| |!f|P .. 8 .8! :. ^.f. 8:: ,|:
            8 .|8☮8 B8:.8 . ^: 8 B:!B.; 8 B ☮!^ . !T!T| |:8 '8:.BY. 'uTi:B8
            |B?8☆9:! PB8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 .
            :88.B.8.B8 B| : | .8 || 8 ..:.TPT 8 !.✲: TB 8B8 8T B : 88#bd . . .:B
            : . :.:8 . ..68;8| :: 8 9| | .. 8 |:8|B | .^BB8 ':8B8 8u R . B. :|B
            8:B ..B 88!8 B;:.|88 ||B 8 B .✦ !. :.B | .:8!|^ 9|: :8BB| :8?of.
            8T98||.8 |P"i B|88.!|8:8. '. |Y| 8!B8.. .:f|8B :,: :b Y o|| .- bB '.
            8|..R8#8 .8 8|! B :. : B8B8:B| | B.|8?? W B8B. :! |B .TB8B 8: |B .8
            ! m| :; .- _.: ^8.B8 B. !. ^B :BB! B 8 B8 _|9B:f8B ,Bf88. B8 . . !
            o☮|.. |. B |'B.!6!|B||: BB !9 BY-|8. . 8b:886: . :.. 8 6.8 : | 8|.
            :: a . 8 PB.!o8.8 | B8 B i |Bt:| :: . : :|..|8. fYB |8B 8::. F8 B 8|
            | !8.F .P..BR8| B|P :B . B:?: : a^ :B | :.. |B :B "| !.|
            RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o T8|.8 B8:i8 .|☆.8 |.!
            ^:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8|| ,i||.!B: 8: |8i :88
            8 B.88| : " . B! . .889oi6!.:.BB|B 8'B "B|8 |. !8✦!!| .RB 88 "B!8 .
            .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8☺B ., b9B ,.8 B!. | .:B o
            |.^:F f8|B88 :"'i .o = '. B8!. BB|:| .": ,8 | 88 R.|" f 8 8.: u | :
            89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!☮|B. .8.|F . f .8P8
            9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf .b 8:8
            .|8,. !. f! B||| | ..|.od !bT .|:|| B ! ;.9F |^ .| i |: B| 8 .8T:!|B
            f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 ! 8!8:^ 8B
            9,: 8 |BT. :o- 8✲ f |:☺o||b 8 8 8|8B8: |. !.98 R 8!B ' :|'B :. 8|!o
            |.!6 8 8 ☆.' 8| i.|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B: P88:d.^ :
            .☮.B|.?: : ! B :| ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 ! BBB_8.i' 88
            =FB BP8.:.:B | B !BB... :o8!. .| B" 9 i☆ 8.88.8:8 F.|8:B8..B!. B8
            B8. B f.: | 8 88: .?|Y8|Pb:| 8 .. . !! :8 Ba ;:|B8 8. 8BB6 . B,:
            :8!!B: |bB .B|i9. 8!8 8i.:| B 8 B8☺ || |.8. ^ .☺.8.B B 9 888:8 B
            .8^: B9.| . | |!888 u.,:. . 9|8 , 6:Y ..|.:: 8|8 . ..B 8! B ?: ;|R
            .u8 ! 88 88: ..::B.' |8BF || B✦Y R!B!!| ::" ☮Y:.o-.: 886 8B.. 8B
            .8. ":. |8."f . ! V .:88 .9.|!.| !B ..Bo9: 88 ☺o
            9T|BB6B☮|uBT:F|.8BF . f .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8
            .
          </div>
          <div className={s.text}>
            B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_☆!: :T8:: 8 !B:8.B
            | . B:|: :.|B!8!8"!! B! B☮.8 " .988| ^ ☺P^B.:: : :8 ;88:|9; B'8ii
            ^ :b , :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|. 8 : 8.B .
            ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.| T.!f8|: 88^
            ?:.! :||P8✦ b8 .V TB|88W8 P8 | b. . . |88 : B.8.|Y6 8.:8.:B 8 |. B
            o:B .b B 8B| ||fB:'B:6:8T B8|☮. ' | 8.8 B 8 8|:T. |B8 f.| 88: B8
            B88B":!|d:|b8 | . ☆|:. !YP8 . 8 B ?:YB.:B888 888^ |Bo |||B8: :|B P.
            ':|8i: ||.8|: oR| .B "B:B : B89:|. . |B .8☺ 8b:| | 9.8B... 8^| !|:
            b6 F T? ,."|T : F i9 B|.: B|:||R B. .B B: .BB|B9 ' B.F8 8 |98. |..:
            .?8|b8bB..B ||P! .8.Y ! ...B8ou.| |!f|P .. 8 ✦ .8! :. ^.f. 8:: ,|: 8
            .|8✲8 B8:.8 . ^: 8 B:!B.; 8 ☮B !^ . !T!T| |:8 '8:.BY. 'uTi:B8
            |B?89:! PB8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 .
            :88.B.8.B8 B| : |✲ .8 || 8 ..:.TPT 8 !.: TB 8B8 8T B : 88#bd . . .:B
            : . :.:8 . ..68;8| :: 8 9| | .. 8 |:8|B | .^BB8 ':8B8 8u R . B. :|B
            8:B ..B ☮88!8 B;:.|88 ||B 8 B . !. :.B | .:8!|^ 9|: :8BB| :8?of.
            8T98||.8 |P"i B|☺88.!|8:8. '. |Y| 8!B8.. .:f|8B :,: :b Y o|| .- bB
            '. 8|..R8#8 .8 8|! B :. : B8B8:B| | B.|8?? W B8B. :! |B .TB8B 8: |B
            .8 ! m| :; .- _✦.: ^8.B8 B. !. ^B :BB! B 8 B8 _|9B:f8B ,Bf88. B8 . .
            ! o|.. |. B |'B.!6!|B||: BB !9 BY-|8. . 8b:886: . :.. 8 6.8 : | 8|.
            :: a . 8 PB.!o8.8 | B8✲ B i |Bt:| :: . : :|..|8. fYB |8B 8::. F8 B
            8| | !8.F .P..BR8| B|P :B . B:?: : a^ :B | :.. |B :B "| !.|
            RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o T8|.8 B8:i8 .|.8 |.!
            ^:;.|8 o8 8,iR! .:: : .: ☺. 8 .88 BB..: :| : .8|| ,i||.!B: 8: |8i
            :88 8 B.88| : " . B! . .889oi6!.:.B ✦B|B 8'B "B|8 |. !8!!| .RB 88
            "B!8 . .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo|
            |!8 .b ..|: B. B8 | ! |:B.B B.: :|8:. :":W 8 |:B ., b9B☆ ,.8 B!. |
            .:B o |.^:F f8|B88 :"'i .o = '☮. B8!. BB|:| .": ,8 | 88 R.|☮" f 8
            8.: u | : 89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F
            . f .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf
            .b 8:8 .|8,. !. f! B||| | ..|.od !bT .|:|| B ! ;.9F |☺^ .| i |: B|
            8 .8T:!|B f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 !
            8!8:^ 8B 9,: 8 |BT. :o- 8 f |:o||b 8 8 8|8B8: |. !.98 R 8!B ' :|'B
            :. 8|!o |.!6 8 8 .' 8| i.✲|8 #. 'B :P!'.8 Tb8B8.8 BB..8.B: P88:d.^ :
            ..B|.?: : ! B :| ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 ! BBB_8.i' 88
            =FB BP8.:.:B | B !BB... :o8!. .| B" 9 i 8.88.8:8 F.|8:B8..B!. B8 B8.
            B f.: | 8 88: .? |Y8|Pb:| 8 .. . !! :8 Ba ;:☺|B8 8. 8BB6 . ☮,:
            :8!!B: |bB .B|i9. 8!8 8i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B .8^:
            B9.| . | |!888 u.,:. . 9|8 ,☆ 6:Y ..|.:: 8|8 . ..B 8! B ?: ;|R .u8 !
            88 88: ..::B.' |8BF || BY R!B!!| ::" Y:.o-.: 886 8B.. 8B .8. ":.
            |8."f . ! V .:88 .9.|!.| !B ..Bo9: 88 ☮o 9T|BB6B|uBT:F|.8BF . f
            .8P8 9' ' .! 88 8 8.| . F ✦! 8 f :B?:b |. 8 .
          </div>
          <div className={s.text}>
            B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!: :T8:: 8 !B:8.B
            | . B:|: :.|B!8!8"!! B! B.8 " .9✲☆88| ^ P^B.:: : :8 ;88:|9; B'8ii ^
            :b , :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|. 8 : 8.B .
            ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.| T.!f8|: 88^
            ?:.! :||P8 b8 .V TB|88W8☮ P8 | b. . . |88 ☺: B.8.|Y6 8.:8.:B 8 |.
            B o:B .b B 8B| ||fB:'B:6:8T B8|. ' | 8.8 B 8 8|:T. |B8 f.| 88: B8
            B88B":!|d:|b8 | . |:. !YP8 . 8 B ?:YB.:B888 888^ |Bo |||B8: :|B P.
            ':|8i: ||.8|: oR|✦ .B "B:B : B89:|. . |B .8 8b:| | 9.8B... 8^| !|:
            b6 F T? ,."|T : F i9 B|.: B|:||R B. .B B: .BB|B9 ' B.F8 8 |98. |..:
            .?8|b8bB☮..B ||P! .8.Y !☺ ...B8ou.| |!f|P .. 8 .8! :. ^.f. 8:: ,|:
            8 .|88 B8:.8 . ^: 8 B:!B.; 8 B !^ . !T!T| |:8 '8:.BY. 'uTi:B8
            |B?89:! PB8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 .
            :88.B.8.B8 B| : | .8 || 8 ..:.T☮PT 8 !.: TB 8B8 8T B : 88#bd . .
            .:B : . :.:8 .☮..68;8| :: 8 9| | .. 8 |:8|B | .^BB8 ✲':8B8 8u R .
            B. :|B 8:B ..B 88!8 B;:.|88 ||B 8 ✦☆8B8:B| | B.|8?? W B8B. :! |B
            .TB8B 8: |B .8 ! m| :; .- _.: ^8.B8 B. !. ^B :BB! B 8 B8 _|9B:f8B
            ,Bf88. B8 . . ! o☮|.. |. B |'B.!6!|B||: BB !9 BY-|8. . 8b:886: .
            :.. 8 6.8 : | 8|. :: a . 8 PB.!o8.8 | B8 B i |Bt:| :: . : :|..|8.
            fYB ☆|8B 8::. F8 B 8| | !8.F .P..BR8| B|P ☮:B . B:?: : a^ :B | :..
            |B :B "| !.| RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o T8|.8 B8:i8
            .|.8 |.! ^:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8|| ,i☮||.!B:
            8: |8i :88 8 B.88| : " . B! . .889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB
            88 "B!8 . .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y
            Bo| |!8 .b ..|: B. B8 | ! |:B.B B.: :|8:. :":W 8 |:B ., ✲b9B ,.8 B!.
            | .:B o |.^:F f8|B88 :"'i .o = '. B8!. BB|:| .": ,8 | 88 R.|" f 8
            8.: u | : 89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F
            . f .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf
            .b 8:8 .|8,. !. f ! B||☮| | ..|.od !bT .|:|| B ! ;.9F |^ .| i |: B|
            8 .8T:!|B f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 !
            8!8:^ 8B 9,: 8 |BT. :o- 8 f |:o||b ☮8 8 8|8B8: |. !.98 ☆R 8!B '
            :|'B :. 8|!o |.!6 8 8 .' 8| i.|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B:
            P8☺8:d.^ : ..B|.?: : ! B :| ✲||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 !
            BBB_8.i' 88 =FB BP8.:.:B | B !BB... :o8!. .| B" 9 i 8.88.8:8
            F.|8:B8..B!. B8☮ B8. B f.: | 8 88: .?|Y8|Pb:| ☆8 .. . !! :8 Ba
            ;:|B8 8. 8BB6 . B,: :8!!B: |bB .B|i9. 8!8 8i.:| B 8 B8 || |.8. ^
            ..8.B B 9 888:8 B✦ .8^: B9.| . | |!888 u.,:. . 9|8 , 6:Y ..|.:: 8|8
            . ..B 8! B ?: ;|R .u8 ! 88 88: ..::B.' |8BF || BY R!B!!| ::" Y:.o-.:
            886 8B.. 8B .8. ":. |8."f . ! V .:88 .9.|!.| !B ..Bo9: 8☮8 o☺
            9T|BB6B|uBT:F|.8BF .✦ f .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8
            ☮.
          </div>
          <div className={s.text}>
            B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!: :T8:: 8 !B:8.B
            | . B:|: :.|B!☆8!8"!! B! B.8 " .988| ✲^ P^B.:: : :8 ;88:|☆9; B'8ii ^
            :b , :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|. 8 : 8.B .
            ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.| T.!f8|: 88^
            ?:.! :||P8 b8 .V TB|88W8 P8 | b. . . |88 : B.8.|Y6 8.✦:8.:B 8 |. B
            o:B .b B 8B| ||fB:'B:6:8T B8|. ' | 8.8 B 8 8|:T. |B8 f.| 88: B8
            B88B":!|d:|b8 | . |:.✦ !YP8 . 8 B ?:YB☺:B888 888^ |Bo |||B8: :|B P.
            ':|8☮i: ||.8|: oR| .B "B:B : B89:|. . |B .8 8b:| | 9.8B... 8^| !|:
            b6 F T? ,."|T : F✲ i9 B|.: B|:||R B.☮ .B B: .BB|B9 ' B.F8 8 |98.
            |..: .?8|b8bB..B ||P! .8.Y ! ...B8ou.| |!f|P .. 8 .8! :. ^.f. 8::
            ,|: 8 .|88 B8:.8 . ^: 8 B:!B.; 8 B !^ . !T!T| |:8 '8:.BY. 'uTi:B8
            |B?89:! PB8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 .
            :88.B.8.B8 B| : | .8 || 8 ..:.TPT 8 !.: TB 8B8 8T B : 88#bd . . .☆:B
            : . :.:8 . ..68;8| :: 8 9| | .. 8 |:8|B | .^BB8 ':8B8 8u R . B. :|B
            8:B ..B 88!8 B;:.|88 ||B 8 B . !. :.B | .:8!|^ 9|: :8BB| :8?of.
            8T98||.8 |P"i B|88.!|8:8✦. '. |Y| 8!B8.. .:f|8B :,: :b Y o|| .- bB
            '☮. 8|..R8#8 .8 8|! B :. : B8B8:B| | B.|8?? W B8B. :! |B .TB8B 8:
            |B .8 ! m| :; .- _.: ^8.B8 B. !. ^B :BB! B 8 B8 _|9B:f8B ,Bf88. B8 .
            . ! o|.. |. B |'B.!6!|B||: BB !9 BY-|8. ☮. ✲8b:886: . :.. 8 6.8 : |
            8|. :: a . 8 PB.!o8.8 | B8 B i |Bt:| :: . : :|..|8. fYB |8B 8::. F8
            B 8| | !8.F .P..BR8| B|P :B . B:?: : a^ :B | :.. |B :B "| !.|
            RB.::?8.:8.|BPB BB .8 9..:.8 ' |☺ ^| 8:| .o T8|.8 B8:i8 .|.8 |.!
            ^:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8|| ,i||.!B: 8: |8i :88
            8 B.88| : " . B! . .889oi6!.:.BB|B ✦ 8 'B "B|8 |. !8!!| .RB☆ 88 "B!8
            . .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b
            ..|: B. B8 ✲| ! |:B.B B.: :|8:. :":W 8 |:B ., b9B ,.8 B!. | .:B o
            |.^:F f8|B88 :"'i .o = '. B8!. BB|:| .": ,8 | 88 R.|"☮ f 8 8.: u |
            : 89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f .8P8
            9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf .b 8:8
            .|8,. !. f! B||| | ..|.od !bT .|:|| B ! ;.9F |^ .| i |: B| 8 .8T:!|B
            f :B8☆ . .8B |T8:B:☮ 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 ! 8!8:^
            8B 9,: 8 |BT. :o- 8 f |:o||b 8 8 8|8B8: |. !.98 R 8!B ' :|'B :. 8|!o
            |.!6 8 8 .' 8| i.|8 #. 'B:P✲!'.8 Tb8B8.8 BB..8.B: P88:d.^ : ..B|.?:
            : ! B :| ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 ! BBB_8.i' 88 =FB
            BP8.:.:B | B !BB... :o8!. .| B" 9 i 8.88.8:8 F.|8:B8..B!. B8 B8. B
            f.: | 8 88: .?|Y8|Pb:| 8 ✦.. . !! :8 Ba ;:|B8 8✦. 8BB6 .☮ B,:
            :☺8!!B: |bB .B|i9. 8!8 8i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B
            .8^: B9.| . | |!888 u.,:. . 9|8 , 6:Y ..|.:: 8|8 . ..B 8! B ?: ;|R
            .u8 ! 88 88: ..::B.' |8☺BF || BY R☮!B!!| ::" Y:.o-.: 886 8B.. 8B
            .8. ":. |8."f . ! V .:88 .9.|!.| !B ..Bo9: 88 o 9T|BB6B|uBT:F|.8BF .
            f .8P8 9' ☮' .! 88 8 8.| .☮ F ☮! 8 f :B?:b |. 8 .
          </div>
          <div className={s.text}>
            B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!: :T8:: 8 !B:8.B
            | . B:|: :.✲|B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8 ;88:|9; B'8ii ^
            :b , :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|. 8 : 8.B .
            ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.| T.!f8|: 88^
            ?:.! :||P8 b8 .V TB|88W8 P8 | b☆. . . |88 : B.8.|Y✲6 8.:8.:B 8 |. B
            o:B .b B 8B| ||fB:'B:6:8T B8|. ' | 8.8 B 8 8|:T. |B8 f.| ☮88: B8
            B88B":!|d:|b8 | . |:. !YP8 . 8 B ?:YB.:B888 888^ |Bo ✦|||B8: :|B P.
            ':|8i: ||.8|: oR| .B "B:B : B89☺:|. . |B .8 8b:| | 9.8B... 8^| !|:
            b6 F T? ,."|T : F i9 B|.: B|:||R B. .B B: .BB|B9 ' B.F8 8 |98. |..:
            .?8|b8bB..B ||P! .8.Y ! ...B8ou.| |☮!f|P .. 8 .8! :. ^.f. 8:: ,|: 8
            .|88 B8:.8 . ^: 8 B:!B.; 8 B !^ . !T!T| |:8 '8:.BY. 'uTi:B8 |B?89:!
            PB8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 . :88.B.8.B8
            B| : | .8 || 8 ..✦:.TPT 8 !.: TB 8B8 8T B : 88#bd . . .:B : . :.:8 .
            ..68;8| :: 8 9| | .. 8 |:8|B | .^BB8 ':8B8 8u R . B. :|B 8:B ..B
            88!8 B;:.|88 ||B 8 B . !. :.B | .:8!|^ 9|: :8BB| :8?of. 8T98||.8
            |P"i B|88.!|8:8. '. |Y| 8!B8.. .:f|8B :,: :b Y o|| .- bB '. 8|..R8#8
            .8 8|! B :. : B8B8:B| | B.|8?? W B8B.✲ :! |B .TB8B 8: |B .8 ! m| :;
            .- _☺.: ^8.B8 B. !. ^B :BB! B 8 B8 _|9B:f8B ,Bf88. B8 . . ! o|.. |.
            B |'B.!6!|B||: BB !9 BY-|8. . 8b ✦:886: . :.. 8 6.8 : | 8|. :: a . 8
            PB.!o8.8 | B8 B i |Bt:| :: . : :|..|8. fYB |8B 8::. F8 B 8| | !8.F
            .P✦..BR8| B|P :B . B:?: : a^ :B | :.. |B :B "| !.| RB.::?8.:8.|☆BPB
            BB .8 9..:.8 ' | ^| 8:| .o T8|.8 B8:i8 .|.8 |.! ^:;.|8 o8 8,iR! .::
            : .: . 8 .88 BB..: :| : .8|| ,i||.!B: ☮8: ✦ |8i :88 8 B.88| : " .
            B! . .889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88 "B!8 . .8|8.|8| 9 B
            :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b ..|: B. B8 | !
            |:B.B B.:☮ :|8:. :":W 8 |:B ., b9B ,.8 B!. | .:B o |.^:F f8|B88
            :"'i .o = '. B8!. BB|:| .": ,8 | 88 R.|" f 8 8.: u | : 89b^ 8B..!!8
            f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .✲8.|F . f .8P8 9' ' .! 88 8
            8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:☮Bf .b 8:8 .|8,. !. f!
            B||| | ..|.od !bT .|:|| B ! ;☺.9F |^ .| i |: B| 8 .8T:!|B f :B8 .
            .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 ! 8!8:^ 8B 9,: 8
            |BT. :o- 8 f |:o||b 8 8 8|8B8: |. !.98 R 8!B ' :|'B :. 8|!o |.!6 8 8
            .' 8| i.|8 #. 'B:P!'.8 Tb8B8.8 ☆BB..8.B: P88:d.^ : ..B|.?: : ! B :|
            ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 ! BBB_8.i' 88 =FB BP8.:.:B | B
            !BB... :o8!. .✦| B" 9 i 8.88.8:8 F.|8:B8..B!. B8 B8. B ☮☮f.: | 8
            88: .?|Y8|Pb:| 8 .. . !! :8 Ba ;:|B8 8. 8BB6 . B,: :8!!B: |bB
            .B|i9☆. 8!8 8i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B .8^: B9.| . |
            |!888 u.,:. . 9|8 , 6:Y ..|.:: 8|8 . ..B 8! B ?: ;|R .u8 ! 88 8☮8:
            ..::B.' |8BF || BY R!B!!| ::" Y:.o-.: 886 8B.. 8B .8. ":. |8."f . !
            V .:88 .9.|!.| !B ..Bo9: 88 o 9T|BB6B|uBT:F|.8BF . f .8P8 9' ' .!
            ✦88 8 8.| . F ! 8 f :B☮?:b |. 8 .
          </div>
          <div className={s.text}>
            B... b | ..oB| :8 .8B8| To| f P..:. .:B. ☆BB:6'.!8_!: :T8:: 8 !B:8.B
            | . B:|: :.|B!8!8"!! B! B.8 " .988|☺^ P^B.:: : :8 ;88:|9; B'8ii ^
            :b , :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|. 8 : 8.B .
            ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B ☆!..!8'BBB 9B| m 8.| T.!☮f☆8|: 88^
            ?:.! :||P8 b8 .V TB|88W8 P8 | b. . . |88 : B.8.|Y6 8.:8.:B 8 |. B
            o:B .b B 8B| ||fB:'B:6:8T☮ B8|. ✲ | 8.8 B 8 8|:T. |B8 f.| 88: B8
            B88B":!|d:|b8 | . |:. !YP8 . 8 B ?:YB.:B888 888^ |Bo |||B8: :|B P.
            ':|8i: ||.8|: oR| .B "B:B : B89:|. . |B .8 8b:| | 9.8B... 8^| !|: b6
            F T? ,."|T : F i9 B|.: B|:|| ✦R B. .B B: .BB|B9☮ ' B.F8 8 |98. |..:
            .?8|b8bB..B ||P! .8.Y ! ..☺.B8ou.| |!f|P .. 8 .8! :. ^.f. 8:: ,|: 8
            .|88 B8:.8 . ^: 8 B:!B.; 8 B !^ . !T✲!T| |:8 '8☺:.BY. 'uTi:B8
            |B?89:! PB8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 .
            :88.B.8.B8 B| : | .8 || 8 ..:.TPT 8 !.: TB 8B8 8T B : 88#bd . . .:B
            : . :.:8 . ..68;8| :: 8 9| | .. 8 |:8|B | .^BB8 ':8B8 8u R . B. :|B
            8:B ..B 88!8 B;:.|88 ||B 8 B . !. :.B | .:8!|^ 9|: :8BB| :8?of.
            8☮98||.8 |P"i B|88.!|8:8. '. |Y| 8!B8.. .:f|8B :,: :b Y o|| .- bB
            '. 8|..R8#8 .8 8|! B :. : B8B8:B| ✦| B.|8?? W ☮B8B. :! |B .TB8B 8:
            |B .8 ✦! m| :; .- _.: ^8.B8 B. !. ^B :BB! B 8 B8 _|9B:f8B ,Bf88. B8
            . . ! o|.. |✲. B |'B.!6!|B||: BB !9 BY-|8. . 8b:886: . :.. 8 6.8 : |
            8|. :: a . 8 PB.!o8.8 | B8 B i |Bt:| :: . : :|..|8. fYB |8B 8::. F8
            B 8| | !8.F .P..BR8| B|P :B . B:?: : a^ :B | :☆.. |B :B "| !.|
            RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o T8|.8 B8:i8 .|.8 |.!
            ^:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8|| ,i||.!B: 8: |8i :88
            8 B.88| : " . B! . .889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88 "B!8 .
            .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b
            ..|: B. B8 | ! |:B.B B.: :|8:. :":W 8 |:B .☺, b9B ,.8 B!. | .:B o
            |.^:F f8|B88 :"'i .o = '. B8!. BB|:|✲ .": ,8 | 88 R.|" f 8 8.: u | :
            89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f .8P8
            9' ' .! 88 8 8.|☮ . F !☆ 8 f :B?:b |. 8 . .B 8: B68 ☮: .. o:Bf .b
            8:8 .|8,. !. f! B||| | ..|.od !bT .|:|| B ! ;.9F |^ .| i |: B| 8
            .8T:!|B f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 !
            8!8:^ 8B 9,: ✲8 |BT. :o- 8 f |:o||b 8☮ 8 8|8B8: |. !.98 R 8!B '
            :|'B :. 8|!o |.!6 8 8 .' 8| i.|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B:
            P88:d.^ : ..B|.?: : ! B :| ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 !
            BBB_8.i' 88 =FB BP8.:.:B | B !BB..✦. :o8!. .| B" 9 i 8.88.8:8
            F.|8:B8..B!. B8 B8. B f.: | 8 88: .?|Y8|Pb:| 8 .. .☆ !! :8 Ba ;:|B8
            8. 8BB6 . B,: :8!!B: |bB .B|i9. 8!8 8i.:| B 8 B8 || |.8. ^ ..8.B B 9
            888:8 B .8^: B9.| . | |!888 u.,:. . 9|8 , 6:Y ..|.:: 8|8 . ..B 8! B
            ?: ;|R .u8 ! 88 88: ..::B.' |8BF || BY R!B!!| ::" Y:.o-.: 88 ✦6 8B..
            ☮8B .8. ":. |8."f . ! V .☮:88 .9.|!.| !B ..Bo9: 88 o
            9T|BB6B|uBT:F|.8BF . f .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b ☮|. 8
            .
          </div>
          <div className={s.text}>
            B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!: :T8:: 8 !B:8.B
            | . B:|: :.|B!☆8!8"!! B! B.8 " .988| ✲^ P^B.:: : :8 ;88:|☆9; B'8ii ^
            :b , :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|. 8 : 8.B .
            ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.| T.!f8|: 88^
            ?:.! :||P8 b8 .V TB|88W8 P8 | b. . . |88 : B.8.|Y6 8.✦:8.:B 8 |. B
            o:B .b B 8B| ||fB:'B:6:8T B8|. ' | 8.8 B 8 8|:T. |B8 f.| 88: B8
            B88B":!|d:|b8 | . |:.✦ !YP8 . 8 B ?:YB☺:B888 888^ |Bo |||B8: :|B P.
            ':|8☮i: ||.8|: oR| .B "B:B : B89:|. . |B .8 8b:| | 9.8B... 8^| !|:
            b6 F T? ,."|T : F✲ i9 B|.: B|:||R B.☮ .B B: .BB|B9 ' B.F8 8 |98.
            |..: .?8|b8bB..B ||P! .8.Y ! ...B8ou.| |!f|P .. 8 .8! :. ^.f. 8::
            ,|: 8 .|88 B8:.8 . ^: 8 B:!B.; 8 B !^ . !T!T| |:8 '8:.BY. 'uTi:B8
            |B?89:! PB8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 .
            :88.B.8.B8 B| : | .8 || 8 ..:.TPT 8 !.: TB 8B8 8T B : 88#bd . . .☆:B
            : . :.:8 . ..68;8| :: 8 9| | .. 8 |:8|B | .^BB8 ':8B8 8u R . B. :|B
            8:B ..B 88!8 B;:.|88 ||B 8 B . !. :.B | .:8!|^ 9|: :8BB| :8?of.
            8T98||.8 |P"i B|88.!|8:8✦. '. |Y| 8!B8.. .:f|8B :,: :b Y o|| .- bB
            '☮. 8|..R8#8 .8 8|! B :. : B8B8:B| | B.|8?? W B8B. :! |B .TB8B 8:
            |B .8 ! m| :; .- _.: ^8.B8 B. !. ^B :BB! B 8 B8 _|9B:f8B ,Bf88. B8 .
            . ! o|.. |. B |'B.!6!|B||: BB !9 BY-|8. ☮. ✲8b:886: . :.. 8 6.8 : |
            8|. :: a . 8 PB.!o8.8 | B8 B i |Bt:| :: . : :|..|8. fYB |8B 8::. F8
            B 8| | !8.F .P..BR8| B|P :B . B:?: : a^ :B | :.. |B :B "| !.|
            RB.::?8.:8.|BPB BB .8 9..:.8 ' |☺ ^| 8:| .o T8|.8 B8:i8 .|.8 |.!
            ^:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8|| ,i||.!B: 8: |8i :88
            8 B.88| : " . B! . .889oi6!.:.BB|B ✦ 8 'B "B|8 |. !8!!| .RB☆ 88 "B!8
            . .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b
            ..|: B. B8 ✲| ! |:B.B B.: :|8:. :":W 8 |:B ., b9B ,.8 B!. | .:B o
            |.^:F f8|B88 :"'i .o = '. B8!. BB|:| .": ,8 | 88 R.|"☮ f 8 8.: u |
            : 89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f .8P8
            9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf .b 8:8
            .|8,. !. f! B||| | ..|.od !bT .|:|| B ! ;.9F |^ .| i |: B| 8 .8T:!|B
            f :B8☆ . .8B |T8:B:☮ 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 ! 8!8:^
            8B 9,: 8 |BT. :o- 8 f |:o||b 8 8 8|8B8: |. !.98 R 8!B ' :|'B :. 8|!o
            |.!6 8 8 .' 8| i.|8 #. 'B:P✲!'.8 Tb8B8.8 BB..8.B: P88:d.^ : ..B|.?:
            : ! B :| ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 ! BBB_8.i' 88 =FB
            BP8.:.:B | B !BB... :o8!. .| B" 9 i 8.88.8:8 F.|8:B8..B!. B8 B8. B
            f.: | 8 88: .?|Y8|Pb:| 8 ✦.. . !! :8 Ba ;:|B8 8✦. 8BB6 .☮ B,:
            :☺8!!B: |bB .B|i9. 8!8 8i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B
            .8^: B9.| . | |!888 u.,:. . 9|8 , 6:Y ..|.:: 8|8 . ..B 8! B ?: ;|R
            .u8 ! 88 88: ..::B.' |8☺BF || BY R☮!B!!| ::" Y:.o-.: 886 8B.. 8B
            .8. ":. |8."f . ! V .:88 .9.|!.| !B ..Bo9: 88 o 9T|BB6B|uBT:F|.8BF .
            f .8P8 9' ☮' .! 88 8 8.| .☮ F ☮! 8 f :B?:b |. 8 .
          </div>
          <div className={s.text}>
            B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'☆.!8_!: :T8:: 8 !B:8.B
            | . B:|: :.|B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8 ;88:|9; B'8ii ^ :b
            , :F. B8.lB :8.!. : 8.B... | :8 .: . |✲..| 8|. 8 : 8.B . ^.|,Y:8B:.
            B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.| T.!f8|: 88^ ?:.! :||P8 b8
            .V TB|88W8 P8 | b. . . |88 : B.8.|Y6 8.:8.:B 8 |. B o:B .b B 8B|
            ||fB:'B:6:8T☮ B8|. ☆' | 8.8 B 8 8|:T. |B8 f.| 88: B8 B88B":!|d:|b8
            | . |:. !YP8 . 8 B ?:YB.:B888 888^ |Bo |||B8: :|B P. ':☺|8i: ||.8|:
            oR| .B "B:B : B89:|. . |B ✦.8 8b:| | 9.8B... 8^| !|: b6 F T? ,."|T :
            F i9 B|.: B|:||R B. .B B: .BB|B9 ' B.F8 8 |98. |..: .?8|b8bB..B ||P!
            .8.Y ! ...B8ou.| |!f|P .. 8 .8! :. ^.f. 8:: ,|: 8 .|88 B8:.8 . ^: 8
            B:!B.; 8 B !^ . !T!T|☆ |:8 '8:.BY. 'uTi:B8 |B?89:! PB8:8o|F;:|
            8:8|bR| 8 o.!✲.! u :8 .☺8B8 8T B : 88#bd . . .:B : . :.:8 . ..68;8|
            :: 8 9| | .. 8 |☮☮:8|B | .^BB8 ':✦8B8 8u R . B. :|B 8:B ..B 88!8
            B;:.|88 ||B 8 B . !. :.B | .:8!|^ 9|: :8BB| :8?☮f. 8T98||.8 |P"i
            B|88.!|8:8. '. |Y| 8!B8.. .:f|8B :,: :b Y o|| .- bB '. 8|..R8#8 .8
            8|! B :. : B8B8:B| | B.|8?? W B8B. :! |B .TB8B 8: |B .8 ! m| :; .-
            _.: ^8.B8 B. !. ^B :BB! B 8 B8 _|9B:f8B ,Bf88. B8 . . ! o|.. |. B
            |'B.!6!|B||: BB !9 ☆BY-|8. . 8b:886: . :.. 8 6.8 : | 8|. :: a . 8
            PB.!o8.8 | ☺B8 B i |Bt:| :: . : :|..|8.✲ fYB |8B 8::. F8 B 8| |
            !8.F .P..BR8| B|P :B . B:?: : a^ :B | :.. |B :B "| !.|
            RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o T8|.8 B8:i8 .|.8 |.!
            ^:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8|| ,i||.!B: 8: |8i :88
            8 B.88| : " . B! . .889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88 "B!8 .
            .8|8.|8|✦ 9 B :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b
            ..|: B. B8 | ! |:B.B B.: :|8:. :":W 8 |:B ., b9B✦ ,.8 B!. | .:B o
            |.^:F f8|B88 :"'i .o = '. B8!. B✲B|:| .": ,8 | 88 R.|" f 8 8.: u | :
            89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f .8P8
            9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf☆| 8
            .8T:!|B f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 !
            8!8:^ 8B 9,: 8 |BT. :o- 8 f |:o||b☮ 8☆ 8 8|8B8: |. !.98 R 8!B '
            :|'B :. 8|!o |.!6 8 8 .' 8| i.|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B:
            P88:d.^ : ..B|.?: :☮ ! B :| ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 !
            BBB_8.i' 88 =FB BP8.:.:B | B !BB... :o8!. .| B" 9 i 8.88.8:8
            F.|8:B8..B!. B8 B8. B f.: | 8 88: .?|Y8|Pb:| 8 .. . !! :8 Ba ;:|B8
            8. 8BB6 .☮☮ B,: :8!!B: |bB .B|i9. 8!8 8i.:| B 8 B8 || |.8. ^ ..8.B
            B 9 888:8 B .8^: B9.| . | |!888 u.,:. . 9|8 , 6:Y ..|✲.:: 8|8 . ..B
            8! B ?: ;|R .u8 ! 88 88: ..::B.' |8BF || BY R!B!!| ::" Y:.o-.: 886
            8☮B.. 8B .8. ":. |8.☮"f . ! V .:88 .9.|!.| ☮!B ..Bo9: 8☮8 o
            9T|BB6B|uBT:F|.8BF . f .8P8 9' ' .! 88 8 8.| . F ! 8 f :☮B?:b |. 8
            .
          </div>
          <div className={s.text}>
            B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!: :T8:: 8 !B:8.B
            | . B:|: :.|B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8☆ ;88:|9; B'8ii ^
            :b , :F. B8.lB :8.!. : 8.B...☆ | :8 .: . |..| 8|. 8 : 8.B .
            ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.| T.!f8|: 88^
            ?:.! :||P8 b8 .V TB|88W8 P8 | b. . . |88 : B.8.|Y6 8.:8.:B 8 |. B
            o:B .b B 8B| ||fB:'B:6:8T B8|. ' | 8.8 B 8 8|✲:T. |B8 f.| 88: B8
            B88B":!|d:|b8 | . |:. !Y☮☮P8 . 8 B ?:YB.:B888 888^ |Bo |||B8: :|B
            P. ':|8i: ||.8|: oR| .B "B:B : B89:|. . |B .8 8b:| | 9.8B... 8^| !|:
            b6 F T? ,."|T : F ✦i9 B|.: B|:|☆|R B. .B B: .BB|B9 ' B.F8 8 |98.
            |..: .?8|b8bB..B ||P! .8.Y ! ...B8ou.| |!f|P .. 8 .8! :. ^.f. 8::
            ,|: 8 .|88 B8:.8 . ^: 8 B:!B.; 8 B !^ . !T!T| |:8 '8:.BY. 'uT☆i:B8
            |B?89:! PB8:8o|F;:| 8✲:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8☮ | | B 8 .
            :88.B.8.B8 B| : | .8 || 8 ..:.TPT 8 !.: TB 8B8 8T B : 88#bd . . .:B
            : . :.:8 . ..68;8| :: 8 9| | .. 8 |:8|B | .^BB8 ':8B8 8u R . B. :|B☆
            8:B ..B 88!8 B;:.|88 ||B 8 B . !. :.B | .:8!|^ 9|: :8BB| :8?of.
            8T98||.8 |P"i B|88.!|8:8. ✲'. |Y| 8!B8.. .:f|8B :,: :b Y o|| .- bB
            '. 8|..R8#8 .8 8|! B :. : B8B8:B| | B.|8?? W B8B. :! |B .TB8B 8: |B
            .8 ! m| :; .- _.: ☺^8.B8 B. !. ^B :BB! B ✦8 B8 _|9B:f8B ,Bf88. B8☆
            . . ! o|.. |. B |'B.!6!|B||: BB !9 BY-|8. . 8b:☮886: . :.. 8 6.8 :
            | 8|. :: a . 8 PB.!o8.8 | B8 B i |Bt:| :: . : :|..|8. fYB |8B 8::.
            F8 B 8| | !8.F .P..BR8| B|P :B . B:?: : a^ :B | :.. ☺|B :B "| !.|
            RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o T8|.8 B8:i8 .|.8 |.!
            ^:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8|| ,i||.!B: 8: |8i :88
            8 B.88| : " . B! . .889oi6!.:.BB|B 8'B "B|8 |. !8☆!!| .RB 88 "B!8 .
            .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b
            ..|: B. B☮8 | ! |:B.B B.: :|8:. :":W 8 |:B ., b9B ,.8 B!. | .:B o
            |.^:F f8|B88 :"'i .o = '. B8!. BB|:| ✲.": ,8 | 88 R.|" f 8 8.: u | :
            89b^ 8B..!!8☆8 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf .b 8:8
            .|8,. !. f! B||| | ..|.od !bT .|:|| B ! ;.9F |^ .| i |: B| 8 .8T:!|B
            f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 ☺|'☆B :. 8|!o
            |.!6 8 8 .' 8| i.|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B: P88:d.^ : ..B|.?: :
            ! B :| ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 ! BBB_☮8.i' 88 =FB
            BP8☮.:.:B | B !BB... :o8!. .| B" 9 i 8.88.8:8 F.|8:B8..B!. B8 B8. B
            f.: | 8 88: .?|Y8|Pb:| 8 .. . !! :8 Ba ;:|B8 8. 8BB6 . B,: :8!!B:
            |bB .B|i9. 8!8 8i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B .8^: B9.| .
            | |!888 u.,:. . 9|8☺ , 6 ✦:Y ..|.:: 8|8 . ..B 8! B ?: ;|R .u8 ! 88
            88: ..::B.' |8BF || BY R!B!!| ::" Y:.o-.: 886 8B.. 8B .8. ":. |8."f
            . ! V .:88 .9.|!.| !B ..Bo9: 88 o 9T|BB6B|uBT:F|.8BF . f .8P8 9' '
            .! 88 8 8.| . F ! 8 f :☮☮B?:b |. 8 .
          </div>
          <div className={s.text}>
            B... b | ..oB| :8 .8B8| To| f P..:. .:B. ☆BB:6'.!8_!: :T8:: 8 !B:8.B
            | . B:|: :.|B!8!8"!! B! B.8 " .988|☺^ P^B.:: : :8 ;88:|9; B'8ii ^
            :b , :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|. 8 : 8.B .
            ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B ☆!..!8'BBB 9B| m 8.| T.!☮f☆8|: 88^
            ?:.! :||P8 b8 .V TB|88W8 P8 | b. . . |88 : B.8.|Y6 8.:8.:B 8 |. B
            o:B .b B 8B| ||fB:'B:6:8T☮ B8|. ✲ | 8.8 B 8 8|:T. |B8 f.| 88: B8
            B88B":!|d:|b8 | . |:. !YP8 . 8 B ?:YB.:B888 888^ |Bo |||B8: :|B P.
            ':|8i: ||.8|: oR| .B "B:B : B89:|. . |B .8 8b:| | 9.8B... 8^| !|: b6
            F T? ,."|T : F i9 B|.: B|:|| ✦R B. .B B: .BB|B9☮ ' B.F8 8 |98. |..:
            .?8|b8bB..B ||P! .8.Y ! ..☺.B8ou.| |!f|P .. 8 .8! :. ^.f. 8:: ,|: 8
            .|88 B8:.8 . ^: 8 B:!B.; 8 B !^ . !T✲!T| |:8 '8☺:.BY. 'uTi:B8
            |B?89:! PB8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 .
            :88.B.8.B8 B| : | .8 || 8 ..:.TPT 8 !.: TB 8B8 8T B : 88#bd . . .:B
            : . :.:8 . ..68;8| :: 8 9| | .. 8 |:8|B | .^BB8 ':8B8 8u R . B. :|B
            8:B ..B 88!8 B;:.|88 ||B 8 B . !. :.B | .:8!|^ 9|: :8BB| :8?of.
            8☮98||.8 |P"i B|88.!|8:8. '. |Y| 8!B8.. .:f|8B :,: :b Y o|| .- bB
            '. 8|..R8#8 .8 8|! B :. : B8B8:B| ✦| B.|8?? W ☮B8B. :! |B .TB8B 8:
            |B .8 ✦! m| :; .- _.: ^8.B8 B. !. ^B :BB! B 8 B8 _|9B:f8B ,Bf88. B8
            . . ! o|.. |✲. B |'B.!6!|B||: BB !9 BY-|8. . 8b:886: . :.. 8 6.8 : |
            8|. :: a . 8 PB.!o8.8 | B8 B i |Bt:| :: . : :|..|8. fYB |8B 8::. F8
            B 8| | !8.F .P..BR8| B|P :B . B:?: : a^ :B | :☆.. |B :B "| !.|
            RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o T8|.8 B8:i8 .|.8 |.!
            ^:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8|| ,i||.!B: 8: |8i :88
            8 B.88| : " . B! . .889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88 "B!8 .
            .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b
            ..|: B. B8 | ! |:B.B B.: :|8:. :":W 8 |:B .☺, b9B ,.8 B!. | .:B o
            |.^:F f8|B88 :"'i .o = '. B8!. BB|:|✲ .": ,8 | 88 R.|" f 8 8.: u | :
            89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f .8P8
            9' ' .! 88 8 8.|☮ . F !☆ 8 f :B?:b |. 8 . .B 8: B68 ☮: .. o:Bf .b
            8:8 .|8,. !. f! B||| | ..|.od !bT .|:|| B ! ;.9F |^ .| i |: B| 8
            .8T:!|B f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 !
            8!8:^ 8B 9,: ✲8 |BT. :o- 8 f |:o||b 8☮ 8 8|8B8: |. !.98 R 8!B '
            :|'B :. 8|!o |.!6 8 8 .' 8| i.|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B:
            P88:d.^ : ..B|.?: : ! B :| ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 !
            BBB_8.i' 88 =FB BP8.:.:B | B !BB..✦. :o8!. .| B" 9 i 8.88.8:8
            F.|8:B8..B!. B8 B8. B f.: | 8 88: .?|Y8|Pb:| 8 .. .☆ !! :8 Ba ;:|B8
            8. 8BB6 . B,: :8!!B: |bB .B|i9. 8!8 8i.:| B 8 B8 || |.8. ^ ..8.B B 9
            888:8 B .8^: B9.| . | |!888 u.,:. . 9|8 , 6:Y ..|.:: 8|8 . ..B 8! B
            ?: ;|R .u8 ! 88 88: ..::B.' |8BF || BY R!B!!| ::" Y:.o-.: 88 ✦6 8B..
            ☮8B .8. ":. |8."f . ! V .☮:88 .9.|!.| !B ..Bo9: 88 o
            9T|BB6B|uBT:F|.8BF . f .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b ☮|. 8
            .
          </div>
          {isMobileDevice && (
            <>
              <div className={s.text}>
                B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'☆.!8_!: :T8:: 8
                !B:8.B | . B:|: :.|B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8 ;88:|9;
                B'8ii ^ :b , :F. B8.lB :8.!. : 8.B... | :8 .: . |✲..| 8|. 8 :
                8.B . ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.|
                T.!f8|: 88^ ?:.! :||P8 b8 .V TB|88W8 P8 | b. . . |88 : B.8.|Y6
                8.:8.:B 8 |. B o:B .b B 8B| ||fB:'B:6:8T☮ B8|. ☆' | 8.8 B 8
                8|:T. |B8 f.| 88: B8 B88B":!|d:|b8 | . |:. !YP8 . 8 B ?:YB.:B888
                888^ |Bo |||B8: :|B P. ':☺|8i: ||.8|: oR| .B "B:B : B89:|. . |B{' '}
                ✦.8 8b:| | 9.8B... 8^| !|: b6 F T? ,."|T : F i9 B|.: B|:||R B.
                .B B: .BB|B9 ' B.F8 8 |98. |..: .?8|b8bB..B ||P! .8.Y !
                ...B8ou.| |!f|P .. 8 .8! :. ^.f. 8:: ,|: 8 .|88 B8:.8 . ^: 8
                B:!B.; 8 B !^ . !T!T|☆ |:8 '8:.BY. 'uTi:B8 |B?89:! PB8:8o|F;:|
                8:8|bR| 8 o.!✲.! u :8 .☺8B8 8T B : 88#bd . . .:B : . :.:8 .
                ..68;8| :: 8 9| | .. 8 |☮☮:8|B | .^BB8 ':✦8B8 8u R . B. :|B
                8:B ..B 88!8 B;:.|88 ||B 8 B . !. :.B | .:8!|^ 9|: :8BB| :8?☮f.
                8T98||.8 |P"i B|88.!|8:8. '. |Y| 8!B8.. .:f|8B :,: :b Y o|| .-
                bB '. 8|..R8#8 .8 8|! B :. : B8B8:B| | B.|8?? W B8B. :! |B .TB8B
                8: |B .8 ! m| :; .- _.: ^8.B8 B. !. ^B :BB! B 8 B8 _|9B:f8B
                ,Bf88. B8 . . ! o|.. |. B |'B.!6!|B||: BB !9 ☆BY-|8. . 8b:886: .
                :.. 8 6.8 : | 8|. :: a . 8 PB.!o8.8 | ☺B8 B i |Bt:| :: . :
                :|..|8.✲ fYB |8B 8::. F8 B 8| | !8.F .P..BR8| B|P :B . B:?: : a^
                :B | :.. |B :B "| !.| RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o
                T8|.8 B8:i8 .|.8 |.! ^:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| :
                .8|| ,i||.!B: 8: |8i :88 8 B.88| : " . B! . .889oi6!.:.BB|B 8'B
                "B|8 |. !8!!| .RB 88 "B!8 . .8|8.|8|✦ 9 B :B:|. 8| 8.BB.8 BbT. d
                BB .8. .l6? : |B.8Y Bo| |!8 .b ..|: B. B8 | ! |:B.B B.: :|8:.
                :":W 8 |:B ., b9B✦ ,.8 B!. | .:B o |.^:F f8|B88 :"'i .o = '.
                B8!. B✲B|:| .": ,8 | 88 R.|" f 8 8.: u | : 89b^ 8B..!!8
                f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f .8P8 9' ' .! 88
                8 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf☆| 8 .8T:!|B f
                :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 ! 8!8:^
                8B 9,: 8 |BT. :o- 8 f |:o||b☮ 8☆ 8 8|8B8: |. !.98 R 8!B ' :|'B
                :. 8|!o |.!6 8 8 .' 8| i.|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B: P88:d.^
                : ..B|.?: :☮ ! B :| ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 !
                BBB_8.i' 88 =FB BP8.:.:B | B !BB... :o8!. .| B" 9 i 8.88.8:8
                F.|8:B8..B!. B8 B8. B f.: | 8 88: .?|Y8|Pb:| 8 .. . !! :8 Ba
                ;:|B8 8. 8BB6 .☮☮ B,: :8!!B: |bB ✦.B|i9. 8!8 8i.:| B 8 B8 ||
                |.8. ^ ..8.B B 9 888:8 B .8^: B9.| . | |!888 u.,:. . 9|8 , 6:Y
                ..|✲.:: 8|8 . ..B 8! B ?: ;|R .u8 ! 88 88: ..::B.' |8BF || BY
                R!B!!| ::" Y:.o-.: 886 8☮B.. 8B .8. ":. |8.☮"f . ! V .:88
                .9.|!.| ☮!B ..Bo9: 8☮8 o 9T|BB6B|uBT:F|.8BF . f .8P8 9' ' .!
                88 8 8.| . F ! 8 f :☮B?:b |. 8 .
              </div>
              <div className={s.text}>
                B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_☆!: :T8:: 8
                !B:8.B | . B:|: :.|B!8!8"!! B! B☮.8 " .988| ^ ☺P^B.:: : :8
                ;88:|9; B'8ii ^ :b , :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|.
                8 : 8.B . ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.|
                T.!f8|: 88^ ?:.! :||P8 ✦ b8 .V TB|88W8 P8 | b. . . |88 : B.8.|Y6
                8.:8.:B 8 |. B o:B .b B 8B| ||fB:'B:6:8T B8|☮. ' | 8.8 B 8
                8|:T. |B8 f.| 88: B8 B88B":!|d:|b8 | . ☆|:. !YP8 . 8 B
                ?:YB.:B888 888^ |Bo |||B8: :|B P. ':|8i: ||.8|: oR| .B "B:B :
                B89:|. . |B .8☺ 8b:| | 9.8B... 8^| !|: b6 F T? ,."|T : F i9
                B|.: B|:||R B. .B B: .BB|B9 ' B.F8 8 |98. |..: .?8|b8bB..B ||P!
                .8.Y ! ...B8ou.| |!f|P .. 8 ✦ .8! :. ^.f. 8:: ,|: 8 .|8✲8 B8:.8
                . ^: 8 B:!B.; 8 ☮B !^ . !T!T| |:8 '8:.BY. 'uTi:B8 |B?89:!
                PB8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 .
                :88.B.8.B8 B| : |✲ .8 || 8 ..:.TPT 8 !.: TB 8B8 8T B : 88#bd . .
                .:B : . :.:8 . ..68;8| :: 8 9| | .. 8 |:8|B | .^BB8 ':8B8 8u R .
                B. :|B 8:B ..B ☮88!8 B;:.|88 ||B 8 B . !. :.B | .:8!|^ 9|:
                :8BB| :8?of. 8T98||.8 |P"i B|☺88.!|8:8. '. |Y| 8!B8.. .:f|8B
                :,: :b Y o|| .- bB '. 8|..R8#8 .8 8|! B :. : B8B8:B| | B.|8?? W
                B8B. :! |B .TB8B 8: |B .8 ! m| :; .- _ ✦.: ^8.B8 B. !. ^B :BB! B
                8 B8 _|9B:f8B ,Bf88. B8 . . ! o|.. |. B |'B.!6!|B||: BB !9
                BY-|8. . 8b:886: . :.. 8 6.8 : | 8|. :: a . 8 PB.!o8.8 | B8✲ B i
                |Bt:| :: . : :|..|8. fYB |8B 8::. F8 B 8| | !8.F .P..BR8| B|P :B
                . B:?: : a^ :B | :.. |B :B "| !.| RB.::?8.:8.|BPB BB .8 9..:.8 '
                | ^| 8:| .o T8|.8 B8:i8 .|.8 |.! ^:;.|8 o8 8,iR! .:: : .: ☺. 8
                .88 BB..: :| : .8|| ,i||.!B: 8: |8i :88 8 B.88| : " . B! .
                .889oi6!.:.B✦ B|B 8'B "B|8 |. !8!!| .RB 88 "B!8 . .8|8.|8| 9 B
                :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b ..|: B. B8
                | ! |:B.B B.: :|8:. :":W 8 |:B ., b9B☆ ,.8 B!. | .:B o |.^:F
                f8|B88 :"'i .o = '☮. B8!. BB|:| .": ,8 | 88 R.|☮" f 8 8.: u |
                : 89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f
                .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf
                .b 8:8 .|8,. !. f! B||| | ..|.od !bT .|:|| B ! ;.9F |☺^ .| i |:
                B| 8 .8T:!|B f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V.
                88 !8 ! 8!8:^ 8B 9,: 8 |BT. :o- 8 f |:o||b 8 8 8|8B8: |. !.98 R
                8!B ' :|'B :. 8|!o |.!6 8 8 .' 8| i.✲|8 #. 'B ✦:P!'.8 Tb8B8.8
                BB..8.B: P88:d.^ : ..B|.?: : ! B :| ||.a.|. B|. |o8? . 9 :.o|.
                8;B. |B8 ! BBB_8.i' 88 =FB BP8.:.:B | B !BB... :o8!. .| B" 9 i
                8.88.8:8 F.|8:B8..B!. B8 B8. B f.: | 8 88: .? ✦|Y8|Pb:| 8 .. .
                !! :8 Ba ;:☺|B8 8. 8BB6 . ☮,: :8!!B: |bB .B|i9. 8!8 8i.:| B 8
                B8 || |.8. ^ ..8.B B 9 888:8 B .8^: B9.| . | |!888 u.,:. . 9|8
                ,☆ 6:Y ..|.:: 8|8 . ..B 8! B ?: ;|R .u8 ! 88 88: ..::B.' |8BF ||
                BY R!B!!| ::" Y:.o-.: 886 8B.. 8B .8. ":. |8."f . ! V .:88
                .9.|!.| !B ..Bo9: 88 ☮o 9T|BB6B|uBT:F|.8BF . f .8P8 9' ' .! 88
                8 8.| . F ✦! 8 f :B?:b |. 8 .
              </div>
              <div className={s.text}>
                B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!: :T8:: 8
                !B:8.B | . B:|: :.|B!8!8"!! B! B.8 " .9✲☆88| ^ P^B.:: : :8
                ;88:|9; B'8ii ^ :b , :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|.
                8 : 8.B . ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.|
                T.!f8|: 88^ ?:.! :||P8 b8 .V TB|88W8☮ P8 | b. . . |88 ☺:
                B.8.|Y6 8.:8.:B 8 |. B o:B .b B 8B| ||fB:'B:6:8T B8|. ' | 8.8 B
                8 8|:T. |B8 f.| 88: B8 B88B":!|d:|b8 | . |:. !YP8 . 8 B
                ?:YB.:B888 888^ |Bo |||B8: :|B P. ':|8i: ||.8|: oR|✦ .B "B:B :
                B89:|. . |B .8 8b:| | 9.8B... 8^| !|: b6 F T? ,."|T : F i9 B|.:
                B|:||R B. .B B: .BB|B9 ' B.F8 8 |98. |..: .?8|b8bB☮..B ||P!
                .8.Y !☺ ...B8ou.| |!f|P .. 8 .8! :. ^.f. 8:: ,|: 8 .|88 B8:.8 .
                ^: 8 B:!B.; 8 B !^ . !T!T| |:8 '8:.BY. 'uTi:B8 |B?89:!
                PB8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 .
                :88.B.8.B8 B| : | .8 || 8 ..:.T☮PT 8 !.: TB 8B8 8T B : 88#bd .
                . .:B : . :.:8 .☮..68;8| :: 8 9| | .. 8 |:8|B | .^BB8 ✲':8B8 8u
                R . B. :|B 8:B ..B 88!8 B;:.|88 ||B 8 ✦☆8B8:B| | B.|8?? W B8B.
                :! |B .TB8B 8: |B .8 ! m| :; .- _.: ^8.B8 B. !. ^B :BB! B 8 B8
                _|9B:f8B ,Bf88. B8 . . ! o☮|.. |. B |'B.!6!|B||: BB !9 BY-|8. .
                8b:886: . :.. 8 6.8 : | 8|. :: a . 8 PB.!o8.8 | B8 B i |Bt:| ::
                . : :|..|8. fYB ☆|8B 8::. F8 B 8| | !8.F .P..BR8| B|P ☮:B .
                B:?: : a^ :B | :.. |B :B "| !.| RB.::?8.:8.|BPB BB .8 9..:.8 ' |
                ^| 8:| .o T8|.8 B8:i8 .|.8 |.! ^:;.|8 o8 8,iR! .:: : .: . 8 .88
                BB..: :| : .8|| ,i☮||.!B: 8: |8i :88 8 B.88| : " . B! .
                .889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88 "B!8 . .8|8.|8| 9 B
                :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b ..|: B. B8
                | ! |:B.B B.: :|8:. :":W 8 |:B ., ✲b9B ,.8 B!. | .:B o |.^:F
                f8|B88 :"'i .o = '. B8!. BB|:| .": ,8 | 88 R.|" f 8 8.: u | :
                89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f
                .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf
                .b 8:8 .|8,. !. f✦! B||☮| | ..|.od !bT .|:|| B ! ;.9F |^ .| i
                |: B| 8 .8T:!|B f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.|
                V. 88 !8 ! 8!8:^ 8B 9,: 8 |BT. :o- 8 f |:o||b ☮8 8 8|8B8: |.
                !.98 ☆R 8!B ' :|'B :. 8|!o |.!6 8 8 .' 8| i.|8 #. 'B:P!'.8
                Tb8B8.8 BB..8.B: P8☺8:d.^ : ..B|.?: : ! B :| ✲||.a.|. B|. |o8?
                . 9 :.o|. 8;B. |B8 ! BBB_8.i' 88 =FB BP8.:.:B | B !BB... :o8!.
                .| B" 9 i ✦ 8.88.8:8 F.|8:B8..B!. B8☮ B8. B f.: | 8 88:
                .?|Y8|Pb:| ☆8 .. . !! :8 Ba ;:|B8 8. 8BB6 . B,: :8!!B: |bB
                .B|i9. 8!8 8i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B✦ .8^: B9.| .
                | |!888 u.,:. . 9|8 , 6:Y ..|.:: 8|8 . ..B 8! B ?: ;|R .u8 ! 88
                88: ..::B.' |8BF || BY R!B!!| ::" Y:.o-.: 886 8B.. 8B .8. ":.
                |8."f . ! V .:88 .9.|!.| !B ..Bo9: 8☮8 o☺ 9T|BB6B|uBT:F|.8BF .
                ✦ f .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 ☮.
              </div>
              <div className={s.text}>
                B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!: :T8:: 8
                !B:8.B | . B:|: :.|B!8!8"!! B! B.8 " .9✲☆88| ^ P^B.:: : :8
                ;88:|9; B'8ii ^ :b , :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|.
                8 : 8.B . ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.|
                T.!f8|: 88^ ?:.! :||P8 b8 .V TB|88W8☮ P8 | b. . . |88 ☺:
                B.8.|Y6 8.:8.:B 8 |. B o:B .b B 8B| ||fB:'B:6:8T B8|. ' | 8.8 B
                8 8|:T. |B8 f.| 88: B8 B88B":!|d:|b8 | . |:. !YP8 . 8 B
                ?:YB.:B888 888^ |Bo |||B8: :|B P. ':|8i: ||.8|: oR|✦ .B "B:B :
                B89:|. . |B .8 8b:| | 9.8B... 8^| !|: b6 F T? ,."|T : F i9 B|.:
                B|:||R B. .B B: .BB|B9 ' B.F8 8 |98. |..: .?8|b8bB☮..B ||P!
                .8.Y !☺ ...B8ou.| |!f|P .. 8 .8! :. ^.f. 8:: ,|: 8 .|88 B8:.8 .
                ^: 8 B:!B.; 8 B !^ . !T!T| |:8 '8:.BY. 'uTi:B8 |B?89:!
                PB8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 .
                :88.B.8.B8 B| : | .8 || 8 ..:.T☮PT 8 !.: TB 8B8 8T B : 88#bd .
                . .:B : . :.:8 .☮..68;8| :: 8 9| | .. 8 |:8|B | .^BB8 ✲':8B8 8u
                R . B. :|B 8:B ..B 88!8 B;:.|88 ||B 8 ✦☆8B8:B| | B.|8?? W B8B.
                :! |B .TB8B 8: |B .8 ! m| :; .- _.: ^8.B8 B. !. ^B :BB! B 8 B8
                _|9B:f8B ,Bf88. B8 . . ! o☮|.. |. B |'B.!6!|B||: BB !9 BY-|8. .
                8b:886: . :.. 8 6.8 : | 8|. :: a . 8 PB.!o8.8 | B8 B i |Bt:| ::
                . : :|..|8. fYB ☆|8B 8::. F8 B 8| | !8.F .P..BR8| B|P ☮:B .
                B:?: : a^ :B | :.. |B :B "| !.| RB.::?8.:8.|BPB BB .8 9..:.8 ' |
                ^| 8:| .o T8|.8 B8:i8 .|.8 |.! ^:;.|8 o8 8,iR! .:: : .: . 8 .88
                BB..: :| : .8|| ,i☮||.!B: 8: |8i :88 8 B.88| : " . B! .
                .889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88 "B!8 . .8|8.|8| 9 B
                :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b ..|: B. B8
                | ! |:B.B B.: :|8:. :":W 8 |:B ., ✲b9B ,.8 B!. | .:B o |.^:F
                f8|B88 :"'i .o = '. B8!. BB|:| .": ,8 | 88 R.|" f 8 8.: u | :
                89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f
                .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf
                .b 8:8 .|8,. !. f✦! B||☮| | ..|.od !bT .|:|| B ! ;.9F |^ .| i
                |: B| 8 .8T:!|B f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.|
                V. 88 !8 ! 8!8:^ 8B 9,: 8 |BT. :o- 8 f |:o||b ☮8 8 8|8B8: |.
                !.98 ☆R 8!B ' :|'B :. 8|!o |.!6 8 8 .' 8| i.|8 #. 'B:P!'.8
                Tb8B8.8 BB..8.B: P8☺8:d.^ : ..B|.?: : ! B :| ✲||.a.|. B|. |o8?
                . 9 :.o|. 8;B. |B8 ! BBB_8.i' 88 =FB BP8.:.:B | B !BB... :o8!.
                .| B" 9 i ✦ 8.88.8:8 F.|8:B8..B!. B8☮ B8. B f.: | 8 88:
                .?|Y8|Pb:| ☆8 .. . !! :8 Ba ;:|B8 8. 8BB6 . B,: :8!!B: |bB
                .B|i9. 8!8 8i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B✦ .8^: B9.| .
                | |!888 u.,:. . 9|8 , 6:Y ..|.:: 8|8 . ..B 8! B ?: ;|R .u8 ! 88
                88: ..::B.' |8BF || BY R!B!!| ::" Y:.o-.: 886 8B.. 8B .8. ":.
                |8."f . ! V .:88 .9.|!.| !B ..Bo9: 8☮8 o☺ 9T|BB6B|uBT:F|.8BF .
                ✦ f .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 ☮.
              </div>
              <div className={s.text}>
                B... b | ..oB| :8 .8B8| To| f P..:. .:B. ☆BB:6'.!8_!: :T8:: 8
                !B:8.B | . B:|: :.|B!8!8"!! B! B.8 " .988|☺^ P^B.:: : :8
                ;88:|9; B'8ii ^ :b , :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|.
                8 : 8.B . ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B ☆!..!8'BBB 9B| m 8.|
                T.!☮f☆8|: 88^ ?:.! :||P8 b8 .V TB|88W8 P8 | b. . . |88 :
                B.8.|Y6 8.:8.:B 8 |. B o:B .b B 8B| ||fB:'B:6:8T☮ B8|. ✲ | 8.8
                B 8 8|:T. |B8 f.| 88: B8 B88B":!|d:|b8 | . |:. !YP8 . 8 B
                ?:YB.:B888 888^ |Bo |||B8: :|B P. ':|8i: ||.8|: oR| .B "B:B :
                B89:|. . |B .8 8b:| | 9.8B... 8^| !|: b6 F T? ,."|T : F i9 B|.:
                B|:||✦R B. .B B: .BB|B9☮ ' B.F8 8 |98. |..: .?8|b8bB..B ||P!
                .8.Y ! ..☺.B8ou.| |!f|P .. 8 .8! :. ^.f. 8:: ,|: 8 .|88 B8:.8 .
                ^: 8 B:!B.; 8 B !^ . !T✲!T| |:8 '8☺:.BY. 'uTi:B8 |B?89:!
                PB8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 .
                :88.B.8.B8 B| : | .8 || 8 ..:.TPT 8 !.: TB 8B8 8T B : 88#bd . .
                .:B : . :.:8 . ..68;8| :: 8 9| | .. 8 |:8|B | .^BB8 ':8B8 8u R .
                B. :|B 8:B ..B 88!8 B;:.|88 ||B 8 B . !. :.B | .:8!|^ 9|: :8BB|
                :8?of. 8☮98||.8 |P"i B|88.!|8:8. '. |Y| 8!B8.. .:f|8B :,: :b Y
                o|| .- bB '. 8|..R8#8 .8 8|! B :. : B8B8:B| ✦| B.|8?? W ☮B8B.
                :! |B .TB8B 8: |B .8 ✦! m| :; .- _.: ^8.B8 B. !. ^B :BB! B 8 B8
                _|9B:f8B ,Bf88. B8 . . ! o|.. |✲. B |'B.!6!|B||: BB !9 BY-|8. .
                8b:886: . :.. 8 6.8 : | 8|. :: a . 8 PB.!o8.8 | B8 B i |Bt:| ::
                . : :|..|8. fYB |8B 8::. F8 B 8| | !8.F .P..BR8| B|P :B . B:?: :
                a^ :B | :☆.. |B :B "| !.| RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^|
                8:| .o T8|.8 B8:i8 .|.8 |.! ^:;.|8 o8 8,iR! .:: : .: . 8 .88
                BB..: :| : .8|| ,i||.!B: 8: |8i :88 8 B.88| : " . B! .
                .889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88 "B!8 . .8|8.|8| 9 B
                :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b ..|: B. B8
                | ! |:B.B B.: :|8:. :":W 8 |:B .☺, b9B ,.8 B!. | .:B o |.^:F
                f8|B88 :"'i .o = '. B8!. BB|:|✲ .": ,8 | 88 R.|" f 8 8.: u | :
                89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f
                .8P8 9' ' .! 88 8 8.|☮ . F !☆ 8 f :B?:b |. 8 . .B 8: B68 ☮: ..
                o:Bf .b 8:8 .|8,. !. f! B||| | ..|.od !bT .|:|| B ! ;.9F |^ .| i
                |: B| 8 .8T:!|B f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.|
                V. 88 !8 ! 8!8:^ 8B 9,: ✲8 |BT. :o- 8 f |:o||b 8☮ 8 8|8B8: |.
                !.98 R 8!B ' :|'B :. 8|!o |.!6 8 8 .' 8| i.|8 #. 'B:P!'.8
                Tb8B8.8 BB..8.B: P88:d.^ : ..B|.?: : ! B :| ||.a.|. B|. |o8? . 9
                :.o|. 8;B. |B8 ! BBB_8.i' 88 =FB BP8.:.:B | B !BB.. ✦. :o8!. .|
                B" 9 i 8.88.8:8 F.|8:B8..B!. B8 B8. B f.: | 8 88: .?|Y8|Pb:| 8
                .. .☆ !! :8 Ba ;:|B8 8. 8BB6 . B,: :8!!B: |bB .B|i9. 8!8 8i.:| B
                8 B8 || |.8. ^ ..8.B B 9 888:8 B .8^: B9.| . | |!888 u.,:. . 9|8
                , 6:Y ..|.:: 8|8 . ..B 8! B ?: ;|R .u8 ! 88 88: ..::B.' |8BF ||
                BY R!B!!| ::" Y:.o-.: 88 ✦6 8B.. ☮8B .8. ":. |8."f . ! V .☮:88
                .9.|!.| !B ..Bo9: 88 o 9T|BB6B|uBT:F|.8BF . f .8P8 9' ' .! 88 8
                8.| . F ! 8 f :B?:b ☮|. 8 .
              </div>
              <div className={s.text}>
                B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!: :T8:: 8
                !B:8.B | . B:|: :.|B!8!8"!! B! B.8 " .9✲☆88| ^ P^B.:: : :8
                ;88:|9; B'8ii ^ :b , :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|.
                8 : 8.B . ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.|
                T.!f8|: 88^ ?:.! :||P8 b8 .V TB|88W8☮ P8 | b. . . |88 ☺:
                B.8.|Y6 8.:8.:B 8 |. B o:B .b B 8B| ||fB:'B:6:8T B8|. ' | 8.8 B
                8 8|:T. |B8 f.| 88: B8 B88B":!|d:|b8 | . |:. !YP8 . 8 B
                ?:YB.:B888 888^ |Bo |||B8: :|B P. ':|8i: ||.8|: oR| ✦ .B "B:B :
                B89:|. . |B .8 8b:| | 9.8B... 8^| !|: b6 F T? ,."|T : F i9 B|.:
                B|:||R B. .B B: .BB|B9 ' B.F8 8 |98. |..: .?8|b8bB☮..B ||P!
                .8.Y !☺ ...B8ou.| |!f|P .. 8 .8! :. ^.f. 8:: ,|: 8 .|88 B8:.8 .
                ^: 8 B:!B.; 8 B !^ . !T!T| |:8 '8:.BY. 'uTi:B8 |B?89:!
                PB8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 .
                :88.B.8.B8 B| : | .8 || 8 ..:.T☮PT 8 !.: TB 8B8 8T B : 88#bd .
                . .:B : . :.:8 .☮..68;8| :: 8 9| | .. 8 |:8|B | .^BB8 ✲':8B8 8u
                R . B. :|B 8:B ..B 88!8 B;:.|88 ||B 8 ✦☆8B8:B| | B.|8?? W B8B.
                :! |B .TB8B 8: |B .8 ! m| :; .- _.: ^8.B8 B. !. ^B :BB! B 8 B8
                _|9B:f8B ,Bf88. B8 . . ! o☮|.. |. B |'B.!6!|B||: BB !9 BY-|8. .
                8b:886: . :.. 8 6.8 : | 8|. :: a . 8 PB.!o8.8 | B8 B i |Bt:| ::
                . : :|..|8. fYB ☆|8B 8::. F8 B 8| | !8.F .P..BR8| B|P ☮:B .
                B:?: : a^ :B | :.. |B :B "| !.| RB.::?8.:8.|BPB BB .8 9..:.8 ' |
                ^| 8:| .o T8|.8 B8:i8 .|.8 |.! ^:;.|8 o8 8,iR! .:: : .: . 8 .88
                BB..: :| : .8|| ,i☮||.!B: 8: |8i :88 8 B.88| : " . B! .
                .889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88 "B!8 . .8|8.|8| 9 B
                :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b ..|: B. B8
                | ! |:B.B B.: :|8:. :":W 8 |:B ., ✲b9B ,.8 B!. | .:B o |.^:F
                f8|B88 :"'i .o = '. B8!. BB|:| .": ,8 | 88 R.|" f 8 8.: u | :
                89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f
                .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf
                .b 8:8 .|8,. !. f✦! B||☮| | ..|.od !bT .|:|| B ! ;.9F |^ .| i
                |: B| 8 .8T:!|B f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.|
                V. 88 !8 ! 8!8:^ 8B 9,: 8 |BT. :o- 8 f |:o||b ☮8 8 8|8B8: |.
                !.98 ☆R 8!B ' :|'B :. 8|!o |.!6 8 8 .' 8| i.|8 #. 'B:P!'.8
                Tb8B8.8 BB..8.B: P8☺8:d.^ : ..B|.?: : ! B :| ✲||.a.|. B|. |o8?
                . 9 :.o|. 8;B. |B8 ! BBB_8.i' 88 =FB BP8.:.:B | B !BB... :o8!.
                .| B" 9 i ✦ 8.88.8:8 F.|8:B8..B!. B8☮ B8. B f.: | 8 88:
                .?|Y8|Pb:| ☆8 .. . !! :8 Ba ;:|B8 8. 8BB6 . B,: :8!!B: |bB
                .B|i9. 8!8 8i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B✦ .8^: B9.| .
                | |!888 u.,:. . 9|8 , 6:Y ..|.:: 8|8 . ..B 8! B ?: ;|R .u8 ! 88
                88: ..::B.' |8BF || BY R!B!!| ::" Y:.o-.: 886 8B.. 8B .8. ":.
                |8."f . ! V .:88 .9.|!.| !B ..Bo9: 8☮8 o☺ 9T|BB6B|uBT:F|.8BF .
                ✦ f .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 ☮.
              </div>
              <div className={s.text}>
                B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!: :T8:: 8
                !B:8.B | . B:|: :.|B!8!8"!! B! B.8 " .9✲☆88| ^ P^B.:: : :8
                ;88:|9; B'8ii ^ :b , :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|.
                8 : 8.B . ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.|
                T.!f8|: 88^ ?:.! :||P8 b8 .V TB|88W8☮ P8 | b. . . |88 ☺:
                B.8.|Y6 8.:8.:B 8 |. B o:B .b B 8B| ||fB:'B:6:8T B8|. ' | 8.8 B
                8 8|:T. |B8 f.| 88: B8 B88B":!|d:|b8 | . |:. !YP8 . 8 B
                ?:YB.:B888 888^ |Bo |||B8: :|B P. ':|8i: ||.8|: oR|✦ .B "B:B :
                B89:|. . |B .8 8b:| | 9.8B... 8^| !|: b6 F T? ,."|T : F i9 B|.:
                B|:||R B. .B B: .BB|B9 ' B.F8 8 |98. |..: .?8|b8bB☮..B ||P!
                .8.Y !☺ ...B8ou.| |!f|P .. 8 .8! :. ^.f. 8:: ,|: 8 .|88 B8:.8 .
                ^: 8 B:!B.; 8 B !^ . !T!T| |:8 '8:.BY. 'uTi:B8 |B?89:!
                PB8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 .
                :88.B.8.B8 B| : | .8 || 8 ..:.T☮PT 8 !.: TB 8B8 8T B : 88#bd .
                . .:B : . :.:8 .☮..68;8| :: 8 9| | .. 8 |:8|B | .^BB8 ✲':8B8 8u
                R . B. :|B 8:B ..B 88!8 B;:.|88 ||B 8 ✦☆8B8:B| | B.|8?? W B8B.
                :! |B .TB8B 8: |B .8 ! m| :; .- _.: ^8.B8 B. !. ^B :BB! B 8 B8
                _|9B:f8B ,Bf88. B8 . . ! o☮|.. |. B |'B.!6!|B||: BB !9 BY-|8. .
                8b:886: . :.. 8 6.8 : | 8|. :: a . 8 PB.!o8.8 | B8 B i |Bt:| ::
                . : :|..|8. fYB ☆|8B 8::. F8 B 8| | !8.F .P..BR8| B|P ☮:B .
                B:?: : a^ :B | :.. |B :B "| !.| RB.::?8.:8.|BPB BB .8 9..:.8 ' |
                ^| 8:| .o T8|.8 B8:i8 .|.8 |.! ^:;.|8 o8 8,iR! .:: : .: . 8 .88
                BB..: :| : .8|| ,i☮||.!B: 8: |8i :88 8 B.88| : " . B! .
                .889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88 "B!8 . .8|8.|8| 9 B
                :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b ..|: B. B8
                | ! |:B.B B.: :|8:. :":W 8 |:B ., ✲b9B ,.8 B!. | .:B o |.^:F
                f8|B88 :"'i .o = '. B8!. BB|:| .": ,8 | 88 R.|" f 8 8.: u | :
                89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f
                .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf
                .b 8:8 .|8,. !. f✦! B||☮| | ..|.od !bT .|:|| B ! ;.9F |^ .| i
                |: B| 8 .8T:!|B f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.|
                V. 88 !8 ! 8!8:^ 8B 9,: 8 |BT. :o- 8 f |:o||b ☮8 8 8|8B8: |.
                !.98 ☆R 8!B ' :|'B :. 8|!o |.!6 8 8 .' 8| i.|8 #. 'B:P!'.8
                Tb8B8.8 BB..8.B: P8☺8:d.^ : ..B|.?: : ! B :| ✲||.a.|. B|. |o8?
                . 9 :.o|. 8;B. |B8 ! BBB_8.i' 88 =FB BP8.:.:B | B !BB... :o8!.
                .| B" 9 i ✦ 8.88.8:8 F.|8:B8..B!. B8☮ B8. B f.: | 8 88:
                .?|Y8|Pb:| ☆8 .. . !! :8 Ba ;:|B8 8. 8BB6 . B,: :8!!B: |bB
                .B|i9. 8!8 8i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B✦ .8^: B9.| .
                | |!888 u.,:. . 9|8 , 6:Y ..|.:: 8|8 . ..B 8! B ?: ;|R .u8 ! 88
                88: ..::B.' |8BF || BY R!B!!| ::" Y:.o-.: 886 8B.. 8B .8. ":.
                |8."f . ! V .:88 .9.|!.| !B ..Bo9: 8☮8 o☺ 9T|BB6B|uBT:F|.8BF .
                ✦ f .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 ☮.
              </div>
              <div className={s.text}>
                B... b | ..oB| :8 .8B8| To| f P..:. .:B. ☆BB:6'.!8_!: :T8:: 8
                !B:8.B | . B:|: :.|B!8!8"!! B! B.8 " .988|☺^ P^B.:: : :8
                ;88:|9; B'8ii ^ :b , :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|.
                8 : 8.B . ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B ☆!..!8'BBB 9B| m 8.|
                T.!☮f☆8|: 88^ ?:.! :||P8 b8 .V TB|88W8 P8 | b. . . |88 :
                B.8.|Y6 8.:8.:B 8 |. B o:B .b B 8B| ||fB:'B:6:8T☮ B8|. ✲ | 8.8
                B 8 8|:T. |B8 f.| 88: B8 B88B":!|d:|b8 | . |:. !YP8 . 8 B
                ?:YB.:B888 888^ |Bo |||B8: :|B P. ':|8i: ||.8|: oR| .B "B:B :
                B89:|. . |B .8 8b:| | 9.8B... 8^| !|: b6 F T? ,."|T : F i9 B|.:
                B|:||✦R B. .B B: .BB|B9☮ ' B.F8 8 |98. |..: .?8|b8bB..B ||P!
                .8.Y ! ..☺.B8ou.| |!f|P .. 8 .8! :. ^.f. 8:: ,|: 8 .|88 B8:.8 .
                ^: 8 B:!B.; 8 B !^ . !T✲!T| |:8 '8☺:.BY. 'uTi:B8 |B?89:!
                PB8:8o|F;:| 8:8|bR| 8 o.!.! u :8 .9B |8" 6 :. 8 | | B 8 .
                :88.B.8.B8 B| : | .8 || 8 ..:.TPT 8 !.: TB 8B8 8T B : 88#bd . .
                .:B : . :.:8 . ..68;8| :: 8 9| | .. 8 |:8|B | .^BB8 ':8B8 8u R .
                B. :|B 8:B ..B 88!8 B;:.|88 ||B 8 B . !. :.B | .:8!|^ 9|: :8BB|
                :8?of. 8☮98||.8 |P"i B|88.!|8:8. '. |Y| 8!B8.. .:f|8B :,: :b Y
                o|| .- bB '. 8|..R8#8 .8 8|! B :. : B8B8:B| ✦| B.|8?? W ☮B8B.
                :! |B .TB8B 8: |B .8 ✦! m| :; .- _.: ^8.B8 B. !. ^B :BB! B 8 B8
                _|9B:f8B ,Bf88. B8 . . ! o|.. |✲. B |'B.!6!|B||: BB !9 BY-|8. .
                8b:886: . :.. 8 6.8 : | 8|. :: a . 8 PB.!o8.8 | B8 B i |Bt:| ::
                . : :|..|8. fYB |8B 8::. F8 B 8| | !8.F .P..BR8| B|P :B . B:?: :
                a^ :B | :☆.. |B :B "| !.| RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^|
                8:| .o T8|.8 B8:i8 .|.8 |.! ^:;.|8 o8 8,iR! .:: : .: . 8 .88
                BB..: :| : .8|| ,i||.!B: 8: |8i :88 8 B.88| : " . B! .
                .889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88 "B!8 . .8|8.|8| 9 B
                :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b ..|: B. B8
                | ! |:B.B B.: :|8:. :":W 8 |:B .☺, b9B ,.8 B!. | .:B o |.^:F
                f8|B88 :"'i .o = '. B8!. BB|:|✲ .": ,8 | 88 R.|" f 8 8.: u | :
                89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f
                .8P8 9' ' .! 88 8 8.|☮ . F !☆ 8 f :B?:b |. 8 . .B 8: B68 ☮: ..
                o:Bf .b 8:8 .|8,. !. f! B||| | ..|.od !bT .|:|| B ! ;.9F |^ .| i
                |: B| 8 .8T:!|B f :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.|
                V. 88 !8 ! 8!8:^ 8B 9,: ✲8 |BT. :o- 8 f |:o||b 8☮ 8 8|8B8: |.
                !.98 R 8!B ' :|'B :. 8|!o |.!6 8 8 .' 8| i.|8 #. 'B:P!'.8
                Tb8B8.8 BB..8.B: P88:d.^ : ..B|.?: : ! B :| ||.a.|. B|. |o8? . 9
                :.o|. 8;B. |B8 ! BBB_8.i' 88 =FB BP8.:.:B | B !BB.. ✦. :o8!. .|
                B" 9 i 8.88.8:8 F.|8:B8..B!. B8 B8. B f.: | 8 88: .?|Y8|Pb:| 8
                .. .☆ !! :8 Ba ;:|B8 8. 8BB6 . B,: :8!!B: |bB .B|i9. 8!8 8i.:| B
                8 B8 || |.8. ^ ..8.B B 9 888:8 B .8^: B9.| . | |!888 u.,:. . 9|8
                , 6:Y ..|.:: 8|8 . ..B 8! B ?: ;|R .u8 ! 88 88: ..::B.' |8BF ||
                BY R!B!!| ::" Y:.o-.: 88 ✦6 8B.. ☮8B .8. ":. |8."f . ! V .☮:88
                .9.|!.| !B ..Bo9: 88 o 9T|BB6B|uBT:F|.8BF . f .8P8 9' ' .! 88 8
                8.| . F ! 8 f :B?:b ☮|. 8 .
              </div>
              <div className={s.text}>
                B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'☆.!8_!: :T8:: 8
                !B:8.B | . B:|: :.|B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8 ;88:|9;
                B'8ii ^ :b , :F. B8.lB :8.!. : 8.B... | :8 .: . |✲..| 8|. 8 :
                8.B . ^.|,Y:8B:. B! 8 :R ..: B8|9 8| B !..!8'BBB 9B| m 8.|
                T.!f8|: 88^ ?:.! :||P8 b8 .V TB|88W8 P8 | b. . . |88 : B.8.|Y6
                8.:8.:B 8 |. B o:B .b B 8B| ||fB:'B:6:8T☮ B8|. ☆' | 8.8 B 8
                8|:T. |B8 f.| 88: B8 B88B":!|d:|b8 | . |:. !YP8 . 8 B ?:YB.:B888
                888^ |Bo |||B8: :|B P. ':☺|8i: ||.8|: oR| .B "B:B : B89:|. . |B{' '}
                ✦.8 8b:| | 9.8B... 8^| !|: b6 F T? ,."|T : F i9 B|.: B|:||R B.
                .B B: .BB|B9 ' B.F8 8 |98. |..: .?8|b8bB..B ||P! .8.Y !
                ...B8ou.| |!f|P .. 8 .8! :. ^.f. 8:: ,|: 8 .|88 B8:.8 . ^: 8
                B:!B.; 8 B !^ . !T!T|☆ |:8 '8:.BY. 'uTi:B8 |B?89:! PB8:8o|F;:|
                8:8|bR| 8 o.!✲.! u :8 .☺8B8 8T B : 88#bd . . .:B : . :.:8 .
                ..68;8| :: 8 9| | .. 8 |☮☮:8|B | .^BB8 ':✦8B8 8u R . B. :|B
                8:B ..B 88!8 B;:.|88 ||B 8 B . !. :.B | .:8!|^ 9|: :8BB| :8?☮f.
                8T98||.8 |P"i B|88.!|8:8. '. |Y| 8!B8.. .:f|8B :,: :b Y o|| .-
                bB '. 8|..R8#8 .8 8|! B :. : B8B8:B| | B.|8?? W B8B. :! |B .TB8B
                8: |B .8 ! m| :; .- _.: ^8.B8 B. !. ^B :BB! B 8 B8 _|9B:f8B
                ,Bf88. B8 . . ! o|.. |. B |'B.!6!|B||: BB !9 ☆BY-|8. . 8b:886: .
                :.. 8 6.8 : | 8|. :: a . 8 PB.!o8.8 | ☺B8 B i |Bt:| :: . :
                :|..|8.✲ fYB |8B 8::. F8 B 8| | !8.F .P..BR8| B|P :B . B:?: : a^
                :B | :.. |B :B "| !.| RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o
                T8|.8 B8:i8 .|.8 |.! ^:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| :
                .8|| ,i||.!B: 8: |8i :88 8 B.88| : " . B! . .889oi6!.:.BB|B 8'B
                "B|8 |. !8!!| .RB 88 "B!8 . .8|8.|8|✦ 9 B :B:|. 8| 8.BB.8 BbT. d
                BB .8. .l6? : |B.8Y Bo| |!8 .b ..|: B. B8 | ! |:B.B B.: :|8:.
                :":W 8 |:B ., b9B✦ ,.8 B!. | .:B o |.^:F f8|B88 :"'i .o = '.
                B8!. B✲B|:| .": ,8 | 88 R.|" f 8 8.: u | : 89b^ 8B..!!8
                f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f .8P8 9' ' .! 88
                8 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf☆| 8 .8T:!|B f
                :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 ! 8!8:^
                8B 9,: 8 |BT. :o- 8 f |:o||b☮ 8☆ 8 8|8B8: |. !.98 R 8!B ' :|'B
                :. 8|!o |.!6 8 8 .' 8| i.|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B: P88:d.^
                : ..B|.?: :☮ ! B :| ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 !
                BBB_8.i' 88 =FB BP8.:.:B | B !BB... :o8!. .| B" 9 i 8.88.8:8
                F.|8:B8..B!. B8 B8. B f.: | 8 88: .?|Y8|Pb:| 8 .. . !! :8 Ba
                ;:|B8 8. 8BB6 .☮☮ B,: :8!!B: |bB ✦.B|i9. 8!8 8i.:| B 8 B8 ||
                |.8. ^ ..8.B B 9 888:8 B .8^: B9.| . | |!888 u.,:. . 9|8 , 6:Y
                ..|✲.:: 8|8 . ..B 8! B ?: ;|R .u8 ! 88 88: ..::B.' |8BF || BY
                R!B!!| ::" Y:.o-.: 886 8☮B.. 8B .8. ":. |8.☮"f . ! V .:88
                .9.|!.| ☮!B ..Bo9: 8☮8 o 9T|BB6B|uBT:F|.8BF . f .8P8 9' ' .!
                88 8 8.| . F ! 8 f :☮B?:b |. 8 .
              </div>
            </>
          )}
        </div>
      </div>
      <div className={s.loader__container}></div>
    </>
  )
}
