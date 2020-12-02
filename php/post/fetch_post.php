<?php
session_start();
require_once '../conn.php';
$data = array(array());
$a = scandir('post/');
$user_id = mysqli_real_escape_string($link, $_SESSION['sess_id']);
$query = "SELECT * FROM post JOIN friend ON post.user_id = friend.friend_id WHERE friend.f_user_id = '$user_id' order by post.last_updated ";

if($result = mysqli_query($link, $query))
	{  
		$i = 0;
		while($row = $result->fetch_assoc()) {
			$data[$i]['user_id'] = $row['user_id'];
			$data[$i]['comments'] = $row['comments'];
			$data[$i]['likes'] = $row['likes'];
			$data[$i]['last_updated'] = $row['last_updated'];
			$data[$i]['media'] = $row['media'];
			$data[$i]['post_id'] = $row['post_id'];
			$j = 0;
			$data_file = array();
			foreach ($a as $value) 
			{
				if(strpos($value , $data[$i]['user_id']) === 0)
				{
				   $data_file[$j++] = $value; 	
				}
			}
			$data[$i]['media'] = $data_file;
			
		    $i++;
		}
	echo json_encode($data);
	echo count($data);	
	}	
	else  
	{  
		$data['status'] = $result;
		$data['error'] = $link -> error;
		echo json_encode($data);
	}
        
?>