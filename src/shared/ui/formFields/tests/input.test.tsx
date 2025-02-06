import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from '../ui/input';
import { UseFormRegisterReturn } from 'react-hook-form';

const mockRegister = (): UseFormRegisterReturn => ({
  onChange: vi.fn(),
  onBlur: vi.fn(),
  name: 'testField',
  ref: vi.fn(),
});

describe('Input component', () => {
  it('renders with the correct label and placeholder', () => {
    render(
      <Input
        id="test-input"
        label="Test Input"
        placeholder="Enter text"
        register={mockRegister()}
        sub={false}
      />
    );

    expect(screen.getByText('Test Input')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Enter text') as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });

  it('shows error message when error is passed', () => {
    render(
      <Input
        id="test-input"
        label="Test Input"
        error="This field is required"
        register={mockRegister()}
        sub={true}
      />
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();

  });

  it('formats the input value when formatter is provided', () => {
    const formatter = (value: string) => value.toUpperCase();

    render(
      <Input
        id="test-input"
        label="Test Input"
        placeholder="Enter text"
        register={mockRegister()}
        formatter={formatter}
        sub={false}
      />
    );

    const input = screen.getByPlaceholderText('Enter text') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });

    expect(input.value).toBe('TEST');
  });
});
