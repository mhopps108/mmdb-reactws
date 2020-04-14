const size = {
  mobile: "320px",
  small: "500px",
  tablet: "768px",
  desktop: "1000px",
};

export const device = {
  min: {
    mobile: `(min-width: ${size.mobile})`,
    small: `(min-width: ${size.small})`,
    tablet: `(min-width: ${size.tablet})`,
    desktop: `(min-width: ${size.desktop})`,
  },
  max: {
    mobile: `(max-width: ${size.mobile})`,
    tablet: `(max-width: ${size.tablet})`,
    desktop: `(max-width: ${size.desktop})`,
  },
  between: {
    mobileTablet: `(min-width: ${size.mobile}) and (max-width: ${size.tablet})`,
    tabletDesktop: `(min-width: ${size.tablet}) and (max-width: ${size.desktop})`,
  },
};
