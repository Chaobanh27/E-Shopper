import React from "react";
import { Link } from "react-router-dom";

function ListComment(props) {
  let comment = props.comment;

  function handleClick(e) {
    let cmtId = parseInt(e.target.id);
    props.getCmtId(cmtId);
  }

  
  function renderComment() {
    if (comment.length > 0) {
      return comment.map((value1, key1) => {
        if (value1.id_comment == 0 ) {
          return (
            <>
              <li key={key1} className="media">
                <div className="media-body">
                  <ul className="sinlge-post-meta">
                    <li>
                      <i className="fa fa-user"></i>Janis Gallagher
                    </li>
                    <li>
                      <i className="fa fa-clock-o"></i> 1:33 pm
                    </li>
                    <li>
                      <i className="fa fa-calendar"></i> DEC 5, 2013
                    </li>
                  </ul>
                  <p>{value1.comment}</p>
                  <a
                    id={value1.id}
                    onClick={handleClick}
                    className="btn btn-primary"
                    href="#text-area"
                  >
                    <i className="fa fa-reply"></i>Replay
                  </a>
                </div>
              </li>
              {comment.map((value2, key2) => {
                if (value2.id_comment == value1.id) {
                  return (
                      <li key={key2} class="media second-media">
                        <Link class="pull-left" >
                          <img
                            class="media-object"
                            src="images/blog/man-three.jpg"
                            alt=""
                          />
                        </Link>
                        <div class="media-body">
                          <ul class="sinlge-post-meta">
                            <li>
                              <i class="fa fa-user"></i>Janis Gallagher
                            </li>
                            <li>
                              <i class="fa fa-clock-o"></i> 1:33 pm
                            </li>
                            <li>
                              <i class="fa fa-calendar"></i> DEC 5, 2013
                            </li>
                          </ul>
                          <p>{value2.comment}</p>
                          <Link class="btn btn-primary" href="">
                            <i class="fa fa-reply"></i>Replay
                          </Link>
                        </div>
                      </li>
                  );
                }
              })}
            </>
          );
        }
      });
    }
  }

  return (
    <>
      <ul className="media-list">{renderComment()}</ul>
    </>
  );
}

export default ListComment;
