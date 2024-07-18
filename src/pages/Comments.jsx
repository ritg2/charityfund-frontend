import axios from "axios";
import { useState } from "react";
import { useOutletContext, useLoaderData } from "react-router-dom";

function Comments() {
  const id = useOutletContext();
  const data = useLoaderData();
  const [postComment, setPostComment] = useState("");
  const [comments, setComments] = useState(data.data);

  const handleComment = (event) => {
    const { value } = event.target;
    setPostComment(value);
  };

  const submitComment = async (event) => {
    event.preventDefault();
    const { accessToken } = JSON.parse(localStorage.getItem("auth"));
    try {
      const { data } = await axios.post(
        `http://localhost:5001/api/v1/comment/${id}/comments`,
        { content: postComment },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log(data);
      setComments((prevComment) => ({
        ...prevComment,
        comments: [data, ...prevComment.comments],
      }));
      setPostComment("");
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message ?? "unable to post comment");
    }
  };

  const loadMoreComments = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5001/api/v1/comment/${id}/comments?page=${
          comments.currentPage + 1
        }`
      );
      setComments((prevComment) => ({
        ...data,
        comments: [...prevComment.comments, ...data.comments],
      }));
      console.log(data);
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message ?? "unable to load more comments");
    }
  };

  const listComments = comments.comments.map((comment) => {
    return <div key={comment._id}>{comment.content}</div>;
  });

  return (
    <div>
      <div>
        <div>
          <textarea
            name="comment"
            value={postComment}
            onChange={handleComment}
            id=""
            placeholder="Add a comment"
          />
          <button onClick={submitComment}>submit</button>
        </div>

        {comments.comments.length ? (
          listComments
        ) : (
          <div>
            <p>No comments</p>
          </div>
        )}
        {comments.currentPage < comments.totalPages && (
          <button onClick={loadMoreComments}>View more comments</button>
        )}
      </div>
    </div>
  );
}

export const commentsLoader = async ({ params }) => {
  const { id } = params;
  try {
    let response = await axios.get(
      `http://localhost:5001/api/v1/comment/${id}/comments`
    );
    return response;
  } catch (error) {
    console.error(error);
    return { data: { comments: [], totalPages: 0 } };
  }
};

export default Comments;
