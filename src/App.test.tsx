import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('renders the trust-first hero, teams and the ultraplan list', async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: /trust-first research cockpit fuer medizinische ki-arbeit/i,
      }),
    ).toBeInTheDocument();

    await user.tab();
    expect(screen.getByRole('link', { name: /zum inhalt springen/i })).toHaveFocus();

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /north star/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByLabelText(/fortschritt: 20 von 20 aufgaben abgeschlossen/i)).toBeInTheDocument();

    expect(screen.getByText(/agent teams/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /a research ops/i, level: 3 })).toBeInTheDocument();
    const observabilitySection = screen
      .getByRole('heading', { name: /observability signals/i, level: 2 })
      .closest('section');
    expect(observabilitySection).not.toBeNull();
    expect(within(observabilitySection!).getByRole('heading', { name: /ci gate/i, level: 3 })).toBeInTheDocument();

    const releaseSection = screen
      .getByRole('heading', { name: /netlify release path/i, level: 2 })
      .closest('section');
    expect(releaseSection).not.toBeNull();
    expect(within(releaseSection!).getByRole('heading', { name: /preview deploy/i, level: 3 })).toBeInTheDocument();

    const workflowSection = screen
      .getByRole('heading', { name: /first workflow slice/i, level: 2 })
      .closest('section');
    expect(workflowSection).not.toBeNull();
    expect(within(workflowSection!).getByRole('button', { name: /frage und kontext/i })).toBeInTheDocument();

    const analyseContractButton = within(workflowSection!).getByRole('button', {
      name: /analysevertrag/i,
    });
    expect(analyseContractButton).toHaveAttribute('aria-pressed', 'true');
    expect(within(workflowSection!).getByRole('heading', { name: /aktiver fokus: analysevertrag/i, level: 3 })).toBeInTheDocument();
    expect(within(workflowSection!).getByText(/prompt contract/i)).toBeInTheDocument();

    await user.click(within(workflowSection!).getByRole('button', { name: /explainability review/i }));
    expect(within(workflowSection!).getByRole('heading', { name: /aktiver fokus: explainability review/i, level: 3 })).toBeInTheDocument();
    expect(within(workflowSection!).getByText(/ui review/i)).toBeInTheDocument();
    expect(within(workflowSection!).getByText(/evidence export mit e build test ops/i)).toBeInTheDocument();

    expect(screen.getByText(/critical controls/i)).toBeInTheDocument();

    const todoList = screen.getByRole('list', { name: /ultraplan aufgaben/i });
    expect(within(todoList).getAllByRole('listitem')).toHaveLength(20);
    expect(screen.getByText(/ultraplan-dokument erstellen/i)).toBeInTheDocument();
    expect(screen.getByText(/systematic flow/i)).toBeInTheDocument();
    expect(screen.getByText(/research intake/i)).toBeInTheDocument();
  });
});
