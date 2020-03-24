import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitForElement } from '@testing-library/react'
jest.mock('../services/BlogService')
import App from '../App'







describe('Login test', () => {
    let component
    let savedItems = {
        user: '{"blogs":[],"username":"abcd1","name":"abcd","id":"5e0381cf49ec95072b5ef4a4"}',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiY2QxIiwiaWQiOiI1ZTAzODFjZjQ5ZWM5NTA3MmI1ZWY0YTQiLCJpYXQiOjE1NzczNzcwNjF9.11FFmzynbXm2EX8TDOhA-psVvUZNBqBJ6PZGIF8jroU'
    }
    const localStorageMock = {
        setItem: (key, item) => {
            savedItems[key] = item
        },
        getItem: (key) => savedItems[key],
        clear: () => {
            savedItems = {}
        }
    }

    test('if no user logged, blogs are not rendered', async () => {
        component = render(<App />)
        const element = await waitForElement(
            () => component.getByText('Login')
        )
        expect(element).toBeDefined
        expect(component.container).not.toHaveTextContent('React patterns Michael Chan')
    })

    test('if user logged, blogs are not rendered', async () => {
        Object.defineProperty(window, 'localStorage', { value: localStorageMock })
        component = render(<App />)
        const element = await waitForElement(
            () => component.getByText('logout')
        )
        expect(element).toBeDefined
        expect(component.container).toHaveTextContent('React patterns Michael Chan')
    })

})