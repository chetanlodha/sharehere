<section class="create-post mx-1 mx-md-0 p-4 bg-white rounded shadow-light">
    <form id="createPost" class="d-flex flex-row justify-content-between w-100" method="post" enctype="multipart/form-data">
        <textarea name="content" rows="4" class="form-control w-100 mr-3 p-3" placeholder="What's on your mind?"></textarea>
        <div class="create-post-actions d-flex flex-column align-items-center">
            <div class="position-relative">
                <img class="mt-2 icons" src="./assets/icons/tick-square.svg" alt="Creat post">
                <button class="position-absolute submit w-100 h-100" type="submit"></button>
            </div>
            <div class="position-relative">
                <img class="mt-2 ml-1 icons" src="./assets/icons/add-image.svg" alt="Add media to post" onclick="$(this).next().click()">
                <input class="d-none" type="file" name="image[]" multiple>
            </div>
        </div>
    </form>
</section>

<section class="latest-posts">
    <h4 class="font-weight-bold m-3">Latest posts</h4>
    <div class="posts-container d-flex flex-column">
    </div>
</section>