export type BlogPostProps = {
  id: number
  title: string
  subtitle?: string
  date: string
  slug: string
  content: string
  photo?: string
  photo_width?: number
  photo_height?: number
  margin_top?: number
}

const blogPosts: BlogPostProps[] = [
  {
    id: 1,
    title:
      'Los años y tu proyecto personal, pensamientos sobre como mantanerlo',
    subtitle: 'Introduction to TypeScript',
    date: 'December 11, 2024',
    slug: 'los-anos-y-tu-proyecto-personal-pensamientos-sobre-como-mantanerlo',
    content:
      'Mantener un proyecto personal a lo largo de los años puede ser un desafío. Este artículo explora estrategias y pensamientos para mantener tu proyecto relevante y en crecimiento.',
    photo:
      'https://storage.googleapis.com/bebeto-pizza-dibuja/blog-emi/netart-post.jpg',
    photo_width: 1234,
    photo_height: 823,
    margin_top: 4
  },
  {
    id: 2,
    title: 'Second Blog Post',
    subtitle: 'Getting Started with React',
    date: 'January 15, 2025',
    slug: 'second-blog-post',
    content:
      'React es una biblioteca de JavaScript para construir interfaces de usuario. Este post te guiará a través de los primeros pasos para crear tu primera aplicación React.',
    photo:
      'https://storage.googleapis.com/bebeto-pizza-dibuja/blog-emi/playlist.jpg',
    photo_width: 1368,
    photo_height: 912,
    margin_top: 0
  }

  // {
  //   title: 'Second Blog Post',
  //   subtitle: 'Getting Started with React',
  //   date: 'January 15, 2025',
  //   slug: 'second-blog-post',
  //   content:
  //     'React es una biblioteca de JavaScript para construir interfaces de usuario. Este post te guiará a través de los primeros pasos para crear tu primera aplicación React.'
  // },
  // {
  //   title: 'Third Blog Post',
  //   subtitle: 'Mastering CSS Grid',
  //   date: 'March 22, 2025',
  //   slug: 'third-blog-post',
  //   content:
  //     'CSS Grid ha revolucionado la forma en que diseñamos layouts web. Aprende cómo puedes utilizar Grid para crear diseños complejos de manera sencilla.'
  // },
  // {
  //   title: 'Fourth Blog Post',
  //   subtitle: 'Building RESTful APIs with Node.js',
  //   date: 'May 5, 2025',
  //   slug: 'fourth-blog-post',
  //   content:
  //     'Node.js es una plataforma poderosa para construir aplicaciones web. Este artículo te mostrará cómo construir APIs RESTful con Node.js.'
  // }
]

export default blogPosts
