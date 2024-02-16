import React from "react";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";
import PropTypes from "prop-types";
import Image from "next/image";

interface BlogProps {
  title: string;
  image: string;
  subtitle: string;
  text: string;
  color: string;
}

const Blog: React.FC<BlogProps> = ({ image, title, subtitle, text, color }) => {
  return (
    <Card>
      <div style={{ position: "relative", width: "100%", height: "200px" }}>
        <img
          alt={image}
          className="h-full"
          src={
            image
              ? image
              : "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
          }
        />
      </div>
      <CardBody className="p-3">
        <CardTitle tag="h5" className="h-10 overflow-hidden">
          <strong>
            {" "}
            {title
              ? title.length < 80
                ? `${title}`
                : `${title.substring(0, 32)} ...`
              : "This news has now heading"}
          </strong>
        </CardTitle>
        {/* <CardSubtitle> <small className="text-gray-400">{subtitle}</small></CardSubtitle> */}
        <CardText className="mt-1 h-12 overflow-hidden">
          <small className="text-gray-400">
            {" "}
            {text.length < 80 ? `${text}` : `${text.substring(0, 32)} ...`}
          </small>{" "}
        </CardText>
        <Button color={"primary"} className="btn-sm my-2">
          Read More
        </Button>
      </CardBody>
    </Card>
  );
};

Blog.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
  subtitle: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Blog;
