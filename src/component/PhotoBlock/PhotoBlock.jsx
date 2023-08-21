import React, { useState } from "react";
import { saveAs } from "file-saver";

const PhotoBlock = ({ item }) => {

  const [modal,setModal] = useState(false)


  const handleDownload = () => {
    let url = item?.urls?.full;
    saveAs(url, item?.alt_description);
  };

  return (
    <>
      <div className="photoBlock" onClick={()=>{setModal(!modal)}}>
        <img src={item?.urls?.regular} alt={item?.alt_description} download />
        <button onClick={handleDownload}>Download</button>
      </div>
     { modal && <div className="photoModal">
         <div className="modalContent">
           <button>Close</button>
           <img src={item?.urls?.regular} alt={item?.alt_description} download />
         </div>
      </div>}
    </>
  );
};

export default PhotoBlock;
