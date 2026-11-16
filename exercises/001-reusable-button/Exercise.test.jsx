import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Exercise.jsx'

describe('Level 1 - Basics', () => {
  it('renders a button with its children', () => {
    render(<Button>Save</Button>)
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('defaults type to "button"', () => {
    render(<Button>Save</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('defaults to primary + md classes', () => {
    render(<Button>Save</Button>)
    expect(screen.getByRole('button').className).toBe('btn btn--primary btn--md')
  })

  it.each(['primary', 'secondary', 'danger'])('supports variant="%s"', (variant) => {
    render(<Button variant={variant}>Go</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn', `btn--${variant}`)
  })

  it.each(['sm', 'md', 'lg'])('supports size="%s"', (size) => {
    render(<Button size={size}>Go</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn', `btn--${size}`)
  })

  it('combines variant and size', () => {
    render(
      <Button variant="danger" size="sm">
        Delete
      </Button>,
    )
    expect(screen.getByRole('button').className).toBe('btn btn--danger btn--sm')
  })
})

describe('Level 2 - Intermediate', () => {
  it('forwards onClick', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('forwards native attributes', () => {
    render(
      <Button aria-label="Close dialog" data-testid="close" title="Close">
        X
      </Button>,
    )
    const button = screen.getByTestId('close')
    expect(button).toHaveAttribute('aria-label', 'Close dialog')
    expect(button).toHaveAttribute('title', 'Close')
  })

  it('forwards disabled and does not fire onClick when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Nope
      </Button>,
    )
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('lets the caller override type', () => {
    render(<Button type="submit">Send</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('appends the caller className after its own classes', () => {
    render(<Button className="mt-4 wide">Save</Button>)
    expect(screen.getByRole('button').className).toBe('btn btn--primary btn--md mt-4 wide')
  })

  it('has no stray whitespace or "undefined" without className', () => {
    render(<Button size="lg">Save</Button>)
    const { className } = screen.getByRole('button')
    expect(className).not.toMatch(/undefined|null|\s{2,}|^\s|\s$/)
  })
})

describe('Level 3 - Stretch', () => {
  it('loading disables the button and sets aria-busy', () => {
    render(<Button loading>Saving</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
  })

  it('loading wins over disabled={false}', () => {
    render(
      <Button loading disabled={false}>
        Saving
      </Button>,
    )
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('loading renders a hidden spinner before the children', () => {
    render(<Button loading>Saving</Button>)
    const button = screen.getByRole('button')
    const spinner = button.querySelector('.btn__spinner')
    expect(spinner).not.toBeNull()
    expect(spinner).toHaveAttribute('aria-hidden', 'true')
    expect(button.firstChild).toBe(spinner)
    expect(button).toHaveTextContent('Saving')
  })

  it('does not render the spinner or aria-busy when not loading', () => {
    render(<Button>Save</Button>)
    const button = screen.getByRole('button')
    expect(button.querySelector('.btn__spinner')).toBeNull()
    expect(button).not.toHaveAttribute('aria-busy', 'true')
  })

  it('renders leftIcon before the children', () => {
    render(<Button leftIcon={<svg data-testid="icon" />}>Add</Button>)
    const button = screen.getByRole('button')
    const iconWrapper = button.querySelector('.btn__icon')
    expect(iconWrapper).not.toBeNull()
    expect(iconWrapper).toContainElement(screen.getByTestId('icon'))
    expect(button.firstChild).toBe(iconWrapper)
  })

  it('hides leftIcon while loading', () => {
    render(
      <Button loading leftIcon={<svg data-testid="icon" />}>
        Add
      </Button>,
    )
    expect(screen.queryByTestId('icon')).toBeNull()
  })

  it('forwards ref to the button element', () => {
    const ref = createRef()
    render(<Button ref={ref}>Focus me</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    expect(ref.current).toBe(screen.getByRole('button'))
  })
})
