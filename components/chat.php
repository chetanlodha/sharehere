<div class="chat-container d-flex flex-wrap bg-grey">

    <div class="chat-list-container bg-white rounded shadow">

        <div class="chat-header d-flex justify-content-between align-items-center pt-3 p-2">

            <div class="d-flex align-items-center">
                <?php if (!$_SESSION['profile_picture']) { ?>
                    <div class="bg-grey rounded-circle">
                        <img class="profile-icon-placeholder" src="assets/icons/profile-user.svg" alt="User profile" />
                    </div>
                <?php } else { ?>
                    <img class="profile-icon d-none d-md-block" src="php/post/post/uploads/<?php echo $_SESSION['profile_picture'] ?>" alt="User profile" />
                <?php } ?>
                <h4 class="ml-3 mb-0"><strong>Chats</strong></h4 class="ml-3">
            </div>

            <img src="./assets/icons/close-square.svg" onclick="closeChat(); $('.nav-item[data-page=home]').click()" class="icon closeChat mr-3">
        </div>

        <div class="search-container d-flex justify-content-between align-items-center m-1 mt-2 rounded bg-grey px-3 ">
            <input class="form-control w-100 bg-grey" type="text" name="search" placeholder="Search people">
            <img class="icons ml-2 p-1" src="assets/icons/nav-search.svg" alt="Search people">
        </div>

        <div class="search-results"></div>

        <div class="chat-list px-2"></div>
    </div>

    <div class="chat-window default active flex-fill flex-column justify-content-center mx-md-3">
        <p class="text-center">Get started by starting a conversation</p>
    </div>

</div>