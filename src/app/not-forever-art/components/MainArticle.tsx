import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import React, { useRef } from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'

SyntaxHighlighter.registerLanguage('javascript', js)

import { nnfxDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import { gsap } from '~/lib/gsap'

// Import images
import bebeto from '../../images/not-forever-art/bebeto.jpg'
import diagram from '../../images/not-forever-art/diagram.jpg'
import mbcbftw from '../../images/not-forever-art/mbcbftw-netscape.png'
import playingCardsInTheSand from '../../images/not-forever-art/netart-post.jpg'
import standingOnTheBeach from '../../images/not-forever-art/netart-post-2.jpg'
import women from '../../images/not-forever-art/netart-post-3.jpg'
import abrilaboca from '../../images/not-forever-art/screenshots/abrilavoka.jpg'
import colorea from '../../images/not-forever-art/screenshots/coloreaunpolitico.jpg'
import elviaje from '../../images/not-forever-art/screenshots/elviajedezarandraca.jpg'
import holadiego from '../../images/not-forever-art/screenshots/holadiegomaradona.jpg'
// Import styles
import s from '../page.module.css'
// Import components
import Paragraph from './Paragraph'
import PhotoSection from './PhotoSection'

gsap.registerPlugin(ScrollTrigger)

const MainArticle = () => {
  const playingCardsInTheSandPhotoRef = useRef<HTMLDivElement>(null)
  const standingOnTheBeachPhotoRef = useRef<HTMLDivElement>(null)
  const womenPhotoRef = useRef<HTMLDivElement>(null)

  const paragraph1TitleRef = useRef<HTMLHeadingElement>(null)
  const paragraph1ContentRef = useRef<HTMLDivElement>(null)
  const paragraph1ImageRef = useRef<HTMLDivElement>(null)

  const paragraph2ContentRef = useRef<HTMLDivElement>(null)
  const paragraph2DescriptionItem1Ref = useRef<HTMLLIElement>(null)
  const paragraph2DescriptionItem2Ref = useRef<HTMLLIElement>(null)

  // ... rest of the code remains the same
  const paragraph3TitleRef = useRef<HTMLDivElement>(null)
  const paragraph3ContentRef = useRef<HTMLDivElement>(null)

  const paragraph5Item1Ref = useRef<HTMLDivElement>(null)
  const paragraph5Item2Ref = useRef<HTMLDivElement>(null)
  const paragraph5Item3Ref = useRef<HTMLDivElement>(null)
  const paragraph5Ref = useRef<HTMLDivElement>(null)

  const paragraph9Ref = useRef<HTMLDivElement>(null)
  const paragraph9Item1Ref = useRef<HTMLDivElement>(null)
  const paragraph9Item2Ref = useRef<HTMLDivElement>(null)
  const paragraph9Item3Ref = useRef<HTMLDivElement>(null)

  const paragraph10ContentRef = useRef<HTMLDivElement>(null)
  const paragraph10Title2Ref = useRef<HTMLHeadingElement>(null)

  const paragraph13ContentRef = useRef<HTMLDivElement>(null)
  const paragraph13TitleRef = useRef<HTMLHeadingElement>(null)

  const mm = gsap.matchMedia()

  useGSAP(() => {
    mm.add(
      {
        isMobileAndTablet: '(max-width: 1100px)',
        // if is min width is 500px and max width is 1000px
        isDesktop: '(min-width: 500px) and (max-width: 1500px)',
        isLargeScreen: '(min-width: 1500px)'
      },
      (context) => {
        const conditions = context.conditions as {
          isMobileAndTablet: boolean
          isDesktop: boolean
          isLargeScreen: boolean
        }
        const { isMobileAndTablet } = conditions

        if (
          !playingCardsInTheSandPhotoRef.current ||
          !standingOnTheBeachPhotoRef.current ||
          !womenPhotoRef.current ||
          !paragraph1TitleRef.current ||
          !paragraph1ContentRef.current ||
          !paragraph1ImageRef.current ||
          !paragraph2ContentRef.current ||
          !paragraph2DescriptionItem1Ref.current ||
          !paragraph2DescriptionItem2Ref.current ||
          !paragraph3TitleRef.current ||
          !paragraph3ContentRef.current ||
          !paragraph5Item1Ref.current ||
          !paragraph5Item2Ref.current ||
          !paragraph5Item3Ref.current ||
          !paragraph5Ref.current ||
          !paragraph9Ref.current ||
          !paragraph9Item1Ref.current ||
          !paragraph9Item2Ref.current ||
          !paragraph9Item3Ref.current ||
          !paragraph10ContentRef.current ||
          !paragraph10Title2Ref.current ||
          !paragraph13ContentRef.current ||
          !paragraph13TitleRef.current
        ) {
          return
        }

        // Target the img tag inside netartPhotography.current
        const imgElement =
          playingCardsInTheSandPhotoRef.current.querySelector('img')
        if (imgElement) {
          gsap.fromTo(
            imgElement,
            { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
            {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              ease: 'power1.out',
              duration: 2,
              scrollTrigger: {
                trigger: playingCardsInTheSandPhotoRef.current,
                start: 'center bottom',
                end: 'bottom top',
                toggleActions: 'play none none none'
                // markers: true
              }
              // onComplete: () => {
              //   gsap.set(playingCardsInTheSandPhotoRef.current, {
              //     background: 'transparent'
              //   })
              // }
            }
          )
        }
        const imgElement2 =
          standingOnTheBeachPhotoRef?.current?.querySelector('img')
        if (imgElement2) {
          gsap.fromTo(
            imgElement2,
            { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
            {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              ease: 'power1.out',
              duration: 2,
              scrollTrigger: {
                trigger: standingOnTheBeachPhotoRef.current,
                start: 'top -40%',
                end: 'bottom top',
                toggleActions: 'play none none none'
                // markers: true

                // scrub: 3
              }
              // onComplete: () => {
              //   gsap.set(standingOnTheBeachPhotoRef.current, {
              //     background: 'transparent'
              //   })
              // }
            }
          )
        }

        const imgElement3 = womenPhotoRef?.current?.querySelector('img')
        if (imgElement3) {
          gsap.fromTo(
            imgElement3,
            { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
            {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              ease: 'power1.out',
              duration: 2,
              scrollTrigger: {
                trigger: womenPhotoRef.current,
                start: 'top -80%',
                end: 'bottom top',
                toggleActions: 'play none none none'
                // markers: true
                // scrub: 3
              }
              // onComplete: () => {
              //   gsap.set(womenPhotoRef.current, {
              //     background: 'transparent'
              //   })
              // }
            }
          )
        }

        // Paragraph 1 animations

        // Set the same end value for all three elements

        // Paragraph title animation
        if (!isMobileAndTablet) {
          gsap.from(paragraph1TitleRef.current, {
            scrollTrigger: {
              trigger: paragraph1TitleRef.current,
              start: 'top 20%',
              end: 'bottom -20%',
              pin: true,
              pinSpacing: false,
              scrub: 4
            }
          })
        }

        // Paragraph content animation

        // Paragraph image animation
        gsap.from(paragraph1ImageRef.current, {
          scrollTrigger: {
            trigger: paragraph1ImageRef.current,
            start: 'top 20%',
            end: 'bottom -20%',
            pin: true
          }
        })

        // what is net art content
        // Split the paragraph text into words and wrap each word in a span
        const item1 = paragraph2DescriptionItem1Ref.current.innerText.split(' ')
        paragraph2DescriptionItem1Ref.current.innerHTML = item1
          .map((word) => `<span class="word">${word}</span>`)
          .join(' ')

        const item2Text = paragraph2DescriptionItem2Ref.current.innerText
        const item2 = item2Text.split(' ')
        paragraph2DescriptionItem2Ref.current.innerHTML = item2
          .map((word) => `<span class="word">${word}</span>`)
          .join(' ')

        // Select all the word spans
        const item1Spans =
          paragraph2DescriptionItem1Ref.current.querySelectorAll('.word')
        const item2Spans =
          paragraph2DescriptionItem2Ref.current.querySelectorAll('.word')

        // Animate each word span
        gsap.fromTo(
          [item1Spans, item2Spans],
          { opacity: 0.1 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: paragraph2DescriptionItem2Ref.current,
              start: 'top 90%',
              end: 'bottom 20%',
              scrub: 4
              // markers: true
            }
          }
        )
        gsap.fromTo(
          paragraph2ContentRef.current,
          {
            opacity: 0.1
          },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: paragraph2ContentRef.current,
              start: 'top 50%',
              end: 'bottom 20%',
              scrub: 4
            }
          }
        )

        // creating bebeto pizza
        // Animate consonants in paragraph3TitleRef

        gsap.from(
          paragraph3ContentRef.current?.querySelectorAll('.consonant'),
          {
            scrollTrigger: {
              trigger: paragraph3ContentRef.current,
              start: 'top 100%',
              end: 'bottom 20%',
              scrub: 4
            },
            y: isMobileAndTablet ? -350 : -500
          }
        )

        // improve my project in three main apsects

        if (isMobileAndTablet) {
          gsap.from(paragraph5Item1Ref.current, {
            scrollTrigger: {
              trigger: paragraph5Ref.current,
              start: 'top 90%',
              end: 'bottom 20%',
              scrub: 4
              // markers: true
            },
            x: -100
          })
        }
        if (!isMobileAndTablet) {
          gsap.to(paragraph5Item2Ref.current, {
            scrollTrigger: {
              trigger: paragraph5Ref.current,
              start: 'top 50%',
              end: 'bottom 20%',
              scrub: 4
            },
            x: -200
          })
        } else {
          gsap.from(paragraph5Item2Ref.current, {
            scrollTrigger: {
              trigger: paragraph5Ref.current,
              start: 'top 90%',
              end: 'bottom 20%',
              scrub: 4
              // markers: true
            },
            x: 180
          })
        }

        // Migrate my static site to a bundler tool

        // Animation for the second target with increased transformation
        if (!isMobileAndTablet) {
          gsap.to(paragraph5Item3Ref.current, {
            scrollTrigger: {
              trigger: paragraph5Ref.current,
              start: 'top 50%',
              end: 'bottom 20%',
              scrub: 4
            },
            x: -400
          })
        } else {
          gsap.from(paragraph5Item3Ref.current, {
            scrollTrigger: {
              trigger: paragraph5Ref.current,
              start: 'top 90%',
              end: 'bottom 20%',
              scrub: 4
              // markers: true
            },
            x: -100
          })
        }

        // Challenges with ES Modules

        if (!isMobileAndTablet) {
          gsap.to(paragraph9Item1Ref.current, {
            scrollTrigger: {
              trigger: paragraph9Ref.current,
              start: 'top 50%',
              end: 'bottom 20%',
              scrub: 4
            },
            x: -200
          })

          gsap.from(paragraph9Item2Ref.current, {
            scrollTrigger: {
              trigger: paragraph9Ref.current,
              start: 'top 50%',
              end: 'bottom 20%',
              scrub: 4
            },
            x: 200
          })
          gsap.to(paragraph9Item3Ref.current, {
            scrollTrigger: {
              trigger: paragraph9Ref.current,
              start: 'top 50%',
              end: 'bottom 20%',
              scrub: 4
            },
            x: 200
          })
        }

        // Implementing Webpack
        gsap.from(paragraph10ContentRef.current, {
          scrollTrigger: {
            trigger: paragraph10ContentRef.current,
            endTrigger: paragraph10Title2Ref.current,
            start: 'top 10%',
            // end: 'bottom 20%',
            scrub: 4,
            // markers: true,
            pin: true,
            pinSpacing: true
          }
        })

        // Key Benefits of Webpack:

        // Conclusion
        gsap.to(paragraph13ContentRef.current, {
          scrollTrigger: {
            trigger: paragraph13ContentRef.current,
            start: 'top 50%',
            end: 'bottom 30%',
            scrub: 4,
            // markers: true,
            pin: true,
            pinSpacing: false,
            onUpdate: (self) => {
              const rotation = self.progress * 360 * 10
              gsap.set(paragraph13TitleRef.current, { rotation })
              const scale = 1 + self.progress * (isMobileAndTablet ? 0.75 : 2.5)
              gsap.set(paragraph13TitleRef.current, { scale })
            }
          },
          xPercent: 20
        })
      }
    )
  }, [])

  return (
    <article className={s.main}>
      <PhotoSection
        src={playingCardsInTheSand}
        alt="People playing cards in the sand"
        caption="Fig 1. People playing cards in the sand. Porto, 2023."
        className={s.main__photography}
        ref={playingCardsInTheSandPhotoRef}
      />
      <Paragraph className={s.paragraph__1}>
        <h2 className={s.paragraph__title} ref={paragraph1TitleRef}>
          1
        </h2>
        <div className={s.paragraph__content} ref={paragraph1ContentRef}>
          <h2>The origins:</h2>
          <p>
            It all began with{' '}
            <a
              href="https://anthology.rhizome.org/my-boyfriend-came-back-from-the-war"
              target="_blank"
              rel="noopener noreferrer"
            >
              “My Boyfriend Came Back From The War”
            </a>{' '}
            by Olia Lialina. The storytelling, visuals, and interactions crafted
            purely with images and HTML captivated me. Then came{' '}
            <a
              href="https://net-art.org/jodi"
              target="_blank"
              rel="noopener noreferrer"
            >
              JODI
            </a>
            ,{' '}
            <a
              href="https://g.co/arts/MHSwEAo34W3GMdXj8"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alexei Shulgin
            </a>
            ,{' '}
            <a
              href="https://coryarcangel.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cory Arcangel
            </a>
            , and then{' '}
            <a
              href="https://monoskop.org/Vuk_%C4%86osi%C4%87"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vuk Ćosić
            </a>
            ,{' '}
            <a
              href="https://www.instagram.com/bloatedandalone4evr1993"
              target="_blank"
              rel="noopener noreferrer"
            >
              Molly Soda
            </a>
            ,{' '}
            <a
              href="https://bengrosser.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ben Grosser
            </a>{' '}
            and then{' '}
            <a
              href="https://marielayeregui.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mariela Yeregui
            </a>
            ,{' '}
            <a
              href="https://www.gustavoromano.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gustavo Romano
            </a>
            ,{' '}
            <a
              href="https://brokenenglish.lol/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Broken English,
            </a>{' '}
            and so many others. I quickly got trapped in the net art movement.
          </p>
        </div>
        <div className={s.paragraph__image} ref={paragraph1ImageRef}>
          <Image
            src={mbcbftw}
            alt="Screenshot of the net art work 'My boyfriend came back from the war'"
          />
        </div>
        <figcaption>
          Screenshot of My Boyfriend Came Back From The War. Olia Lialina, 1996
        </figcaption>
      </Paragraph>

      <Paragraph className={s.paragraph__2}>
        <div className={s.paragraph__image}>
          <Image src={diagram} alt="Net art diagram" />
          <figcaption>
            Abe Linkoln (Rick Silva), Complex Net Art Diagram, 2003 - a response
            to MTAA's Simple Net Art Diagram (1997).
          </figcaption>
        </div>
        <div className={s.paragraph__content}>
          <h2>
            <span>But… </span>
            <br />
            <span ref={paragraph2ContentRef}>What is net art?</span>
          </h2>
          <div>
            <p>
              Juan Martín Prada, in his book "Prácticas artísticas e Internet en
              la época de las redes sociales" (2012), provides a concise
              definition of net art. He states that "net art encompasses two
              distinct categories:
            </p>
            <ul>
              <li ref={paragraph2DescriptionItem1Ref}>
                Artistic expressions that rely on the internet for their
                existence.
              </li>{' '}
              <li ref={paragraph2DescriptionItem2Ref}>
                The early web movement that opposed dominant usage patterns.
                This movement, aligned with its initial manifesto, focused on
                telematic networks and highlighted governmental and corporate
                strategies aimed at standardizing technology use and
                consumption.
              </li>
            </ul>
          </div>
          <h2>Guiding forces</h2>
          <p>
            In my early high school years (2003/2004), there was a government
            program that provided internet access at a minimal cost. Since my
            parents hadn't yet bought me a computer, I spent hours after school
            surfing the web. I believe that was when my fascination with the
            internet's potential began to take shape. While I didn't experience
            the heyday of personal web pages like Geocities, I had a period
            where my cultural consumption happened not through social media
            platforms, but through diverse and often unique web portals. These
            sites, while sharing certain design trends, still offered much more
            room for diversity compared to the repetitive templates of today's
            social media platforms.
            <br /> In a 2016 interview, Olia Lialina lamented the loss of
            personal web pages, stating, "The most important phenomena we lost
            [was] personal web pages. People don't build them and don't feel
            responsible for building the World Wide Web. That's the tragedy of
            today's Internet...we should take it very serious[ly] and [not] give
            up our 'corners of the cyberspace' to the aggregation networks of
            the future."
            <br /> In our contemporary online life, heavily mediated by a few
            centralized corporations, this concept drives my desire to build a
            more diverse and open internet. Another of Lialina's ideas that
            resonates with me is the concept of the "General Purpose User or
            Turing Complete User," a nod to Alan Turing.
            <br /> Lialina contrasts users, who control their computers, with
            people who passively experience technology. She challenges us to
            reclaim our user rights and demand better software, the ability to
            choose "none of the above," to delete our files, to recover lost
            files, to fail epically, and most fundamentally, to see the computer
            for what it is. The Turing Complete User is the opposite of an
            "invisible user"; it’s someone who can write an article in their
            email client, layout a business card in Excel, and even shave in
            front of a webcam. These users find ways to publish photos online
            without Flickr, tweet without Twitter, like without Facebook, add a
            black frame to a picture without Instagram, remove it from an
            Instagram picture, and wake up at 7 a.m. without an app. Lialina
            herself embodies this kind of user—enthusiastically using Twitter,
            but not as prescribed. She updates regularly but follows no one,
            preferring to read her friends' tweets sequentially rather than
            through a corporately defined algorithm. Turing Complete Users
            develop workarounds, consciously or not, to wrest control from the
            increasingly dominant technology-experience-person trifecta.
          </p>
        </div>
      </Paragraph>

      <Paragraph className={s.paragraph__3}>
        <h2 className={s.paragraph__title} ref={paragraph3TitleRef}>
          2
        </h2>
        <div className={s.paragraph__content}>
          <h2 ref={paragraph3ContentRef}>
            {/* 'Creating bebeto.pizza'*/}
            <div>
              <span className="consonant">C</span>
              <span className="consonant">r</span>ea
              <span className="consonant">t</span>i
              <span className="consonant">n</span>
              <span className="consonant">g</span>
              <span className="consonant"> </span>
            </div>
            <div>
              <span className="consonant">b</span>e
              <span className="consonant">b</span>e
              <span className="consonant">t</span>o.
              <span className="consonant">p</span>i
              <span className="consonant">z</span>
              <span className="consonant">z</span>a
            </div>
          </h2>
          <p>
            In 2016, while learning web development, I had the idea to create a
            website to accompany a{' '}
            <a
              href="https://youtu.be/q6FzJBzKgJg?si=SnfP_WWLy_e2tC-k"
              target="_blank"
              rel="noopener noreferrer"
            >
              music album
            </a>{' '}
            I was planning to release. I designed the site to showcase different
            aspects of the character I portrayed in my music. For this project,
            I drew inspiration not only from the early net art movement but also
            from concepts related to relational aesthetics in contemporary art
            and works like{' '}
            <a
              href="https://www.arteinformado.com/galeria/marisa-rubio/quehue-33450"
              target="_blank"
              rel="noopener noreferrer"
            >
              Quehué
            </a>{' '}
            by Marisa Rubio and exhibitions like{' '}
            <a
              href="https://www.malba.org.ar/evento/experiencia-infinita/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Experiencia Infinita
            </a>{' '}
            at the Malba Museum. My goal was to engage users by placing them in
            two states: inconvenience and constant doubt. So I built this
            website using the old boys: vanilla JavaScript, PHP, jQuery, p5.js,
            MySQL, CSS, a bunch of Ajax calls, and a couple of other libraries
            (you may be old, but are you this old?).
            <br /> Initially, I hosted it on a shared cheap hosting but later
            upgraded to a VPS to store and display user-drawn images, which
            wasn't possible on shared hosting.
            <br />
            (A VPS is like renting your own mini-computer in the cloud. Unlike
            shared hosting where you're sharing resources with many other
            websites, a VPS gives you dedicated resources and more control over
            your hosting environment, allowing for more advanced features and
            better performance).
            <br /> For the domain, I chose an elegant .pizza 🎀
          </p>
        </div>
      </Paragraph>

      {/* Image Gallery */}
      <section className={s.imageGallery}>
        {[bebeto, holadiego, abrilaboca, colorea, elviaje].map((src, index) => (
          <div
            key={index}
            className={s.paragraph__image__item}
            onMouseEnter={({ currentTarget }) => {
              gsap.to(currentTarget.querySelector('img'), {
                scale: 2,
                rotate: index % 2 === 0 ? 11 : -18
              })
            }}
            onMouseLeave={({ currentTarget }) => {
              gsap.to(currentTarget.querySelector('img'), {
                scale: 1,
                rotate: 0,
                duration: 1.5
              })
            }}
          >
            <Image src={src} alt={`bebeto.pizza webpage ${index + 1}`} />
          </div>
        ))}
        <figcaption>Screenshots of bebeto.pizza, 2018.</figcaption>
      </section>

      <Paragraph number="3" className={s.paragraph__4}>
        <h2 className={s.paragraph__title}>3</h2>
        <div className={s.paragraph__content}>
          <h2>The decision to migrate and improve</h2>
          <p>
            Maintaining a (web) net art project over the years can be
            challenging. I recommend reading{' '}
            <a
              href="https://rhizome.org/editorial/2017/may/30/preservation-by-accident-is-not-a-plan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              “Preservation by Accident is Not a Plan”
            </a>{' '}
            where Vint Cerf (Vice President and Chief Internet Evangelist for
            Google) and Dragan Espenschied (Preservation Director at Rhizome)
            discuss this topic in depth.
            <br /> I initially paid $31 monthly for my VPS, before migrating to
            a cheaper $10/month option. I also renewed my domain annually (side
            note: my .pizza domain eventually increased to $99 per year—just a
            reminder that exotic domains can become more expensive over time).
            <br /> Some people visited the site and hated it, others loved it.{' '}
            <a
              href="https://www.instagram.com/p/B4VMVqeFJcG/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
              target="_blank"
              rel="noopener noreferrer"
            >
              It was showcased in a few digital art pavilions.
            </a>{' '}
            <br />
            <br /> After years (2024), I decided it was time to improve my
            project in three main aspects:
          </p>
        </div>
      </Paragraph>

      <Paragraph className={s.paragraph__5} ref={paragraph5Ref}>
        <div className={s.paragraph__item1} ref={paragraph5Item1Ref}>
          <h2>Migrate my static site to a bundler tool:</h2>
          <p>
            To improve performance, optimize builds, and utilize modern
            development tools.
          </p>
        </div>
        <div className={s.paragraph__item2} ref={paragraph5Item2Ref}>
          <h2>Make it mobile-friendly:</h2>
          <p>
            By redesigning and adapting it to support mobile devices and small
            screens.
          </p>
        </div>
        <div className={s.paragraph__item3} ref={paragraph5Item3Ref}>
          <h2>Decrease infrastructure costs:</h2>
          <p>Leveraging the free tiers of some services.</p>
        </div>
      </Paragraph>

      <PhotoSection
        src={standingOnTheBeach}
        alt="A group of people standing on the beach"
        caption="Fig 2. A group of people standing on the beach. Porto, 2023."
        className={s.main__photography}
        wrapperClassName={s.main__photography__wrapper}
        ref={standingOnTheBeachPhotoRef}
      />

      <Paragraph number="4" className={s.paragraph__6}>
        <h2 className={s.paragraph__title}>4</h2>
        <div className={s.paragraph__content}>
          <h2>Exploring bundler tools</h2>
          <p>
            I explored various bundler tools, including Vite, Webpack, Parcel,
            and Snowpack. Initially, I decided to try Vite due to its
            popularity, as a few developers I knew had started to use it and had
            positive feedback. I was also drawn to features like instant server
            start and optimized builds, which were exactly what I was looking
            for.
          </p>
        </div>
      </Paragraph>

      <Paragraph number="5" className={s.paragraph__7}>
        <h2 className={s.paragraph__title}>5</h2>
        <div className={s.paragraph__content}>
          <h2>Migrating to Vite</h2>
          <div>
            <p>
              During the migration, I noticed that Vite requires updating script
              tags to use the type="module" attribute. This change is necessary
              for Vite to handle scripts correctly and leverage modern browser
              features.
            </p>
            <br />
            <div className={s.paragraph__code}>
              <div>
                <p>Before Migration:</p>
                <SyntaxHighlighter language="javascript" style={nnfxDark}>
                  {`<script src="main.js"></script>`}
                </SyntaxHighlighter>
              </div>
              <div>
                <p>After Migration:</p>
                <SyntaxHighlighter language="javascript" style={nnfxDark}>
                  {`<script type="module" src="main.js"></script>`}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
      </Paragraph>

      <Paragraph number="6" className={s.paragraph__8}>
        <h2 className={s.paragraph__title}>6</h2>
        <div className={s.paragraph__content}>
          <h2>Challenges with ES Modules</h2>
          <p>
            However, I encountered several challenges that made it impractical
            to convert my existing JavaScript files to ES modules:
          </p>
        </div>
      </Paragraph>

      <Paragraph className={s.paragraph__9} ref={paragraph9Ref}>
        <div className={s.paragraph__item1} ref={paragraph9Item1Ref}>
          <h2>Library Compatibility:</h2>
          <p>
            Some libraries I relied on were not designed to be used as ES
            modules, requiring significant refactoring.
          </p>
        </div>
        <div className={s.paragraph__item2} ref={paragraph9Item2Ref}>
          <h2>Complex Codebase:</h2>
          <p>
            The project consisted of multiple JavaScript files with intricate
            dependencies, tightly coupled and reliant on the global scope.
          </p>
        </div>
        <div className={s.paragraph__item3} ref={paragraph9Item3Ref}>
          <h2>Legacy Code:</h2>
          <p>
            Converting legacy code to ES modules can be time-consuming and
            error-prone.
          </p>
        </div>
      </Paragraph>

      <Paragraph number="7" className={s.paragraph__10}>
        <h2 className={s.paragraph__title}>7</h2>
        <div className={s.paragraph__content} ref={paragraph10ContentRef}>
          <h2>Implementing Webpack</h2>
          <p>
            Ultimately, I chose to implement Webpack, allowing me to use classic
            script tags without the type="module" attribute while benefiting
            from a modern build process.
          </p>
        </div>
        <h2 className={s.paragraph__title2} ref={paragraph10Title2Ref}>
          Key Benefits of Webpack:
        </h2>
        <p className={s.paragraph__content2}>
          <span>Compatibility:</span>
          <br /> Bundles existing JavaScript files and libraries without
          requiring conversion to ES modules.
        </p>
        <p className={s.paragraph__content3}>
          <span> Code Splitting:</span>
          <br /> Optimizes loading by splitting code, improving site
          performance.
        </p>
        <p className={s.paragraph__content4}>
          <span>Development Experience: </span>
          <br />
          Features like hot module replacement (HMR) enhance the development
          workflow.
        </p>
        <p className={s.paragraph__content5}>
          <span>Custom Configuration:</span>
          <br /> Flexible configuration allows tailoring the build process to
          specific needs.
        </p>
      </Paragraph>

      <Paragraph number="8" className={s.paragraph__11}>
        <h2 className={s.paragraph__title}>8</h2>
        <div className={s.paragraph__content}>
          <h2>Migrating to Webpack</h2>
          <p>
            I used this{' '}
            <a
              href="https://github.com/marcin-wosinek/webpack-multipage-example"
              target="_blank"
              rel="noopener noreferrer"
            >
              multipage Webpack template
            </a>{' '}
            from Marcin Wosinek and started following his{' '}
            <a
              href="https://how-to.dev/how-to-building-multipage-website-with-webpack-5"
              target="_blank"
              rel="noopener noreferrer"
            >
              article
            </a>
            .
            <br /> One of the challenges I faced was accessing assets in the
            build directory and managing JavaScript scripts in production.
            <br />
            These two plugins respectively helped me address these issues:
          </p>
        </div>
        <div className={s.paragraph__content2}>
          <p>
            <a
              href="https://webpack.js.org/plugins/copy-webpack-plugin/"
              target="_blank"
              rel="noopener"
            >
              Copy Webpack Plugin:
            </a>{' '}
            Copies files from the build directory to the output directory.
          </p>
        </div>
        <div className={s.paragraph__content3}>
          <p>
            <a
              href="https://github.com/jharris4/html-webpack-deploy-plugin"
              target="_blank"
              rel="noopener"
            >
              HTML Webpack Deploy Plugin:
            </a>{' '}
            Simplifies the creation of HTML files to serve the bundled
            JavaScript.
          </p>
        </div>
        <div className={s.paragraph__content4}>
          <p>Just in case, this is how my Webpack configuration files look:</p>
        </div>
        <div className={s.paragraph__content5}>
          <p>
            <a
              href="https://github.com/emilianoglucero/bebeto-pizza-webpack/blob/main/webpack.common.js"
              target="_blank"
              rel="noopener"
            >
              webpack.common.js
            </a>
            <br /> The configuration file defines the entry points, output
            paths, and plugins used in the build process.
          </p>
        </div>
        <div className={s.paragraph__content6}>
          <p>
            <a
              href="https://github.com/emilianoglucero/bebeto-pizza-webpack/blob/main/webpack.dev.js"
              target="_blank"
              rel="noopener"
            >
              webpack.dev.js
            </a>
            <br /> Plugins extend Webpack's functionality, such as copying files
            and generating HTML files.
          </p>
        </div>
        <div className={s.paragraph__content7}>
          <p>
            <a href="https://github.com/emilianoglucero/bebeto-pizza-webpack/blob/main/webpack.prod.js">
              {' '}
              webpack.prod.js{' '}
            </a>
            <br /> Loaders preprocess files before bundling, such as converting
            Sass to CSS.
          </p>
        </div>
      </Paragraph>

      <PhotoSection
        src={women}
        alt="A women getting out of a car with her purchases"
        caption="Fig 3. A women getting out of a car with her purchases. Lisbon,
              2023."
        className={s.main__photography}
        wrapperClassName={s.main__photography__wrapper}
        ref={womenPhotoRef}
      />

      <Paragraph number="9" className={s.paragraph__12}>
        <div className={s.paragraph__content}>
          <h2>Updating my project</h2>
          <p>I also made the following improvements to my project:</p>
        </div>
        <div className={s.paragraph__content2}>
          <p>
            <span>Migration from PHP to Node.js</span>
            <br /> I chose to move to Node.js because of my growing expertise
            with it over recent years. Working with JavaScript across the entire
            stack streamlines development and integrates well with modern
            frontend frameworks like React. Node.js offers advantages such as
            native JSON support, access to a rich ecosystem, and better
            compatibility with hosting platforms like Vercel or Heroku.
            <br /> To facilitate this, I created a{' '}
            <a href="https://github.com/emilianoglucero/bebeto-pizza-backend">
              new Node.js + Express backend
            </a>
            .
          </p>
        </div>
        <div className={s.paragraph__content3}>
          <p>
            <span>
              Transition from a MySQL database running with phpMyAdmin to
              MongoDB
            </span>
            <br />
            With the shift away from PHP, and considering the project's
            relatively simple database requirements, I opted for MongoDB. My
            previous work experience with non-relational databases made MongoDB
            an attractive choice. Its schema-less nature offers flexibility and
            scalability while allowing me to use JavaScript throughout the
            stack.
          </p>
        </div>
        <div className={s.paragraph__content4}>
          <p>
            <span>Migration of User-Generated Content Storage</span>
            <br />
            As Vercel doesn't provide persistent storage for uploaded files, I
            needed an alternative solution for storing user-generated drawings.
            After exploring options like Amazon S3 and Google Cloud Storage, I
            settled on Google Cloud Storage. It meets my needs and offers a free
            tier, which aligns with my project goals.
          </p>
        </div>
        <div className={s.paragraph__content5}>
          <p>
            <span>Shift from VPS to Free-Tier Hosting</span>
            <br />
            To reduce costs for this hobby project, I migrated from a VPS to a
            hosting service with a free tier. I chose Vercel due to my
            familiarity with the platform and its ability to meet the project's
            current needs.
          </p>
        </div>
        <div className={s.paragraph__content6}>
          <p>
            <span>Mobile-Friendly Redesign and Enhanced Graphics</span>
            <br />
            When I initially launched this project in 2018, mobile compatibility
            wasn't a priority. However, in 2024, it's crucial to offer a
            mobile-friendly experience. I redesigned and adapted interactive
            sections to work with mobile gestures. Additionally, I upgraded the
            graphics by migrating from A-frame to Three.js for 3D rendering and
            incorporated GSAP (GreenSock Animation Platform) for smoother
            animations.
          </p>
        </div>
        <div className={s.paragraph__content7}>
          <p>
            <span>Integration of React projects as pages</span>
            <br />
            Given my extensive experience with React, I wanted the flexibility
            to add new pages using React components. I established a process to
            configure my Webpack project to incorporate React build code,
            allowing for a gradual integration of React into the existing
            structure. This approach enables me to leverage React's powerful
            features while maintaining the project's original architecture. I
            may delve into the details of this process in a future article.
          </p>
        </div>
      </Paragraph>

      <Paragraph className={s.paragraph__13} ref={paragraph13ContentRef}>
        <h2 className={s.paragraph__title}>
          <span ref={paragraph13TitleRef}>10</span>
        </h2>
      </Paragraph>

      <Paragraph className={s.paragraph__14}>
        <div className={s.paragraph__content}>
          <h2>Conclusion</h2>
          <p>
            Creating, adapting, and migrating bebeto.pizza over the years has
            been a really fun journey of learning. This project has served as my
            playground for experimentation, pushing me to explore new
            technologies, and concepts, and overcome various challenges.
            <br /> While it's almost painful to revisit the initial codebase
            from 2018, filled with impractical patterns and less-than-ideal
            practices, I've come to embrace this as a testament to my evolution
            as a developer and the progress I've made over time.
            <br /> Working on a personal project like this comes with its own
            set of challenges. When you're the sole code reviewer, tech lead,
            and designer all rolled into one, maintaining best practices can be
            difficult. But it's precisely this hands-on, multifaceted experience
            that has been so educational.
            <br /> Now https://bebeto.pizza is more performant, cost-effective,
            and mobile-friendly. Please feel free to email me with any
            suggestions, or questions or just to chat. I’m always eager to
            connect and learn from others in the community :)
          </p>
        </div>
        <div className={s.paragraph__content2}>
          <p>
            <span>Keep creating!</span>
          </p>
        </div>
        <div className={s.paragraph__content3}>
          <p>
            <span>🤠 Emi</span>
          </p>
        </div>
      </Paragraph>
    </article>
  )
}

export default MainArticle
