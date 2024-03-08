import React, { useEffect, useRef, useState } from "react";
interface Props {
  url: string;
}
function DisplayImage(props: Props) {
  const [url, setUrl] = useState(props.url);
  const imgRef = useRef();
  useEffect(() => {
    setUrl(props.url);
    if (imgRef.current) {
      console.log(imgRef.current);
    }
  }, [props.url]);

  return (
    <div>
      <img
        ref={imgRef.current}
        src={url + "?" + new Date().getTime()}
        alt="Shown animal to guess"
        className="m-1 inline-block"
        height={100}
        width={100}
      />
    </div>
  );
}

export default DisplayImage;
