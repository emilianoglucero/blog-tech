enum ALIGN {
  START = 'start',
  CENTER = 'center',
  END = 'end'
}

enum WEBGL_TYPE {
  LINE_EXPLOSION = 'line-explosion',
  GEOMETRIC_WIREFRAME = 'geometric-wireframe'
}

export const HIGHLIGHTS_WEBSITES_2024 = [
  {
    title: 'Stripe Black Friday and Cyber Monday Recap 2024',
    description: `Special mention to Stripe—
    a tech company pushing the boundaries of the web, who would have thought?
    Their Black Friday recap made data beautiful again, 
    but don't sleep on their [Dev Docs](https://stripe.dev/) 
    and [Price Adapter](https://www.priceadapter.com/) 
    releases. They're both high quality.`,
    url: 'https://bfcm.stripe.com/',
    image: {
      url: '/assets/images/2024-highlights/websites/stripe.jpg',
      alt: 'Stripe Black Friday and Cyber Monday recap 2024',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 4,
      end: 10,
      mobileSpan: 8,
      order: 1,
      align: ALIGN.START
    },
    imagePosition: {
      start: 11,
      end: 24,
      mobileSpan: 8,
      order: 2
    }
  },
  {
    title: 'TWOMUCH.STUDIO',
    description: 'Loved the physics and the original UI for the Menu.',
    url: 'https://twomuch.studio/',
    image: {
      url: '/assets/images/2024-highlights/websites/twomuchstudio.jpg',
      alt: 'TwoMuch.Studio',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 14,
      end: 23,
      mobileSpan: 8,
      order: 2,
      align: ALIGN.END
    },
    imagePosition: {
      start: 3,
      end: 12,
      mobileSpan: 8,
      order: 1
    }
  },
  {
    title: 'Bid(s) for Survival',
    description:
      "Found myself lost in this WebGL experience from the Michael Schindhelm exhibition. I really liked their take on Longevity. There's something deliciously nostalgic about the narrative and the 3D post-processing style.",
    url: 'https://bidsforsurvival.com/',
    image: {
      url: '/assets/images/2024-highlights/websites/bidsforsurvival.jpg',
      alt: 'Bid(s) for Survival',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 1,
      end: 10,
      mobileSpan: 8,
      order: 8,
      align: ALIGN.CENTER
    },
    imagePosition: {
      start: 13,
      end: 24,
      mobileSpan: 8,
      order: 2
    }
  },
  {
    title: 'Artlist Paris',
    description:
      'Love good quality photography on web and this site implemented it with very distingués hover effects. Full disclosure: Yes, I reverse-engineered their hover style for this blog main page. Good artists copy, etc etc.',
    url: 'https://artlistparis.com/',
    image: {
      url: '/assets/images/2024-highlights/websites/artlistparis.jpg',
      alt: 'Artlist Paris',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 15,
      end: 23,
      mobileSpan: 8,
      order: 2,
      align: ALIGN.START
    },
    imagePosition: {
      start: 3,
      end: 13,
      mobileSpan: 8,
      order: 1
    }
  },
  {
    title: 'GT America Intl',
    description:
      'This one has a little bit of everything I obsess over in websites: physics interactions, illustration style, the motion design, the typography experiments, and a beautiful design that ties all together.',
    url: 'https://gt-america.com/',
    image: {
      url: '/assets/images/2024-highlights/websites/gtamerica.jpg',
      alt: 'GT America Intl',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 4,
      end: 10,
      mobileSpan: 8,
      order: 1,
      align: ALIGN.END
    },
    imagePosition: {
      start: 13,
      end: 24,
      mobileSpan: 8,
      order: 2
    }
  },
  {
    title: 'Noomo Labs',
    description: 'First-class use of WebGL here.',
    url: 'https://labs.noomoagency.com/',
    image: {
      url: '/assets/images/2024-highlights/websites/noomo.jpg',
      alt: 'Noomo Labs',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 14,
      end: 23,
      mobileSpan: 8,
      order: 2,
      align: ALIGN.START
    },
    imagePosition: {
      start: 1,
      end: 12,
      mobileSpan: 8,
      order: 1
    }
  },
  {
    title: 'Vera van de Seyp',
    description:
      '♥ this portfolio. Original design choices, variable type experiments, and the sweet message section.',
    url: 'https://veravandeseyp.com/',
    image: {
      url: '/assets/images/2024-highlights/websites/veravandeseyp.jpg',
      alt: 'Vera van de Seyp',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 6,
      end: 12,
      mobileSpan: 8,
      order: 1,
      align: ALIGN.CENTER
    },
    imagePosition: {
      start: 13,
      end: 24,
      mobileSpan: 8,
      order: 2
    }
  },
  {
    title: '世外桃源 The Peach Spring Beyond This World',
    description: `I'm a fan of [oOOo Studio](https://www.oooostudio.com/) and this online exhibition 
    feels a little bit strange so I love it.`,
    url: 'http://beurownmastr.com/ty/',
    image: {
      url: '/assets/images/2024-highlights/websites/peachspring.jpg',
      alt: '世外桃源 The Peach Spring Beyond This World',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 14,
      end: 23,
      mobileSpan: 8,
      order: 2,
      align: ALIGN.END
    },
    imagePosition: {
      start: 3,
      end: 12,
      mobileSpan: 8,
      order: 1
    }
  },
  {
    title: 'Zes Nullen',
    description: `This e-commerce site has style. The 'crystal ball' 
photo gallery is ♡`,
    url: 'https://zesnullen.world/',
    image: {
      url: '/assets/images/2024-highlights/websites/zesnullen.jpg',
      alt: 'Zes Nullen',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 1,
      end: 10,
      mobileSpan: 8,
      order: 1,
      align: ALIGN.START
    },
    imagePosition: {
      start: 13,
      end: 25,
      mobileSpan: 8,
      order: 2
    }
  },
  {
    title: 'Dverso Studio',
    description: `Engaged with the design style, the details, the micro 
interactions and the subtle use of audio.`,
    url: 'https://dversostudio.io/',
    image: {
      url: '/assets/images/2024-highlights/websites/dverso.jpg',
      alt: 'Dverso Studio',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 14,
      end: 23,
      mobileSpan: 8,
      order: 2,
      align: ALIGN.CENTER
    },
    imagePosition: {
      start: 3,
      end: 12,
      mobileSpan: 8,
      order: 1
    }
  },
  {
    title: 'Romain Granai',
    description: `Typography experiments that make you want to scroll.`,
    url: 'https://romaingranai.xyz/',
    image: {
      url: '/assets/images/2024-highlights/websites/roman.jpg',
      alt: 'Romain Granai',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 6,
      end: 10,
      mobileSpan: 8,
      order: 1,
      align: ALIGN.END
    },
    imagePosition: {
      start: 10,
      end: 20,
      mobileSpan: 8,
      order: 2
    }
  },
  {
    title: 'Food for Fish',
    description: `Beautiful WebGL graphic adventure game experience by Kris Temmerman.`,
    url: 'https://foodforfish.org/',
    image: {
      url: '/assets/images/2024-highlights/websites/foodforfish.jpg',
      alt: 'Food for Fish',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 14,
      end: 23,
      mobileSpan: 8,
      order: 2,
      align: ALIGN.START
    },
    imagePosition: {
      start: 3,
      end: 12,
      mobileSpan: 8,
      order: 1
    }
  },
  {
    title: 'Daisy Chain Studio',
    description: `Such good micro interactions and visual style.`,
    url: 'https://www.daisychainstudio.net/',
    image: {
      url: '/assets/images/2024-highlights/websites/daisychainstudio.jpg',
      alt: 'Daisy Chain Studio',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 5,
      end: 10,
      mobileSpan: 8,
      order: 1,
      align: ALIGN.START
    },
    imagePosition: {
      start: 16,
      end: 25,
      mobileSpan: 8,
      order: 2
    }
  },
  {
    title: '[SAGAPRO006] – J.ALBERT & HOLODEC',
    description: `Love saga's work and this community visualizer.`,
    url: 'https://006.saga-pro.co/',
    image: {
      url: '/assets/images/2024-highlights/websites/saga.jpg',
      alt: '[SAGAPRO006] – J.ALBERT & HOLODEC',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 14,
      end: 23,
      mobileSpan: 8,
      order: 2,
      align: ALIGN.END
    },
    imagePosition: {
      start: 3,
      end: 12,
      mobileSpan: 8,
      order: 1
    }
  },
  {
    title: `McDonald's Brings Back New Collector's Edition Cups`,
    description: `I really enjoyed the high quality photography and 3D from this McDonald's experience.`,
    url: 'https://mcdonalds.hypebeast.com/',
    image: {
      url: '/assets/images/2024-highlights/websites/mcdonalds.jpg',
      alt: `McDonald's Brings Back New Collector's Edition Cups`,
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 1,
      end: 10,
      mobileSpan: 8,
      order: 1,
      align: ALIGN.START
    },
    imagePosition: {
      start: 13,
      end: 25,
      mobileSpan: 8,
      order: 2
    }
  },
  {
    title: `Teletech`,
    description: `I have to admit I loved the hardcore pixelated shader effect for the main images. Nice use of WebGL in the rest of the elements. We need to stop using the random text animation on hover effect.`,
    url: 'https://www.teletech.events/',
    image: {
      url: '/assets/images/2024-highlights/websites/teletech.jpg',
      alt: `Teletech`,
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 14,
      end: 23,
      mobileSpan: 8,
      order: 2,
      align: ALIGN.CENTER
    },
    imagePosition: {
      start: 3,
      end: 12,
      mobileSpan: 8,
      order: 1
    }
  },
  {
    title: `Desktop.fm`,
    description: `I like when 3D, visuals and sound combine that well.`,
    url: 'https://desktop.fm/',
    image: {
      url: '/assets/images/2024-highlights/websites/desktopfm.jpg',
      alt: `Desktop`,
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 1,
      end: 10,
      mobileSpan: 8,
      order: 1,
      align: ALIGN.END
    },
    imagePosition: {
      start: 13,
      end: 25,
      mobileSpan: 8,
      order: 2
    }
  },
  {
    title: `Scrib3`,
    description: `Thank you [darkroom.engineering](https://darkroom.engineering/) for existing.`,
    url: 'https://scrib3.co/',
    image: {
      url: '/assets/images/2024-highlights/websites/scrib3.jpg',
      alt: `Scrib3`,
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 14,
      end: 23,
      mobileSpan: 8,
      order: 2,
      align: ALIGN.START
    },
    imagePosition: {
      start: 3,
      end: 12,
      mobileSpan: 8,
      order: 1
    }
  }
]

