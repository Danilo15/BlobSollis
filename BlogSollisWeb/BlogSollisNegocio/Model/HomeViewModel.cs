using System.Collections.Generic;

namespace BlogSollisNegocio.Model
{
    public class HomeViewModel
    {
        #region Propriedades

        private PostsCol postsCol;

        public PostsCol PostsCol
        {
            get
            {
                return postsCol;
            }

            set
            {
                postsCol = value;
            }
        }

        #endregion Propriedades

        #region Constructor

        public HomeViewModel()
        {
            postsCol = new PostsCol(true, false);
        }

        #endregion Constructor
    }
}