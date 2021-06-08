<nav>
    <div class="navbar flex-column justify-content-between align-items-center h-100 pt-3 shadow-light">
        <div class="d-flex align-items-center order-1">
            <h3 class="nav-header font-weight-bold">Sharehere</h3>
            <?php if (!$_SESSION['profile_picture']) {?>
                <div class="bg-grey rounded-circle d-md-none">
                    <img class="profile-icon-placeholder" src="assets/icons/profile-user.svg" alt="User profile" />
                </div>
            <?php } else {?>
                <img class="profile-icon ml-3 d-md-none" src="php/post/post/uploads/<?php echo $_SESSION['profile_picture'] ?>" id="toggleLogoutContainer" alt="User profile" />
            <?php }?>
        </div>
        <ul class="nav-items d-flex flex-md-column mt-3 mt-md-0 mb-0 order-3 order-md-2">
            <li class="nav-item rounded ml-2 ml-md-0 mt-md-2 active" data-page="home">
                <img src="assets/icons/nav-home.svg" alt="Home" />
                <span class="d-none d-md-block ml-3">Home</span>
            </li>
            <li class="nav-item rounded ml-2 ml-md-0 mt-md-2" data-page="search">
                <img src="assets/icons/nav-search.svg" alt="Search" />
                <span class="d-none d-md-block ml-3">Search</span>
            </li>
            <li class="nav-item rounded ml-2 ml-md-0 mt-md-2" data-page="notifications">
                <img src="assets/icons/nav-notification.svg" alt="Notifications" />
                <span class="d-none d-md-block ml-3">Notifications</span>
            </li>
            <li class="nav-item rounded ml-2 ml-md-0 mt-md-2" data-page="profile">
                <img src="assets/icons/nav-profile.svg" alt="Profile" />
                <span class="d-none d-md-block ml-3">Profile</span>
            </li>
            <li class="nav-item rounded ml-2 ml-md-0 mt-md-2" data-page="chat">
                <img src="assets/icons/nav-chat.svg" alt="Chat" />
                <span class="d-none d-md-block ml-3">Chat</span>
            </li>
        </ul>
        <div class="logoutContainer hidden d-flex flex-row justify-content-center mt-4 mb-3 mb-md-3 mt-md-0 order-2 order-md-2">

            <?php if (!$_SESSION['profile_picture']) {?>
                <div class="bg-grey rounded-circle">
                    <img class="profile-icon-placeholder" src="assets/icons/profile-user.svg" alt="User profile" />
                </div>
            <?php } else {?>
                <img class="profile-icon d-none d-md-block" src="php/post/post/uploads/<?php echo $_SESSION['profile_picture'] ?>" alt="User profile" />
            <?php }?>

            <div class="ml-2 d-flex flex-row flex-md-column justify-content-center">
                <div>
                    <h5 class="mb-0 font-weight-bold"><?php echo $_SESSION['user_name'] ?></h5>
                    <span><small><?php echo $_SESSION['sess_user'] ?></small></span>
                </div>
                <a href="logout.php">
                    <button class="btn btn-sm btn-light ml-3 ml-md-0 mt-md-2">Logout</Button>
                </a>
            </div>
        </div>
    </div>
</nav>
