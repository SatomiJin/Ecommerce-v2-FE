import Helmet from "react-helmet";
import LikeShareButton from "../PluginSoccial/LikeShareButton";

function HeadTags(props) {
  let { metaDescription, image, dHref } = props;
  let title = "Satomi Jin Shop";

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" key="description" content={metaDescription} />
        <meta name="title" key="title" content={metaDescription} />
        <meta property="og:title" key="og:title" content={title} />
        <meta property="og:locale" key="og:locale" content="vi_VN" />
        <meta charSet="utf-8" />
        <meta property="og:type" key="og:type" content="website" />
        <meta property="og:description" key="og:description" content={metaDescription} />
        <meta property="og:image" key="og:image" content={image} />
      </Helmet>
      <LikeShareButton dHref={dHref} />
    </div>
  );
}

export default HeadTags;
