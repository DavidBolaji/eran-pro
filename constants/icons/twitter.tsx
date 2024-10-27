import React from 'react';

export const TwitterIcon: React.FC<{ size?: string; color?: string }> = ({
  size = "24",
  color = "#23342A",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.12397 8.95464C3.07427 7.86128 3.22096 6.84502 3.40465 6.04365C4.29725 6.95253 5.33585 7.71212 6.48141 8.28872C8.19898 9.15323 10.1037 9.57955 12.0259 9.52971C12.5679 9.51566 13 9.07223 13 8.53005V7.53005H13.0001L12.9999 7.51664C12.9904 6.80381 13.2 6.10525 13.6004 5.51542C14.0008 4.9256 14.5726 4.47297 15.2387 4.21876C15.9047 3.96455 16.6327 3.92102 17.3243 4.09407C18.0159 4.26711 18.6376 4.64837 19.1054 5.18628C19.3636 5.48308 19.7717 5.60099 20.1483 5.48758C20.38 5.41783 20.6092 5.3411 20.8357 5.25755C20.6469 5.50421 20.4406 5.73835 20.2178 5.95804C19.9802 6.19242 19.8751 6.52994 19.9378 6.8578C19.9784 7.07006 19.9992 7.28561 20 7.50172C19.9995 12.9009 17.4365 16.6752 13.9052 18.5548C11.307 19.9377 8.13027 20.3234 4.96011 19.5157C6.23421 19.1489 7.45069 18.5815 8.56163 17.8274C8.86205 17.6235 9.02833 17.2728 8.99604 16.9111C8.96374 16.5494 8.73794 16.2337 8.40614 16.0862C6.31604 15.1573 5.04029 13.9677 4.26669 12.7462C3.48908 11.5184 3.18045 10.1971 3.12397 8.95464Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
