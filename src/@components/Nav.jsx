import React from 'react';
import ActiveLastBreadcrumb from "./Breadcrumbs";

const Nav = ({activeLink, setActiveLink}) => {
    const links = ['Select Box', 'Delivery', 'Review']

    return (
        <div className='flex space-between align pr-40'>
        <ActiveLastBreadcrumb links={links} activeLink={activeLink} setActiveLink={setActiveLink}/>
        <p className='MuiTypography-body1'>Welcome to Lunch Box</p>
        </div>
    )
}

export default Nav;