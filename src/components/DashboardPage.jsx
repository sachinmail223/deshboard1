import React, { useEffect, useState } from "react";
import classes from "./DashboardPage.module.css";

const DashboardPage = () => {
  const [PostsNo, setPostsNo] = useState([]);
  const [PagesNo, setPagesNo] = useState();
  const [AuthorssNo, setAuthorsNo] = useState();
  const [TagsNo, setTagsNo] = useState();
  const [monthCount, setMonthCount] = useState([]);
  const [monthNo, setMonthNo] = useState([]);

  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const monthname = {
    1:"jan",
    2:"fab",
    3:"Mar",
    4:"apr",
    5:"may",
    6:"jun",
    7:"jul",
    8:"aug",
    9:"sep",
    10:"oct",
    11:"nov",
    0:"dec"

  }

  
  useEffect(() => {
    fetch(
      "https://ghost-blog.ipxp.in/ghost/api/v3/content/posts/?key=8196190b08906dda0ebf6e6f5d"
    )
      .then((response) => response.json())
      .then((posts) => {
        setPostsNo(posts.posts);  
      });

    fetch(
      "https://ghost-blog.ipxp.in/ghost/api/v3/content/pages/?key=8196190b08906dda0ebf6e6f5d"
    )
      .then((response) => response.json())
      .then((pages) => {
        setPagesNo(pages.pages.length);
      });
    fetch(
      "https://ghost-blog.ipxp.in/ghost/api/v3/content/authors/?key=8196190b08906dda0ebf6e6f5d"
    )
      .then((response) => response.json())
      .then((authors) => {
        setAuthorsNo(+authors.authors.length);
      });
    fetch(
      "https://ghost-blog.ipxp.in/ghost/api/v3/content/tags/?key=8196190b08906dda0ebf6e6f5d"
    )
      .then((response) => response.json())
      .then((tags) => {
        setTagsNo(tags.tags.length);  
      });
     
  }, []);

  useEffect(() => {
    const monthset = {};
    PostsNo.map((singlepost) => {
      const date = new Date(singlepost.published_at);
      // const date = new Date();
      const shortD =
        date.getFullYear().toString() + date.getMonth().toString();
      if (!monthset[shortD]) {
        monthset[shortD] = 1;
      } else {
        monthset[shortD] += 1;
      }
    });
    setMonthCount(monthset)
    
    
  }, [PostsNo])
  
  
        
  monthCount[20206]===undefined?(console.log(0)):(console.log(monthCount[20206]))   
  
  let i = -2; 
  return (
    <div className={classes.Dashboard}>
      <div>
        <div className={classes.row}>
          {/* Total Posts */}   
          <div className={classes.TotalNo}>
            <p>Total Posts</p>
            <span>{PostsNo.length}</span> 
          </div> 

          {/* Total Pages */}
          <div className={classes.TotalNo}>
            <p>Total Pages</p>
            <span>{PagesNo}</span>
          </div>
        </div>

        {/* Posts per month Graph */}
        <div className={classes.row}>
          <div className={classes.MonthPostsChart}>
            <p>Posts per month</p>
            <div className={classes.verticle}>
              <span>10</span> 
              <span>09</span>
              <span>08</span>
              <span>07</span>
              <span>06</span>
              <span>05</span>
              <span>04</span>
              <span>03</span>
              <span>02</span>
              <span>01</span>
              <span>00</span>
            </div>
            <div className={classes.bar}>
              {}
              {month.reverse().map((month) => { 
                
                i += 1;
                const pMonth = new Date();
                pMonth.setMonth(new Date().getMonth() - i);
                const height = +(monthCount[pMonth.getFullYear().toString()+pMonth.getMonth().toString()])
                return <div className={classes.barD} style={{height: `${height*10}%`}}> <span>{monthname[pMonth.getMonth()].toUpperCase()}</span></div>; 
              })}
             
            </div>
          </div>

          {/* Latest 5 Published posts List */}
          <div className={classes.PostsList}>
            <p>Latest 5 Published posts List</p>
            <div className={classes.PostsListDiv}>
              <ol>
                {PostsNo.slice(0, 5).map((post) => {
                  return (
                    <div>
                      <li>
                        <a href={post.url}>{`${post.title}`} </a>
                      </li>
                    </div>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>

        {/* Total Authors */}
        <div className={classes.row}>
          <div className={classes.TotalNo}>
            <p>Total Authors</p>
            <span>{AuthorssNo}</span>
          </div>

          {/* Total Tags */}
          <div className={classes.TotalNo}>
            <p>Total Tags</p>
            <span>{TagsNo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
