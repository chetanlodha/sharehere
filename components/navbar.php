<nav>
    <div class="navbar flex-column justify-content-between align-items-center h-100 pt-3">
        <div class="d-flex align-items-center order-1">
            <h3 class="nav-header font-weight-bold">Sharehere</h3>
            <img class="profile-icon ml-3 d-md-none" src="./assets/user/profileImage.jpeg" id="toggleLogoutContainer"
                alt="User profile" />
        </div>
        <ul class="nav-items d-flex flex-md-column mb-0 order-3 order-md-2">
            <a href="#">
                <li class="nav-item rounded mt-2 active">
                    <img src="assets/icons/nav-home.svg" alt="Home" />
                    <span class="d-none d-md-block ml-3">Home</span>
                </li>
            </a>
            <a href="search.html">
                <li class="nav-item rounded mt-2">
                    <img src="assets/icons/nav-search.svg" alt="Search" />
                    <span class="d-none d-md-block ml-3">Search</span>
                </li>
            </a>
            <a href="notifications.html">
                <li class="nav-item rounded mt-2">
                    <img src="assets/icons/nav-notification.svg" alt="Notifications" />
                    <span class="d-none d-md-block ml-3">Notifications</span>
                </li>
            </a>
            <a href="profile.html">
                <li class="nav-item rounded mt-2">
                    <img src="assets/icons/nav-profile.svg" alt="Profile" />
                    <span class="d-none d-md-block ml-3">Profile</span>
                </li>
            </a>
        </ul>
        <div
            class="logoutContainer hidden d-flex flex-row justify-content-center mt-4 mb-3 mb-md-3 mt-md-0 order-2 order-md-2">
            <img class="profile-icon d-none d-md-block" src="assets/user/profileImage.jpeg" alt="User profile" />
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