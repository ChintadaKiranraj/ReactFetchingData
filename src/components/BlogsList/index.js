import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

class BlogsList extends Component {
  state = {blogsData: [], isLoading: true}

  componentDidMount() {
    console.log('component did mount')
    this.getBlogsData()
  }

  getBlogsData = () => {
    // const options = {
    //   method: 'GET',
    // }

    const URL = 'https://apis.ccbp.in/blogs'

    const donNetworkCall = async () => {
      const response = await fetch(URL)
      const jsonData = await response.json()
      console.log(jsonData)

      const fetchedList = jsonData.map(eachItem => ({
        author: eachItem.author,
        id: eachItem.id,
        avatarUrl: eachItem.avatar_url,
        imageUrl: eachItem.image_url,
        title: eachItem.title,
        topic: eachItem.topic,
      }))
      console.log('fetchedlist', fetchedList)

      this.setState({
        blogsData: fetchedList,
        isLoading: false,
      })
    }

    donNetworkCall()
  }

  render() {
    const {blogsData, isLoading} = this.state

    return (
      <div className="blog-list-container">
        {isLoading
          ? 'Weight While content is loading'
          : blogsData.map(item => <BlogItem blogData={item} key={item.id} />)}
      </div>
    )
  }
}

export default BlogsList
