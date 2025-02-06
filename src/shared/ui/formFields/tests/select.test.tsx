import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from '../ui/select'; 
import { vi } from 'vitest';

const mockUseForm = () => ({
  control: {},
  handleSubmit: vi.fn(),
  formState: { errors: {} },
});

vi.mock('react-hook-form', () => ({
  ...vi.importActual('react-hook-form'),
  useForm: mockUseForm,
}));

describe('Select component', () => {

  it('renders options correctly', () => {
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ];

    render(
      <Select
        id="test-select"
        label="Test Label"
        register={{ name: 'test', onChange: vi.fn(), onBlur: vi.fn(), ref: vi.fn() }}
        options={options}
      />
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('displays error message when error is passed', () => {
    render(
      <Select
        id="test-select"
        label="Test Label"
        register={{ name: 'test', onChange: vi.fn(), onBlur: vi.fn(), ref: vi.fn() }}
        error="This is a required field"
      />
    );

    expect(screen.getByText('This is a required field')).toBeInTheDocument();
  });

  it('selects an option correctly', () => {
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ];

    render(
      <Select
        id="test-select"
        label="Test Label"
        register={{ name: 'test', onChange: vi.fn(), onBlur: vi.fn(), ref: vi.fn() }}
        options={options}
      />
    );

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } });

    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;

    expect(selectElement.value).toBe('2');
  });
});
