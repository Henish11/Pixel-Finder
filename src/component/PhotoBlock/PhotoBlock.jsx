import React, { useState } from "react";
import { saveAs } from "file-saver";
import Img from "../Lazyload/Img";
import { AiOutlineDownload } from "react-icons/ai";
import { MdClose } from "react-icons/md";

const PhotoBlock = ({ item }) => {
  const [modal, setModal] = useState(false);

  const handleDownload = () => {
    let url = item?.urls?.full;
    saveAs(url, item?.alt_description);
  };

  return (
    <>
      <div
        className="photoBlock"
        onClick={() => {
          setModal(!modal);
        }}
      >
        <Img
          className="mainImage"
          src={item?.urls?.regular}
          alt={item?.alt_description}
        />
        <div className="hoverBlock">
          <div className="userInfo">
            <img src={item?.user?.profile_image?.small} alt="" />
            <span className="name">{item?.user?.name}</span>
          </div>
          <button onClick={handleDownload} className="downloadIcon">
            <AiOutlineDownload />
          </button>
        </div>
      </div>
      {modal && (
        <div className="photoModal">
          <div className="modalContent">
            <div className="modalContentInner">
              <div className="topWrap">
                <div className="userInfo">
                  <img src={item?.user?.profile_image?.small} alt="" />
                  <span className="name">{item?.user?.name}</span>
                </div>
                <div className="topBtn">
                  <button onClick={handleDownload}>
                    <AiOutlineDownload />
                  </button>
                  <button onClick={() => setModal(!modal)}>
                    <MdClose />
                  </button>
                </div>
              </div>
              <img
                src={item?.urls?.regular}
                alt={item?.alt_description}
                download
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoBlock;
