import "./style.scss";
function CommentPlugin(props) {
  let { href } = props;
  let url = `${process.env.REACT_APP_URL}${href}`;
  return (
    <div className="comment-container">
      <div id="fb-root"></div>
      <div
        className="fb-comments"
        data-width="1000"
        data-href={href ? url : "https://shop.satomijin.id.vn/"}
        data-numposts="10"
        // style={{ background: "red" }}
      ></div>
    </div>
  );
}

export default CommentPlugin;
