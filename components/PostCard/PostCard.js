import React from 'react'
import classes from './styles.scss'
import Link from 'next/link'

const PREFIX = 'https://s3.amazonaws.com/contentkit'

function formatDate (dateString) {
  if (!dateString) return ''
  const date = new Date(
    Date.parse(dateString)
  )
  return [
    date.getMonth() + 1,
    date.getDate(),
    date.getFullYear()
  ].join('/')
}

function PostCard (props) {
  const title = (
    <Link
      href={{ pathname: `/${props.slug}`, query: { slug: props.slug } }}
    ><a>{props.title}</a>
    </Link>
  )

  return (
    <article className={classes.card}>
      {props.coverImage && <img src={`${PREFIX}/${props.coverImage.url}`} className={classes.thumbnail} />}
      <div className={classes.column}>
        <header className={classes.header}>
          <h3 className={classes.title}>{title}</h3>
          <div className={classes.meta}>
            {formatDate(props.publishedAt)}
          </div>
        </header>
        <div className={classes.content}>
          {props.excerpt || ''}
        </div>
      </div>
    </article>
  )
}

PostCard.defaultProps = {
  slug: '',
  title: '',
  publishedAt: '',
  tags: [],
  excerpt: ''
}

export default PostCard
