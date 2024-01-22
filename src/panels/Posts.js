import {useState, useEffect, useRef} from 'react';
import Post from '../components/Post';

function Posts() {

    const [posts, setPosts] = useState([]);
    const lastPost = useRef();
    const parentPosts = useRef();
    const observer = new IntersectionObserver(intersectionCallback, {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    });

    function intersectionCallback(entries) {
        if (entries[0].target === lastPost.current && entries[0].isIntersecting) {
            fetchData();
        }
    }

    async function fetchData() {
        const result = await fetch('http://localhost/posts.php?start=' + parentPosts.current.childNodes.length);
        const remotePosts = await result.json();
        const newPosts = posts.concat(remotePosts);
        setPosts(newPosts);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (lastPost.current) {
            observer.observe(lastPost.current);
        }
    });

    const renderedPosts = posts.map((post, index) => {
        let component = null;
        if (index === posts.length - 1) {
            component = <div key={post.id} data-key={post.id} ref={lastPost}><Post post={post} /></div>;
        }
        else {
            component = <div key={post.id} data-key={post.id} ><Post post={post} /></div>;
        }

        return component;
    });

    return (
            <div>
                <div>Posts</div>
                <div ref={parentPosts}>{renderedPosts}</div>
            </div>
            );
}

export default Posts;