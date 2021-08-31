import React, { Component } from 'react'
import { dataProvider } from '../providers'; 
import Banner from '../components/Banner'
import { formatDate } from '../utils';
import Loader from '../components/Loader';

export default class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      page: null,
    }
  }

  componentDidMount() {
    dataProvider.getList('posts', {
      pagination: { page: 1 , perPage: 100 }, 
      sort: { field: 'id', order: 'ASC' }, 
      filter: {},
    }).then(res => {
      console.debug(res.data)
      const filteredPosts = res.data.filter(function(post){
        const keys = Object.keys(post);
        return keys.indexOf('eventDates') > -1;
      })
      console.debug('filteredPosts', filteredPosts)
      filteredPosts.sort((post) => post.eventDates[0].date).reverse();
      this.setState({posts: filteredPosts})
    }).catch(err => {
      console.error(err);
    })

    dataProvider.getList('pages', {
      pagination: { page: 1 , perPage: 1 },
      sort: { field: 'id', order: 'ASC' },
      filter: {"name": 'events'},
    }).then((res) =>{
      this.setState({page: res.data[0]});
    }).catch(err => {
      console.error(err);
    })
  }

  formatEventDates = (dates) => {
    if (dates) {
      var output = [];
      dates.forEach(ele => {
        output.push(formatDate(ele.date, 'short'))
      })
      return output.join(', ')
    }
    return ''
  }

  render() {
    const { page, posts } = this.state;
    return (
      <div>
        <Banner page={page} />
        <main className="mb-4">
          {page && posts.length > 0 ? (
            <div className="container px-4 px-lg-5">
              <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="timeline">
                  { posts.map((post, index) => (
                    index % 2 === 0 ? (
                      <div className="timeline-container right">
                        <a href={`/artclub/post?id=${post.id}`}>
                          <div className="timeline-content outlined">
                            <h2>{post.heading}</h2>
                            <p>{post.subHeading}</p>
                            <p>{this.formatEventDates(post.eventDates)}</p>
                          </div>
                        </a>
                      </div>
                    ):(
                      <div className="timeline-container left">
                        <a href={`/artclub/post?id=${post.id}`}>
                          <div className="timeline-content outlined">
                            <h2>{post.heading}</h2>
                            <p>{post.subHeading}</p>
                            <p>{this.formatEventDates(post.eventDates)}</p>
                          </div>
                        </a>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          ): <Loader />}
        </main>
      </div>
    )
  }
}