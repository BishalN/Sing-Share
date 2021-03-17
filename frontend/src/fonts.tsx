import { Global } from '@emotion/react';
export const Fonts = () => (
  <Global
    styles={`
     
      @font-face {
        font-family: 'poppins';
        font-style: bold;
        font-weight: 700;
        font-display: swap;
        src:  url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }

      @font-face {
        font-family: 'poppins';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src:  url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }


     
      `}
  />
);