export const HIGHLIGHTS_MOVIES_2024 = [
  {
    title: 'El Jockey',
    description: `"Morir y nacer de nuevo". The Jockey felt like a mix of Marcos López, Lynch, Wes Anderson, Almodóvar, and *porteño* culture.`,
    url: 'https://youtu.be/N2BSpDERJZk',
    image: {
      url: '/assets/images/2024-highlights/movies/eljockey.jpg',
      alt: 'El Jockey',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 1,
      end: 10,
      mobileSpan: 8,
      order: 1,
      align: ALIGN.CENTER
    },
    imagePosition: {
      start: 11,
      end: 20,
      mobileSpan: 8,
      order: 2
    }
  },
  {
    title: 'Terrifier 3',
    description: `Maybe the goriest of the franchise. As someone who grew up on slasher films, I enjoyed seeing Art the Clown become a horror icon of the genre this decade. Thank you, Damien Leone, for the character design and special effects.`,
    url: 'https://youtu.be/zaPcin5knJk',
    image: {
      url: '/assets/images/2024-highlights/movies/terrifier3.jpg',
      alt: 'Terrifier 3',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 14,
      end: 25,
      mobileSpan: 8,
      order: 2,
      align: ALIGN.END
    },
    imagePosition: {
      start: 4,
      end: 13,
      mobileSpan: 8,
      order: 1
    }
  },
  {
    title: 'Después de un buen día',
    description: `The only one from the list I experienced in a proper theater this year, at the beautiful Cine Lumiere in Rosario.
     The director was supposed to be present but couldn't make it due to a (last-minute) transport strike (as far as I remember).
     This is a documentary about an Argentinian cinema phenomenon. I enjoyed the approach and get to know much more about the story of the protagonists.
     Frenkel continues to dominate the documentary genre in my country.`,
    url: 'https://youtu.be/jSA0H8hDUwE',
    image: {
      url: '/assets/images/2024-highlights/movies/despuesdeunbuendia.jpg',
      alt: 'Después de un buen día',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 2,
      end: 13,
      mobileSpan: 8,
      order: 1,
      align: ALIGN.START
    },
    imagePosition: {
      start: 14,
      end: 22,
      mobileSpan: 8,
      order: 2
    }
  },
  {
    title: `MaXXXine`,
    description: `The trilogy closer might be the weakest entry but idk 
    it's Ty West and Mia Goth.`,
    url: 'https://youtu.be/y0uS3t6nFgY',
    image: {
      url: '/assets/images/2024-highlights/movies/maxxxine.jpg',
      alt: 'MaXXXine',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 16,
      end: 25,
      mobileSpan: 8,
      order: 2,
      align: ALIGN.CENTER
    },
    imagePosition: {
      start: 1,
      end: 12,
      mobileSpan: 8,
      order: 1
    }
  }
]

