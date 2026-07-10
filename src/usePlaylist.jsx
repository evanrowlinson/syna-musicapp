import { useState, useEffect } from 'react';

const MOCK_AI_RESPONSE = {
  playlist: [
    {
      id: "track-001",
      title: "Nightcall",
      artist: "Kavinsky",
      justification: "A quintessential synthwave opener with neon-noir menace and a lonely, forward-driving pulse."
    },
    {
      id: "track-002",
      title: "Blinding Lights",
      artist: "The Weeknd",
      justification: "Bright, urgent, and emotionally distant, it channels late-night motion with a bittersweet edge."
    },
    {
      id: "track-003",
      title: "After Dark",
      artist: "Mr.Kitty",
      justification: "Dreamy and wistful, it keeps the mood melancholic while the beat stays propulsive for the road."
    },
    {
      id: "track-004",
      title: "Midnight City",
      artist: "M83",
      justification: "A glowing nocturnal anthem that lifts the energy without losing the reflective, city-at-night feeling."
    },
    {
      id: "track-005",
      title: "Turbo Killer",
      artist: "Carpenter Brut",
      justification: "High-octane synth aggression adds adrenaline for the drive while preserving the dark retro palette."
    },
    {
      id: "track-006",
      title: "A Real Hero",
      artist: "College & Electric Youth",
      justification: "Tender and cinematic, it provides the emotional core and lingering afterglow of the playlist."
    }
  ],
  dallePrompt: "Create a cinematic playlist cover art for a synthwave late-night drive, blending neon vaporwave color palettes with Edward Hopper’s lonely urban realism...",
  museumArtQueries: [
    {
      searchKeyword: "Edward Hopper",
      emotionalContext: "His nocturnal isolation and urban stillness match the lonely, reflective side of a late-night drive."
    },
    {
      searchKeyword: "Caspar David Friedrich",
      emotionalContext: "His Romantic sense of vast atmosphere and inward feeling mirrors the melancholic, searching tone."
    },
    {
      searchKeyword: "J. M. W. Turner",
      emotionalContext: "His luminous motion and stormy color can echo the speed, blur, and emotional charge of synthwave energy."
    }
  ]
};

export function usePlaylist(userInputs, options = { useMock: true }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userInputs) return;

    const fetchPlaylistData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (options.useMock) {
          // Simulate network delay for a authentic app loading experience
          await new Promise((resolve) => setTimeout(resolve, 1500));
          setData(MOCK_AI_RESPONSE);
        } else {
          // Future live connection via Evan's Netlify function
          throw new Error("Live API proxy route not yet configured.");
        }
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistData();
  }, [userInputs, options.useMock]);

  return { data, loading, error };
}