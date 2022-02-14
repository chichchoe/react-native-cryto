import {Api_URl} from '../../../common/Common';
import {BlogModel, IResponse} from '../../../models/Blog.Model';

export enum BLOG_ACTION {
  BLOG_SUCCESS = '@BLOG_ACTION/LIST_SUCCESS',
  BLOG_FAIL = '@BLOG_ACTION/LIST_FAIL',
}
export type payloadBlogs = {
  arrBlog?: BlogModel[];
  isFistLoading?: boolean;
  isError?: boolean;
};
export const getBlog = () => {
  return (dispatch: (arg0: {type: string; payload?: payloadBlogs}) => void) => {
    const dateNow = String(Math.round(Date.now() / 1000));
    fetch(Api_URl + '/data/v2/news/?lTs=' + dateNow)
      .then(response => response.json())
      .then((data: IResponse) => {
        if (data && data.Type === 100) {
          dispatch({
            type: BLOG_ACTION.BLOG_SUCCESS,
            payload: {
              arrBlog: data.Data || [],
            },
          });
        } else {
          dispatch({
            type: BLOG_ACTION.BLOG_FAIL,
          });
        }
      })
      .catch(_err => {
        dispatch({
          type: BLOG_ACTION.BLOG_FAIL,
        });
      });
  };
};
