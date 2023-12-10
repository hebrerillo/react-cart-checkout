import {useState, useEffect} from 'react';
import Post from '../components/Post';

function Posts() {

    const [posts, setPosts] = useState([]);

    const renderedPosts = posts.map((post) => {
        return <Post key={post.id} post={post} />;
    });


    async function fetchData() {
        console.log("getting posts");
        const result = await fetch('http://localhost/posts.php?start=0');
        const remotePosts = await result.json();
        setPosts(remotePosts);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
            <div>
                <div>Posts</div>
                <div>{renderedPosts}</div>
            </div>
            );
}

export default Posts;