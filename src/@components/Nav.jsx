import React from 'react';
import ActiveLastBreadcrumb from "./Breadcrumbs";

const Nav = ({activeLink, setActiveLink}) => {
    const links = ['Select Box', 'Delivery', 'Review']

    return (
        <ActiveLastBreadcrumb links={links} activeLink={activeLink} setActiveLink={setActiveLink}/>
    )
}

export default Nav;