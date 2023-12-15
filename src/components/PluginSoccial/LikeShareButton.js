function LikeShareButton(props) {
  let { dHref } = props;
  let url = `${process.env.REACT_APP_URL}${dHref}`;
  return (
    <div className="fb-like-comment-container">
      <div id="fb-root"></div>
      <div
        className="fb-like"
        // title="haha"
        data-href={dHref ? url : "https://shop.satomijin.id.vn/"}
        // data-href="https://shop.satomijin.id.vn"
        data-width="100"
        data-layout="standard"
        data-action="like"
        data-size="large"
        data-share="true"
      ></div>
    </div>
  );
}

export default LikeShareButton;