export const HIGHLIGHTS_MUSIC_VIDEOS_2024 = [
  {
    title: 'Moonstruck by Jerry Paper',
    description: `[Fantastic 3D Creation](https://www.youtube.com/channel/UCKxpefN2paZU6-pumGsCtaw) did it again.`,
    url: 'https://youtu.be/2g6QSF9pTWU?si=KsGy_DtbsBzaySPH',
    image: {
      url: '/assets/images/2024-highlights/music-videos/moonstruck.jpg',
      alt: 'Moonstruck by Jerry Paper',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 16,
      end: 22,
      mobileSpan: 8,
      order: 2,
      align: ALIGN.CENTER
    },
    imagePosition: {
      start: 1,
      end: 9,
      mobileSpan: 8,
      order: 1
    }
  },
  {
    title: 'TAUSERT by nusar3000',
    description: `I really enjoyed the ride with the guys.`,
    url: 'https://youtu.be/6cr9WvEt3g0?si=pZXFP460NNVnS4Vy',
    image: {
      url: '/assets/images/2024-highlights/music-videos/tausert.jpg',
      alt: 'TAUSERT by nusar3000',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 4,
      end: 10,
      mobileSpan: 8,
      order: 1,
      align: ALIGN.END
    },
    imagePosition: {
      start: 11,
      end: 20,
      mobileSpan: 8,
      order: 2
    }
  },
  {
    title: 'uwu^^ by rusowsky and Bb trickz',
    description: `[FOMOTRAUMA](https://www.instagram.com/fomotrauma/) && quality`,
    url: 'https://youtu.be/-tAT4qRuB04?si=3L1Qs0TH9Ka2-ay0',
    image: {
      url: '/assets/images/2024-highlights/music-videos/uwu.jpg',
      alt: 'uwu^^ by rusowsky and Bb trickz',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 13,
      end: 23,
      mobileSpan: 8,
      order: 2,
      align: ALIGN.START
    },
    imagePosition: {
      start: 1,
      end: 12,
      mobileSpan: 8,
      order: 1
    }
  },
  {
    title: 'Martes 13 by Little Boogie ft El Doctor',
    description: `Simple and effective gangsta video. Fine work from [pleazzures](https://www.instagram.com/pleazzures/).`,
    url: 'https://youtu.be/4u-bDJEPtG0?si=jDxDd-yVmF0y1O7s',
    image: {
      url: '/assets/images/2024-highlights/music-videos/martes13.jpg',
      alt: 'Martes 13 by Little Boogie ft El Doctor',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 5,
      end: 12,
      mobileSpan: 8,
      order: 1,
      align: ALIGN.CENTER
    },
    imagePosition: {
      start: 15,
      end: 25,
      mobileSpan: 8,
      order: 2
    }
  }
]

