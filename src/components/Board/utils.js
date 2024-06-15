import { cld } from '../CloudinaryImages/cloudinaryClient';

export const generateBgUrl = (selectedBg, screen) => {
    let folderName;
    switch (screen) {
      case 'desktop':
        folderName = 'bg/desktop';
        break;
      case 'desktop2x':
        folderName = 'bg/desktop2x';
        break;
      case 'tablet':
        folderName = 'bg/tablet';
        break;
      case 'tablet2x':
        folderName = 'bg/tablet2x';
        break;
      case 'mobile':
        folderName = 'bg/mobile';
        break;
      case 'mobile2x':
        folderName = 'bg/mobile2x';
        break;
      default:
        folderName = 'bg/desktop';
    }
    return cld.image(`${folderName}/${selectedBg}`).toURL();
  };
  