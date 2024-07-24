import { useCallback, useState } from "react";
import { useOutletContext, useLoaderData, Form } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function Comments() {
  const id = useOutletContext();
  const data = useLoaderData();
  const [comments, setComments] = useState(data.data);

  const loadMoreComments = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/comment/${id}/comments?page=${comments.currentPage + 1}`
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
  }, [id, comments.currentPage]);

  const listComments = comments.comments.map((comment) => {
    return (
      <div key={comment._id} className="flex gap-2">
        <img
          className="h-6 mt-1 rounded-full"
          src={comment.userDetails.profile_picture.url}
        ></img>
        <div>
          <p><b>{comment.userDetails.username}</b></p>
          <p>{comment.content}</p>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="pt-4">
        <Form method="post" className="flex gap-2">
          <img
            src="https://res.cloudinary.com/dzr31apfk/image/upload/PngItem_307416_yy94m5.png"
            alt=""
            className="h-6 rounded-full"
          />
          <textarea
            name="comment"
            placeholder="Add a comment"
            className="w-full px-2 rounded-sm max-h-12"
          />
          <button type="submit" className="self-end">
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="p-2 rounded-lg hover:bg-gray-200 "
            />
          </button>
        </Form>

        {comments.comments.length ? (
          listComments
        ) : (
          <div>
            <p>No comments</p>
          </div>
        )}
        {comments.currentPage < comments.totalPages && (
          <button
            onClick={loadMoreComments}
            className="w-full p-2 text-center bg-white rounded-full text-cyan hover:bg-gray-200"
          >
            View more comments
          </button>
        )}
      </div>
    </div>
  );
}

export const commentsLoader = async ({ params }) => {
  const { id } = params;
  try {
    let response = await axiosInstance.get(`/api/v1/comment/${id}/comments`);
    console.log("reapeated api calls");
    return response;
  } catch (error) {
    console.error(error);
    return { data: { comments: [], totalPages: 0 } };
  }
};

export const commentsAction = async ({ params, request }) => {
  const formData = await request.formData();
  const comment = formData.get("comment");
  if (!comment.trim()) {
    alert("cannot submit empty comment");
    return [];
  }
  try {
    const { data } = await axiosInstance.post(
      `/api/v1/comment/${params.id}/comments`,
      { content: comment }
    );
    console.log(data);
  } catch (error) {
    console.error(error);
    alert(error?.response?.data?.message ?? "unable to post comment");
  }

  return [];
};

export default Comments;
