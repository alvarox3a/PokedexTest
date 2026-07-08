import FastImage from "@d11/react-native-fast-image";

interface CustomImageProps {
  uri: string;
  style: { width: number; height: number };
}

export const CustomImage = ({
  uri,
  style
}: CustomImageProps) => (
  <FastImage
    style={style}
    source={{
      uri,
      priority: FastImage.priority.high,
      cache: FastImage.cacheControl.immutable
    }}
    resizeMode={FastImage.resizeMode.contain}
  />
);
