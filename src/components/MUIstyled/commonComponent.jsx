import sprite from '../../assets/sprite.svg';
import {
  StyledButton,
  StyledSvgBox,
  StyledSvgBoxColumn,
  StyledSvg,
  StyledColumnSvg
} from './styledComponent';

export const StyledPlusIcon = () => {
  return (
    <StyledSvgBox>
      <StyledSvg>
        <use xlinkHref={`${sprite}#icon-plus`}></use>
      </StyledSvg>
    </StyledSvgBox>
  );
};

export const StyledPlusIconColumn = () => {
  return (
    <StyledSvgBoxColumn>
      <StyledColumnSvg>
        <use xlinkHref={`${sprite}#icon-plus`}></use>
      </StyledColumnSvg>
    </StyledSvgBoxColumn>
  );
};

export const StyledSubmitButtonWithPlusicon = ({ children }) => {
  return (
    <StyledButton type="submit" startIcon={<StyledPlusIcon />}>
      {children}
    </StyledButton>
  );
};
