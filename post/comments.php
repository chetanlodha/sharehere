<?php
require_once 'conn.php';
if(isset($_POST['comment']))
{
	if($_POST['comment']== true)
	{
		$comment_id = mysqli_real_escape_string($link, $_SESSION['user_id']);
		$post_id = mysqli_real_escape_string($link, $_POST['post_id']);
		$comment = mysqli_real_escape_string($link, $_POST['content']);
		date_default_timezone_set("Asia/Calcutta");
		$date_now = date("r");
		$query = "INSERT INTO `comments` (`comment_id`, `post_id`,`comment`,`date_created`) VALUES ('$comment_id', '$post_id', '$comment','$date_now')";
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
		$comment_id = mysqli_real_escape_string($link, $_SESSION['user_id']);
		$post_id = mysqli_real_escape_string($link, $_POST['post_id']);
		$date_now = mysqli_real_escape_string($link, $_POST['time']);
		$query = "DELETE FROM `comments` WHERE `comment_id` = '$comment_id' AND `post_id` = '$post_id' AND`date_created` = '$date_now'";
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
  