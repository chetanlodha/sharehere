<?php
session_start();
require_once '../conn.php';

	if($_POST['action'] == 'like')
	{
		$user_id = mysqli_real_escape_string($link, $_SESSION['sess_id']);
		$post_id = mysqli_real_escape_string($link, $_POST['post_id']);
		date_default_timezone_set("Asia/Calcutta");
		// $date_now = strtotime(date("r"));
		$query = "INSERT INTO `likes` (`user_id`, `post_id`) VALUES ('$user_id', '$post_id')";
		if($result = mysqli_query($link, $query))
		{  
		    
            $query = "UPDATE `post` SET `likes` = likes+1 WHERE `post_id` = '$post_id'";	
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
	elseif($_POST['action'] == 'unlike')
	{
		$user_id = mysqli_real_escape_string($link, $_SESSION['sess_id']);
		$post_id = mysqli_real_escape_string($link, $_POST['post_id']);
		$query = "DELETE FROM `likes` WHERE `user_id` = '$user_id' AND `post_id` = '$post_id'";
		if($result = mysqli_query($link, $query))
		{  
		    $query = "UPDATE `post` SET `likes` = likes-1 WHERE `post_id` = '$post_id'";	
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
	elseif($_POST['action'] == 'get_likes')
    {
		$data = array(array());
		$post_id = mysqli_real_escape_string($link, $_POST['post_id']);
		$query =  "SELECT * FROM `likes` WHERE `post_id` = '$post_id'";
		if($result = mysqli_query($link, $query))
		{  
			$i = 0;
			while($row = $result->fetch_assoc()) {
				$data[$i] = $row['user_id'];
				$i++;
			}
			echo json_encode($data);
		}	
		else  
		{  
			$data['status'] = $result;
			$data['error'] = $link -> error;
			echo json_encode($data);
		}
	}
	else
	{
	   header('Location: http://index.php');	
	}

?>
  