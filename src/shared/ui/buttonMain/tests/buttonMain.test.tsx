import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ButtonMain } from '../ui/buttonMain';

describe('ButtonMain component', () => {
  it('applies default styles when no props are provided', () => {
    render(<ButtonMain data-testid="button" />);
    const button = screen.getByTestId('button');

    expect(button.className).toContain('buttonMain');
  });

  it('applies custom styles based on props', () => {
    render(
      <ButtonMain
        radius={16}
        width={148}
        color="red"
        height={40}
        data-testid="button"
      />
    );
    const button = screen.getByTestId('button');

    expect(button.className).toContain('buttonMain');
    expect(button.className).toContain('buttonRadius-16');
    expect(button.className).toContain('buttonWidth-148');
    expect(button.className).toContain('buttonColor-red');
    expect(button.className).toContain('buttonHeight-40');
  });

  it('adds additional className from props', () => {
    render(
      <ButtonMain
        radius={8}
        className="custom-class"
        data-testid="button"
      />
    );
    const button = screen.getByTestId('button');

    expect(button.className).toContain('custom-class');
    expect(button.className).toContain('buttonRadius-8');
  });

  it('calls the onClick handler when clicked', () => {
    const onClickMock = vi.fn();
    render(<ButtonMain onClick={onClickMock} data-testid="button" />);

    const button = screen.getByTestId('button');
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});