import React, { useEffect, useState } from 'react';
import './PopupAd.css';

const PopupAd = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show the popup after a small delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isVisible) {
            // Load Ad Script 1
            const script1 = document.createElement('script');
            script1.async = true;
            script1.dataset.cfasync = "false";
            script1.src = "https://pl29225410.profitablecpmratenetwork.com/ab4ea247d9ccffb1ad68860d7aba4c25/invoke.js";
            document.body.appendChild(script1);

            // Load Ad Script 2 (High Performance Format)
            const script2 = document.createElement('script');
            script2.innerHTML = `
                window.atOptions = {
                    'key' : 'd0b8e41c0de5960448802ebec9fbaea2',
                    'format' : 'iframe',
                    'height' : 300,
                    'width' : 160,
                    'params' : {}
                };
            `;
            document.body.appendChild(script2);

            const script3 = document.createElement('script');
            script3.src = "https://www.highperformanceformat.com/d0b8e41c0de5960448802ebec9fbaea2/invoke.js";
            document.body.appendChild(script3);

            return () => {
                // Cleanup scripts if component unmounts (optional, but good practice)
                // document.body.removeChild(script1);
                // document.body.removeChild(script2);
                // document.body.removeChild(script3);
            };
        }
    }, [isVisible]);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="popup-overlay" onClick={handleClose}>
            <div className="popup-card holo-card" onClick={(e) => e.stopPropagation()}>
                <div className="corner tl"></div>
                <div className="corner tr"></div>
                <div className="corner bl"></div>
                <div className="corner br"></div>
                
                <button className="close-btn" onClick={handleClose}>&times;</button>
                
                <div className="popup-header">
                    <span className="section-tag">Special Update</span>
                    <h3 className="section-title neon-cyan">Featured Highlight</h3>
                    <div className="section-line"></div>
                </div>

                <div className="popup-content">
                    {/* Container for Script 1 */}
                    <div id="container-ab4ea247d9ccffb1ad68860d7aba4c25"></div>
                    
                    {/* Script 2 will likely inject its iframe here or at the end of body */}
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '1rem' }}>
                        Supporting Ishantnu's Portfolio
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PopupAd;
