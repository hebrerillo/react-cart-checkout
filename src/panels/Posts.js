import {useState, useEffect, useRef} from 'react';
import Post from '../components/Post';

function Posts() {

    const [posts, setPosts] = useState([]);
    const parentPosts = useRef();
    const [counterRequests, setCounterRequests] = useState(0);
    const [counterVisible, setCounterVisible] = useState(0);
    const lastPost = useRef();
    const observer = new IntersectionObserver(intersectionCallback, {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    });

    function intersectionCallback(entries) {
        if (entries[0].target === lastPost.current && entries[0].isIntersecting) {
            setCounterVisible(counterVisible + 1);
        }
    }

    async function fetchData() {
        console.log("getting posts", parentPosts);
        const result = await fetch('http://localhost/posts.php?start=' + parentPosts.current.childNodes.length);
        const remotePosts = await result.json();
        setPosts((currentPosts) => {
            return currentPosts.concat(remotePosts);
        });
    }

    useEffect(() => {
        fetchData().then(() => {
            setCounterRequests(() => {
                return counterRequests + 1;
            });
        });
    }, [counterVisible]);

    useEffect(() => {
        if (lastPost.current) {
            observer.observe(lastPost.current);
        }
    }, [counterRequests]);

    const renderedPosts = posts.map((post, index) => {
        let component = null;
        if (index === posts.length - 1) {
            component = <div key={post.id} ref={lastPost}><Post post={post} /></div>;
        }
        else {
            component = <div key={post.id} ><Post post={post} /></div>;
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