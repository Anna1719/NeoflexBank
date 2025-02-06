import { render, screen, fireEvent } from '@testing-library/react';
import { Tooltip } from "../ui/tooltip"

describe('Tooltip component', () => {
  it('does not show the tooltip initially', () => {
    render(
      <Tooltip tooltipText="This is a tooltip">
        <button>Hover over me</button>
      </Tooltip>
    );

    const tooltip = screen.queryByText(/This is a tooltip/i);
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveClass('_closeTooltip_b1558d');
  });

  it('shows the tooltip on mouse enter', () => {
    render(
      <Tooltip tooltipText="This is a tooltip">
        <button>Hover over me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Hover over me'));

    const tooltip = screen.getByText(/This is a tooltip/i);
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveClass('_openTooltip_b1558d');
  });

  it('hides the tooltip on mouse leave', () => {
    render(
      <Tooltip tooltipText="This is a tooltip">
        <button>Hover over me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Hover over me'));

    const tooltip = screen.getByText(/This is a tooltip/i);
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveClass('_openTooltip_b1558d'); 

    fireEvent.mouseLeave(screen.getByText('Hover over me'));

    expect(tooltip).toHaveClass('_closeTooltip_b1558d');
  });
});
