import defaultUserIcon from "icon/abstract-user-flat-3.png";

const Talk_Message = ({ msObj, isCreator }) => {
  const time = msObj.regDate;
  return (
    <>
      {isCreator ? (
        <div className="talk_main_me">
          <span className="talk_time">{msObj.regDate}</span>
          <p className="talk_ms">{msObj.text}</p>
        </div>
      ) : (
        <div className="talk_main_other">
          <img
            src={msObj.sendPhotoUrl ? msObj.sendPhotoUrl : defaultUserIcon}
          />
          <span className="talk_displayName">{msObj.sendDisplayName}</span>
          <br></br>
          <p className="talk_ms">{msObj.text}</p>
          <span className="talk_time">{msObj.regDate}</span>
        </div>
      )}
    </>
  );
};

export default Talk_Message;
