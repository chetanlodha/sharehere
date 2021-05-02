<section class="profile-header d-flex flex-wrap rounded shadow-light p-3 position-relative">
    <div class="row-1 d-flex flex-column justify-content-center align-items-center mx-auto">
        <div class="profile-image-container position-relative">
            <img class="profile-image rounded-circle shadow m-3" alt="User profile image">
            <div class="profile-placeholder-image-container  flex-column justify-content-around align-items-center rounded-circle shadow m-3">
                <img class="profile-placeholder-image mb-1 w-50 h-50 border-0" src="assets/icons/profile-user.svg" alt="User profile image">
            </div>
            <img class="icons" src="assets/icons/edit.svg" alt="Add profile picture" onclick="$(this).next().next().click()">
            <label class="d-none" for="profile-picture">Add profile picture</label>
            <input class="d-none" type="file" name="profile-picture">
        </div>

        <h5><strong></strong></h5>
    </div>
    <div class="row-2 d-flex flex-column flex-grow-1 justify-content-center mt-2 mt-md-0">
        <div class="flex-grow-1 d-flex justify-content-center align-items-center text-center">
            <h6>"Lorem ipsum dolor sirt amet"</h6>
        </div>
        <div class="d-flex justify-content-between position-relative mb-1 mt-2 mt-md-0">
            <div class="info d-flex align-items-center ml-md-2">
                <span class="about" onclick="$('.about-container').addClass('visible')">About</span>
                <span class="friends">Friends</span>
                <span class="photos">Photos</span>
            </div>
            <div class="actions d-flex flex-wrap">
                <img class="icons hidden add-friend" src="assets/icons/profile-addFriend.svg" alt="Add Friend">
                <img class="icons hidden request-sent" src="assets/icons/request-sent.svg" alt="Request Sent">
                <img class="icons hidden remove-friend" src="assets/icons/profile_friend.svg" alt="Remove Friend">
                <img class="icons hidden send-message" src="assets/icons/message-send-bold.svg" alt="Send message">
            </div>
            <div class="confirmRemoveFriend hidden">
                <span>Are you sure you want to remove?</span>
                <img class="icons" src="assets/icons/tick-square.svg" alt="Confirm remove friend">
            </div>
        </div>
    </div>
    <div class="about-container p-3">
        <div class="d-flex justify-content-between pt-2">
            <h4 class="font-weight-bold ml-4">About</h4>
            <div class="mr-1">
                <img class="icons" src="assets/icons/edit-square.svg" alt="Edit profile">
                <img class="icons ml-2" src="assets/icons/close-square.svg" alt="Close about" onclick="$(this).parents('.about-container').removeClass('visible')">
            </div>
        </div>
    </div>
</section>
<section class="latest-posts">
    <h4 class="font-weight-bold ml-3 my-2">All posts</h4>
    <div class="posts-container d-flex flex-column"></div>
</section>
<section class="friends-container animateBottomToTop">
    <div class="d-flex justify-content-between align-items-center">
        <h4 class="font-weight-bold m-3">Friends</h4>
        <img class="icons close-friends-tab mr-2" src="assets/icons/close-square.svg" alt="Close friends tab">
    </div>
    <div class="friends-list d-flex flex-column flex-lg-row flex-wrap">
        <div class="col1 col d-flex flex-column mt-2 px-1"></div>
        <div class="col2 col d-flex flex-column mt-2 px-1"></div>
    </div>
</section>