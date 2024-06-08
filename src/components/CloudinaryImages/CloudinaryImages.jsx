import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'demo',
  },
});

export const CloudinaryImages = ({ path, size }) => {
  const myImage = cld.image(path);
  myImage.resize(
    thumbnail()
      .width(size.width)
      .height(size.height)
      .gravity(autoGravity()))
      .delivery(format('auto'))
      .delivery(quality('auto'));

  return <AdvancedImage cldImg={myImage} style={{ maxWidth: '100%' }} />;
};
