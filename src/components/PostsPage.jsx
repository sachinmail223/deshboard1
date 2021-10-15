import React, { useEffect, useState } from "react";
import classes from "./PostsPage.module.css";
const PostsPage = () => {
  const [Post, setPost] = useState([]);
  const [nullMetaPost, setNullMetaPost] = useState([]);
  const [longMetaPost, setLongMetaPost] = useState([]);
  const [longUrl, setLongUrl] = useState([]);
  const [nullImagePost, setNullImagePost] = useState([]);
  const [shortPosts, setShortPosts] = useState([]);
  const [longPosts, setLongPosts] = useState([]);

  useEffect(() => {
    fetch(
      "https://ghost-blog.ipxp.in/ghost/api/v3/content/posts/?key=8196190b08906dda0ebf6e6f5d"
    )
      .then((response) => response.json())
      .then((posts) => {
        const nullmetaPost = posts.posts.filter(
          (post) => post.meta_description == null
        );
        const metaPost = posts.posts.filter(
          (post) => post.meta_description !== null
        );
        const longmetaPost = metaPost.filter(
          (post) => post.meta_description.length > 100
        );
        const LongUrl = posts.posts.filter((post) => post.url.length > 100);
        const NullImagePost = posts.posts.filter(
          (post) => post.feature_image == null
        );
        const ShortPosts = posts.posts.filter(
          (post) => post.html.split(" ").length < 250
        );
        const LongPosts = posts.posts.filter(
          (post) => post.html.split(" ").length > 1500
        );
        setLongPosts(LongPosts);
        setShortPosts(ShortPosts);
        setNullImagePost(NullImagePost);
        setLongUrl(LongUrl);
        setNullMetaPost(nullmetaPost);
        setLongMetaPost(longmetaPost);
        setPost(posts.posts);
        console.log(NullImagePost);
      });
  }, []);

  return (
    <div className={classes.PostsPage}>
      <div>
        <div className={classes.Up}>
          {/* List of Posts without Meta Description */}
          <div className={classes.box}>
            {nullMetaPost.length === 0 ? (
              <div>
                <p>Posts without Meta Description</p>{" "}
                <ol>
                  <span>There is not any Posts without Meta Description</span>
                </ol>
              </div>
            ) : (
              <div>
                <p>Posts without Meta Description</p>
                <ol>
                  {nullMetaPost.map((post) => {
                    return (
                      <li>
                        <a href={post.url}>{`${post.title}`} </a>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}
          </div>

          {/*  Too long Meta Description*/}
          <div className={classes.box}>
            <p>Posts with Too Long Meta Description</p>
            {nullMetaPost.length === 0 ? (
              <div>
                <ol>
                  <span>
                    There is not any Posts with Too Long Meta Description
                  </span>
                </ol>
              </div>
            ) : (
              <ol>
                {longMetaPost.map((post) => {
                  return (
                    <li>
                      <a href={post.url}>{`${post.title}`} </a>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>

          {/*Too long URL, more than 100 chars  */}
          <div className={classes.box}>
            <p>Posts with Too long URL</p>
            {longUrl.length === 0 ? (
              <div>
                <ol>
                  <span>There is not any Posts with Too long URL</span>
                </ol>
              </div>
            ) : (
              <ol>
                {longUrl.map((post) => {
                  return (
                    <li>
                      <a href={post.url}>{`${post.title}`} </a>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </div>

        <div className={classes.Down}>
          {/* Posts without Featured Imag */}
          <div className={classes.box}>
            <p>Posts without Featured Image</p>{" "}
            {nullImagePost.length === 0 ? (
              <div>
                <ol>
                  <span>There is not any Posts without Featured Image</span>
                </ol>
              </div>
            ) : (
              <ol>
                {nullImagePost.map((post) => {
                  return (
                    <li>
                      <a href={post.url}>{`${post.title}`} </a>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>

          {/* Too Short Posts, Below 250 words */}
          <div className={classes.box}>
            <p>Too Short Posts, Below 250 words</p>
            {shortPosts.length === 0 ? (
              <div>
                <ol>
                  <span>There is not any Too Short Posts, Below 250 words</span>
                </ol>
              </div>
            ) : (
              <ol>
                {shortPosts.map((post) => {
                  return (
                    <li>
                      <a href={post.url}>{`${post.title}`} </a>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>

          {/*Too Long Posts, More than 1500 words  */}
          <div className={classes.box}>
            <p>Too Long Posts, More than 1500 words</p>
            {longPosts.length === 0 ? (
              <div>
                <ol>
                  <span>
                    There is not any Too Long Posts, More than 1500 words
                  </span>
                </ol>
              </div>
            ) : (
              <ol>
                {longPosts.map((post) => {
                  return (
                    <li>
                      <a href={post.url}>{`${post.title}`} </a>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
