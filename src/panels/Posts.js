import {useEffect, useRef, useCallback} from 'react';
import Post from '../components/Post';
import getPosts from '../utils/getPosts';

function Posts({showLoaderCB, posts, postsCB}) {
    const lastPost = useRef();
    const parentPosts = useRef();
    const observer = new IntersectionObserver(intersectionCallback, {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    });

    function intersectionCallback(entries) {
        if (entries[0].target === lastPost.current && entries[0].isIntersecting) {
            stableFetchData();
        }
    }

    const stableFetchData = useCallback(async () => {
        showLoaderCB(true);
        const remotePosts = await getPosts(parentPosts.current.childNodes.length, true);
        postsCB(remotePosts);
        showLoaderCB(false);
    }, [showLoaderCB, postsCB]);

    useEffect(() => {
        stableFetchData();
    }, [stableFetchData]);

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