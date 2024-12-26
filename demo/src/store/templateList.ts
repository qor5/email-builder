import { USER } from '@demo/constants';
import { article, IArticle } from '@demo/services/article';
import { UserStorage } from '@demo/utils/user-storage';
import createSliceState from './common/createSliceState';

export default createSliceState({
  name: 'templateList',
  initialState: [] as IArticle[],
  reducers: {
    set: (state, action) => state,
  },
  effects: {
    fetch: async state => {
      let provideUserData: IArticle[] = [];
      // if (USER.provideUserId && USER.provideCategoryId) {
      //   // Provided template
      //   const data = await article.getArticleList({
      //     userId: USER.provideUserId,
      //     categoryId: USER.provideCategoryId,
      //     page: 1,
      //     size: 1000,
      //   });
      //   provideUserData = data.list;
      // }

      const data = await article.getArticleList();

      provideUserData = data.data.map(item => {
        const listdata = JSON.parse(item.json_body);
        console.log(listdata);
        return {
          article_id: item.ID,
          // path: "St. Patrick's Day - Newsletter.json",
          title: item.subject,
          created_at: item.CreatedAt,
          updated_at: item.UpdatedAt,
        };
      });

      // user data
      const list = [...provideUserData];
      list.sort((a, b) => (a.updated_at > b.updated_at ? -1 : 1));
      return list;
    },
  },
});
