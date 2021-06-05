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
      <p
        key={i}
        color={isActive ? "textPrimary" : "inherit"}
        aria-current={isActive}
        className={isActive ? 'active' : null}
      >
        {link}
      </p>
    );
  });
  return <div className='p-10'><Breadcrumbs aria-label="breadcrumb">{formattedLinks}</Breadcrumbs></div>;
}
