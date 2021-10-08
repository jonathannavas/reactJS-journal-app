import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div 
                className="journal__entry-picture" 
                style={{ 
                        backgroundSize: 'cover',
                        backgroundImage: 'url(https://rccl-h.assetsadobe.com/is/image/content/dam/royal/content/destinations/australia-new-zealand/new-zealand-milford-sound-fjord.jpg?$750x667$)' 
                }}>
            </div>
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Un nuevo día
                </p>
                <p className="journal__entry-content">
                    loremEiusmod minim aliqua cupidatat nostrud voluptate. 
                </p>
            </div>
            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>
        </div>
    )
}