export const HIGHLIGHTS_LIVE_SHOWS_2024 = [
  {
    title: 'Ariel Pink at Uniclub (Ciudad de Buenos Aires, Argentina)',
    description: `My first time seeing live the man who created their own pop style and influenced all us. We enjoyed seeing how his raw material translated into this band format.`,
    url: 'https://youtu.be/ERoYJje0vA8',
    image: {
      url: '/assets/images/2024-highlights/live-shows/arielpink.jpg',
      alt: 'Ariel Pink at La Transtienda',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 13,
      end: 22,
      mobileSpan: 8,
      order: 2,
      align: ALIGN.END
    },
    imagePosition: {
      start: 1,
      end: 12,
      mobileSpan: 8,
      order: 1
    }
  },
  {
    title: 'Mizuki Amapola at Casa Babylon (Ciudad de Cordoba, Argentina)',
    description: `After a few years of silence, Córdoba's own made their return to the stages, bringing their new record to Casa Babylon with a full band formation that made everything shine.`,
    url: 'https://youtu.be/SMTeeMVbLqg',
    image: {
      url: '/assets/images/2024-highlights/live-shows/mizuki.jpg',
      alt: 'Mizuki Amapola at Casa Babylon (Ciudad de Cordoba, Argentina)',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 1,
      end: 10,
      mobileSpan: 8,
      order: 1,
      align: ALIGN.CENTER
    },
    imagePosition: {
      start: 11,
      end: 25,
      mobileSpan: 8,
      order: 2
    }
  },
  {
    title:
      'Los Veranos at La Veleta Cultural (San Miguel de Tucumán, Argentina)',
    description: `Tucumán, the pearl of the north, where raw meets refined.
     For every action (Mendoza's bad-taste music scene) 
      there's an equal and opposite reaction (Tucumán's avant-garde movement).
      Los Veranos are proof. Playing alongside them during our summer tour felt like being part of 
      that beautiful equilibrium.`,
    url: 'https://youtu.be/n3ayYcdMMSM',
    image: {
      url: '/assets/images/2024-highlights/live-shows/losveranos.jpg',
      alt: 'Los Veranos at La Veleta Cultural (San Miguel de Tucumán, Argentina)',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 14,
      end: 23,
      mobileSpan: 8,
      order: 2,
      align: ALIGN.START
    },
    imagePosition: {
      start: 1,
      end: 12,
      mobileSpan: 8,
      order: 1
    }
  }
]

