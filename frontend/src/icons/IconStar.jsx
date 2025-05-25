function IconStar({ strokeColor }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 17.27L18.18 21L16.545 13.97L22 9.23999L14.81 8.62999L12 2L9.19 8.62999L2 9.23999L7.455 13.97L5.82 21L12 17.27Z"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  
  export default IconStar;
  