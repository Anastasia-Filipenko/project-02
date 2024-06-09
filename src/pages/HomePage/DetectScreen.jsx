import { useDispatch } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { setCurrentScreen } from '../../redux/common/slice';
import { useEffect } from 'react';

export const DetectScreen = () => {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery(
    '(min-width: 1440px) and (max-resolution: 1dppx)'
  );
  const isDesktop2x = useMediaQuery(
    '(min-width: 1440px) and (min-resolution: 2dppx)'
  );

  const isTablet = useMediaQuery(
    '(min-width: 768px) and (max-resolution: 1dppx)'
  );

  const isTablet2x = useMediaQuery(
    '(min-width: 768px) and (min-resolution: 2dppx)'
  );

  const isMobile = useMediaQuery(
    '(max-width: 767px) and (max-resolution: 1dppx)'
  );

  const isMobile2x = useMediaQuery(
    '(max-width: 767px) and (min-resolution: 2dppx)'
  );

  const allScreens = [
    { name: 'desktop', isCurrent: isDesktop },
    { name: 'desktop2x', isCurrent: isDesktop2x },
    { name: 'tablet', isCurrent: isTablet },
    { name: 'tablet2x', isCurrent: isTablet2x },
    { name: 'mobile', isCurrent: isMobile },
    { name: 'mobile2x', isCurrent: isMobile2x },
  ];
  const currentScreen = allScreens.find(e => e.isCurrent);
  useEffect(() => {
    if (currentScreen && currentScreen.name) {
      dispatch(setCurrentScreen(currentScreen.name));
    }
  });

  return <></>;
};