export const HIGHLIGHTS_COMEDY_2024 = [
  {
    title: 'Rap World',
    description: `Conner O'Malley is my current favorite comedian. An absurd suburban history located in 2009. Loved the ending.`,
    url: 'https://youtu.be/NkARD8oTzOM?si=z9sz0pGTLmzHshdu',
    image: {
      url: '/assets/images/2024-highlights/comedy/rapworld.jpg',
      alt: 'Rap World',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 1,
      end: 10,
      mobileSpan: 8,
      order: 1,
      align: ALIGN.CENTER
    },
    imagePosition: {
      start: 11,
      end: 25,
      mobileSpan: 8,
      order: 2
    }
  }
]

export const HIGHLIGHTS_PODCASTS_2024 = [
  {
    title: 'five podcasts:',
    subtitle:
      'In the bus, riding bicycle, cooking, cleaning or walking. And you?',
    webglType: WEBGL_TYPE.LINE_EXPLOSION,
    triggerId: 'podcasts',
    items: [
      {
        title: 'Low Key Legends',
        author: 'Britton Stipetic',
        description:
          'Season 2 where Britton Stipetic brings insightful conversations with creative industry players.',
        url: 'https://www.youtube.com/@Rogueworldwide',
        decoration: '-------'
      },
      {
        title: 'La hora rockdeluxe',
        author: 'Santi Carrillo and Juan Cervera',
        description:
          "Discovered Santi Carrillo and Juan Cervera from Rockdelux magazine last year, and I've become a devoted follower of their borderless musical talks and explorations.",
        url: 'https://open.spotify.com/show/5PB7OE17O05Fh3IFR6IDzx',
        decoration: '--------------------------------------------------'
      },
      {
        title: 'Pinkmoon radio',
        author: 'Zurita brothers',
        description:
          'An institution of my country. Another year where the Zurita brothers continue dropping regular episodes discussing cultural consumptions with humor and lots of hidden music gems.',
        url: 'https://open.spotify.com/show/70msquG7Q1JGJGxKU2za1t',
        decoration: '-------------------------------'
      },
      {
        title: 'The pragmatic engineer',
        author: 'Gergely Orosz',
        description: `Late last year, Gergely Orosz launched his podcast that feels like a breath of fresh air, bringing interesting discussions with industry protagonists. I liked the variety of topics, interviews and the way they're approached. Another option in the vast tech podcast landscape.`,
        url: 'https://www.youtube.com/@pragmaticengineer',
        decoration: '----------------------------------------------------------'
      },
      {
        title: 'Aprender de grandes',
        author: 'Gerry Garbulsky',
        description:
          'My girlfriend laughs when she sees me listening to this podcast. She thinks I\'ve fallen into self-help content. I discovered Gerry Garbulsky\'s podcast through the amazing Melina Furman and got hooked by the diversity of guests and its "lifelong learning" spirit.',
        url: 'https://www.youtube.com/@AprenderdeGrandes',
        decoration:
          '---------------------------------------------------------------------------------'
      }
    ],
    image: {
      url: '/assets/images/2024-highlights/websites/twomuchstudio.jpg',
      alt: 'Podcast Collection 2024',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 1,
      end: 12,
      mobileSpan: 8,
      order: 1,
      align: ALIGN.START
    },
    imagePosition: {
      start: 13,
      end: 24,
      mobileSpan: 8,
      order: 2
    }
  }
]

