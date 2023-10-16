import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Comment from './Comment'
import ListComment from './ListComment'
import Rate from './Rate'

function Detail() {
    let params = useParams()

    const [data,setData] = useState("")
	const [comment,setComment] = useState([])
	const [votes,setVotes] = useState([])
	const [commentId,setCommentId] = useState()
	const [showComment, setShowComment] = useState(false)


    useEffect(() => {
        axios.get("https://localhost/laravel8/laravel8/public/api/blog/detail/" + params.id)
        .then(res => {
			setComment(res.data.data.comment)
            setData(res.data.data)
        })
        .catch(error => console.log(error))
    },[params.id])


	function getVotes(votes){
		setVotes(votes)
	}

	function getCmtId(id){
		setCommentId(id)
	}

	function showCmt(show){
		setShowComment(show)
	}


	function getCmt(data){
		// let merge = comment.concat(data)
        // setComment(merge)
		setComment([...comment,data])
	}



    function renderData(){
        if(Object.keys(data).length > 0){
            return (
                <div className="single-blog-post">
                <h3>{data.title}</h3>
                <div className="post-meta">
                    <ul>
                        <li><i className="fa fa-user"></i> Mac Doe</li>
                        <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                        <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                    </ul>
                    <span>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-half-o"></i>
                    </span> 
                </div>
                <a href="">
                    <img src={"https://localhost/laravel8/laravel8/public/upload/Blog/image/" + data.image } alt=""/>
                </a>
                <p>
                    {data.content}
                </p>
                <div className="pager-area">
                    <ul className="pager pull-right">
                        <li><a href="#">Pre</a></li>
                        <li><a href="#">Next</a></li>
                    </ul>
                </div>
            </div>
            )
        }
    }
	
	function countComment(){
		if(comment.length > 0){
			let numberComment = comment.length
			return numberComment
		}
	}

  return (
    <>
				<div className="col-sm-9">
					<div className="blog-post-area">
						<h2 className="title text-center">Latest From our Blog</h2>
                        {renderData()}
					</div>

					<div className="rating-area">
						<ul className="ratings">
							<li className="rate-this">Rate this item:</li>
							<li>
								<Rate votes={getVotes}  idBlog = {params.id} />
							</li>
							<li className="color">{votes} votes</li>
						</ul>
						<ul className="tag">
							<li>TAG:</li>
							<li><a className="color" href="">Pink <span>/</span></a></li>
							<li><a className="color" href="">T-Shirt <span>/</span></a></li>
							<li><a className="color" href="">Girls</a></li>
						</ul>
					</div>

					<div className="socials-share">
						<a href=""><img src="images/blog/socials.png" alt=""/></a>
					</div>

					<div className="media commnets">
						<a className="pull-left" href="#">
							<img className="media-object" src="images/blog/man-one.jpg" alt=""/>
						</a>
						<div className="media-body">
							<h4 className="media-heading">Annie Davis</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							<div className="blog-socials">
								<ul>
									<li><a href=""><i className="fa fa-facebook"></i></a></li>
									<li><a href=""><i className="fa fa-twitter"></i></a></li>
									<li><a href=""><i className="fa fa-dribbble"></i></a></li>
									<li><a href=""><i className="fa fa-google-plus"></i></a></li>
								</ul>
								<a className="btn btn-primary" href="">Other Posts</a>
							</div>
						</div>
					</div>
					<div className="response-area">
					<h2>{countComment()} RESPONSES</h2>
					<ListComment getCmtId={getCmtId} showCmt={showComment}    comment={comment} />
					</div>
					<div className="replay-box">
						<div className="row">
							<div className="col-sm-12">
								<h2>Leave a replay</h2>
								<Comment getCmt={getCmt} showCmt={showCmt} idComment={commentId} idBlog = {params.id} />
							</div>
						</div>
					</div>
				</div>	
    </>
  )
}

export default Detail