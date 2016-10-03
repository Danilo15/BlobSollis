using System;

namespace BlogSollisNegocio.Model
{
    public class HomeAdmViewModel
    {
        private PostsCol postsColSource;

        public PostsCol PostsColSource
        {
            get
            {
                return postsColSource;
            }

            set
            {
                postsColSource = value;
            }
        }

        public HomeAdmViewModel()
        {
            postsColSource = new PostsCol(true, true);
        }

        public void Index(HomeAdmViewModel viewModel)
        {
            
        }
    }
}