export const HIGHLIGHTS_BOOKS_2024 = [
  {
    title: 'extra one: three books',
    subtitle: `Ok I did not read any brand new 2024 books this year. But I read a few from other years and I'll recomend these:`,

    webglType: WEBGL_TYPE.GEOMETRIC_WIREFRAME,
    triggerId: 'extra',
    items: [
      {
        title: 'Guía para criar hijos curiosos',
        author: 'Melina Furman',
        decoration: '-------',
        description:
          "I've become something of an evangelist for Melina's work this year. Spending more time with my nephew made me want to approach guidance from a more evidence-based perspective rather than pure instinct. This book was exactly what I needed - grounded in research but with a warm, approachable tone and packed with practical resources. Melina's legacy is truly irreplaceable. I still cannot believe she left us :(",
        url: 'https://sigloxxieditores.com.ar/libro/guia-para-criar-hijos-curiosos/?srsltid=AfmBOopfDviQiYAHhlkFIHytD5qulnTgS8HA0GD_BfPnYbCwk7gL-9K-'
      },
      {
        title: 'The Creative Act: A Way of Being',
        author: 'Rick Rubin',
        decoration: '--------------------------------',
        description: `Finally downloaded this one to my Kindle.
           After reading, I understand why - it's digestible, occasionally profound,
            though rarely surprising. 
            A creative companion rather than any sort of revelation.
            Still, I keep coming back to random pages in my 
     library, like opening old tabs you never closed.`,
        url: 'https://www.amazon.com/Creative-Act-Way-Being/dp/0593652886'
      },
      {
        title: 'Design for Hackers: Reverse Engineering Beauty',
        author: 'David Kadavy',
        decoration: '------------------------------------------------------',
        description:
          'Nice as an intro for non-designers. Kadavy breaks down the fundamentals. A mix of history, theory and practical advice.',
        url: 'https://www.amazon.com/Design-Hackers-Reverse-Engineering-Beauty/dp/1119998956'
      }
    ],
    image: {
      url: '/assets/images/2024-highlights/websites/twomuchstudio.jpg',
      alt: 'Book Collection 2024',
      width: 100,
      height: 100
    },
    contentPosition: {
      start: 1,
      end: 12,
      mobileSpan: 8,
      order: 1,
      align: ALIGN.START
    },
    imagePosition: {
      start: 13,
      end: 24,
      mobileSpan: 8,
      order: 2
    }
  }
]
