import React from "react";
import './Header.css';


/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({black}) => {
    return(
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://media.gettyimages.com/id/1377867918/pt/foto/a-netflix-logo-is-seen-during-the-hom-temporary-store-opening-to-launch-the-new-hom-collection.jpg?s=612x612&w=0&k=20&c=3jD9KMEquVbYzJW0w7Vz7DFUMNp01Oq-jixBE89XxX4=" alt="Logo Netflix" />
                </a>
            </div>
            <div className="header--user">
                <a href="">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="user netflix" />
                </a>
            </div>
        </header>
    );
}