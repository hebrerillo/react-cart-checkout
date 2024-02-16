async function getPosts(index, mock = false) {
    return !mock ? getPostsFetch(index): getPostsMock(index);
}

async function getPostsFetch(index) {
    const result = await fetch('http://localhost/posts.php?start=' + index);
    return result.json();
}

async function getPostsMock(index) {
    let data = [];
    for (let i = index; i < index + 10; i++) {
        data.push({
            id: i,
            description: `post guapo ${i}`
        });
    }

    return new Promise((resolve) => {
        window.setTimeout(() => resolve(data), 2000);
    });
}

export default getPosts;