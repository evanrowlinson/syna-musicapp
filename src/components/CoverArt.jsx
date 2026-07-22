import React from 'react';

export const CoverArt = ({ imageURL, loading, error }) => {

    if (error) {
        return (
            <div className="art-error-banner">
            <p>Error loading artwork: {error}</p>
            </div>
        );
    }

    if (loading) {
    return (
        <div className="art-loading-container">
        <div className="spinner"></div>
        <p>Curating your custom artwork...</p>
        </div>
        );
    }

    if(!imageURL || imageURL === '') {
        return (
            <div className="art-placeholder">
            <p>Your AI-generated artwork will appear here.</p>
            </div>
        );
    }

    return (
        <div className="cover-art-card">
            <h3>Your AI-Generated Artwork</h3>
            <img
                src={imageURL}
                alt="AI generated artwork"
                className="responsive-art-image"
            />
            <a
                href={imageURL}
                target="_blank"
                rel="noreferrer"
                className="download-btn"
            >
                Download Artwork
            </a>
        </div>
    );
}
export default CoverArt;
