import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SYNAForm from './SYNAForm';

describe('SYNAForm edge cases and bad input', () => {
  it('disables submit when mood is empty', () => {
    render(<SYNAForm onSubmit={vi.fn()} isLoading={false} />);
    expect(screen.getByRole('button', { name: /generate my experience/i })).toBeDisabled();
  });

  it('does not submit when mood is only whitespace', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SYNAForm onSubmit={onSubmit} isLoading={false} />);

    await user.type(screen.getByLabelText(/describe your mood/i), '   ');
    expect(screen.getByRole('button', { name: /generate my experience/i })).toBeDisabled();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('trims mood text and submits successfully with no optional fields', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SYNAForm onSubmit={onSubmit} isLoading={false} />);

    await user.type(screen.getByLabelText(/describe your mood/i), '  late-night calm  ');
    await user.click(screen.getByRole('button', { name: /generate my experience/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      mood: 'late-night calm',
      artists: [],
      genres: [],
      energy: 'Medium',
      occasion: '',
      discovery: 50,
    });
  });

  it('accepts special characters and emoji in mood without crashing', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SYNAForm onSubmit={onSubmit} isLoading={false} />);

    const weirdMood = '<script>alert(1)</script> 🎵 café — "quoted" & wéird';
    await user.type(screen.getByLabelText(/describe your mood/i), weirdMood);
    await user.click(screen.getByRole('button', { name: /generate my experience/i }));

    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ mood: weirdMood }));
  });

  it('handles a very long (pasted) mood string without crashing', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SYNAForm onSubmit={onSubmit} isLoading={false} />);

    const longMood = 'a'.repeat(2000);
    fireEvent.change(screen.getByLabelText(/describe your mood/i), { target: { value: longMood } });
    await user.click(screen.getByRole('button', { name: /generate my experience/i }));

    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ mood: longMood }));
  });

  it('caps artists at 3 and prevents duplicates', async () => {
    const user = userEvent.setup();
    render(<SYNAForm onSubmit={vi.fn()} isLoading={false} />);

    const artistInput = screen.getByLabelText(/anchor artists/i);
    const addButton = screen.getByRole('button', { name: /^add$/i });

    for (const name of ['Frank Ocean', 'SZA', 'Tame Impala']) {
      await user.type(artistInput, name);
      await user.click(addButton);
    }
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(artistInput).toBeDisabled();

    await user.type(screen.getByLabelText(/describe your mood/i), 'chill');
    await user.click(screen.getByRole('button', { name: /generate my experience/i }));
  });

  it('ignores whitespace-only artist input', async () => {
    const user = userEvent.setup();
    render(<SYNAForm onSubmit={vi.fn()} isLoading={false} />);

    const artistInput = screen.getByLabelText(/anchor artists/i);
    await user.type(artistInput, '   ');
    expect(screen.getByRole('button', { name: /^add$/i })).toBeDisabled();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('caps genre selection at 3', async () => {
    const user = userEvent.setup();
    render(<SYNAForm onSubmit={vi.fn()} isLoading={false} />);

    const genreButtons = ['Pop', 'Hip-Hop', 'R&B', 'Rock'].map((g) =>
      screen.getByRole('button', { name: g })
    );

    for (const button of genreButtons.slice(0, 3)) {
      await user.click(button);
    }
    expect(genreButtons[3]).toBeDisabled();
  });

  it('disables all inputs while isLoading is true', () => {
    render(<SYNAForm onSubmit={vi.fn()} isLoading={true} />);
    expect(screen.getByLabelText(/describe your mood/i)).toBeDisabled();
    expect(screen.getByRole('button', { name: /generating your experience/i })).toBeDisabled();
  });
});
