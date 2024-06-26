<?php
session_start();
require_once '../conn.php';
if ($_POST['action'] == 'create') {
	$data = array();
	if ($_FILES['image'] || isset($_POST['content'])) {
		$post_id = mysqli_real_escape_string($link, md5(uniqid()));
		$user_id = mysqli_real_escape_string($link, $_SESSION['sess_id']);
		date_default_timezone_set("Asia/Calcutta");
		$date_now = date("r");
		$date_created = $date_now;
		$last_updated = $date_now;
		$countfiles = count($_FILES['image']['name']);
		if (!empty($_FILES['image']['name'][0])) {
			$file = array();
			$maxsize = 5242880;
			if ((array_sum($_FILES['image']['size']) >= $maxsize) || ($_FILES["image"]["size"] == 0)) {
				$file['status'] = 601;
				$file['error'] = "File too large. File must be less than 5MB.";
			} else {
				$path = getcwd();
				for ($i = 1; $i <= $countfiles; $i++) {
					$img = $_FILES['image']['name'][$i - 1];
					$tmp = $_FILES['image']['tmp_name'][$i - 1];
					$ext = strtolower(pathinfo($img, PATHINFO_EXTENSION));
					$final_image = $post_id . "_" . $i . '.' . $ext;
					$file[$i - 1] = $final_image;
					move_uploaded_file($tmp, "$path/post/$final_image");
				}
			}
		} else {
			$file = NULL;
		}
		if (isset($_POST['content'])) {
			$content = $_POST['content'];
		} else {
			$content =  NULL;
		}
		$comments = 0;
		$likes = 0;
		date_default_timezone_set("Asia/Calcutta");
		$date_now = date("r");
		$last_updated = $date_now;
		$query = "INSERT INTO `post` (`post_id`, `user_id`, `media`,`content`,`date_created`,`last_updated`, `comments`, `likes`) VALUES ('$post_id', '$user_id', '$countfiles','$content','$date_created','$last_updated', '$comments','$likes')";
		if (!isset($data['status'])) {
			if ($result = mysqli_query($link, $query)) {
				$data['post_id'] = $post_id;
				$data['likes'] = $likes;
				$data['user_id'] = $user_id;
				$data['name'] = $_SESSION['user_name'];
				$data['comments'] = $comments;
				$data['media'] = $file;
				$data['last_updated'] = $last_updated;
				$data['content'] = $content;
				$data['status'] = 201;
				echo json_encode($data);
			} else {
				$data['status'] = 601;
				$data['error'] = $link->error;
				echo json_encode($data);
			}
		} else {
			echo json_encode($data);
		}
	} else {
		$data['status'] = 601;
		$data['error'] = $link->error;
		echo json_encode($data);
	}
} else if ($_POST['action'] == 'delete' && isset($_POST['post_id'])) {
	$post_id = mysqli_real_escape_string($link, $_POST['post_id']);
	$query = "DELETE FROM `post` WHERE `post_id` = '$post_id'";
	if ($result = mysqli_query($link, $query)) {
		$data['status'] = 201;
		echo json_encode($data);
	} else {
		$data['status'] = 601;
		$data['error'] = $link->error;
		echo json_encode($data);
	}
} else if ($_POST['action'] == 'update' && isset($_POST['post_id'])) {

	$post_id = mysqli_real_escape_string($link, $_POST['post_id']);
	$content = mysqli_real_escape_string($link, $_POST['content']);
	date_default_timezone_set("Asia/Calcutta");
	$date_now = date("r");
	$last_updated = $date_now;
	$query = "UPDATE `post` SET `content` = '$content',`last_updated` = '$last_updated' WHERE `post_id` = '$post_id'";
	if ($result = mysqli_query($link, $query)) {
		$data['last_updated'] = $last_updated;
		$data['status'] = 201;
		echo json_encode($data);
	} else {
		$data['status'] = 601;
		$data['error'] = $link->error;
		echo json_encode($data);
	}
} else {
	header('Location: http://index.php');
}
?>