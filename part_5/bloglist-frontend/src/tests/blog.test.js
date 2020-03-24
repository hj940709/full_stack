import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from '../components/SimpleBlog'
import Blog from '../components/Blog'
import { prettyDOM } from '@testing-library/dom'
import BlogForm from '../components/BlogForm'

describe('Simple blog test', () => {
    let numClick = 0

    const blog = {
        title: 'abcdefg',
        author: 'qwert',
        likes: 20
    }
    const clickHandler = () => {
        numClick += 1
    }
    let component
    beforeEach(() => {
        component = render(
            <SimpleBlog blog={blog} onClick={clickHandler}/>
        )
    })

    test('renders title and author', () => {
        const element = component.getByText('abcdefg qwert')
        expect(element).toBeDefined()
    })
    test('renders likes', () => {
        expect(component.container).toHaveTextContent(`blog has ${blog.likes} likes`)
    })

    test('click test', () => {
        const button = component.container.querySelector('button')
        fireEvent.click(button)
        fireEvent.click(button)
        expect(numClick).toBe(2)
    })
})

describe('Blog test', () => {
    const blog = {
        likes: 15,
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        id: '5e0371cc7bec1e6d4a4fd02e',
        user: {
            username: 'abcd1',
            name: 'abcd',
            id: '5e0381cf49ec95072b5ef4a4'
        }
    }
    let blogComponent
    let blogForm
    const likeHandler = jest.fn()
    const postHandler = jest.fn()
    beforeEach(() => {
        blogComponent = render(
            <Blog blog={blog} likeHandler={likeHandler}/>
        )
        blogForm = render(
            <BlogForm postHandler={postHandler} />
        )
    })

    test('renders title and author but not url and like', () => {
        const element_a = blogComponent.getByText('React patterns Michael Chan')
        expect(element_a).toBeDefined()
        const element_b = blogComponent.container.querySelector('div:nth-child(2)')
        expect(element_b).toHaveStyle('display: none')
    })
    test('expand after click', () => {
        const target = blogComponent.container.querySelector('div:nth-child(2)')
        const trigger = blogComponent.getByText('React patterns Michael Chan')
        fireEvent.click(trigger)
        expect(target).not.toHaveStyle('display: none')
    })
    test('2 likes', () => {
        const trigger = blogComponent.container.querySelector('#like')
        fireEvent.click(trigger)
        fireEvent.click(trigger)
        expect(likeHandler.mock.calls.length).toBe(2)
    })
    test('<BlogForm /> updates state and calls onSubmit', () => {
        const title = blogForm.container.querySelector('#title')
        const author = blogForm.container.querySelector('#author')
        const url = blogForm.container.querySelector('#url')
        const form = blogForm.container.querySelector('form')
        fireEvent.change(url, {
            target: { value: 'testing url' }
        })
        fireEvent.change(title, {
            target: { value: 'testing title' }
        })
        fireEvent.change(author, {
            target: { value: 'testing author' }
        })
        fireEvent.submit(form)
        expect(postHandler.mock.calls.length).toBe(1)
        expect(postHandler.mock.calls[0][0]).toBe('testing title' )
        expect(postHandler.mock.calls[0][1]).toBe('testing author' )
        expect(postHandler.mock.calls[0][2]).toBe('testing url' )
    })
})