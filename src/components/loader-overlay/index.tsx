import React, { forwardRef, memo, useMemo } from 'react'

import { ASCII_ART } from '../loader/constants'
import s from './loader-overlay.module.css'

const LoaderOverlay = forwardRef<
  HTMLDivElement,
  {
    asciiColor: string
    backgroundColor: string
    isMobileDevice: boolean | undefined
  }
>((props, ref) => {
  const { asciiColor, backgroundColor } = props

  const processAsciiArt = (art: string) => {
    // Remove empty lines and normalize whitespace
    return art
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => line.replace(/\s+$/, ''))
      .join('\n')
  }

  const optimizedAsciiArt = useMemo(() => processAsciiArt(ASCII_ART), [])

  const renderAsciiArt = (art: string, isOverlay: boolean) => {
    const className = `${s.ascii_line}${isOverlay ? '__overlay' : ''}`

    return art.split('\n').map((line, index) => (
      <div key={index} className={className} aria-hidden="true">
        {line}
      </div>
    ))
  }

  const AsciiArtDisplay = memo(
    ({ art, isOverlay }: { art: string; isOverlay: boolean }) => {
      const containerClass = isOverlay
        ? s.ascii__container__overlay
        : s.ascii__container

      return (
        <pre className={containerClass}>{renderAsciiArt(art, isOverlay)}</pre>
      )
    }
  )

  return (
    <div className={s.container__overlay} ref={ref}>
      {asciiColor && (
        <div
          className={s.ascii__container__overlay}
          style={{ color: asciiColor }}
        >
          <AsciiArtDisplay art={optimizedAsciiArt} isOverlay={true} />
        </div>
      )}
      <div
        className={s.text__container__overlay}
        style={{ color: backgroundColor }}
      >
        <div className={s.text__overlay}>
          B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!: :T8:: 8 !B:8.B |
          . B:|: :.|B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8 ;88:|9; B'8ii ^ :b ,
          :F. B8.lB :8.!. : 8.B... |☆:8 .: . |..| 8|. 8 : 8.B . ^.|,Y:8B:. B! 8
          :R ..: B8|9 8| B !..!8'BBB 9B| m 8.| T.!f8|: 88^ ?:.! :||P8 b8 .V
          TB|88W8 P8 | b. . . |88 : B.8.|Y6 8.:8.:B 8 |. B o:B .b B 8B|
          ||fB:'B:6:8T ✲B8|. ' | 8.8 B 8 8|:T. |B8 f.| 88: B8 B88B":!|d:|b8 | .
          |:. !YP8 . 8 B ?:YB.:B888 888^ |Bo |||B8: :|B P. ':|8i: ||.8|: oR| .B
          "B:B : B89:|. . |B .8 8b:| | 9.8B... 8^| !|: b6 F T? ,."|T : F i9 B|.:
          B|:||✦ B. .B B: .BB|B9 ' B.F8 8 |98. |..: .?8|b8bB..B ||P! .8.Y !
          ...B8ou.| |!f|P .. 8 .8! :. ^.f. ✲8:: ,|: 8 .|88 B8:.8 . ^: 8 B:!B.; 8
          B !^ . !T!T| |:8 '8:.BY. 'uTi:B8 |B?89:! PB8:8o|F;:| 8:8|bR| 8 o.!.! u
          :8 .9B |8" 6 :. 8 | | B 8 . :88.B.8.B8 B| : | .8 || 8 ..:.TPT 8 !.: TB
          8B8 8T B : 88#bd . . .:B : . :.:8 . ..68;8| :: 8 9| | .. 8 |:8|B |
          .^BB8 ':8B8 8u R . B. :|B 8:B ..B 88!8 B;:.|88 ||B 8 B . !. :.B |
          .:8!|^ 9|: :8BB| :8?of. 8T98||.8 |P"i B|88.!|8:8. '. |Y| 8!B8.. .:f|8B
          :,: :b Y o|| .- bB '. 8|..R8#8 .8 8|! B :. : B8B8:B| | B✦.|8?? W B8B.
          :! |B .TB8B 8: |✲B .8 ! m| :; .- _.: ^8.B8 B. !. ^B :BB! B 8 B8
          _|9B:f8B ,Bf88. B8 . . ! o|.. |. B |'B.!6!|B||: BB !9 BY-|8. . 8b:886:
          . :.. 8 6.8 : | 8|. :: a . 8 PB.!o8.8 | B8 B i |Bt:| :: . : :|..|8.
          fYB |8B 8::. ✦F8 B 8| | !8.F .P..BR8| B|P :B . B:?: : a^ :B | :.. |B
          :B "| !.| RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o T8|.8 B8:i8 .|.8
          |.! ^:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8|| ,i||.!B: 8: |8i
          :88 8 B.88| : " . B! . .889oi6!.:.BB|B 8'B "B|8 |. !8!!| .RB 88 "B!8 .
          .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? : |B.8Y Bo| |!8 .b
          ..|: B. B8 | ✲! |:B.B B.: :|8:. :":W 8 |:B ., b9B ,.8 B!. | .:B o
          |.^:F f8|B88 :"'i .o = '. B8!. BB|:| .": ,8 | 88✦ R.|" f 8 8.: u | :
          89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f .8P8 9'
          ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .✲. o:Bf .b 8:8
          .|8,.☆!. f! B||| | ..|.od !bT .|:|| B ! ;.9F |^ .| i |: B| 8 .8T:!|B f
          :B8 . .8B |T8:B: 8B | f ; .|:. T 8; B|8|Y:|.| V. 88 !8 ! 8!8:^ 8B 9,:
          8 |BT. :o- 8 f |:o||b 8 8 8|8B8: |. !.98 R 8!B ' :|'B :. 8|!o |.!6 8 8
          .' 8| i.|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B: P88:d.^ : ..B|.?: : !✲ B✦ :|
          ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 ! BBB_8.i' 88 =FB BP8.:.:B | B
          !BB... :o8!. .| B" 9 i 8.88.8:8 F.|8:B8..B!. B8 B8. B f.: | 8 88:
          .?|Y8|Pb:| 8 .. . !! :8 Ba ;:|B8 8. 8BB6 . B,: :8!!B: |bB .B|i9. 8!8
          8i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B .8^: B9.| . | |!888 u.,:. .
          9|8 , 6:Y ..|.:: 8|8 . ..B 8! B ?: ;|R .u8 ! 88 88: ..::B.' |8BF || BY
          R!B!!| ::" Y:.o-.: 886 8B.. 8B .8. ":. |8."f . ! V .:88 .9.|!.| !B
          ..Bo9: 88 o 9T|BB6B|uBT:F|.8BF . f .8P8 9' ' .! 88 8 8.| . F ! 8 f
          :B?:b |. 8 .
        </div>

        <div className={s.text__overlay}>
          B... b | ..oB| :8 .8B8| To|✲ f P..:. .:B. BB:6'.!8_!: :T8:: 8 !B:8.B |
          . B:|: :.|B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8 ;88:|9; B'8ii ^ :b ,
          :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|. 8 : 8.B . ^.|,Y:8B:. B! 8
          :R ..: B8|9 8| B !..!8'BBB 9B| m 8.| T.!f8|: 88^ ?:.! :||P8 b8 .V
          TB|88W8 P8 | b. . ✦. |88 : B.8.|Y6 8.:8.:✲B 8 |.☮ B o:B .b B 8B|
          ||fB:'B:6:8T B✦8|. ' | 8.8 B 8 8|:T. |B8 f.| 88: B8 B88B":!|d:|b8 | .
          |:. !YP8 . 8 B ?:YB.:B8☆88 888^ |Bo |||B8: :|B P. ':|8i: ||.8|: oR| .B
          "B:B : B89:|. . |B . 8b:| | 9.8B... 8^| !|: b6 F T? ,."|T : F i9 B|.:
          B|:|☮|R B. .B B: .BB|B9 ' B.F8 8 |98. |..: .?8|b8bB..B ||P! .8.Y !
          ...B8ou.✲| |!f|P .. 8 .8! :. ^.f. 8:: ,|: 8 .|88 B8:.8 . ^: 8 B:!B.; 8
          B !^ . !T!T| |:8 '8:.BY. 'uTi:B8 |B?89:! PB8:8o|F;:| 8:8|bR| 8 o.!.! u
          :8 .9B |8" 6 :. 8 | ✲| B 8 . :88.B.8.B8 B| : | .8 || 8 ..:.TPT 8 !.:
          TB 8B8 8T B : 88#bd . . .:B : . :.:8 . ..68;8| :: 8 9| | .. 8 |:8|B |
          .^BB8 ':8B8 8u R . B.☆:|B 8:B ..B 88!8 B;:.|88 ||B 8 B . !. :.B |
          .:8!|^ 9|: :8BB| :8?of. 8T98||.8 |P"i B|88.!|8:8. '. |Y| 8!B8.. .:f|8B
          :,: :b Y o|| .- bB '. 8|..R8#8 .8 8|! B :. : B8B8:B| | B.|8?? W B8B.
          :! |☮B .TB8B 8: |B .8 ! m| :; .- _.: ^8.B8 B. !. ^B :BB! B 8 B8
          _|9B:f8B ,Bf88. B8 . . ! o|.. |. B |'B.!6!|B||: BB !9 BY-|8. . 8b:886:
          . :.. 8 6.8 : | 8|. :: a . 8 PB.!o8.8 | B8 B i |Bt:| :: . : :|..|8.
          fYB |8B 8::. F8 B 8| | !8.F .P..BR8| B|P :B . B:?: : a^ :B | :.. |B :B
          "| !.| RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o T8|.8 B8:i8 .|.8 |.!
          ^:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8|| ,i||.!B: 8: |8i :88 8
          B.88| : " . B! . .889oi6!.:.BB|B 8✲'B "B|8 |. !8!!| .RB 88 "B!8 .
          .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8.✦ .l6? : |B.8Y Bo| |!8 .b
          .☆.|: B. B8 | ! |:B.B B☮.: :|8:. :":W 8 |:B ., b9B☮ ,.8 B!. | .:B o
          |.^:F f8|B88 :"'i .o = '. B8!. BB|:| .": ,8 | 88 R.|" f 8 8.: u | :
          89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B. .8.|F . f .8P8 9'
          ' .! 88 8 8.| . F ! 8 f :B?:b |. 8 . .B 8: B68 : .. o:Bf .b 8:8
          .|☮8,. !. f! B||| | ..|.od !bT .|:|| B ! ;.9F |^ .| i |: B| 8 .8T:!|B
          f :B8 . .8B |T8:B: 8B | ☮f ; .|:. T 8; B|8|Y:|.| V. 88 !8 ! 8!8:^ 8B
          9,: 8 |BT. :o- 8 f |:o||b 8 8 8|8B8: |. !.98 R 8!B ' :|'B :. 8|!o |.!6
          8 8 .' 8| i.|8 #. 'B:P!'.8 ✦Tb8B8.8 BB..8.B: P88:d.^ : ..B|.?: : ! B
          :| ||.a.|. B|. |o8? . 9 :.o|. 8;B. |B8 ! BBB_8.i' 88 =FB BP8.:.:B | B
          !BB... :o8!. .| B" 9 i 8.88.8:8 F.|8:B8..B!. B8 B8☮. B f.: | 8 88:✦
          .?|Y8|Pb:| 8 .. . !! :8 Ba ;:|B8 8. 8BB6 ☆. B,: :8!!B: |bB .B|i9. 8!8
          8✲i.:| B 8 B8 || |.8. ^ ..8.B B 9 888:8 B .8^: B9.| . | |!888 u.,:. .
          9|8 , 6:Y ..|.:: 8|8 . ..B 8! B ?: ;|R .u8 ! 88 88: ..::B.' |8BF || BY
          R!B!!| ✦::" Y:.o-.: 886 8B.. 8B .8. ":. |8."f . ! V .:88 .9.|!.| !B
          ..Bo9: 88 o 9T|BB6B|uBT:F|.8BF . f .8P8 9' ' .! 88 8 8.| . F ! 8 f
          :B?:b |. 8 .
        </div>
        <div className={s.text__overlay}>
          B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!:☮ :T8:: 8 !B:8.B
          | . B:|: :.|B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8 ;88:|9; B'8ii ^ :b ,
          :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|. 8 : 8.B . ^.|,Y:8B:. B! 8
          :R ..: B8|9 8| B !✲..!8'BBB 9 ✦B| m 8.| T.!f8|: 88^ ?:.✦! :||P8 b8 .V
          T☮B|☆88W8 P8 | b. . . |88 : B.8.|Y☮6 8.:8.:B 8 |. B o:B .b B 8B|
          ||fB:'B:6:8T B✦8|. ' | 8.8 B 8 8|:T. |B8 f ✦.| 88: B8 B88B":!|d:|b8 |
          . |:. !YP8✲ . 8 B ?:YB.:B8☆88 888^ |Bo |||B8: :|B P. ':|☮8i: ||.8|:
          oR| .B "B:B : B☮89:|. . |B .8 8b:| | 9.8B... 8^| !|: b6 F T? ,."✦|T :
          F i9 B|.: B|:||R B. .B B: .BB|B9 ' B.F8 8 |98. |..: .?8|b8bB..B ||P!
          .8.Y ! ...B8ou.|☆|!f|P .. 8 .8! :. ^.f. 8:: ,|: 8 .|88 B8:.8 . ^: 8
          B:!B.; 8 B !^ . !T!T| |:8 '8:.BY. 'uTi:B8 |B?89:! PB8:8o|F;:| 8:8|bR|
          8 o.!.! u :8 .9B |8"☮ 6 :. 8 | | B 8 . :88.B.8.B8 B| : | .8 || 8
          ..:.TPT 8 !.: TB 8B8 8T B : 88#bd . . .:B : . :.:8 . ..68;8| :: 8 9| |
          ✲.. 8 |:8|B | .^BB8 ':8B8 8u R . B. :|B 8:B ..B 88!8 B;:.|88 ||B 8 B .
          !. :.B | .:8!|^ 9|: :8BB| :8?of. 8T98||.8 |P"i B|88.!|8:8. '. |Y|
          8!B8.. .:f|8B :,: :b Y o|| .- bB '. 8|..R8#8 .8 8|! B :. : B8B8:B| |
          B.|8?? W B8B. :! |B .TB8B 8: |B .8 ! m| :;☮ .- _.: ^8.B8 B. !. ^B
          :BB! B 8 B8 _|9B:f8B ,Bf88. B8 . . ! o|.. |. B |'B.!6!|B||: BB !9
          BY-|8.☮ . 8b:886: . :☮.. 8 6.8 : | 8|. :: a . 8☮ PB.!o8.8 | B8 B i
          |Bt:| :: . : :|..|8. fYB |8B 8::. F8 B 8| | !8.F .P..BR8| B|✦P :B .
          B:?: : a^ :B | ✲:.. |B :B "| !.| RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^|
          8:| .o T8|.8 B8:i8 .|.8 |.! ^☮:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..:
          :| : .8|| ,i||.!B: 8: |8i :88 8 B.88| : " . B! . .889oi6!.:.BB|B 8'B
          "B|8 |. !8!!| .RB 88 "B!8 . .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8.
          .l6? : |B.8Y Bo| |!8 .b ..|: B. B8 | ! |:B.B B.: :|8:. :":W 8 |:B .,☆
          b9B ,.8 B!. | .:B o |.^:F f8|✲B88 :"'i .o = '. ☮B8!. BB|:| .": ,8 |
          88 R.|" f☮ 8 8.: u | : 89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:|
          .B.!|B. .8.|F . f .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. ✲8 .☆.B 8:
          B68 : .. o:Bf .b 8:8 .|8,. !. f! B||| | ..|.od !bT .|:|| B ! ;.9F |^
          .☆| i |: B| 8 .8T:!|B f :B8 .✦ .8B |T8:B: 8B | ☮f ; .|:. T 8;
          B|8|Y:|.| V. 88 !8 ! 8!8:^ 8B 9,: 8 |✲BT. :o- 8 f |:o||b 8 8 8|8B8: |.
          !.98 R 8!B ' :|'B :. 8|!o |.!6 8 8 .' 8| ☮i.☆|8 #. 'B:P!'.8 Tb8B8.8
          BB..8.B: P88:d.^ : ..B✦|.?: : ! B :| ||.a.☮|. B|. |o8? . 9 :.o|.
          ✦8;B. |B8 ! BBB_8.i' 88 =FB BP8.:.:B | B !BB... :o8!. .| B" 9 i
          8.88.8:8 F.|8:B8..B!. ☮B8 B8. B f.: | 8 88: .?|Y8|Pb:| 8 .. . !! :8
          Ba ;:|B8 8. 8BB6 . B,: :8!!B: |bB .B|i9. 8!8 8i.:| B 8 B8 || |.8. ^
          ..8.B B 9 888:8 B .8^: B9.| ✦ . | |!888 u.,:. . 9|8 , ☆6:Y ..|.✲:: 8|8
          . ..B 8! B ?: ;|R .u8 ! 88 88: ..::B.' |8BF || BY R!B!!| ::" Y:.o-☮.:
          886 8B.. 8B .8.☮ ":. |8."f . ! V .:88 .9.|!.| !B ..Bo9: 88 o
          9T|BB6B|uBT:F|.8BF . f .8P8 9' ' ✦ .! 88 8 8.| . F ! 8 f :B?:☮b |. 8
          .
        </div>
        <div className={s.text__overlay}>
          B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!:☮ :T8:: 8 !B:8.B
          | . B:|: :.|B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8 ;88:|9; B'8ii ^ :b ,
          :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|. 8 : 8.B . ^.|,Y:8B:. B! 8
          :R ..: B8|9 8| B !✲..!8'BBB 9 ✦B| m 8.| T.!f8|: 88^ ?:.✦! :||P8 b8 .V
          T☮B|☆88W8 P8 | b. . . |88 : B.8.|Y☮6 8.:8.:B 8 |. B o:B .b B 8B|
          ||fB:'B:6:8T B✦8|. ' | 8.8 B 8 8|:T. |B8 f.| 88: B8 B88B":!|d:|b8 | .
          |:. !YP8✲ . 8 B ?:YB.:B888 888^ |Bo |||B8: :|B P. ':|8i: ||.8|: oR| .B
          "B:B : B☮89:|. . |B .8 8b:| | 9.8B... 8^| !|: b6 F T? ,."✦|T : F i9
          B|.: B|:||R B. .B B: .BB|B9 ' B.F8 8 |98. |..: .?8|b8bB..B ||P! .8.Y !
          ...B8ou.✲| |!f|P .. 8 .8! :. ^.f. 8:: ,|: 8 .|88 B8:.8 . ^: 8 B:!B.; 8
          B !^ . !T!T| |:8 '8:.BY. 'uTi:B8 |B?89:! P☮B8:8o|F;:| 8:8|bR| 8 o.!.!
          u :8 .9B |8"☮ 6 :. 8 | | B 8 . :88.B.8.B8 B| : | .8 || 8 ..:.TPT 8
          !.: TB 8B8 8T B : 88#bd . . .:B : . :.:8 . ..68;8| :: 8 9| | ✲.. 8
          |:8|B | .^BB8 ':8B8 8u R . B. :|B 8:B ..B 88!8 B;:.|88 ||B 8 B . !.
          :.B | .:8!|^ 9|: :8BB| :8?of. 8T98||.8 |P"i B|88.!|8:8. '. |Y| 8!B8..
          .:f|8B :,: :b Y o|| .- bB '. 8|..R8#8 .8 8|! B :. : B8B8:B| | B.|8?? W
          B8B. :! |B .TB8B 8: |B .8 ! m| :;☮ .- _.: ^8.B8 B. !. ^B :BB! B 8 B8
          _|9B:f8B ,Bf88. B8 . . ! o|.. |. B |'B.!6!|B||: BB !9 BY-|8.☮ .
          8b:886: . :.. 8 6.8 : | 8|. :: a . 8☮ PB.!o8.8 | B8 B i |Bt:| :: . :
          :|..|8. fYB |8B 8::. F8 B 8| | !8.F .P..BR8| B|✦P :B . B:?: : a^ :B |
          ✲:.. |B :B "| !.| RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o T8|.8
          B8:i8 .|.8 |.! ^☮:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8||
          ,i||.!B: 8: |8i :88 8 B.88| : " . B! . .889oi6!.:.BB|B 8'B "B|8 |.
          !8!!| .RB 88 "B!8 . .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? :
          |B.8Y Bo| |!8 .b ..|: B. B8 | ! |:B.B B.: :|8:. :":W 8 |:B .,☆ b9B ,.8
          B!. | .:B o |.^:F f8|✲B88 :"'i .o = '. ☮B8!. BB|:| .": ,8 | 88 R.|"
          f☮ 8 8.: u | : 89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B.
          .8.|F . f .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. ✲8 .☆.B 8: B68 : ..
          o:Bf .b 8:8 .|8,. !. f! B||| | ..|.od !bT .|:|| B ! ;.9F |^ .☆| i |:
          B| 8 .8T:!|B f :B8 .✦ .8B |T8:B: 8B | ☮f ; .|:. T 8; B|8|Y:|.| V. 88
          !8 ! 8!8:^ 8B 9,: 8 |✲BT. :o- 8 f |:o||b 8 8 8|8B8: |. !.98 R 8!B '
          :|'B :. 8|!o |.!6 8 8 .' 8| ☮i.☆|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B:
          P88:d.^ : ..B✦|.?: : ! B :| ||.a.☮|. B|. |o8? . 9 :.o|. ✦8;B. |B8 !
          BBB_8.i' 88 =FB BP8.:.:B | B !BB... :o8!. .| B" 9 i 8.88.8:8
          F.|8:B8..B!. ☮B8 B8. B f.: | 8 88: .?|Y8|Pb:| 8 .. . !! :8 Ba ;:|B8
          8. 8BB6 . B,: :8!!B: |bB .B|i9. 8!8 8i.:| B 8 B8 || |.8. ^ ..8.B B 9
          888:8 B .8^: B9.| . | |!888✲ u.,:. . 9|8 , ☆6:Y ..|.✲:: 8|8 . ..B 8! B
          ?: ;|R .u8 ! 88 88: ..::B.' |8BF || BY R!B!!| ::" Y:.o-☮.: 886 8B..
          8B .8.☮ ":. |8."f . ! V .:88 .9.|!.| !B ..Bo9: 88 o
          9T|BB6B|uBT:F|.8BF . f .8P8 9' ' ✦ .! 88 8 8.| . F ! 8 f :B?:☮b |. 8
          .
        </div>
        <div className={s.text__overlay}>
          B... b | ..oB| :8 .8B8| To| f P..:. .:B. BB:6'.!8_!:☮ :T8:: 8 !B:8.B
          | . B:|: :.|B!8!8"!! B! B.8 " .988| ^ P^B.:: : :8 ;88:|9; B'8ii ^ :b ,
          :F. B8.lB :8.!. : 8.B... | :8 .: . |..| 8|. 8 : 8.B . ^.|,Y:8B:. B! 8
          :R ..: B8|9 8| B !✲..!8'BBB 9 ✦B| m 8.| T.!f8|: 88^ ?:.✦! :||P8 b8 .V
          T☮B|☆88W8 P8 | b. . . |88 : B.8.|Y☮6 8.:8.:B 8 |. B o:B .b B 8B|
          ||fB:'B:6:8T B✦8|. ' | 8.8 B 8 8|:T. |B8 f.| 88: B8 B88B":!|d:|b8 | .
          |:. !YP8✲ . 8 B ?:YB.:B888 888^ |Bo |||B8: :|B P. ':|8i: ||.8|: oR| .B
          "B:B : B☮89:|. . |B .8 8b:| | 9.8B... 8^| !|: b6 F T? ,."✦|T : F i9
          B|.: B|:||R B. .B B: .BB|B9 ' B.F8 8 |98. |..: .?8|b8bB..B ||P! .8.Y !
          ...B8ou.✲| |!f|P .. 8 .8! :. ^.f. 8:: ,|: 8 .|88 B8:.8 . ^: 8 B:!B.; 8
          B !^ . !T!T| |:8 '8:.BY. 'uTi:B8 |B?89:! P☮B8:8o|F;:| 8:8|bR| 8 o.!.!
          u :8 .9B |8"☮ 6 :. 8 | | B 8 . :88.B.8.B8 B| : | .8 || 8 ..:.TPT 8
          !.: TB 8B8 8T B : 88#bd . . .:B : . :.:8 . ..68;8| :: 8 9| | ✲.. 8
          |:8|B | .^BB8 ':8B8 8u R . B. :|B 8:B ..B 88!8 B;:.|88 ||B 8 B . !.
          :.B | .:8!|^ 9|: :8BB| :8?of. 8T98||.8 |P"i B|88.!|8:8. '. |Y| 8!B8..
          .:f|8B :,: :b Y o|| .- bB '. 8|..R8#8 .8 8|! B :. : B8B8:B| | B.|8?? W
          B8B. :! |B .TB8B 8: |B .8 ! m| :;☮ .- _.: ^8.B8 B. !. ^B :BB! B 8 B8
          _|9B:f8B ,Bf88. B8 . . ! o|.. |. B |'B.!6!|B||: BB !9 BY-|8.☮ .
          8b:886: . :.. 8 6.8 : | 8|. :: a . 8☮ PB.!o8.8 | B8 B i |Bt:| :: . :
          :|..|8. fYB |8B 8::. F8 B 8| | !8.F .P..BR8| B|✦P :B . B:?: : a^ :B |
          ✲:.. |B :B "| !.| RB.::?8.:8.|BPB BB .8 9..:.8 ' | ^| 8:| .o T8|.8
          B8:i8 .|.8 |.! ^☮:;.|8 o8 8,iR! .:: : .: . 8 .88 BB..: :| : .8||
          ,i||.!B: 8: |8i :88 8 B.88| : " . B! . .889oi6!.:.BB|B 8'B "B|8 |.
          !8!!| .RB 88 "B!8 . .8|8.|8| 9 B :B:|. 8| 8.BB.8 BbT. d BB .8. .l6? :
          |B.8Y Bo| |!8 .b ..|: B. B8 | ! |:B.B B.: :|8:. :":W 8 |:B .,☆ b9B ,.8
          B!. | .:B o |.^:F f8|✲B88 :"'i .o = '. ☮B8!. BB|:| .": ,8 | 88 R.|"
          f☮ 8 8.: u | : 89b^ 8B..!!8 f."9|F.B.P8. 8...BB8B.|!8 '!:| .B.!|B.
          .8.|F . f .8P8 9' ' .! 88 8 8.| . F ! 8 f :B?:b |. ✲8 .☆.B 8: B68 : ..
          o:Bf .b 8:8 .|8,. !. f! B||| | ..|.od !bT .|:|| B ! ;.9F |^ .☆| i |:
          B| 8 .8T:!|B f :B8 .✦ .8B |T8:B: 8B | ☮f ; .|:. T 8; B|8|Y:|.| V. 88
          !8 ! 8!8:^ 8B 9,: 8 |✲BT. :o- 8 f |:o||b 8 8 8|8B8: |. !.98 R 8!B '
          :|'B :. 8|!o |.!6 8 8 .' 8| ☮i.☆|8 #. 'B:P!'.8 Tb8B8.8 BB..8.B:
          P88:d.^ : ..B✦|.?: : ! B :| ||.a.☮|. B|. |o8? . 9 :.o|. ✦8;B. |B8 !
          BBB_8.i' 88 =FB BP8.:.:B | B !BB... :o8!. .| B" 9 i 8.88.8:8
          F.|8:B8..B!. ☮B8 B8. B f.: | 8 88: .?|Y8|Pb:| 8 .. . !! :8 Ba ;:|B8
          8. 8BB6 . B,: :8!!B: |bB .B|i9. 8!8 8i.:| B 8 B8 || |.8. ^ ..8.B B 9
          888:8 B .8^: B9.| . | |!888✲ u.,:. . 9|8 , ☆6:Y ..|.✲:: 8|8 . ..B 8! B
          ?: ;|R .u8 ! 88 88: ..::B.' |8BF || BY R!B!!| ::" Y:.o-☮.: 886 8B..
          8B .8.☮ ":. |8."f . ! V .:88 .9.|!.| !B ..Bo9: 88 o
          9T|BB6B|uBT:F|.8BF . f .8P8 9' ' ✦ .! 88 8 8.| . F ! 8 f :B?:☮b |. 8
          .
        </div>
      </div>
    </div>
  )
})

export default LoaderOverlay
