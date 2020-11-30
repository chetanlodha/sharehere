<?php
require_once 'conn.php';
if(isset($_POST['like']))
{
	if($_POST['like']==true)
	{
		$like_id = mysqli_real_escape_string($link, $_SESSION['user_id']);
		$post_id = mysqli_real_escape_string($link, $_POST['post_id']);
		date_default_timezone_set("Asia/Calcutta");

		$date_now = strtotime(date("r"));
		$query = "INSERT INTO `likes` (`like_id`, `post_id`,`date_like`) VALUES ('$like_id', '$post_id','$date_now')";
		if($result = mysqli_query($link, $query))
		{  
			$data['status'] = 201;
			echo json_encode($data);
		}  
		else  
		{  
			$data['status'] = 601;
			$data['error'] = $link -> error;
			echo json_encode($data);
		}
	}
	else
	{
		$like_id = mysqli_real_escape_string($link, $_SESSION['user_id']);
		$post_id = mysqli_real_escape_string($link, $_POST['post_id']);
		$query = "DELETE FROM `likes` WHERE `like_id` = '$like_id' AND `post_id` = '$post_id'";
		if($result = mysqli_query($link, $query))
		{  
			$data['status'] = 201;
			echo json_encode($data);
		}  
		else  
		{  
			$data['status'] = 601;
			$data['error'] = $link -> error;
			echo json_encode($data);
		}
	}
}	
else
{
	header('Location: http://index.php');
}
?>
  