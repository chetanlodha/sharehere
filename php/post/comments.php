<?php
session_start();
require_once '../conn.php';
if(isset($_POST['action']))
{
	if($_POST['action'] == 'create')
	{
		$comment_id = mysqli_real_escape_string($link, $_SESSION['sess_id']);
		$post_id = mysqli_real_escape_string($link, $_POST['post_id']);
		$comment = mysqli_real_escape_string($link, $_POST['content']);
		$count = mysqli_real_escape_string($link, $_POST['count']);
		date_default_timezone_set("Asia/Calcutta");
		$date_now = date("r");
		$query = "INSERT INTO `comments` (`comment_id`, `post_id`,`comment`,`date_created`) VALUES ('$comment_id', '$post_id', '$comment','$date_now')";
		if($result = mysqli_query($link, $query))
		{ 
            $query = "UPDATE `post` SET `comments` = comments+1 WHERE `post_id` = '$post_id'";	
	        $result = mysqli_query($link, $query);	
		    $data['name'] = $_SESSION['user_name']; 
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
	else if($_POST['action']== 'fetch')
	{
	    $post_id = mysqli_real_escape_string($link, $_POST['post_id']);	
		$query = "SELECT * FROM `comments` WHERE `post_id` = '$post_id'";
		$i = 0; 
		if($result = mysqli_query($link, $query))
		{  
		    $data = array(array());
		    while($row = $result->fetch_assoc())
			{
				$data[$i]['id'] = $row['comment_id'];
				$data[$i]['content'] = $row['comment'];
				$data[$i]['date_created'] = $row['date_created'];
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
    else if($_POST['action']== 'delete') 
    {
		$comment_id = mysqli_real_escape_string($link, $_SESSION['sess_id']);
		$post_id = mysqli_real_escape_string($link, $_POST['post_id']);
		$date = mysqli_real_escape_string($link, $_POST['date_created']);
		$query = "DELETE FROM `comments` WHERE `comment_id` = '$comment_id' AND `post_id` = '$post_id' AND`date_created` = '$date'";
		if($result = mysqli_query($link, $query))
		{  
		    $query = "UPDATE `post` SET `comments` = comments-1 WHERE `post_id` = '$post_id'";	
	        $result = mysqli_query($link, $query);
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
	 else if($_POST['action']== 'update') 
    {
		$comment_id = mysqli_real_escape_string($link, $_SESSION['sess_id']);
		$post_id = mysqli_real_escape_string($link, $_POST['post_id']);
		$comment = mysqli_real_escape_string($link, $_POST['content']);
		$date = mysqli_real_escape_string($link, $_POST['date_created']);
		date_default_timezone_set("Asia/Calcutta");
		$date_now = date("r");
	    $query = "UPDATE `comments` SET `date_created` = '$date_now' , `comment` = '$comment' WHERE `comment_id` = '$comment_id' AND `post_id` = '$post_id' AND`date_created` = '$date'";	
	    if($result = mysqli_query($link, $query))
		{  
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
    else
    {
	    header('Location: http://index.php');
    } 	
}
else
{
	header('Location: http://index.php');
}
?>
  