import React from 'react'
import classes from './styles.scss'
import Link from 'next/link'

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
      <header className={classes.header}>
        <h3 className={classes.title}>{title}</h3>
        <div className={classes.meta}>
          {formatDate(props.publishedAt)}
        </div>
      </header>
      <div className={classes.content}>
        {props.excerpt || ''}
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
