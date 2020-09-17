import React, { useState } from 'react';
// @ts-ignore
import LazyLoad from 'react-lazy-load';


const LazyLoader = ({ imgSrc, alt }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const imgOnLoad = () => setLoaded(true);
  const className = `${loaded ? 'loaded' : ''}`;


  return (
    <LazyLoad debounce={false} offsetVertical={300}>
      <img src={imgSrc} alt={alt} onLoad={imgOnLoad} className={className} />
    </LazyLoad>
  );
};

type Props = {
  imgSrc: any;
  alt: string;
};

export default LazyLoader;
