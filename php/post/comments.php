<?php
session_start();
require_once 'conn.php';
if(isset($_POST['comment']))
{
	if($_POST['comment']== 1)
	{
		$comment_id = mysqli_real_escape_string($link, $_SESSION['user_id']);
		$post_id = mysqli_real_escape_string($link, $_POST['post_id']);
		$comment = mysqli_real_escape_string($link, $_POST['content']);
		date_default_timezone_set("Asia/Calcutta");
		$date_now = date("r");
		$query = "INSERT INTO `comments` (`comment_id`, `post_id`,`comment`,`date_created`) VALUES ('$comment_id', '$post_id', '$comment','$date_now')";
		if($result = mysqli_query($link, $query))
		{  
		    $data['name'] = $_SESSION['name']; 
		    $data['content'] = $comment;
			$data['date_created'] = $date_now;
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
	else if($_POST['comment']== 2)
	{
	    $post_id = mysqli_real_escape_string($link, $_POST['post_id']);	
		$query = "SELECT * FROM `comments` WHERE `post_id` = '$post_id'";
		$i = 0; 
		if($result = mysqli_query($link, $query))
		{  
		    $data = array(array());
		    while($row = $result->fetch_assoc())
			{
				$data[$i]['user_id'] = $row['comment_id'];
				$data[$i]['comments'] = $row['comment'];
				$data[$i]['date_create'] = $row['date_created'];
				$i++;
		    }
			echo json_encode($data);
		}  
		else  
		{  
		    $data = array();
			$data['status'] = 601;
			$data['error'] = $link -> error;
			echo json_encode($data);
		}
	}
    else 
    {
		$comment_id = mysqli_real_escape_string($link, $_SESSION['user_id']);
		$post_id = mysqli_real_escape_string($link, $_POST['post_id']);
		$date = mysqli_real_escape_string($link, $_POST['time']);
		$query = "DELETE FROM `comments` WHERE `comment_id` = '$comment_id' AND `post_id` = '$post_id' AND`date_created` = '$date'";
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
  