function IconPending({ strokeColor = "#000" }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2h12" />
        <path d="M6 22h12" />
        <path d="M6 2c0 5 6 5 6 10s-6 5-6 10" />
        <path d="M18 2c0 5-6 5-6 10s6 5 6 10" />
      </svg>
    );
  }
  
  export default IconPending;
  