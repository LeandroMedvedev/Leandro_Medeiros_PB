import Svg, { Path } from 'react-native-svg';

export default function SvgComponent({ src }) {
  return (
    <Svg
      viewBox='0 0 297 297'
      width={30}
      height={30}
      xmlns='http://www.w3.org/2000/svg'
    >
      <Path d={src} fill='currentColor' />
    </Svg>
  );
}
