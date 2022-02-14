import {BLOG_ACTION, payloadBlogs} from './BlogAction';

const initialState: payloadBlogs = {
  arrBlog: [],
  isFistLoading: true,
  isError: false,
};

const BlogReducer = (
  state = initialState,
  action: {type: any; payload: payloadBlogs},
) => {
  switch (action.type) {
    case BLOG_ACTION.BLOG_SUCCESS:
      return {...state, arrBlog: action.payload.arrBlog, isFistLoading: false};
    case BLOG_ACTION.BLOG_FAIL:
      return {...state, arrBlog: [], isFistLoading: false, isError: true};
    default:
      return state;
  }
};

export default BlogReducer;
