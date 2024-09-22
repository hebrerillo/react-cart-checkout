import {useEffect, useRef} from 'react';
import Post from '../components/Post';
import useNavigation from '../hooks/use-navigation';

function Posts() {
    const {currentPath, posts, fetchPosts} = useNavigation();
    const lastPost = useRef();
    const parentPosts = useRef();
    const observer = new IntersectionObserver(intersectionCallback, {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    });

    function intersectionCallback(entries) {
        if (entries[0].target === lastPost.current && entries[0].isIntersecting) {
            fetchPosts(parentPosts.current.childNodes.length);
        }
    }

    useEffect(() => {
        if (lastPost.current) {
            observer.observe(lastPost.current);
            return () => {
                observer.disconnect();
            };
        }
        else if (posts.length === 0 && currentPath === '/posts') {
            fetchPosts(parentPosts.current.childNodes.length);
        }
    });

    const renderedPosts = posts.map((post, index) => {
        return <div key={post.id} data-key={post.id} ref={(index === posts.length - 1) ? lastPost : null}><Post post={post} /></div>;
    });

    return (
            <div>
                <div ref={parentPosts}>{renderedPosts}</div>
            </div>
            );
}

export default Posts;