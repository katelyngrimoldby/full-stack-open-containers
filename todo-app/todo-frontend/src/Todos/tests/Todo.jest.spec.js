import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todo from '../Todo';

const todos = [
  {
  _id: "639cbc70afdd5600aa69f49e",
  text: "Write code",
  done: true
  },
  {
  _id: "639cbc70afdd5600aa69f49f",
  text: "Learn about containers",
  done: false
  }
]

const user = userEvent
const mockUpdate = jest.fn()
const mockDelete = jest.fn()

describe('Todo', () => {
  describe('Incomplete Todo', () => {
    beforeEach(() => {
      render(<Todo todo={todos[1]} onClickComplete={mockUpdate} onClickDelete={mockDelete} />)
    })

    test('Component renders text', () => {
      screen.getByText(todos[1].text)
    })
  
    test('Component renders delete button', () => {
      screen.getByText('Delete')
    })
  
    test('Component renders proper status', () => {
      screen.getByText('This todo is not done')
    })

    test('Component renders update button', () => {
      screen.getByText('Set as done')
      
    })

    test('Delete button calls fn on click', () => {
      const button = screen.getByText('Delete')
      
      user.click(button)

      expect(mockDelete).toHaveBeenCalled()
    })

    test('Update button calls fn on click', () => {
      const button = screen.getByText('Set as done')

      user.click(button)

      expect(mockUpdate).toHaveBeenCalled()
    })
  })
  
  describe('Completed Todo', () => {
    beforeEach(() => {
      render(<Todo todo={todos[0]} onClickComplete={mockUpdate} onClickDelete={mockDelete} />)
    })

    test('Component renders text', () => {
      screen.getByText(todos[0].text)
    })
  
    test('Component renders delete button', () => {
      screen.getByText('Delete')
    })
  
    test('Component renders proper status', () => {
      screen.getByText('This todo is done')
    })

    test('Component does not render update button', () => {
      expect(screen.queryByText('Set as done')).toBeNull()
      
    })

    test('Delete button calls fn on click', () => {
      const user = userEvent
      const button = screen.getByText('Delete')
      
      user.click(button)

      expect(mockDelete).toHaveBeenCalled()
    })
  })
})