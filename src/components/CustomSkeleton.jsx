import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

//eslint-disable-next-line
export const CustomSkeleton = ({ count }) => (
  <SkeletonTheme baseColor="#8b8c8c" highlightColor="#737373">
    <Skeleton count={count} />
  </SkeletonTheme>
);