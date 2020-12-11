<?php
session_start();
require_once '../conn.php';
if(isset($_SESSION['sess_id']))
{
	$data = array(array());
	$a = scandir('post/');
	$user_id = mysqli_real_escape_string($link, $_SESSION['sess_id']);
	$query = "SELECT post.* ,users.name ,users.profile_picture
	FROM post   
    INNER JOIN users
	ON post.user_id = users.id
	INNER JOIN friends
	ON post.user_id = friends.friend_id
	WHERE  friends.user_id =  '$user_id' OR friends.friend_id = '$user_id'";
	if($result = mysqli_query($link, $query))
	{  
		$i = 0;
		while($row = $result->fetch_assoc()) {
			$data[$i]['user_id'] = $row['user_id'];
			$data[$i]['content'] = $row['content'];
			$data[$i]['comments'] = $row['comments'];
			$data[$i]['likes'] = $row['likes'];
			$data[$i]['content'] = $row['content'];
			$data[$i]['last_updated'] = $row['last_updated'];
			$data[$i]['media'] = $row['media'];
			$data[$i]['post_id'] = $row['post_id'];
			$data[$i]['name'] = $row['name']; 
			$data[$i]['profile_picture'] = $row['profile_picture'];
			$j = 0;
			$data_file = array();
			foreach ($a as $value) 
			{
				if(strpos($value , $data[$i]['post_id']) === 0)
				{
				   $data_file[$j++] = $value; 	
				}
			}
			$data[$i]['media'] = $data_file;
			
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