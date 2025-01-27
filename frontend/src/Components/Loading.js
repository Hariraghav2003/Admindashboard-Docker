import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function Loading() {
  //Loading Skelton
  return (
    <div>
      <h2>
        <Skeleton width={200} />
      </h2>
      <p>
        <Skeleton count={20} />
      </p>
    </div>
  );
}

export default Loading;
