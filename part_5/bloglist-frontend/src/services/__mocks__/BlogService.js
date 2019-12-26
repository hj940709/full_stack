
const blogs = [
    {
        likes: 15,
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        id: '5e0371cc7bec1e6d4a4fd02e',
        user: { username: 'abcd1', name: 'abcd', id: '5e0381cf49ec95072b5ef4a4' }
    },
    {
        likes: 7,
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        user: { username: 'abcd1', name: 'abcd', id: '5e0381cf49ec95072b5ef4a4' },
        id: '5e0371cc7bec1e6d4a4fd02f',
    },
    {
        likes: 17,
        title: 'asdfghj',
        author: 'asdffgh',
        url: 'asdasd',
        user: { username: 'abcd1', name: 'abcd', id: '5e0381cf49ec95072b5ef4a4' },
        id: '5e04b31af50c913bb3d5a8af',
    }
]
const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll }