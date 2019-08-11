import React from 'react'
import Link from 'next/link'
import Card from 'antd/lib/card'
import Avatar from 'antd/lib/avatar'
import styles from './styles.scss'
import Tag from 'antd/lib/tag'
import Icon from 'antd/lib/icon'

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

function PostCard (post) {
  const avatar = (<Avatar size={'large'} src="https://avatars3.githubusercontent.com/u/19880087" />)
  const title = (
    <Link
      href={{ pathname: `/${post.slug}`, query: { slug: post.slug } }}
    ><a>{post.title}</a>
    </Link>
  )
  return (
    <Card
      className={styles.card}
      actions={[
        <Icon type='heart' />
      ]}
    >
      <Card.Meta
        avatar={avatar}
        title={title}
        description={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'fkex-start' }}>
            <div style={{ marginRight: 15 }}>
              {formatDate(post.publishedAt)}
            </div>
            <div>
              {post.tags.map(tag => <Tag color={'geekblue'} key={tag.id} style={{ marginRight: 15 }}>{tag.name}</Tag>)}
            </div>
          </div>
        }
      />
    </Card>
  )
}

PostCard.defaultProps = {
  slug: '',
  title: '',
  publishedAt: '',
  tags: []
}

export default PostCard
