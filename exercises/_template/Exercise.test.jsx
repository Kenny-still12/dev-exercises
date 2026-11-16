import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Thing } from './Exercise.jsx'

describe('Level 1', () => {
  it('renders something', () => {
    render(<Thing />)
    expect(screen.getByText('...')).toBeInTheDocument()
  })
})

describe('Level 2', () => {
  it('handles interaction', async () => {
    const user = userEvent.setup()
    render(<Thing />)
    await user.click(screen.getByRole('button'))
  })
})
