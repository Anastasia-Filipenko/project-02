// import React from 'react';

// const Icon = ({ id, width, height, color }) => (
//   <svg width={width} height={height} fill={color}>
//     <use xlinkHref={`#${id}`} />
//   </svg>
// );

// export default Icon;

// import sprite from '../../assets/img/icon.svg';

// const Icon = ({ id, className, width, height }) => {
//   return (
//     <>
//       <svg className={className} width={width} height={height}>
//         <use href={`${sprite}#${id}`}></use>
//       </svg>
//     </>
//   );
// };

// export default Icon;

import sprite from '../../assets/symbol-defs.svg';

const Icon = ({ id, className, width, height }) => {
  return (
    <>
      <svg className={className} width={width} height={height}>
        <use href={`${sprite}#${id}`}></use>
      </svg>
    </>
  );
};

export default Icon;
