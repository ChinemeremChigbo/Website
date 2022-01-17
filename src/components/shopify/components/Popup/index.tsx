import React, { useEffect } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { Picture } from "../../types";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import CircleLoader from "react-spinners/CircleLoader";
import "./index.scss";

// actions
import { getPreviousOrNextPicture } from "../../actions/apod";

const mapStateToProps = (state: RootState) => ({
  picture: state.pictures.queryPicture.picture,
  isLoading: state.pictures.queryPicture.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getPreviousOrNextPicture,
    },
    dispatch
  );
};

type Props = {
  getPreviousOrNextPicture: (date: string) => void;
  picture: Picture;
  isLoading: boolean;
  date: string;
};

const Popup: React.FC<Props> = ({
  getPreviousOrNextPicture,
  picture,
  isLoading,
  date,
}) => {
  useEffect(() => {
    getPreviousOrNextPicture(date);
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="image-loading">
          <CircleLoader size={20} />
        </div>
      ) : (
        <div className="image-popup">
          {picture.media_type === "video" ? (
            <video
              controls
              autoPlay
              loop
              muted
              preload="auto"
              src={picture.url}
            >
              <a href={picture.url}>link to the video</a>&nbsp;
            </video>
          ) : (
            <img src={picture.url} alt={picture.title} />
          )}
        </div>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
