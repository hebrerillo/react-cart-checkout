import InternalServerError from './InternalServerError';

async function getPosts(index, options = {}) {
    return !options.mock ? await getPostsFetch(index): await getPostsMock(index, options);
}

async function getPostsFetch(index) {
    const result = await fetch('http://localhost/posts.php?start=' + index);
    return result.json();
}

async function getPostsMock(index, options) {
    let data = [];
    for (let i = index; i < index + 10; i++) {
        data.push({
            id: i,
            description: `post guapo ${i}`
        });
    }

    return new Promise((resolve, reject) => {
        window.setTimeout(() => {
            if (options.forceInternalError) {
                reject(new InternalServerError());
                return;
            }
            else if(options.forceConnectionError) {
                reject(new Error());
                return;
            }
            resolve(data);
        }, 2000);
    });
}

export default getPosts;