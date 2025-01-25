import { render, screen, fireEvent } from '@testing-library/react';
import { TabsComponent, TTab } from '../ui/tabs'; 
import '@testing-library/jest-dom';
import { vi } from 'vitest';

describe('TabsComponent', () => {
  const tabs: TTab[] = [
    { id: 1, label: 'Tab 1' },
    { id: 2, label: 'Tab 2' },
    { id: 3, label: 'Tab 3' },
  ];

  const mockOnClick = vi.fn();

  it('renders all tabs correctly', () => {
    render(<TabsComponent selectedId={1} onClick={mockOnClick} tabs={tabs} />);

    tabs.forEach((tab) => {
      if (tab.label) {
        expect(screen.getByText(tab.label)).toBeInTheDocument();
      }
    });
  });

  it('sets the correct tab as selected', () => {
    render(<TabsComponent selectedId={2} onClick={mockOnClick} tabs={tabs} />);

    const activeTab = screen.getByText('Tab 2');
    
    expect(activeTab).toBeInTheDocument();
    
    expect(screen.getByText('Tab 1')).not.toHaveClass('openTab');
    expect(screen.getByText('Tab 3')).not.toHaveClass('openTab');
  });

  it('changes active tab on click', () => {
    render(<TabsComponent selectedId={1} onClick={mockOnClick} tabs={tabs} />);

    fireEvent.click(screen.getByText('Tab 3'));

    expect(mockOnClick).toHaveBeenCalledWith(3);

    expect(screen.getByText('Tab 3')).toBeInTheDocument();
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
  });
});
