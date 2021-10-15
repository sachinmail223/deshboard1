
import { useEffect, useState } from 'react';
import './App.css';
import DashboardPage from './components/DashboardPage';
import LinksPage from './components/LinksPage';
import PostsPage from './components/PostsPage';

function App() {
const [postso, setPosts] = useState([]);
useEffect(()=>{
fetch("https://ghost-blog.ipxp.in/ghost/api/v3/content/posts/?key=8196190b08906dda0ebf6e6f5d")
.then(response=> response.json())
.then(posts=>{
  // const [mo, fo] = posts.posts.created_at.split('-')
const _postCount = {}
  posts.posts.map((post)=>{

    const [mo, fo] = post.created_at.split('-')
    const com = mo+fo
    setPosts((preList) => {
      return [...preList, com] 
      
    })
    if(_postCount[com])  {
      _postCount[com] += 1
      
    }else{
      _postCount[com] = 1
    }
    // console.log(_postCount);
  })

  // console.log(posts);
  
 
})
},[]);

  return (
    <div className="App">
  <DashboardPage/>
  <PostsPage/>
  {/* <LinksPage/> */}

    </div>
  );
}

export default App;
