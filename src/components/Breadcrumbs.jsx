import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

export default function ActiveLastBreadcrumb({
  links = [],
  activeLink,
  setActiveLink,
}) {
  function handleClick(event, i) {
    event.preventDefault();
    setActiveLink(i);
  }

  let formattedLinks = links.map((link, i) => {
    const isActive = activeLink === i;
    return (
      <Link
        key={i}
        color={isActive ? "textPrimary" : "inherit"}
        onClick={(e) => handleClick(e, i)}
        aria-current={isActive}
        disabled={link === 'add-ons'}
      >
        {link}
      </Link>
    );
  });
  return <div className='p-10'><Breadcrumbs aria-label="breadcrumb">{formattedLinks}</Breadcrumbs></div>;
}
