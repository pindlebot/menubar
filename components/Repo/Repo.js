import React from 'react'
import PropTypes from 'prop-types'
import Card from 'antd/lib/card'
import Skeleton from 'antd/lib/skeleton'
import Icon from 'antd/lib/icon'
import Avatar from 'antd/lib/avatar'
import Tag from 'antd/lib/tag'
import classes from './styles.scss'

class Repo extends React.Component {
  static defaultProps = {
    name: '',
    description: '',
    homepageUrl: '',
    resourcePath: '',
    languages: {
      nodes: []
    },
    stargazers: {
      totalCount: 0
    }
  }

  render () {
    const {
      name,
      description,
      homepageUrl,
      loading,
      resourcePath,
      languages
    } = this.props
    // return (
    //   <div className={classes.card}>
    //     <header className={classes.header}>

    //     </header>
    //     <div className={classes.content}>
          
    //     </div>
    //     <div className={classes.actions}>

    //     </div>
    //   </div>
    // )
    return (
      <Card
        actions={[
          <a href={`https://github.com/${resourcePath}`}><Icon type="github" /></a>,
          <a href={homepageUrl}><Icon type="link" /></a>,
          <a href={''}><img src={'https://png.pngtree.com/svg/20161215/npm_22237.png'} width={32} height={32} style={{filter: 'opacity(0.5)'}}></img></a>
        ]}
      >
        <Skeleton loading={loading} avatar active>
          <Card.Meta
            avatar={<Avatar src="https://avatars2.githubusercontent.com/u/19880087" />}
            title={
                <a href={`https://github.com${resourcePath}`}>{name}</a>
            }
            description={
              <div>
                {description ? description : (<div className="ant-skeleton ant-skeleton-active"><div className="ant-skeleton-content"><h3 className="ant-skeleton-title" style={{width: '38%'}}></h3></div></div>)}
              </div>
            }
          />
          <div style={{display:'inline-flex', justifyContent:'flex-end', width: '100%'}}>{(languages.nodes || []).map(node => <Tag key={node.id}>{node.name}</Tag>)}</div>
        </Skeleton>
      </Card>
    )
  }
}

export default Repo
