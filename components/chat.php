<div class="chat-container d-flex flex-wrap rounded bg-white">
    <div class="chat-list-container rounded shadow">
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
            <img src="./assets/icons/close-square.svg" onclick="$('.nav-item[data-page=home]').click()" class="icon mr-3">
        </div>
        <!-- <div class=""></div> -->
        <div class="search-container d-flex justify-content-between align-items-center m-1 mt-2 rounded bg-grey px-3 ">
            <input class="form-control w-100 bg-grey" type="text" name="search" placeholder="Search people">
            <img class="icons ml-2 p-1" src="assets/icons/nav-search.svg" alt="Search people">
        </div>
        <div class="search-results">
        </div>
        <div class="chat-list">

            <div class="chat-user d-flex align-items-center">
                <div class="bg-grey rounded-circle">
                    <img class="profile-icon-placeholder" src="assets/icons/profile-user.svg" alt="User profile" />
                </div>
                <div class="ml-2 text-left">
                    <span class="">Chetan lodha </span>
                    <p class="mb-0"><small>Chetan lodha</small></p>

                </div>
                <span class="flex-fill text-right "><small>1:44 pm</small></span>
            </div>
            <div class="chat-user d-flex align-items-center">
                <div class="bg-grey rounded-circle">
                    <img class="profile-icon-placeholder" src="assets/icons/profile-user.svg" alt="User profile" />
                </div>
                <div class="ml-2 text-left">
                    <span class="">Chetan lodha</span>
                    <p class="mb-0"><small>Chetan lodha</small></p>

                </div>
                <span class="flex-fill text-right "><small>1:44 pm</small></span>
            </div>

            <div class="chat-user d-flex align-items-center">
                <div class="bg-grey rounded-circle">
                    <img class="profile-icon-placeholder" src="assets/icons/profile-user.svg" alt="User profile" />
                </div>
                <div class="ml-2 text-left">
                    <span class="">Chetan lodha</span>
                    <p class="mb-0"><small>Chetan lodha</small></p>

                </div>
                <span class="flex-fill text-right "><small>1:44 pm</small></span>
            </div>

            <div class="chat-user d-flex align-items-center">
                <div class="bg-grey rounded-circle">
                    <img class="profile-icon-placeholder" src="assets/icons/profile-user.svg" alt="User profile" />
                </div>
                <div class="ml-2 text-left">
                    <span class="">Chetan lodha</span>
                    <p class="mb-0"><small>Chetan lodha</small></p>

                </div>
                <span class="flex-fill text-right "><small>1:44 pm</small></span>
            </div>
            <div class="chat-user d-flex align-items-center">
                <div class="bg-grey rounded-circle">
                    <img class="profile-icon-placeholder" src="assets/icons/profile-user.svg" alt="User profile" />
                </div>
                <div class="ml-2 text-left">
                    <span class="">Chetan lodha</span>
                    <p class="mb-0"><small>Chetan lodha</small></p>

                </div>
                <span class="flex-fill text-right "><small>1:44 pm</small></span>
            </div>
            <div class="chat-user d-flex align-items-center">
                <div class="bg-grey rounded-circle">
                    <img class="profile-icon-placeholder" src="assets/icons/profile-user.svg" alt="User profile" />
                </div>
                <div class="ml-2 text-left">
                    <span class="">Chetan lodha</span>
                    <p class="mb-0"><small>Chetan lodha</small></p>

                </div>
                <span class="flex-fill text-right "><small>1:44 pm</small></span>
            </div>
            <div class="chat-user d-flex align-items-center">
                <div class="bg-grey rounded-circle">
                    <img class="profile-icon-placeholder" src="assets/icons/profile-user.svg" alt="User profile" />
                </div>
                <div class="ml-2 text-left">
                    <span class="">Chetan lodha</span>
                    <p class="mb-0"><small>Chetan lodha</small></p>

                </div>
                <span class="flex-fill text-right "><small>1:44 pm</small></span>
            </div>
            <div class="chat-user d-flex align-items-center">
                <div class="bg-grey rounded-circle">
                    <img class="profile-icon-placeholder" src="assets/icons/profile-user.svg" alt="User profile" />
                </div>
                <div class="ml-2 text-left">
                    <span class="">Chetan lodha</span>
                    <p class="mb-0"><small>Chetan lodha</small></p>

                </div>
                <span class="flex-fill text-right "><small>1:44 pm</small></span>
            </div>
            <div class="chat-user d-flex align-items-center">
                <div class="bg-grey rounded-circle">
                    <img class="profile-icon-placeholder" src="assets/icons/profile-user.svg" alt="User profile" />
                </div>
                <div class="ml-2 text-left">
                    <span class="">Chetan lodha</span>
                    <p class="mb-0"><small>Chetan lodha</small></p>

                </div>
                <span class="flex-fill text-right "><small>1:44 pm</small></span>
            </div>
            <div class="chat-user d-flex align-items-center">
                <div class="bg-grey rounded-circle">
                    <img class="profile-icon-placeholder" src="assets/icons/profile-user.svg" alt="User profile" />
                </div>
                <div class="ml-2 text-left">
                    <span class="">Chetan lodha</span>
                    <p class="mb-0"><small>Chetan lodha</small></p>

                </div>
                <span class="flex-fill text-right "><small>1:44 pm</small></span>
            </div>

            <div class="chat-user d-flex align-items-center">
                <div class="bg-grey rounded-circle">
                    <img class="profile-icon-placeholder" src="assets/icons/profile-user.svg" alt="User profile" />
                </div>
                <div class="ml-2 text-left">
                    <span class="">Chetan lodha</span>
                    <p class="mb-0"><small>Chetan lodha</small></p>

                </div>
                <span class="flex-fill text-right "><small>1:44 pm</small></span>
            </div>


        </div>
    </div>

    <div class="chat-window flex-fill flex-column d-flex mx-3 py-3">
        <div class="header d-flex justify-content-between">
            <div class="d-flex align-items-center">
                <div class="bg-grey rounded-circle">
                    <img class="profile-icon-placeholder" src="assets/icons/profile-user.svg" alt="User profile" />
                </div>
                <div class="ml-2 text-left">
                    <span class="">Archishman Bhattacharjee</span>
                    <p class="mb-0"><small>Chetan lodha</small></p>
                </div>
            </div>
            <div class="d-flex align-items-center">
                <img class="icons ml-2 p-1" src="assets/icons/nav-search.svg" alt="Search people">
            </div>
        </div>
        <div class="messages d-flex flex-column flex-fill px-5 mb-3">

            <div class="message sent d-flex justify-content-end mb-2">
                <div class="rounded px-3 py-2">
                    <span>Hi chetan!</span>
                    <span class="time w-100 mt-1 ml-2">
                        <small>
                            12:02 am
                        </small>
                    </span>
                </div>
            </div>
            <div class="message received rounded bg-grey px-3 py-2 mb-2">
                <span>Hi chetan!</span>
                <span class="time w-100 mt-1 ml-2">
                    <small>
                        12:02 am
                    </small>
                </span>
            </div>
            <div class="message sent d-flex justify-content-end mb-2">
                <div class="rounded px-3 py-2">
                    <span>Hi chetan!</span>
                    <span class="time w-100 mt-1 ml-2">
                        <small>
                            12:02 am
                        </small>
                    </span>
                </div>
            </div>
            <div class="message received rounded bg-grey px-3 py-2 mb-2">
                <span>Hi chetan!</span>
                <span class="time w-100 mt-1 ml-2">
                    <small>
                        12:02 am
                    </small>
                </span>
            </div>
            <div class="message sent d-flex justify-content-end mb-2">
                <div class="rounded px-3 py-2">
                    <span>Hi chetan!</span>
                    <span class="time w-100 mt-1 ml-2">
                        <small>
                            12:02 am
                        </small>
                    </span>
                </div>
            </div>
            <div class="message received rounded bg-grey px-3 py-2 mb-2">
                <span>Hi chetan!</span>
                <span class="time w-100 mt-1 ml-2">
                    <small>
                        12:02 am
                    </small>
                </span>
            </div>
            <div class="message sent d-flex justify-content-end mb-2">
                <div class="rounded px-3 py-2">
                    <span>Hi chetan!</span>
                    <span class="time w-100 mt-1 ml-2">
                        <small>
                            12:02 am
                        </small>
                    </span>
                </div>
            </div>
            <div class="message received rounded bg-grey px-3 py-2 mb-2">
                <span>Hi chetan!</span>
                <span class="time w-100 mt-1 ml-2">
                    <small>
                        12:02 am
                    </small>
                </span>
            </div>
            <div class="message sent d-flex justify-content-end mb-2">
                <div class="rounded px-3 py-2">
                    <span>Hi chetan!</span>
                    <span class="time w-100 mt-1 ml-2">
                        <small>
                            12:02 am
                        </small>
                    </span>
                </div>
            </div>
            <div class="message received rounded bg-grey px-3 py-2 mb-2">
                <span>Hi chetan!</span>
                <span class="time w-100 mt-1 ml-2">
                    <small>
                        12:02 am
                    </small>
                </span>
            </div>
            <div class="message sent d-flex justify-content-end mb-2">
                <div class="rounded px-3 py-2">
                    <span>Hi chetan!</span>
                    <span class="time w-100 mt-1 ml-2">
                        <small>
                            12:02 am
                        </small>
                    </span>
                </div>
            </div>
            <div class="message received rounded bg-grey px-3 py-2 mb-2">
                <span>Hi chetan!</span>
                <span class="time w-100 mt-1 ml-2">
                    <small>
                        12:02 am
                    </small>
                </span>
            </div>
            <div class="message sent d-flex justify-content-end mb-2">
                <div class="rounded px-3 py-2">
                    <span>Hi chetan!</span>
                    <span class="time w-100 mt-1 ml-2">
                        <small>
                            12:02 am
                        </small>
                    </span>
                </div>
            </div>
            <div class="message received rounded bg-grey px-3 py-2 mb-2">
                <span>Hi chetan!</span>
                <span class="time w-100 mt-1 ml-2">
                    <small>
                        12:02 am
                    </small>
                </span>
            </div>
            <div class="message sent d-flex justify-content-end mb-2">
                <div class="rounded px-3 py-2">
                    <span>Hi chetan!</span>
                    <span class="time w-100 mt-1 ml-2">
                        <small>
                            12:02 am
                        </small>
                    </span>
                </div>
            </div>
            <div class="message received rounded bg-grey px-3 py-2 mb-2">
                <span>Hi chetan!</span>
                <span class="time w-100 mt-1 ml-2">
                    <small>
                        12:02 am
                    </small>
                </span>
            </div>

        </div>

        <div class="send-message-container d-flex align-items-center justify-content-between">
            <input class="bg-grey form-control mr-4 px-3 w-100" type="text" name="search" placeholder="Type a message">
            <div class="bg-grey rounded-circle">
                <img class="profile-icon-placeholder" src="assets/icons/message-send-chat.svg" alt="User profile">
            </div>
        </div>
    </div>
</div>