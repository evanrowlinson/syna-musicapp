import {useState} from 'react';

export const useArtGen = () => {
    const [imageURL, setImageURL] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const generateArt = async (promptText) => {
        if (!promptText || promptText === '') return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/.netlify/functions/generate-art', {
                method: 'POST',
                headers:{ 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: promptText }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate artwork from AI network');
            }

            const resultData = await response.json();
            if (resultData && resultData.data && resultData.data[0] && resultData.data[0].url) {
                setImageURL(resultData.data[0].url);
            } else {
                throw new Error('Unexpected response format from image generator');
            }
        } catch (err) {
            console.error('Error generating art:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { imageURL, loading, error, generateArt };
};


