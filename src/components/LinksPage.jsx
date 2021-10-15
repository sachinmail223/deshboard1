import React, { useEffect, useState } from 'react'
import classes from './LinksPage.module.css'
const LinksPage = () => {
    const [links, setLinks] = useState();
    useEffect(() => {
      
        fetch(
          "https://ghost-blog.ipxp.in/ghost/api/v3/content/posts/?key=8196190b08906dda0ebf6e6f5d"
        )
          .then((response) => response.json())
          .then((posts) => {
            var urlRegex = /(https?:\/\/[^ ">]*)/;
            // setLinks(posts.posts.url.length)
            (posts.posts[8].html.match(urlRegex)[0]===0)?(console.log('hgel')):(console.log(posts.posts[0].html.match(urlRegex)[1]))
                
            
            
            
          });
        }, []);
    return (
        <div>
            
        </div>
    )
}

export default LinksPage
