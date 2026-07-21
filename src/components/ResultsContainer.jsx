import React, {useState, useEffect} from 'react';
import {useGenArt} from '../hooks/useArtGen';
import {CoverArt} from './CoverArt';

    export const ResultsContainer = () => {
        const [promptText, setPromptText] = useState('');
        const { imageURL, loading, error, generateArt } = useGenArt();

        const handleSubmit = (e) => {
            e.preventDefault();
            if (promptText.trim() !== '') {
                generateArt(promptText);
            }
        };

        return (
            <div className="results-container-module">
                <h2>Playlist Theme Generator</h2>

                <form onSubmit={handleSubmit} className = "prompt-form">
                    <input
                        type="text"
                        value={promptText}
                        onChange={(e) => setPromptText(e.target.value)}
                        placeholder="Please enter your playlist theme or mood..."
                        disabled={loading}
                        className="prompt-input"
                    />
                    <button type="submit" disabled={loading} className="generate-btn">
                        {loading ? 'Generating...' : 'Generate Artwork'}
                    </button>
                </form>
                <CoverArt imageURL={imageURL} loading={loading} error={error} />
            </div>
        );
    };