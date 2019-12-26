import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from '../components/SimpleBlog'
import Blog from '../components/Blog'

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
    let component
    beforeEach(() => {
        component = render(
            <Blog blog={blog} />
        )
    })

    test('renders title and author', () => {
        const element = component.getByText('React patterns Michael Chan')
        expect(element).toBeDefined()
    })
    test('collapse by default', () => {
        const element = component.container.querySelector('div:nth-child(2)')
        expect(element).toHaveStyle('display: none')
    })
    test('expand after click', () => {
        const target = component.container.querySelector('div:nth-child(2)')
        const trigger = component.getByText('React patterns Michael Chan')
        fireEvent.click(trigger)
        expect(target).not.toHaveStyle('display: none')
    })
})